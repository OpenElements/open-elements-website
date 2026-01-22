/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
export default {
  // variants: {
  //   extend: {
  //     opacity: ['hover', 'active']
  //   },
  //   plugins: [
  //     hoveredParentPlugin,
  //     focusedWithinParentPlugin,
  //   ]
  // },
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "content/**/*.md", 
    "layouts/**/*.html"
  ],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1280px",
      // => @media (min-width: 1536px) { ... }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        md: "3rem",
        xl: "4rem",
        "2xl": "7rem",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      gray: "#F8F8F8",
      slate: "#EBEBEE",
      blue: "#020144",
      green: {
        50: "#5CBA9E1F",
        DEFAULT: "#5CBA9E",
        100: "#DEF1EC",
        200: "#BEE3D8",
        300: "#53a78e",
      },
      rose: {
        DEFAULT: "#E63277",
        100: "#FAD6E4",
      },
      sky: {
        DEFAULT: "#5DB9F5",
        100: "#DFF1FD",
        200: "#54a7dd",
      },
      yellow: {
        DEFAULT: "#F1E34B",
        50: "#FCF9DB",
        100: "#FCF9DB",
        200: "#CDC13B",
        300: "#E6D73D",
        400: "#cfc237",
      },
      purple: {
        DEFAULT: "#9492FD",
        100: "#D4D4FE",
        200: "#F1F1FF",
        700: "#7573FF",
      },
      lightgray: "#D3D3D3",
    },
    extend: {
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      dropShadow: {
        card: "0px 0px 24px rgba(190, 227, 216, 0.6)",
      },
      boxShadow: {
        3: "2px 4px 22px rgba(117, 115, 255, 0.64)",
        4: "0px 0px 24px rgba(190, 227, 216, 0.6)",
        5: "0px 4px 20px 0px rgba(117, 115, 255, 0.22)",
        6: "2px 4px 22px 0px rgba(205, 193, 59, 0.60)",
        7: "2px 4px 22px 0px rgba(92, 186, 158, 0.60)",
        8: "2px 4px 22px 0px rgba(93, 185, 245, 0.60)",
        9: "2px 4px 12px 0px rgba(92, 186, 158, 0.70)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar"),
  ],
};

const plugin = require("tailwindcss/plugin");

const hoveredParentPlugin = plugin(function ({ addVariant, e }) {
  addVariant("hovered-parent", ({ container }) => {
    container.walkRules((rule) => {
      rule.selector = `:hover > .hovered-parent\\:${rule.selector.slice(1)}`;
    });
  });
});

const focusedWithinParentPlugin = plugin(function ({ addVariant, e }) {
  addVariant("focused-within-parent", ({ container }) => {
    container.walkRules((rule) => {
      rule.selector = `:focus-within > .focused-within-parent\\:${rule.selector.slice(
        1
      )}`;
    });
  });
});
