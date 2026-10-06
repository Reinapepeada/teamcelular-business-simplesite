import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import animate from "tailwindcss-animate";

// ESM puro: con require() Node 24 carga este .ts como ESM y `next dev` falla
// con "require is not defined".

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Sistema "teatro negro" (ver DESIGN.md): los neutros oscuros de slate se
      // remapean a la escala Apple para que todas las paginas con dark: hereden
      // el canvas negro sin tocar cada archivo.
      colors: {
        // Tokens que antes ponia el plugin de NextUI, con sus valores del tema
        // oscuro (el sitio fuerza dark): se usan en todo el sitio.
        primary: "#1a6dff",
        secondary: "#6aa6ff",
        background: "#000000",
        foreground: "#ecedee",
        success: "#17c964",
        warning: "#f5a524",
        default: { 200: "#3f3f46" },
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
    animate,
    addVariablesForColors,
  ],
};
type Palette = { [key: string]: string | Palette };

// Igual que tailwindcss/lib/util/flattenColorPalette: { slate: { 700 } } -> "slate-700".
function flattenColorPalette(palette: Palette, prefix = ""): Record<string, string> {
  return Object.assign(
    {},
    ...Object.entries(palette).map(([key, value]) => {
      const name = key === "DEFAULT" ? prefix : prefix ? `${prefix}-${key}` : key;
      return typeof value === "string" ? { [name]: value } : flattenColorPalette(value, name);
    }),
  );
}

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
