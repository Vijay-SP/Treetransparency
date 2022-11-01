import React from "react";
import ReactPlayer from 'react-player';
import tw from "twin.macro";

import { SectionHeading, Subheading as SubheadingBase } from "../misc/Headings.js";
const Container = tw.div`relative bg-transparent px-5 md:px-10`;
const TwoColumn = tw.div`flex flex-col lg:flex-row md:items-center max-w-screen-xl mx-auto py-10 md:py-16`;
const LeftColumn = tw.div`relative lg:w-6/12 lg:pr-12 flex-shrink-0 text-center lg:text-left`;
const RightColumn = tw.div`relative  lg:mt-0 flex flex-col justify-center`;
const IllustrationContainer = tw.div`flex justify-center md:justify-end items-center relative max-w-3xl lg:max-w-none`;

const Subheading = tw(SubheadingBase)`mb-4 text-center text-primary-500`;
const Heading = tw(SectionHeading)`w-full font-originTech text-white`;

const Dates = tw.div`w-full text-center text-3xl font-originTech text-white`;

export default function Section1(props) {

    return (
        <div className={props.bgStyles.parent}>
            <div className={props.bgStyles.stars}></div>
            <Container>
                <TwoColumn>
                    <LeftColumn>
                        <IllustrationContainer>
                            <div className={props.styles.react_player}>
                                <ReactPlayer
                                    url="homeani.webm"
                                    width="auto"
                                    height="auto"
                                    playing={true}
                                    loop={true}
                                    muted={true}
                                    playsinline={true}
                                />
                            </div>
                        </IllustrationContainer>

                    </LeftColumn>
                    <RightColumn>
                        {props.subheading && <Subheading>{props.subheading}</Subheading>}
                        <Heading>{props.heading}</Heading>
                        <Dates>Maintain Trees Around you.</Dates>
                    </RightColumn>
                </TwoColumn>
            </Container>
        </div>
    );
};
