import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");

const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Sistema "teatro negro" (ver DESIGN.md): los neutros oscuros de slate se
      // remapean a la escala Apple para que todas las paginas con dark: hereden
      // el canvas negro sin tocar cada archivo.
      colors: {
        slate: {
          ...colors.slate,
          700: "#424245",
          800: "#333336",
          900: "#1d1d1f",
          950: "#000000",
        },
        // Verde calido para WhatsApp/estado (el emerald de Tailwind es frio).
        emerald: {
          ...colors.emerald,
          400: "#4cd964",
          500: "#34c759",
          600: "#248a3d",
          700: "#1f7a35",
        },
        tc: {
          action: "#1a6dff",
          "action-hover": "#3d84ff",
          link: "#6aa6ff",
          silk: "#f5f5f7",
          ash: "#86868b",
          charcoal: "#1d1d1f",
          smoke: "#333336",
          graphite: "#424245",
        },
      },
      borderRadius: {
        card: "28px",
      },
      screens: {
        nav: "1265px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: "#2d2e83",
            secondary: "#0e7490",
          },
        },
        dark: {
          colors: {
            primary: "#1a6dff",
            secondary: "#6aa6ff",
          },
        },
      },
    }),
    addVariablesForColors,
  ],
};
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}
export default config;
