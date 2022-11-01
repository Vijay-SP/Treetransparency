import React from "react";
import tw from "twin.macro";

const Container = tw.div`relative bg-transparent py-8`;
const TwoColumn = tw.div`flex flex-col lg:flex-row md:items-center max-w-screen-xl mx-auto`;
const LeftColumn = tw.div`relative lg:w-6/12 lg:pr-12 flex-shrink-0 text-center lg:text-left`;
const RightColumn = tw.div`relative w-full mt-12 lg:mt-0 flex flex-col justify-center`;

const Heading = tw.h1`font-black text-white text-3xl md:text-5xl leading-snug max-w-3xl`;
const Paragraph = tw.p`my-5 lg:my-8 text-sm lg:text-base font-medium text-gray-600 max-w-lg mx-auto lg:mx-0`;

const IllustrationContainer = tw.div`flex justify-center md:justify-end items-center relative max-w-3xl lg:max-w-none`;

export default function Section3({
    heading = "After Movie of Technovanza 20-21",
    description = "Watch the mesmerizing glory of the previous years’ fest. Get excited for more fun this time!",
    imageDecoratorBlob = false,
    bgStyles = null
}) {
    return (
        <div className={bgStyles.parent}>
            <div className={bgStyles.stars}></div>
            <Container>
                <TwoColumn>
                    <LeftColumn>
                        <Heading>{heading}</Heading>
                        <Paragraph>{description}</Paragraph>
                        <p className="text-primary-500 italic hidden">  lOv3_T3chn0vANZa  </p>
                    </LeftColumn>
                    <RightColumn>
                        <IllustrationContainer>
                            <iframe className={bgStyles.youtube} src="https://www.youtube.com/embed/za0VJb6PXe8"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen></iframe>
                            {imageDecoratorBlob && <DecoratorBlob2 />}
                        </IllustrationContainer>
                    </RightColumn>
                </TwoColumn>
            </Container>
        </div>
    );
};
