import type { SVGProps } from "react";

const DEFAULT_FONT_FAMILY = "'Avenir Next', 'Helvetica Neue', 'Segoe UI', Arial, sans-serif";
const DEFAULT_FILL = "#181818";
const DEFAULT_WIDTH = 143;
const DEFAULT_HEIGHT = 16;

type WordmarkMarkupOptions = {
  fill?: string;
  width?: number;
  height?: number;
};

export const getWordmarkSvgMarkup = ({
  fill = DEFAULT_FILL,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT
}: WordmarkMarkupOptions = {}) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 143 16" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><text x="3" y="12.1" fill="${fill}" font-family="${DEFAULT_FONT_FAMILY}" font-size="15.2" font-weight="700" letter-spacing="1.15">AGENFIC</text></svg>`;
};

type WordmarkLogoProps = Omit<SVGProps<SVGSVGElement>, "viewBox"> & {
  fill?: string;
};

export default function WordmarkLogo({
  fill = DEFAULT_FILL,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  ...props
}: WordmarkLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 143 16"
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      {...props}
    >
      <text
        x="3"
        y="12.1"
        fill={fill}
        fontFamily={DEFAULT_FONT_FAMILY}
        fontSize="15.2"
        fontWeight="700"
        letterSpacing="1.15"
      >
        AGENFIC
      </text>
    </svg>
  );
}
