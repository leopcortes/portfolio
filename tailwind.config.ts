import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        abril_fatface: ["Abril Fatface", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        lexend: ["Lexend", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        texto_principal: "#e5f0ff",
        texto_secundario: "#8b97a7",
        verde_principal: "#12bf97",
        verde_hover: "#237b66",
        azul_principal: "#679fe4",
        fundo_azul_1: "#081426",
        fundo_azul_2: "#0a1d38",
        fundo_azul_3: "#0c2140",
        borda_azul_1: "#16294a",
        borda_azul_2: "#1d3a63",
        borda_azul_3: "#2a3f5f",
        trilha_azul_1: "#0e2244",
        trilha_azul_2: "#0b1c34",
        azul_acesso: "#2f4a70",
        amarelo_aviso: "#f5a524",
        vermelho_aviso: "#e5484d",
        calc_fundo: "#212121",
        calc_superficie: "#303030",
        calc_campo: "#262626",
        calc_acento: "#194b8c",
        calc_acento_hover: "#123a6e",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
