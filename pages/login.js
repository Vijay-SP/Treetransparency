import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import LoadingAnimation from "../components/misc/Loading.js";
import { useUserContext } from "../services/userContext";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import bgStyles from "../styles/bgStyles.module.css";
import Head from 'next/head';

const Container = tw.div`bg-transparent text-white font-medium flex justify-center sm:px-40 md:px-56 sm:py-16 `;
const Content = tw.div` bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.button`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-300 hocus:bg-primary-500 hocus:text-white hocus:border-gray-500 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-600 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-primary-700 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`w-full bg-contain bg-center bg-no-repeat`}
`;

export default function Login({
    illustrationImageSrc = "images/login/login-illustration.gif",
    headingText = "Login to Tree Transparency",
    socialButtons = [
        {
            iconImageSrc: "images/login/google-icon.png",
            text: "Sign In With Google",
            url: "https://google.com"
        }
    ],
    submitButtonText = "Sign In",

}) {  

    const {
        error, loading, user, readyToRedirect,
        loginWithGoogle, passwordLessLogin,
        handlePasswordlessRedirect,
        emailSent
    } = useUserContext();

    const [email, setEmail] = useState();

    const router = useRouter();

    const redirectUser = () => {
        const redirectLink = window.localStorage.getItem("redirectAfterLogin");
        window.localStorage.removeItem("redirectAfterLogin");
        if (redirectLink) {
            router.push(redirectLink);
        }
        else {
            router.push("/profile");
        }
    }

    useEffect(() => {

        user ? redirectUser() : null;

        if (window.location.href.includes("apiKey"))
            handlePasswordlessRedirect(window.location.href);

    }, [user]);

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            if (email) passwordLessLogin(email);
        } catch (err) {
            // console.log(err);
        }
    }

    return (
        <>
            <Head>
                <title>Login | Tree Transparency 2022-23</title>
                <link rel="icon" href="/favicon.ico" />

                {/* Meta tags */}
                <meta charset="UTF-8" />
              
            </Head>

            <div className={bgStyles.parent}>
                <div className={bgStyles.stars}></div>
                {/* Loading State before everything is ready */}
                {loading ? <LoadingAnimation styles={styles} /> :
                    <>
                        {
                            readyToRedirect ? redirectUser() :
                                <Container>
                                    <Content>
                                        <MainContainer>
                                            <LogoImage src="logo.png" />
                                            <MainContent>
                                                <Heading>{headingText}</Heading>
                                                <FormContainer>

                                                    <Form onSubmit={(e) => handleLogin(e)} validate={true}>

                                                        <Input
                                                            type="email"
                                                            placeholder="Email"
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            required={true}
                                                        />

                                                        {/* <Input
                                                        type="password"
                                                        placeholder="Password"
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required={true}
                                                    /> */}

                                                        <SubmitButton type="submit" disabled={emailSent}>
                                                            <span className="text">{submitButtonText}</span>
                                                        </SubmitButton>

                                                        {/* Show error if there is any */}
                                                        {error !== "" ?
                                                            <div className="my-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                                                                <strong className="font-bold">Error!</strong>
                                                                <span className="block sm:inline">{" " + error}</span>
                                                                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                                                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                                                                </span>
                                                            </div>
                                                            : <></>
                                                        }

                                                        {
                                                            emailSent ?
                                                                <div className="my-2 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                                                                    <div className="flex">
                                                                        <div className="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
                                                                        <div>
                                                                            <p className="font-bold">Email sent successfully!</p>
                                                                            <p className="text-sm">
                                                                                Login link sent to the above email address. Close this tab once you click that link.
                                                                                <br />
                                                                                (Check your <b>Promotions</b> or <b>Spam folder</b>)
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                :

                                                                <div className="my-2 bg-blue-100 rounded-lg border border-blue-500 text-blue-700 px-4 py-3" role="alert">
                                                                    <p className="font-bold">No need to create an account!</p>
                                                                    <p className="text-sm">We have already taken care of that for you. A login link would be sent to this email.</p>
                                                                </div>
                                                        }

                                                    </Form>

                                                    <DividerTextContainer></DividerTextContainer>

                                                    <SocialButtonsContainer>
                                                        {socialButtons.map((socialButton, index) => (
                                                            <SocialButton key={index} onClick={() => loginWithGoogle()}>
                                                                <span className="iconContainer">
                                                                    <img src={socialButton.iconImageSrc} className="icon" alt="" />
                                                                </span>
                                                                <span className="text">{socialButton.text}</span>
                                                            </SocialButton>
                                                        ))}
                                                    </SocialButtonsContainer>



                                                    {/* <p tw="mt-6 text-xs text-gray-600 text-center">

                                                    <a href={forgotPasswordUrl} tw="border-b border-gray-500 border-dotted">
                                                        Forgot Password ?
                                                    </a>
                                                </p> */}

                                                    {/* <p tw="mt-8 text-sm text-gray-600 text-center">
                                                    Dont have an account?{" "}
                                                    <a href={signupUrl} tw="border-b border-gray-500 border-dotted">
                                                        Sign Up
                                                    </a>
                                                </p> */}

                                                </FormContainer>
                                            </MainContent>
                                        </MainContainer >
                                        <IllustrationContainer style={{ backgroundColor: "#3A4FAB" }}>
                                            <IllustrationImage imageSrc={illustrationImageSrc} />
                                        </IllustrationContainer>
                                    </Content >
                                </Container >
                        }
                    </>
                }
            </div>
        </>
    );
}
