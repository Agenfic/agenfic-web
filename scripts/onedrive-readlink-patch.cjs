"use strict";

const fs = require("node:fs");
const path = require("node:path");

const isOneDrivePath = (filePath) => {
  try {
    const segments = path
      .resolve(String(filePath))
      .split(/[\\/]+/)
      .filter(Boolean)
      .map((segment) => segment.toLowerCase());
    return segments.some((segment) => segment.startsWith("onedrive"));
  } catch {
    return false;
  }
};

const patchStats = (stats, filePath) => {
  if (
    process.platform !== "win32" ||
    !stats ||
    typeof stats.isSymbolicLink !== "function" ||
    !isOneDrivePath(filePath)
  ) {
    return stats;
  }

  // OneDrive cloud files are reparse points and can be mis-reported as symlinks.
  // Force a non-symlink answer so callers don't issue readlink() and crash with EINVAL.
  const originalIsSymbolicLink = stats.isSymbolicLink.bind(stats);
  stats.isSymbolicLink = () => {
    try {
      originalIsSymbolicLink();
      return false;
    } catch {
      return false;
    }
  };

  return stats;
};

const patchDirent = (dirent, parentPath) => {
  if (
    process.platform !== "win32" ||
    !dirent ||
    typeof dirent.isSymbolicLink !== "function" ||
    !isOneDrivePath(path.join(String(parentPath), String(dirent.name ?? "")))
  ) {
    return dirent;
  }

  const originalIsSymbolicLink = dirent.isSymbolicLink.bind(dirent);
  dirent.isSymbolicLink = () => {
    try {
      originalIsSymbolicLink();
      return false;
    } catch {
      return false;
    }
  };

  return dirent;
};

const shouldPatchDirents = (options) => {
  return Boolean(options && typeof options === "object" && options.withFileTypes);
};

const patchDirents = (dirents, dirPath) => {
  if (!Array.isArray(dirents)) {
    return dirents;
  }
  return dirents.map((dirent) => patchDirent(dirent, dirPath));
};

const originalLstat = fs.lstat.bind(fs);
fs.lstat = (filePath, options, callback) => {
  if (typeof options === "function") {
    callback = options;
    options = undefined;
  }

  return originalLstat(filePath, options, (error, stats) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null, patchStats(stats, filePath));
  });
};

const originalLstatSync = fs.lstatSync.bind(fs);
fs.lstatSync = (filePath, options) => {
  return patchStats(originalLstatSync(filePath, options), filePath);
};

const originalPromisesLstat = fs.promises.lstat.bind(fs.promises);
fs.promises.lstat = async (filePath, options) => {
  return patchStats(await originalPromisesLstat(filePath, options), filePath);
};

const originalReaddir = fs.readdir.bind(fs);
fs.readdir = (dirPath, options, callback) => {
  if (typeof options === "function") {
    callback = options;
    options = undefined;
  }

  return originalReaddir(dirPath, options, (error, entries) => {
    if (error) {
      callback(error);
      return;
    }
    callback(
      null,
      shouldPatchDirents(options) ? patchDirents(entries, dirPath) : entries,
    );
  });
};

const originalReaddirSync = fs.readdirSync.bind(fs);
fs.readdirSync = (dirPath, options) => {
  const entries = originalReaddirSync(dirPath, options);
  return shouldPatchDirents(options) ? patchDirents(entries, dirPath) : entries;
};

const originalPromisesReaddir = fs.promises.readdir.bind(fs.promises);
fs.promises.readdir = async (dirPath, options) => {
  const entries = await originalPromisesReaddir(dirPath, options);
  return shouldPatchDirents(options) ? patchDirents(entries, dirPath) : entries;
};
