"use client";

import { createElement, useEffect, useRef, useState } from "react";
import { NAVIGATION_BANNER_HTML } from "./navigation-banner-template";
import { createHeroParticles } from "./hero-particles-scene";
import { getWordmarkSvgMarkup } from "./wordmark-logo";
import InterviewsGlobe from "./interviews-globe";
import "./interviews-globe.css";

const HEADING_LINE_ONE = "The AI advantage,";
const HEADING_LINE_TWO_PREFIX = "finally ";
const HEADING_LINE_TWO_EMPHASIS = "within reach.";
const HEADING = `${HEADING_LINE_ONE} ${HEADING_LINE_TWO_PREFIX}${HEADING_LINE_TWO_EMPHASIS}`;
const SUPPORTING_COPY =
  "Automation, strategy, and custom AI solutions — built to make your business unstoppable.";
const HOME_THEME_STORAGE_KEY = "agenfic-home-theme";
const AGENFIC_NAV_CSS_URL =
  "https://cdn.prod.website-files.com/67ce28cfec624e2b733f8a52/css/ant-brand.shared.ac3f37dad.min.css";
const MOBILE_LAYOUT_QUERY = "(max-width: 767px)";

export type LandingTheme = "light" | "dark";

const LANDING_THEME_TOKENS: Record<
  LandingTheme,
  {
    wordmarkFill: string;
    navForeground: string;
    navMuted: string;
    navHover: string;
    navPanelBackground: string;
    navPanelHover: string;
    navPanelBorder: string;
    navDivider: string;
    navPanelShadow: string;
    navSolidBackground: string;
    navSolidForeground: string;
    navSolidHover: string;
    navSolidDivider: string;
  }
> = {
  light: {
    wordmarkFill: "#181818",
    navForeground: "#181818",
    navMuted: "rgba(24, 24, 24, 0.58)",
    navHover: "#ece9df",
    navPanelBackground: "#f5f5f7",
    navPanelHover: "#e8e8ed",
    navPanelBorder: "rgba(29, 29, 31, 0.12)",
    navDivider: "rgba(24, 24, 24, 0.1)",
    navPanelShadow: "0 16px 50px rgba(18, 19, 23, 0.12)",
    navSolidBackground: "#181818",
    navSolidForeground: "#f9f9f7",
    navSolidHover: "#2a2a2a",
    navSolidDivider: "rgba(249, 249, 247, 0.18)"
  },
  dark: {
    wordmarkFill: "#f0efeb",
    navForeground: "#f0efeb",
    navMuted: "rgba(240, 239, 235, 0.62)",
    navHover: "#24272d",
    navPanelBackground: "#17191d",
    navPanelHover: "#24272d",
    navPanelBorder: "rgba(240, 239, 235, 0.16)",
    navDivider: "rgba(240, 239, 235, 0.12)",
    navPanelShadow: "0 16px 50px rgba(0, 0, 0, 0.34)",
    navSolidBackground: "#f0efeb",
    navSolidForeground: "#121317",
    navSolidHover: "#d9d7d1",
    navSolidDivider: "rgba(18, 19, 23, 0.18)"
  }
};

