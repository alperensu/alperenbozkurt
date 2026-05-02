import React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "iconify-icon": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          icon?: string;
          width?: string;
          height?: string;
          inline?: boolean;
          mode?: string;
          flip?: string;
          rotate?: string;
        },
        HTMLElement
      >;
    }
  }
}
