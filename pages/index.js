import React from 'react';
import tw from "twin.macro";
import styles from "./index.module.css";
import Section1 from "../components/sections/section1.js";
import Section2 from "../components/sections/section2.js";
import Section3 from "../components/sections/section3.js";
import Section4 from "../components/sections/section4.js";
import Section5 from "../components/sections/section5.js";
import Events from "../components/sections/events.js";


import bgStyles from "../styles/bgStyles.module.css";

import Head from 'next/head';

export default function index() {
  const Heading = tw.span`uppercase text-2xl text-blue-600`;
  const Subheading = tw.span`uppercase text-4xl tracking-widest font-bold text-white`;
  const HighlightedText = tw.span`text-blue-500`;

   
  return (
    <>


      <Head>
        <title>Tree Transparency</title>
        <link rel="icon" href="/favicon.ico" />

        {/* Meta tags */}
        <meta charset="UTF-8" />
       
      </Head>




      <div className="bg-transparent">

        <Section1 styles={styles} bgStyles={bgStyles} subheading={<Heading>A WEB 3.0 PLATFORM FOR MAINTAINING TREE TRANSPARENCY</Heading>}
          heading={
            <>
              TREE<HighlightedText>TRANSPARENCY</HighlightedText>
            </>
          }
          description={""} />

       


       
      </div>

    </>
  );
}