export const getNavigationBannerIframeHtml = (theme: LandingTheme) => {
  const themeTokens = LANDING_THEME_TOKENS[theme];

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <base target="_top" />
    <link href="${AGENFIC_NAV_CSS_URL}" rel="stylesheet" type="text/css" crossorigin="anonymous" />
    <style>
      :root {
        color-scheme: ${theme};
        --nav-foreground: ${themeTokens.navForeground};
        --nav-muted: ${themeTokens.navMuted};
        --nav-hover: ${themeTokens.navHover};
        --nav-panel-background: ${themeTokens.navPanelBackground};
        --nav-panel-hover: ${themeTokens.navPanelHover};
        --nav-panel-border: ${themeTokens.navPanelBorder};
        --nav-divider: ${themeTokens.navDivider};
        --nav-panel-shadow: ${themeTokens.navPanelShadow};
        --nav-solid-background: ${themeTokens.navSolidBackground};
        --nav-solid-foreground: ${themeTokens.navSolidForeground};
        --nav-solid-hover: ${themeTokens.navSolidHover};
        --nav-solid-divider: ${themeTokens.navSolidDivider};
      }
      html, body {
        margin: 0;
        padding: 0;
        background: transparent;
        color: var(--nav-foreground);
        overflow: visible;
      }
      .nav_wrap,
      .nav_contain,
      .nav_contain.u-container,
      .nav_desktop_layout,
      .nav_links_component,
      .nav_links_wrap {
        background: transparent !important;
      }
      .nav_wrap {
        position: relative !important;
        box-shadow: none !important;
        border: 0 !important;
      }
      .nav_wrap.is-desktop {
        display: block !important;
        width: 100% !important;
        max-width: none !important;
        min-width: 0 !important;
        padding: 0 !important;
        overflow: visible !important;
      }
      .nav_contain {
        max-width: var(--container--main) !important;
      }
      .nav_contain.u-container {
        width: 100% !important;
        max-width: min(1600px, calc(100vw - 48px)) !important;
        margin: 0 auto !important;
        padding: 0 24px !important;
        height: 84px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 16px !important;
      }
      .nav_desktop_layout {
        flex: 1 1 auto !important;
      }
      .nav_links_component.is-desktop {
        display: flex !important;
        justify-content: flex-start !important;
        align-items: center !important;
      }
      .nav_links_wrap.w-list-unstyled.is-desktop {
        display: flex !important;
        align-items: center !important;
        gap: 0 !important;
      }
      .nav_dropdown_component.w-dropdown {
        position: relative !important;
      }
      .nav_dropdown_component.w-dropdown > .nav_dropdown_main_wrap.is-desktop {
        top: 100% !important;
        padding-top: 10px !important;
      }
      .nav_dropdown_main_wrap.is-desktop {
        z-index: 9999 !important;
      }
      .nav_dropdown_main_content.is-desktop {
        pointer-events: auto !important;
        background: var(--nav-panel-background) !important;
        border: 1px solid var(--nav-panel-border) !important;
        box-shadow: var(--nav-panel-shadow) !important;
      }
      .nav_dropdown_link:hover,
      .nav_dropdown_link:focus-visible {
        background: var(--nav-panel-hover) !important;
      }
      .nav_logo_lottie {
        display: inline-flex !important;
        align-items: center !important;
        height: 24px !important;
      }
      .nav_logo_lottie svg {
        display: block !important;
        width: 214.5px !important;
        height: 24px !important;
      }
      .nav_logo_wordmark {
        display: inline-flex !important;
        align-items: center !important;
        min-height: 16px !important;
        font-size: 18px !important;
        line-height: 1 !important;
        letter-spacing: -0.02em !important;
        font-weight: 500 !important;
        color: var(--nav-foreground) !important;
        font-family: inherit !important;
      }
      .nav_logo_wrap {
        transform: translateX(16px) !important;
      }
      .nav_logo_wrap,
      .nav_links_link,
      .nav_dropdown_link,
      .btn_main_wrap.is-nav,
      .mobile-nav-link {
        color: var(--nav-foreground) !important;
      }
      .nav_links_link:hover,
      .nav_links_link:focus-visible,
      .btn_main_wrap.is-nav:hover,
      .btn_main_wrap.is-nav:focus-visible {
        background: var(--nav-hover) !important;
      }
      .u-color-faded {
        color: var(--nav-muted) !important;
      }
      .nav_dropdown_link_block {
        border-top: 1px solid var(--nav-divider) !important;
      }
      .btn_main_wrap {
        border: 1px solid var(--nav-panel-border) !important;
      }
      .btn_main_wrap.is-combo,
      .btn_main_wrap.w-variant-c370121c-4703-26a2-b763-05e4aedcfa0f {
        background: var(--nav-solid-background) !important;
        color: var(--nav-solid-foreground) !important;
        border-color: transparent !important;
      }
      .btn_main_wrap.is-combo {
        min-height: 40px !important;
        height: 40px !important;
        padding: 0 16px !important;
        border-radius: 12px 0 0 12px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      .btn_main_wrap.is-combo:hover,
      .btn_main_wrap.is-combo:focus-visible,
      .btn_main_wrap.w-variant-c370121c-4703-26a2-b763-05e4aedcfa0f:hover,
      .btn_main_wrap.w-variant-c370121c-4703-26a2-b763-05e4aedcfa0f:focus-visible {
        background: var(--nav-solid-hover) !important;
      }
      .nav_btn_combo_wrap {
        border-radius: 12px !important;
        overflow: visible !important;
        height: 40px !important;
        padding-left: 0 !important;
        align-items: stretch !important;
      }
      .nav_btn_combo_wrap .nav_links_link.is-btn-dropdown {
        border-radius: 0 12px 12px 0 !important;
        background: var(--nav-solid-background) !important;
        color: var(--nav-solid-foreground) !important;
        min-height: 40px !important;
        width: 44px !important;
        min-width: 44px !important;
        padding: 0 !important;
        border-left: 1px solid var(--nav-solid-divider) !important;
      }
      .nav_btn_combo_wrap .nav_links_link.is-btn-dropdown .btn_dropdown_link_wrap,
      .nav_btn_combo_wrap .nav_links_link.is-btn-dropdown .btn_dropdown_icon_wrap,
      .nav_btn_combo_wrap .nav_links_link.is-btn-dropdown .nav_links_svg,
      .nav_btn_combo_wrap .nav_links_link.is-btn-dropdown .icon-embed-xsmall,
      .nav_btn_combo_wrap .nav_links_link.is-btn-dropdown .icon-embed-xsmall svg {
        color: inherit !important;
        background: transparent !important;
      }
      .nav_btn_combo_wrap .nav_links_link.is-btn-dropdown .btn_dropdown_link_wrap {
        border: 0 !important;
        border-left: 0 !important;
        border-radius: 0 12px 12px 0 !important;
        background: inherit !important;
        width: 100% !important;
        height: 100% !important;
      }
      .nav_btn_combo_wrap .nav_links_link.is-btn-dropdown:hover,
      .nav_btn_combo_wrap .nav_links_link.is-btn-dropdown:focus-visible {
        background: var(--nav-solid-hover) !important;
      }
      .mobile-nav-toggle {
        display: none !important;
      }
      .mobile-nav-panel {
        display: none;
      }

      @media (max-width: 1024px) {
        .nav_contain.u-container {
          max-width: calc(100vw - 24px) !important;
          padding: 0 12px !important;
          height: 72px !important;
          gap: 10px !important;
        }
        .nav_desktop_layout {
          display: flex !important;
          flex: 1 1 auto !important;
          min-width: 0 !important;
          justify-content: flex-end !important;
        }
        .nav_links_component.is-desktop {
          display: flex !important;
          width: 100% !important;
          justify-content: flex-end !important;
          align-items: center !important;
        }
        .nav_links_wrap.w-list-unstyled.is-desktop {
          display: none !important;
        }
        .nav_actions_wrap {
          display: flex !important;
          align-items: center !important;
          flex: 0 0 auto !important;
          margin-left: auto !important;
        }
        .nav_actions_wrap > .nav_links_item.u-display-none,
        .nav_actions_wrap .btn_main_wrap,
        .nav_btn_combo_wrap .nav_links_link,
        .nav_btn_combo_wrap .nav_dropdown_main_wrap {
          display: none !important;
        }
        .mobile-nav-toggle.button.button-compact.button-primary.call-to-action--nav.menu-toggle {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          min-height: 36px !important;
          padding: 8px 14px !important;
          border: 0 !important;
          border-radius: 999px !important;
          background: var(--nav-solid-background) !important;
          color: var(--nav-solid-foreground) !important;
          font-size: 13px !important;
          line-height: 1 !important;
          letter-spacing: 0.08px !important;
          font-weight: 500 !important;
          text-transform: lowercase !important;
          cursor: pointer !important;
        }
        .mobile-nav-toggle.button.button-compact.button-primary.call-to-action--nav.menu-toggle:hover,
        .mobile-nav-toggle.button.button-compact.button-primary.call-to-action--nav.menu-toggle:focus-visible {
          background: var(--nav-solid-hover) !important;
          outline: none !important;
        }
        .mobile-nav-panel {
          position: absolute;
          top: calc(100% + 8px);
          left: 12px;
          right: 12px;
          border-radius: 16px;
          border: 1px solid var(--nav-panel-border);
          background: var(--nav-panel-background);
          box-shadow: var(--nav-panel-shadow);
          padding: 8px;
          flex-direction: column;
          gap: 4px;
          z-index: 99;
        }
        .nav_wrap.mobile-menu-open .mobile-nav-panel {
          display: flex;
        }
        .mobile-nav-link {
          display: block;
          text-decoration: none;
          border-radius: 10px;
          padding: 9px 10px;
          font-size: 14px;
          line-height: 1.3;
          font-weight: 450;
        }
        .mobile-nav-link:hover,
        .mobile-nav-link:focus-visible {
          background: var(--nav-panel-hover);
          outline: none;
        }
        .mobile-nav-link.is-cta {
          background: var(--nav-solid-background);
          color: var(--nav-solid-foreground);
        }
        .mobile-nav-link.is-cta:hover,
        .mobile-nav-link.is-cta:focus-visible {
          background: var(--nav-solid-hover);
        }
      }

      @media (max-width: 767px) {
        .mobile-nav-toggle.button.button-compact.button-primary.call-to-action--nav.menu-toggle {
          min-height: 36px !important;
          padding: 8px 12px !important;
        }
        .nav_logo_lottie {
          height: 18px !important;
        }
        .nav_logo_lottie svg {
          width: 160px !important;
          height: 18px !important;
        }
      }

      @media (max-width: 480px) {
        .nav_contain.u-container {
          max-width: calc(100vw - 12px) !important;
          padding: 0 6px !important;
          height: 64px !important;
          gap: 8px !important;
        }
        .nav_logo_lottie {
          height: 16px !important;
        }
        .nav_logo_lottie svg {
          width: 132px !important;
          height: 16px !important;
        }
        .btn_main_text {
          font-size: 12px !important;
          line-height: 1 !important;
        }
        .btn_main_wrap.is-combo {
          padding: 0 !important;
        }
        .nav_actions_wrap {
          gap: 0 !important;
        }
        .mobile-nav-panel {
          left: 6px;
          right: 6px;
          top: calc(100% + 6px);
        }
      }
    </style>
  </head>
  <body>
    ${NAVIGATION_BANNER_HTML}
    <script>
      (() => {
        // frameElement comes from the parent browsing context, so instanceof checks can fail across realms.
        const frameElement =
          window.frameElement && window.frameElement.tagName === "IFRAME" ? window.frameElement : null;
        const frameWrapElement = frameElement ? frameElement.parentElement : null;
        const DESKTOP_FRAME_HEIGHT = 84;
        const TABLET_FRAME_HEIGHT = 72;
        const MOBILE_FRAME_HEIGHT = 64;
        const MOBILE_MAX_FRAME_HEIGHT = 680;
        const DESKTOP_MAX_FRAME_HEIGHT = 760;
        const PANEL_PADDING = 20;
        const CLOSE_DELAY_MS = 120;
        const closeTimers = new WeakMap();
        const shouldRouteToTop = (href) => {
          if (!href) {
            return false;
          }
          const value = href.trim();
          return !(
            value === "" ||
            value.startsWith("#") ||
            value.startsWith("javascript:") ||
            value.startsWith("mailto:") ||
            value.startsWith("tel:")
          );
        };

        const normalizeAnchorTargets = (scope = document) => {
          const anchors = Array.from(scope.querySelectorAll("a[href]"));
          anchors.forEach((anchor) => {
            const href = anchor.getAttribute("href");
            if (!shouldRouteToTop(href)) {
              return;
            }
            const target = anchor.getAttribute("target");
            if (!target || target === "_self") {
              anchor.setAttribute("target", "_top");
            }
          });
        };

        const getBaseFrameHeight = () => {
          if (window.matchMedia("(max-width: 480px)").matches) {
            return MOBILE_FRAME_HEIGHT;
          }
          if (window.matchMedia("(max-width: 1024px)").matches) {
            return TABLET_FRAME_HEIGHT;
          }
          return DESKTOP_FRAME_HEIGHT;
        };

        const getMaxFrameHeight = () => {
          if (window.matchMedia("(max-width: 1024px)").matches) {
            return MOBILE_MAX_FRAME_HEIGHT;
          }
          return DESKTOP_MAX_FRAME_HEIGHT;
        };

        const setFrameHeight = (value) => {
          const baseFrameHeight = getBaseFrameHeight();
          const maxFrameHeight = getMaxFrameHeight();
          const nextHeight = Math.max(baseFrameHeight, Math.min(maxFrameHeight, Math.ceil(value)));
          if (frameElement) {
            frameElement.style.height = nextHeight + "px";
          }
          if (frameWrapElement) {
            frameWrapElement.style.height = nextHeight + "px";
          }
        };

        const syncFrameHeight = () => {
          const baseFrameHeight = getBaseFrameHeight();
          const openPanels = Array.from(document.querySelectorAll(".w-dropdown-list.w--open"));
          const mobilePanel = document.querySelector(".mobile-nav-panel.open");
          if (openPanels.length === 0 && !mobilePanel) {
            setFrameHeight(baseFrameHeight);
            return;
          }
          let neededHeight = baseFrameHeight;
          openPanels.forEach((panel) => {
            const rect = panel.getBoundingClientRect();
            neededHeight = Math.max(neededHeight, rect.bottom + PANEL_PADDING);
          });
          if (mobilePanel instanceof HTMLElement) {
            const rect = mobilePanel.getBoundingClientRect();
            neededHeight = Math.max(neededHeight, rect.bottom + PANEL_PADDING);
          }
          setFrameHeight(neededHeight);
        };

        const logoLink = document.querySelector(".nav_logo_wrap");
        if (logoLink && logoLink.tagName === "A") {
          logoLink.setAttribute("href", "/");
          logoLink.setAttribute("target", "_top");
          logoLink.setAttribute("aria-label", "Home page");
          logoLink.setAttribute("data-cta", "Navigation");
          logoLink.setAttribute("data-cta-copy", "Agenfic");
        }

        const logo = document.querySelector(".nav_logo_lottie");
        if (logo) {
          logo.innerHTML = ${JSON.stringify(getWordmarkSvgMarkup({ fill: themeTokens.wordmarkFill }))};
        }
        normalizeAnchorTargets();

        const UNDER_CONSTRUCTION_ROUTE = "/under-construction";
        const PRODUCT_ROUTE_OVERRIDES = new Map([
          ["Renewable Energy Dashboard", "/renewable-energy-dashboard"],
          ["Pump Efficiency Calculator", "/pump-efficiency-calculator"],
          ["Autonomous Teaching Assistant", "/autonomous-teaching-assistant"]
        ]);

        const applyDropdownLinkRoutes = (scope = document) => {
          const links = Array.from(scope.querySelectorAll(".nav_dropdown_component .nav_dropdown_link[href]"));
          links.forEach((link) => {
            if (!(link instanceof HTMLAnchorElement)) {
              return;
            }
            const label =
              link.querySelector(".nav_dropdown_text")?.textContent?.trim() ??
              link.textContent?.trim() ??
              "";
            const navItem = link.closest(".nav_links_item.is-desktop");
            const navLabel =
              navItem
                ?.querySelector(".w-dropdown-toggle .nav_links_text.is-desktop")
                ?.textContent?.trim() ?? "";
            const useProductOverride = navLabel === "Products" && PRODUCT_ROUTE_OVERRIDES.has(label);
            const nextHref = useProductOverride
              ? (PRODUCT_ROUTE_OVERRIDES.get(label) ?? UNDER_CONSTRUCTION_ROUTE)
              : UNDER_CONSTRUCTION_ROUTE;
            link.setAttribute("href", nextHref);
            link.setAttribute("target", "_top");
          });
        };

        const desktopNavList = document.querySelector(".nav_links_wrap.w-list-unstyled.is-desktop");
        if (desktopNavList) {
          const navItems = Array.from(desktopNavList.querySelectorAll(":scope > .nav_links_item.is-desktop"));
          const preservedItems = navItems.filter((item) => item.querySelector(".nav_btn_combo_wrap"));
          const dropdownTemplate =
            navItems
              .map((item) => item.querySelector(".nav_dropdown_component.w-dropdown"))
              .find((dropdown) => {
                const label = dropdown?.querySelector(".nav_links_text.is-desktop")?.textContent?.trim();
                return label === "Commitments";
              }) ??
            navItems.map((item) => item.querySelector(".nav_dropdown_component.w-dropdown")).find(Boolean);

          if (dropdownTemplate) {
            navItems.forEach((item) => item.remove());
            ["Products", "Services", "Pricing", "About Us"].forEach((label) => {
              const item = document.createElement("li");
              item.className = "nav_links_item is-desktop";
              if (label === "Pricing") {
                const pricingLink = document.createElement("a");
                pricingLink.className = "nav_links_link is-desktop w-inline-block";
                pricingLink.href = UNDER_CONSTRUCTION_ROUTE;
                pricingLink.setAttribute("target", "_top");
                const text = document.createElement("div");
                text.className = "nav_links_text is-desktop";
                text.textContent = label;
                pricingLink.appendChild(text);
                item.appendChild(pricingLink);
                desktopNavList.appendChild(item);
                return;
              }
              const dropdown = dropdownTemplate.cloneNode(true);
              if (!(dropdown instanceof HTMLElement)) {
                return;
              }
              dropdown.classList.remove("w--open", "open");

              const toggle = dropdown.querySelector(".w-dropdown-toggle");
              if (toggle) {
                toggle.classList.remove("w--open");
                toggle.setAttribute("aria-expanded", "false");
                const text = toggle.querySelector(".nav_links_text.is-desktop");
                if (text) {
                  text.textContent = label;
                }
              }

              const panel = dropdown.querySelector(".w-dropdown-list");
              if (panel) {
                panel.classList.remove("w--open", "open");
                if (label === "Products") {
                  const sectionHeading = panel.querySelector(
                    ".nav_dropdown_main_scroll .u-detail-s.u-weight-medium.u-mb-text.u-color-faded"
                  );
                  if (sectionHeading) {
                    sectionHeading.textContent = "Apps";
                  }
                  const firstItemText = panel.querySelector(".nav_dropdown_list .nav_dropdown_item .nav_dropdown_text");
                  if (firstItemText) {
                    firstItemText.textContent = "Betroth";
                  }
                  const dropdownTexts = panel.querySelectorAll(".nav_dropdown_list .nav_dropdown_item .nav_dropdown_text");
                  const secondItemText = dropdownTexts[1];
                  if (secondItemText) {
                    secondItemText.textContent = "Renewable Energy Dashboard";
                  }
                  const thirdItemText = dropdownTexts[2];
                  if (thirdItemText) {
                    thirdItemText.textContent = "Pump Efficiency Calculator";
                  }
                  const trustCenterBlocks = panel.querySelectorAll(".nav_dropdown_link_block");
                  trustCenterBlocks.forEach((block) => block.remove());
                  const ataList = panel.querySelector(".nav_dropdown_list");
                  if (ataList) {
                    const ataLi = document.createElement("li");
                    ataLi.className = "nav_dropdown_item";
                    const ataA = document.createElement("a");
                    ataA.className = "nav_dropdown_link w-inline-block is-desktop";
                    ataA.href = "#";
                    const ataTxt = document.createElement("div");
                    ataTxt.className = "nav_dropdown_text";
                    ataTxt.textContent = "Autonomous Teaching Assistant";
                    ataA.appendChild(ataTxt);
                    ataLi.appendChild(ataA);
                    ataList.appendChild(ataLi);
                  }
                } else if (label === "Services") {
                  const sectionHeadings = panel.querySelectorAll(
                    ".nav_dropdown_main_scroll .u-detail-s.u-weight-medium.u-mb-text.u-color-faded"
                  );
                  const primaryHeading = sectionHeadings[0];
                  if (primaryHeading) {
                    primaryHeading.textContent = "AI";
                  }
                  const secondaryHeading = sectionHeadings[1];
                  if (secondaryHeading) {
                    secondaryHeading.textContent = "Production";
                  }

                  const dropdownTexts = panel.querySelectorAll(".nav_dropdown_list .nav_dropdown_item .nav_dropdown_text");
                  const firstItemText = dropdownTexts[0];
                  if (firstItemText) {
                    firstItemText.textContent = "Agent Implementation";
                  }
                  const secondItemText = dropdownTexts[1];
                  if (secondItemText) {
                    secondItemText.textContent = "Automations";
                  }
                  const thirdItemText = dropdownTexts[2];
                  if (thirdItemText) {
                    thirdItemText.textContent = "Web applications";
                  }
                  const fourthItemText = dropdownTexts[3];
                  if (fourthItemText) {
                    fourthItemText.textContent = "Production Monitoring";
                  }

                  const dropdownLists = panel.querySelectorAll(".nav_dropdown_list");
                  const applicationsList = dropdownLists[1];
                  if (applicationsList) {
                    ["Predictive Maintenance", "Process Optimization"].forEach((textValue) => {
                      const listItem = document.createElement("li");
                      listItem.className = "nav_dropdown_item";
                      const link = document.createElement("a");
                      link.className = "nav_dropdown_link w-inline-block is-desktop";
                      link.href = "#";
                      const text = document.createElement("div");
                      text.className = "nav_dropdown_text";
                      text.textContent = textValue;
                      link.appendChild(text);
                      listItem.appendChild(link);
                      applicationsList.appendChild(listItem);
                    });
                  }
                }
              }

              item.appendChild(dropdown);
              desktopNavList.appendChild(item);
            });
            preservedItems.forEach((item) => desktopNavList.appendChild(item));

            const tryAgenficSectionHeadings = desktopNavList.querySelectorAll(
              ".nav_btn_combo_wrap .nav_dropdown_main_scroll .u-detail-s.u-weight-medium.u-mb-text.u-color-faded"
            );
            tryAgenficSectionHeadings.forEach((heading) => {
              const value = heading.textContent?.trim();
              if (value === "Products") {
                heading.textContent = "Support";
              } else if (value === "Models") {
                heading.textContent = "Products";
              } else if (value === "Log in") {
                heading.textContent = "Services";
              }
            });

            const comboRenameMap = new Map([
              ["Opus", "Betroth"],
              ["Sonnet", "Renewable Energy Dashboard"],
              ["Haiku", "Pump Efficiency Calculator"],
              ["Agenfic.ai", "Artificial Intelligence"],
              ["Agenfic Console", "Production"]
            ]);
            const comboRemoveLabels = new Set(["Agenfic Code", "Agenfic Developer Platform", "Pricing"]);
            const comboItems = desktopNavList.querySelectorAll(".nav_btn_combo_wrap .nav_dropdown_item");
            comboItems.forEach((item) => {
              if (!(item instanceof HTMLElement)) {
                return;
              }
              const textElement = item.querySelector(".nav_dropdown_text");
              const label = textElement?.textContent?.trim();
              if (!label) {
                return;
              }
              if (comboRemoveLabels.has(label)) {
                item.remove();
                return;
              }
              const nextLabel = comboRenameMap.get(label);
              if (nextLabel && textElement) {
                textElement.textContent = nextLabel;
              }
            });
          }
        }

        applyDropdownLinkRoutes();

        const navRoot = document.querySelector(".nav_wrap");
        const navActionsWrap = document.querySelector(".nav_actions_wrap");
        const isMobileViewport = () => window.matchMedia("(max-width: 1024px)").matches;

        let mobileMenuToggle = document.querySelector(".mobile-nav-toggle");
        let mobileMenuPanel = document.querySelector(".mobile-nav-panel");

        const setMobileMenuOpen = (open) => {
          if (!(navRoot instanceof HTMLElement) || !(mobileMenuToggle instanceof HTMLElement) || !(mobileMenuPanel instanceof HTMLElement)) {
            return;
          }
          navRoot.classList.toggle("mobile-menu-open", open);
          mobileMenuPanel.classList.toggle("open", open);
          mobileMenuToggle.setAttribute("aria-expanded", open ? "true" : "false");
          requestAnimationFrame(syncFrameHeight);
        };

        const closeMobileMenu = () => {
          setMobileMenuOpen(false);
        };

        if (navRoot instanceof HTMLElement && navActionsWrap instanceof HTMLElement) {
          if (!(mobileMenuToggle instanceof HTMLElement)) {
            mobileMenuToggle = document.createElement("button");
            mobileMenuToggle.type = "button";
            mobileMenuToggle.className =
              "button button-compact button-primary call-to-action--nav menu-toggle mobile-nav-toggle";
            mobileMenuToggle.setAttribute("aria-haspopup", "false");
            mobileMenuToggle.setAttribute("aria-expanded", "false");
            mobileMenuToggle.textContent = "menu";
            navActionsWrap.appendChild(mobileMenuToggle);
          }

          if (!(mobileMenuPanel instanceof HTMLElement)) {
            mobileMenuPanel = document.createElement("div");
            mobileMenuPanel.className = "mobile-nav-panel";

            [
              { label: "Products", href: "#" },
              { label: "Services", href: "#" },
              { label: "About Us", href: "#" },
              { label: "Contact Us", href: "#", cta: true }
            ].forEach((entry) => {
              const link = document.createElement("a");
              link.className = entry.cta ? "mobile-nav-link is-cta" : "mobile-nav-link";
              link.href = entry.href;
              link.textContent = entry.label;
              link.addEventListener("click", () => closeMobileMenu());
              mobileMenuPanel.appendChild(link);
            });

            navRoot.appendChild(mobileMenuPanel);
            normalizeAnchorTargets(mobileMenuPanel);
          }

          mobileMenuToggle.addEventListener("click", () => {
            const open = mobileMenuToggle.getAttribute("aria-expanded") === "true";
            setMobileMenuOpen(!open);
          });
        }

        const dropdowns = Array.from(document.querySelectorAll(".nav_dropdown_component.w-dropdown"));
        const clearCloseTimer = (dropdown) => {
          const timer = closeTimers.get(dropdown);
          if (timer) {
            window.clearTimeout(timer);
            closeTimers.delete(dropdown);
          }
        };

        const setDropdownOpenState = (dropdown, open) => {
          const toggle = dropdown.querySelector(".w-dropdown-toggle");
          const panel = dropdown.querySelector(".w-dropdown-list");
          dropdown.classList.toggle("w--open", open);
          dropdown.classList.toggle("open", open);
          if (toggle) {
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
            toggle.classList.toggle("w--open", open);
          }
          if (panel) {
            panel.classList.toggle("w--open", open);
            panel.classList.toggle("open", open);
          }
        };

        const closeDropdown = (dropdown) => {
          clearCloseTimer(dropdown);
          const toggle = dropdown.querySelector(".w-dropdown-toggle");
          setDropdownOpenState(dropdown, false);
          if (toggle) {
            toggle.setAttribute("aria-expanded", "false");
          }
          requestAnimationFrame(syncFrameHeight);
        };

        const closeAll = (except) => {
          dropdowns.forEach((dropdown) => {
            if (dropdown !== except) {
              closeDropdown(dropdown);
            }
          });
        };

        const openDropdown = (dropdown) => {
          clearCloseTimer(dropdown);
          closeMobileMenu();
          closeAll(dropdown);
          // Expand early so pointer can enter the menu without crossing a clipped iframe edge.
          setFrameHeight(getMaxFrameHeight());
          setDropdownOpenState(dropdown, true);
          requestAnimationFrame(syncFrameHeight);
        };

        const scheduleClose = (dropdown) => {
          clearCloseTimer(dropdown);
          const timer = window.setTimeout(() => {
            setDropdownOpenState(dropdown, false);
            syncFrameHeight();
            closeTimers.delete(dropdown);
          }, CLOSE_DELAY_MS);
          closeTimers.set(dropdown, timer);
        };

        const isDropdownOpen = (dropdown) => {
          const toggle = dropdown.querySelector(".w-dropdown-toggle");
          return toggle ? toggle.getAttribute("aria-expanded") === "true" : dropdown.classList.contains("w--open");
        };

        const maybeCloseAll = () => {
          const hasOpen = dropdowns.some((dropdown) => isDropdownOpen(dropdown));
          if (!hasOpen) {
            syncFrameHeight();
          }
        };

        const closeAllWithSync = () => {
          closeAll();
          requestAnimationFrame(syncFrameHeight);
        };

        const onEscape = (event) => {
          if (event.key !== "Escape") {
            return;
          }
          closeAllWithSync();
          closeMobileMenu();
        };

        document.addEventListener("keydown", onEscape);

        dropdowns.forEach((dropdown) => {
          const panel = dropdown.querySelector(".w-dropdown-list");
          if (panel) {
            panel.addEventListener("mouseenter", () => clearCloseTimer(dropdown));
            panel.addEventListener("mouseleave", () => scheduleClose(dropdown));
          }
        });

        dropdowns.forEach((dropdown) => {
          const toggle = dropdown.querySelector(".w-dropdown-toggle");
          if (!toggle) {
            return;
          }
          if (!toggle.hasAttribute("tabindex")) {
            toggle.setAttribute("tabindex", "0");
          }
          if (!toggle.hasAttribute("role")) {
            toggle.setAttribute("role", "button");
          }
          toggle.setAttribute("aria-haspopup", "menu");
          toggle.setAttribute("aria-expanded", "false");

          dropdown.addEventListener("mouseenter", () => openDropdown(dropdown));
          dropdown.addEventListener("mouseleave", () => {
            scheduleClose(dropdown);
            maybeCloseAll();
          });
          dropdown.addEventListener("focusin", () => openDropdown(dropdown));
          dropdown.addEventListener("focusout", (event) => {
            const next = event.relatedTarget;
            if (next && dropdown.contains(next)) {
              return;
            }
            scheduleClose(dropdown);
            maybeCloseAll();
          });
          toggle.addEventListener("click", (event) => {
            event.preventDefault();
            const expanded = toggle.getAttribute("aria-expanded") === "true";
            if (expanded) {
              closeDropdown(dropdown);
            } else {
              openDropdown(dropdown);
            }
          });
          toggle.addEventListener("keydown", (event) => {
            if (event.key !== "Enter" && event.key !== " ") {
              return;
            }
            event.preventDefault();
            const expanded = toggle.getAttribute("aria-expanded") === "true";
            if (expanded) {
              closeDropdown(dropdown);
            } else {
              openDropdown(dropdown);
            }
          });
        });

        document.addEventListener("mousedown", (event) => {
          const target = event.target;
          if (navRoot && target instanceof Node && navRoot.contains(target)) {
            return;
          }
          closeAllWithSync();
          closeMobileMenu();
        });

        const getNavigationAnchor = (target) => {
          if (!(target instanceof Element)) {
            return null;
          }
          const directAnchor = target.closest("a[href]");
          if (directAnchor instanceof HTMLAnchorElement) {
            return directAnchor;
          }
          const clickableButton = target.closest(".g_clickable_btn");
          if (!(clickableButton instanceof HTMLElement)) {
            return null;
          }
          const wrapper = clickableButton.closest(".g_clickable_wrap");
          if (!(wrapper instanceof HTMLElement)) {
            return null;
          }
          const wrappedAnchor = wrapper.querySelector("a[href]");
          return wrappedAnchor instanceof HTMLAnchorElement ? wrappedAnchor : null;
        };

        document.addEventListener(
          "click",
          (event) => {
            const link = getNavigationAnchor(event.target);
            if (!(link instanceof HTMLAnchorElement)) {
              return;
            }

            if (link.classList.contains("mobile-nav-link")) {
              event.preventDefault();
              closeAllWithSync();
              closeMobileMenu();
              return;
            }

            const href = link.getAttribute("href");
            if (!shouldRouteToTop(href)) {
              return;
            }
            const targetValue = (link.getAttribute("target") || "").toLowerCase();
            if (targetValue && targetValue !== "_self" && targetValue !== "_top") {
              return;
            }

            event.preventDefault();
            event.stopPropagation();
            if (typeof event.stopImmediatePropagation === "function") {
              event.stopImmediatePropagation();
            }

            closeAllWithSync();
            closeMobileMenu();
            if (window.top && window.top !== window) {
              window.top.location.assign(link.href);
              return;
            }
            window.location.assign(link.href);
          },
          true
        );

        window.addEventListener("resize", () => {
          if (!isMobileViewport()) {
            closeMobileMenu();
          }
          requestAnimationFrame(syncFrameHeight);
        });
        setFrameHeight(getBaseFrameHeight());
        requestAnimationFrame(syncFrameHeight);
      })();
    <\/script>
  </body>
</html>`;
};

export const NAVIGATION_BANNER_IFRAME_HTML = getNavigationBannerIframeHtml("light");

export const getPreferredTheme = (): LandingTheme => {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem(HOME_THEME_STORAGE_KEY);
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export default function LandingHero() {
  const heroVideoWrapperRef = useRef<HTMLDivElement>(null);
  const mainParticlesContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastScrollYRef = useRef(0);
  const [theme, setTheme] = useState<LandingTheme>("light");
  const [bannerMounted, setBannerMounted] = useState(false);
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [typedEmphasis, setTypedEmphasis] = useState("");
  const [isSubcopyVisible, setIsSubcopyVisible] = useState(false);

  useEffect(() => {
    setTheme(getPreferredTheme());
    setBannerMounted(true);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_LAYOUT_QUERY);
    const syncMobileLayout = () => {
      setIsMobileLayout(mediaQuery.matches);
    };

    syncMobileLayout();
    mediaQuery.addEventListener("change", syncMobileLayout);

    return () => {
      mediaQuery.removeEventListener("change", syncMobileLayout);
    };
  }, []);

  useEffect(() => {
    if (!bannerMounted) {
      return;
    }

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(HOME_THEME_STORAGE_KEY, theme);
  }, [bannerMounted, theme]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedEmphasis(HEADING_LINE_TWO_EMPHASIS);
      setIsSubcopyVisible(true);
      return;
    }

    setTypedEmphasis("");
    setIsSubcopyVisible(false);
    let index = 0;
    let interval: number | undefined;
    const startTimeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        index += 1;
        setTypedEmphasis(HEADING_LINE_TWO_EMPHASIS.slice(0, index));

        if (index >= HEADING_LINE_TWO_EMPHASIS.length) {
          window.clearInterval(interval);
          setIsSubcopyVisible(true);
        }
      }, 34);
    }, 220);

    return () => {
      window.clearTimeout(startTimeout);
      if (interval !== undefined) {
        window.clearInterval(interval);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = mainParticlesContainerRef.current;
    if (!canvas || !container) {
      return;
    }

    const controller = createHeroParticles({
      canvas,
      container,
      theme,
      interactive: true,
      groupScale: isMobileLayout ? 2.5 : 5,
      ringWidth: isMobileLayout ? 0.125 : 0.107,
      ringWidth2: isMobileLayout ? 0.06 : 0.05,
      particlesScale: isMobileLayout ? 1.35 : 0.75,
      minParticleScale: isMobileLayout ? 0.4 : 0,
      ringDisplacement: isMobileLayout ? 0.18 : 0.15,
      density: isMobileLayout ? 240 : 200
    });

    let isInView = true;
    let isDocumentVisible = !document.hidden;
    const syncAnimationState = () => {
      if (isInView && isDocumentVisible) {
        controller.resume();
      } else {
        controller.pause();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isInView = entry?.isIntersecting ?? false;
        syncAnimationState();
      },
      {
        threshold: 0.05
      }
    );

    observer.observe(container);

    const onVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
      syncAnimationState();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    syncAnimationState();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      controller.destroy();
    };
  }, [isMobileLayout, theme]);
  useEffect(() => {
    const heroVideoWrapper = heroVideoWrapperRef.current;
    if (!heroVideoWrapper) {
      return;
    }

    const onScroll = () => {
      const progress = Math.min(1, window.scrollY / (window.innerHeight * 0.6));
      heroVideoWrapper.style.opacity = String(1 - progress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 0);

      if (scrollY <= 0) {
        setNavVisible(true);
        lastScrollYRef.current = scrollY;
        return;
      }

      const delta = scrollY - lastScrollYRef.current;
      if (delta > 5) {
        setNavVisible(false);
      } else if (delta < -5) {
        setNavVisible(true);
      }

      if (Math.abs(delta) > 5) {
        lastScrollYRef.current = scrollY;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="main" data-theme={theme}>
      <section className="welcome-wrapper">
        <header className={["header", isScrolled ? "scrolled" : "", !navVisible ? "hidden" : ""].filter(Boolean).join(" ")}>
          <div className="agenfic-banner-frame-wrap">
            {bannerMounted ? (
              <iframe
                title="Agenfic Banner"
                className="agenfic-banner-frame"
                srcDoc={getNavigationBannerIframeHtml(theme)}
                scrolling="no"
              />
            ) : null}
          </div>
        </header>

        <div className="hero-video-wrapper" ref={heroVideoWrapperRef} style={{ opacity: 1 }}>
          <div style={{ opacity: 1 }}>
            {createElement(
              "landing-main-particles-component",
              { theme },
              <div className="main-particles-component-section">
                <div className="main-particles-container" ref={mainParticlesContainerRef}>
                  <canvas ref={canvasRef} data-engine="three.js r180" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="welcome-section">
          <div className="header-container">
            <h1 className="landing-main-header" aria-label={HEADING}>
              <span className="landing-main-line">{HEADING_LINE_ONE}</span>
              <span className="landing-main-line landing-main-line-secondary">
                <span>{HEADING_LINE_TWO_PREFIX}</span>
                <span className="landing-main-emphasis-wrap">
                  <span aria-hidden="true" className="landing-main-emphasis-placeholder">
                    {HEADING_LINE_TWO_EMPHASIS}
                  </span>
                  <span className="landing-main-emphasis-active">
                    <em>{typedEmphasis}</em>
                    <span aria-hidden="true" className="blinking-cursor landing-main-cursor">
                      |
                    </span>
                  </span>
                </span>
              </span>
            </h1>
            <p className={`landing-main-subcopy${isSubcopyVisible ? " is-visible" : ""}`}>{SUPPORTING_COPY}</p>
          </div>

          <div className="grid-row welcome-cta">
            <button type="button" className="button button-primary call-to-action explore-use-cases-button">
              Explore use cases
            </button>
            <button type="button" className="button button-secondary call-to-action">
              Contact Us
            </button>
          </div>

        </div>
      </section>

      <InterviewsGlobe />

      <div className="theme-switcher" role="group" aria-label="Color theme">
        <button
          type="button"
          className={`theme-switcher-button${theme === "light" ? " is-active" : ""}`}
          onClick={() => setTheme("light")}
          aria-pressed={theme === "light"}
          data-theme-option="light"
        >
          Light
        </button>
        <button
          type="button"
          className={`theme-switcher-button${theme === "dark" ? " is-active" : ""}`}
          onClick={() => setTheme("dark")}
          aria-pressed={theme === "dark"}
          data-theme-option="dark"
        >
          Dark
        </button>
      </div>
    </main>
  );
}

