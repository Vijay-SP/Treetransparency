import React from "react";
import 'tailwindcss/tailwind.css';
import NavBar from "../components/navbar/nav.js";
import Footer from "../components/footers/MiniCenteredFooter.js";
import { UserContextProvider } from "../services/userContext.js";
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </UserContextProvider>
  );
}