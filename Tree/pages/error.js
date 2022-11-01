import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { useRouter } from "next/router";
import Head from 'next/head';
import bgStyles from "../styles/bgStyles.module.css";

const Container = tw.div`bg-transparent text-white font-medium flex justify-center sm:px-40 md:px-56 sm:py-16 `;
const Content = tw.div` bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-center text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-white text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`w-full bg-contain bg-center bg-no-repeat`}
`;

export default function Error({
    logoLinkUrl = "/",
    illustrationImageSrc = "https://cdn.dribbble.com/users/2647375/screenshots/13849374/media/f5b6e11016aa2ebece8ed05f49fb8e7f.gif",
}) {

    const router = useRouter();

    const redirectToLogin = () => {
        return router.back()
    }

    return (
        <>
            <Head>
                <title>Error | Tree Transparency 2021-22</title>
                <link rel="icon" href="/favicon.ico" />

                {/* Meta tags */}
                <meta charset="UTF-8" />
               </Head>

            <div className={bgStyles.parent}>
                <div className={bgStyles.stars}></div>
                <Container>
                    <Content>
                        <MainContainer>
                            <LogoLink href={logoLinkUrl}>
                                <LogoImage src="" />
                            </LogoLink>
                            <MainContent>
                                <Heading>Oops!<br />Something went wrong.</Heading>
                                <FormContainer>

                                    <SubmitButton type="button" onClick={() => redirectToLogin()}>
                                        <span className="text">Try Again</span>
                                    </SubmitButton>

                                </FormContainer>
                            </MainContent>
                        </MainContainer >
                        <IllustrationContainer style={{ backgroundColor: "#89D3C6" }}>
                            <IllustrationImage imageSrc={illustrationImageSrc} />
                        </IllustrationContainer>
                    </Content>
                </Container>
            </div>
        </>
    );
}
