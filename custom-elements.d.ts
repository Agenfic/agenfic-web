import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "agenfic-logo": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
