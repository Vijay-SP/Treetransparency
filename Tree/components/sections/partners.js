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
)`mt-4 font-black text-3xl sm:text-4xl lg:text-5xl text-center leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

export default function Partners({
    bgStyles = null
}) {
    // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

    return (
        <div className={bgStyles.parent}>
            <div className={bgStyles.stars}></div>
            <Heading>Partners</Heading>
            <Container>
                <div className="py-8 px-4">
                    <div className="flex flex-wrap mx-4 mb-8">

                        <div className="md:w-1/2 md:px-20 pb-10 ">
                            <a className="flex items-center justify-center" target="_blank" rel="noopener noreferrer" href="https://www.hindustanpetroleum.com/">
                                <img className="hp-logo object-contain shadow-md" src="/images/partners/hp.png" alt="hp-partner" />
                            </a>
                        </div>

                        <div className="md:w-1/2 md:px-20 pb-10">
                            <a className="flex items-center justify-center" target="_blank" rel="noopener noreferrer" href="https://vjti-tbi.in/">
                                <img className="object-contain shadow-md" src="/images/partners/vjti_tbi.jpeg" alt="vjti-tbi" />
                            </a>
                        </div>

                        {/* <div className="md:w-1/2 md:px-20 pb-10 mb-15">
                            <a className="flex items-center justify-center" target="_blank" rel="noopener noreferrer" href="https://rigbetellabs.com/">
                                <img className="object-contain shadow-md" src="/images/partners/rigbetel_labs.png" alt="" />
                            </a>
                        </div> */}

                        <div className="md:w-1/2 md:px-20 py-10">
                            <a className="flex items-center justify-center" target="_blank" rel="noopener noreferrer" href="https://gdsc.community.dev/veermata-jijabai-technological-institute-vjti-mumbai/">
                                <img className="object-contain shadow-md" src="/images/partners/gdsc_vjti.png" alt="" />
                            </a>
                        </div>

                        <div className="md:w-1/2 md:px-20 py-10">
                            <a className="flex items-center justify-center" target="_blank" rel="noopener noreferrer" href="https://www.communityofcoders.in/">
                                <img className="object-contain shadow-md" src="/images/partners/coc.png" alt="" />
                            </a>
                        </div>

                    </div>
                </div>
            </Container>
        </div>
    );
};
