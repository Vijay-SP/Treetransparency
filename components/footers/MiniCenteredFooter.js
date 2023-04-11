import React from "react";
import tw from "twin.macro";
import Image from "next/image";
import logo from "../../static/images/logo.png"

const Container = tw.div`relative bg-gray-900 text-gray-400`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const Row = tw.div`flex items-center justify-center flex-col px-8`

const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;
const LogoImg = tw.div`w-8`;
const LogoText = tw.h5`ml-2 text-2xl font-black tracking-wider`;

const LinksContainer = tw.div`mt-8 font-medium flex flex-wrap justify-center items-center flex-col sm:flex-row`
const Link = tw.a`border-b-2 border-transparent hocus:text-gray-300 hocus:border-gray-300 pb-1 transition duration-300 mt-2 mx-4`;


const CopyrightText = tw.p`text-center mt-10 font-medium tracking-wide text-sm text-gray-600`

export default function Footer() {
  return (
    <Container>
      <Content>
        <Row>

          <LinksContainer>
            <Link href="/">
              <LogoContainer>
                <LogoImg> <Image src={logo} /> </LogoImg>
                <LogoText>Tree Transparency</LogoText>
              </LogoContainer>
            </Link>
          </LinksContainer>

          <LinksContainer>
            <Link href="/">Home</Link>
            <Link href="/tree-adopt">Adopt Trees</Link>
            <Link href="/pay">Donate NGO</Link>
            <Link href="/login">Login/Signup</Link>
          </LinksContainer>

         
          <CopyrightText>
            &copy; Copyright 2022, Tree Transparency. All Rights Reserved.
          </CopyrightText>
          
        </Row>
      </Content>
    </Container>
  );
};