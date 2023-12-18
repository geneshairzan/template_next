import ThemeProvider from "@/component/context/theme";

export default function App({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
