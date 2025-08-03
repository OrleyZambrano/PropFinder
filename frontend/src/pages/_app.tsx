import * as React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AuthProvider } from "../context/AuthContext";
import theme from "../styles/theme";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: any) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}
