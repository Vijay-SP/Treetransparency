import React,{useEffect} from "react";
import 'tailwindcss/tailwind.css';
import NavBar from "../components/navbar/nav.js";
import Footer from "../components/footers/MiniCenteredFooter.js";
import { UserContextProvider } from "../services/userContext.js";
import '../styles/globals.css';
import { abi } from "../services/transactweb3.js";
import Web3 from "web3";

export default function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   connect()
  // }, [])
  


// window.onload=function(){
//     connect();
// } 
// window.addEventListener('load', async () => {
    // New web3 provider
//     connect();
//     console.log("Externally Loaded!");
// });
  return (
    <UserContextProvider>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </UserContextProvider>
  );
}