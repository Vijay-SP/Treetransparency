import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Image from 'next/image';
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "../misc/Headings.js";
import APJ_Image from "../../static/images/APJ_Abdul_Kalam.png";

const Container = tw.div`relative bg-transparent py-8`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24 items-center`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-6/12 flex-shrink-0 relative rounded-md`;
const TextColumn = styled(Column)(props => [
    tw`md:w-6/12 mt-16 md:mt-0`,
    props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left text-xl`;
const Heading = tw(
    SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const PrimaryButton = tw.button`mt-8 md:mt-8 text-sm inline-block mx-auto md:mx-0 px-8 py-3 font-bold rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300`;

export default function Section4({
    heading = (
        <>
            <span tw="text-white"> Dr. A. P. J. Abdul Kalam  </span>
        </>
    ),
    description = "''I am indeed delighted to address and interact with the students and faculty members of Veermata Jijabai Technological Institute (VJTI) at Mumbai. My greetings to the Principal, Faculty Members, Staff, Students and distinguished guests. From my study of the website, I found that the institute has a vision to establish global leadership in...",
    primaryButtonText = "Complete Speech",
    primaryButtonUrl = "https://vjtitechnovanza.wordpress.com/2015/10/14/dr-apj-abdul-kalams-speech-at-vjti-technovanza",
    imageSrc = APJ_Image,
    buttonRounded = true,
    imageRounded = true,
    imageBorder = false,
    imageShadow = false,
    textOnLeft = false,
    bgStyles=null
}) {
    // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

    return (
        <div className={bgStyles.parent}>
            <div className={bgStyles.stars}></div>
        <Container>
            <TwoColumn>
                <ImageColumn>
                    <Image src={imageSrc} imageBorder={imageBorder} imageShadow={imageShadow} imageRounded={imageRounded} />
                </ImageColumn>
                <TextColumn textOnLeft={textOnLeft}>
                    <TextContent>
                        <Heading>{heading}</Heading>
                        <Subheading>At Technovanza</Subheading>
                        <Description>{description}</Description>
                        <PrimaryButton buttonRounded={buttonRounded} as="a" target="_blank" href={primaryButtonUrl}>
                            {primaryButtonText}
                        </PrimaryButton>
                    </TextContent>
                </TextColumn>
            </TwoColumn>
        </Container>
        </div>
    );
};
