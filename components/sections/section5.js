import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "../misc/Headings.js";
import Sophia from "../../static/images/sophia.webp";

const Container = tw.div`relative bg-transparent py-8`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto  items-center py-10`;
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

export default ({
    heading = (
        <>
            <span tw="text-white"> Sophia: The Social Humanoid  </span>
        </>
    ),
    description = "ft. Poet Moira R, Standup Comedian Raunaq Rajani and Dancer Akshat Singh",
    textOnLeft = true,
    bgStyles = null
}) => {
    // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

    return (
        <div className={bgStyles.parent}>
            <div className={bgStyles.stars}></div>
            <Container>
                <TwoColumn>
                    <ImageColumn>
                        <iframe className={bgStyles.youtube} src="https://www.youtube.com/embed/_7wdKqGzFx8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </ImageColumn>
                    <TextColumn textOnLeft={textOnLeft}>
                        <TextContent>
                            <Heading>{heading}</Heading>
                            <Subheading>At Technovanza</Subheading>
                            <Description>{description}</Description>
                        </TextContent>
                    </TextColumn>
                </TwoColumn>
            </Container>
        </div>
    );
};
