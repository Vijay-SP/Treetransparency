import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styled from "styled-components";
import tw from "twin.macro";
import { SectionHeading } from "../../../components/misc/Headings.js";
import { useUserContext } from "../../../services/userContext";
import bgStyles from "../../../styles/bgStyles.module.css";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import Image from 'next/image';
import { firestore } from '../../../services/firebase.js';
import { useRouter } from "next/router";

const Container = tw.div`relative bg-transparent px-5 md:px-10`;

const TwoColumn = tw.div`flex flex-col lg:flex-row md:items-center max-w-screen-xl mx-auto py-10 md:py-16`;
const LeftColumn = tw.div`relative lg:w-6/12 lg:pr-12 flex-shrink-0 text-center lg:text-left`;
const RightColumn = tw.div`relative  lg:mt-0 flex flex-col justify-center`;

const FormContainer = tw.div`w-full flex-1 mt-8`;
const Form = tw.form`mx-auto max-w-xl`;
const SubmitButton = styled.button`
  ${tw`mx-3 mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

const HeadingTitle = tw.h2`pt-10 text-3xl font-black text-white tracking-wide text-center`

// const TwoColumn = tw.div`flex flex-col px-3 sm:px-0 md:flex-row justify-center max-w-screen-xl mx-auto`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`mt-5 md:w-9/12 flex-shrink-0 h-72 md:h-auto relative`;
const TextColumn = styled(Column)(props => [
    tw`md:w-7/12 mt-16 md:mt-0`,
    props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

// const Image = styled.div(props => [
//     `background-image: url("${props.imageSrc}");`,
//     tw`rounded bg-contain bg-no-repeat bg-center h-full`
// ]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Heading = tw(
    SectionHeading
)`-mt-2 sm:mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;


const Description = tw.p`mt-4 text-justify md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const LogoImg = tw.div`w-8 mr-2`;
const CardMeta = styled.div`
  ${tw`flex flex-row flex-wrap sm:justify-start justify-center sm:items-center font-semibold tracking-wide text-white uppercase text-sm`}
`;

const CardMetaFeature = styled.div`
  ${tw`flex items-center mt-4 mr-4 last:mr-0`}
  svg {
    ${tw`w-5 h-5 mr-1`}
  }
`;

const Forte = tw.div`text-primary-500 font-bold text-lg`;
const Work = tw.div`font-semibold text-sm text-gray-600`;

export default function RegisterGLS({
    imageInsideDiv = true
}) {


    const { user } = useUserContext();
    const router = useRouter();

    const { id } = router.query

    const [PRData, setPRData] = useState();

    const [isRegistered, setIsRegistered] = useState(false);

    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [phone, setPhone] = useState();
    const [collegeSelect, setCollegeSelect] = useState("Select");
    const [college, setCollege] = useState(null);
    const [course, setCourse] = useState();
    const [house, setHouse] = useState("Select");
    const [year, setYear] = useState("Select");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("Select");
    const [email, setEmail] = useState();
    const [questions, setQuestions] = useState("");

    // Error handlers
    const [yearError, setYearError] = useState(false);
    const [genderError, setGenderError] = useState(false);
    const [ageError, setAgeError] = useState(false);
    const [collegeError, setCollegeError] = useState(false);
    const [houseError, setHouseError] = useState(false);

    let yearErrorLocal = false;
    let genderErrorLocal = false;
    let ageErrorLocal = false;
    let collegeErrorLocal = false;
    let houseErrorLocal = false;

    useEffect(async () => {
        if (router.isReady) {
            const glsDocRef = doc(firestore, "GLS", id);
            const glsDocSnap = await getDoc(glsDocRef);

            if (glsDocSnap.exists()) {
                let glsData = glsDocSnap.data();
                let dataObject = {
                    name: glsData.name,
                    open: glsData.open,
                    time: glsData.time,
                    work: glsData.work,
                    date: glsData.date,
                    forte: glsData.forte,
                    location: glsData.location,
                    description: glsData.description,
                    imageSrc: glsData.imageSrc,
                }
                setPRData(dataObject);
            }
        }

        if (user && router.isReady) {
            const docRef = doc(firestore, "Users", user.email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                let userData = docSnap.data();

                // console.log(userData.age);

                let isEditing = window.localStorage.getItem("profileEditing");

                // Redirect to profile if the user's profile is complete and he/she don't want to edit
                if (userData.fname !== null && isEditing === false) { router.push("/profile"); }
                setEmail(user.email);
                setFname(userData.fname ?? null);
                setLname(userData.lname ?? null);
                setPhone(userData.phone ?? null);
                setCollege(userData.college ?? null);
                setCollegeSelect(userData.collegeSelect ?? "Select");
                setCourse(userData.course ?? null);
                setYear(userData.year ?? "Select");
                setAge(userData.age ?? 0);
                setGender(userData.gender ?? "Select");
                setHouse(userData.house ?? "Select");
            } else {
                // doc.data() will be undefined in this case
                // console.log("No such document!");
            }
        }
    }, [user, router]);




    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = { email, fname, lname, phone, college, course, year, age, gender, house, collegeSelect, questions };
        // console.log(data);

        if (collegeSelect == "Select") {
            setCollegeError(true);
            collegeErrorLocal = true;
        }
        else {
            collegeErrorLocal = false;
            setCollegeError(false);
        }

        if (collegeSelect == "Veermata Jijabai Technological Institute") {

            if (house == "Select") {
                setHouseError(true);
                houseErrorLocal = true;
            }
            else {
                setHouseError(false);
                houseErrorLocal = false;
            }
        }

        if (gender == "Select") {
            setGenderError(true);
            genderErrorLocal = true;
        }
        else {
            setGenderError(false);
            genderErrorLocal = false;
        }


        if (year == "Select") {
            setYearError(true);
            yearErrorLocal = true;
        }
        else {
            setYearError(false);
            yearErrorLocal = false;
        }

        if (age > 110 || age <= 0) {
            setAgeError(true);
            ageErrorLocal = true;
        }
        else {
            setAgeError(false);
            ageErrorLocal = false;
        }

        if (collegeErrorLocal == false && yearErrorLocal == false && genderErrorLocal == false && houseErrorLocal == false && ageErrorLocal == false) {
            try {
                // Add a new document with a generated id
                const newDocRef = doc(collection(firestore, "GLS", id, "Registrations"), email);
                await setDoc(newDocRef, data, { merge: true });
                setIsRegistered(true);
            } catch (e) {
                // console.error("Error saving the data: ", e);
            }

        }
    }

    return (
        <>
            <Head>
                <title>
                    {
                        PRData ? PRData.name + " | Technovanza VJTI 2021" : "GLS Registration | Technovanza VJTI 2021"
                    }
                </title>
                <link rel="icon" href="/favicon.ico" />

                {/* Meta tags */}
                <meta charset="UTF-8" />
                <meta name="description" content="Guest Lecture Series featuring the world's greatest dignitiaries. Technovanza VJTI - The technical fest for extravaganza of fun and astonishing events, Guest Lectures, amazing prizes, and much more." />
                <meta name="keywords" content="Technovanza, Techno, Technovanza VJTI, VJTI, Veermata Jijabai Technological Institute, 
        Guest Lecture Series, GLS, Technology, Technosavy, extravaganze, fun events" />
                <meta name="author" content="Abhay Ubhale" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                {/* OG Tags */}
                <meta property="og:title" content="GLS Registration | Technovanza VJTI 2021-22" />
                <meta property="og:description" content="Guest Lecture Series featuring the world's greatest dignitiaries. Technovanza VJTI - The technical fest for extravaganza of fun and astonishing events, Guest Lectures, amazing prizes, and much more." />
                <meta property="og:image" content={PRData ? PRData.imageSrc : "https://technovanza.org/logo.png"} />
                <meta property="og:video" content="https://technovanza.org/technovanza.webm" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://technovanza.org" />
                <meta property="og:determiner" content="the" />
                <meta property="og:locale" content="en_IN" />

                {/* Twitter SEO Tags */}
                <meta property="twitter:title" content="GLS Registration | Technovanza VJTI 2021-22" />
                <meta property="twitter:description" content="Guest Lecture Series featuring the world's greatest dignitiaries. Technovanza VJTI - the technical fest for extravaganza of fun and astonishing events, Guest Lectures, amazing prizes, and much more." />
                <meta property="twitter:image" content={PRData ? PRData.imageSrc : "https://technovanza.org/logo.png"} />
                <meta property="twitter:card" content="summary" />
                <meta property="twitter:url" content="https://technovanza.org" />
            </Head>

            <div className={bgStyles.parent}>
                <div className={bgStyles.stars}></div>
                <Container>


                    {
                        PRData ?
                            <TwoColumn>
                                <LeftColumn>
                                    <TextColumn textOnLeft={true}>
                                        <TextContent>
                                            {/* {subheading && <Subheading>{subheading}</Subheading>} */}
                                            <Heading>{PRData.name}</Heading>
                                            <Forte>{PRData.forte}</Forte>
                                            <Work>{PRData.work}</Work>
                                            <Description>{PRData.description}</Description>

                                            <CardMeta>
                                                <CardMetaFeature>
                                                    <LogoImg>
                                                        <img src="https://img.icons8.com/nolan/64/time.png" />
                                                    </LogoImg>
                                                    {PRData.date}, {PRData.time}
                                                </CardMetaFeature>
                                                <CardMetaFeature>
                                                    <LogoImg>
                                                        <img src="https://img.icons8.com/external-icongeek26-outline-gradient-icongeek26/64/000000/external-location-user-interface-icongeek26-outline-gradient-icongeek26.png" />
                                                    </LogoImg>
                                                    {PRData.location}
                                                </CardMetaFeature>
                                            </CardMeta>
                                        </TextContent>
                                    </TextColumn>
                                </LeftColumn>
                                <RightColumn>
                                    <ImageColumn>
                                        <img src={PRData.imageSrc} width="100%" />
                                    </ImageColumn>
                                </RightColumn>
                            </TwoColumn>
                            :
                            null
                    }


                    {
                        isRegistered ?
                            <div className="mx-auto max-w-xl p-5">
                                <p className="text-4xl text-white text-center p-5">Registration Successful!</p>
                                <p className="text-3xl text-white text-center p-5">Do not register again! Your response has been recorded.</p>
                                <SubmitButton onClick={() => router.push("/")}>
                                    <span className="text">Go to Home</span>
                                </SubmitButton>
                            </div>
                            :
                            <>
                                <HeadingTitle> Registration Form </HeadingTitle>
                                <FormContainer>

                                    <Form validate={true} onSubmit={handleSubmit}>
                                        <div className="flex flex-wrap mb-6">
                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-gray-500 text-md font-bold mb-2" htmlFor="grid-first-name">
                                                    First Name
                                                </label>
                                                <input
                                                    className="placeholder-gray-600 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500 focus:bg-white"
                                                    id="grid-first-name"
                                                    type="text"
                                                    placeholder="Jane"
                                                    required
                                                    value={fname}
                                                    onChange={(e) => setFname(e.target.value)}
                                                />

                                            </div>
                                            <div className="w-full md:w-1/2 px-3">
                                                <label className="block uppercase tracking-wide text-gray-500 text-md font-bold mb-2" htmlFor="grid-last-name">
                                                    Last Name
                                                </label>
                                                <input
                                                    className="placeholder-gray-600 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-last-name"
                                                    type="text"
                                                    placeholder="Doe"
                                                    required
                                                    value={lname}
                                                    onChange={(e) => setLname(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-500 text-md font-bold mb-2" htmlFor="grid-password">
                                                    Phone Number
                                                </label>
                                                <input
                                                    className="placeholder-gray-600 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-phone"
                                                    type="tel"
                                                    placeholder="+91 9988776655"
                                                    // pattern="+[0-9]{2} [0-9]{10}*[0-9]{12}"
                                                    required
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-500 text-md font-bold mb-2" htmlFor="grid-password">
                                                    Email
                                                </label>
                                                <input
                                                    className="placeholder-gray-600 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-email"
                                                    type="email"
                                                    placeholder="example@email.com"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-500 text-md font-bold mb-2" htmlFor="grid-state">
                                                    Institute/Organisation
                                                </label>
                                                <select
                                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-state"
                                                    onChange={(e) => setCollegeSelect(e.target.value)}
                                                    value={collegeSelect}
                                                    required
                                                >
                                                    <option value="Select">Select</option>
                                                    <option value="Veermata Jijabai Technological Institute">Veermata Jijabai Technological Institute</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                {collegeError ? <p className="text-red-500 text-xs italic">Please fill out this field.</p> : null}
                                            </div>
                                        </div>


                                        {
                                            collegeSelect === "Other" ?
                                                <div className="flex flex-wrap mb-6">
                                                    <div className="w-full px-3">
                                                        <label className="block uppercase tracking-wide text-gray-500 text-md font-bold mb-2" htmlFor="grid-state">
                                                            Enter Institute/Organisation
                                                        </label>
                                                        <input
                                                            className="placeholder-gray-600 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            id="grid-lastname"
                                                            type="text"
                                                            placeholder="Institution name"
                                                            required
                                                            value={college}
                                                            onChange={(e) => setCollege(e.target.value)}
                                                        />
                                                        <p className="text-gray-600 text-xs italic">Avoid using short forms for the college name.</p>
                                                    </div>
                                                </div>
                                                : null
                                        }

                                        {
                                            collegeSelect === "Veermata Jijabai Technological Institute" ?
                                                <div className="flex flex-wrap mb-6">
                                                    <div className="w-full px-3">
                                                        <label className="block uppercase tracking-wide text-gray-500 text-md font-bold mb-2" htmlFor="grid-state">
                                                            Techno House
                                                        </label>
                                                        <select
                                                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            id="grid-state"
                                                            onChange={(e) => setHouse(e.target.value)}
                                                            value={house}
                                                            required
                                                        >
                                                            <option value="Select">Select</option>
                                                            <option value="Red Phoenix">Red Phoenix</option>
                                                            <option value="Green Griffins">Green Griffins</option>
                                                            <option value="Blue Dragons">Blue Dragons</option>
                                                        </select>
                                                        {houseError ? <p className="text-red-500 text-xs italic">Please fill out this field.</p> : null}
                                                    </div>
                                                </div>
                                                : null
                                        }

                                        <div className="flex flex-wrap mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-500 text-md font-bold mb-2" htmlFor="grid-password">
                                                    Course
                                                </label>
                                                <input
                                                    className="placeholder-gray-600 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-password"
                                                    type="text"
                                                    placeholder="Eg. B.Tech in Computer Engineering"
                                                    required
                                                    value={course}
                                                    onChange={(e) => setCourse(e.target.value)}
                                                />
                                                <p className="text-gray-600 text-xs italic">Enter your degree and course name.</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap mb-2">

                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-gray-500 text-md font-bold mb-2" htmlFor="grid-state">
                                                    Class/Year
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        id="grid-state"
                                                        onChange={(e) => setYear(e.target.value)}
                                                        value={year}
                                                        required
                                                    >
                                                        <option value="Select">Select</option>
                                                        <option value="1st to 5th std.">1st to 5th std.</option>
                                                        <option value="6th to 10th std.">6th to 10th std.</option>
                                                        <option value="FYJC">FYJC</option>
                                                        <option value="SYJC">SYJC</option>
                                                        <option value="Diploma FY">Diploma FY</option>
                                                        <option value="Diploma SY">Diploma SY</option>
                                                        <option value="Diploma TY">Diploma TY</option>
                                                        <option value="Degree FY">Degree FY</option>
                                                        <option value="Degree SY">Degree SY</option>
                                                        <option value="Degree TY">Degree TY</option>
                                                        <option value="Degree Final Year">Degree Final Year</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                                    </div>
                                                    {yearError ? <p className="text-red-500 text-xs italic">Please fill out this field.</p> : null}
                                                </div>
                                            </div>

                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-gray-500 text-md font-bold mb-2" htmlFor="grid-city">
                                                    Age
                                                </label>
                                                <input
                                                    className="placeholder-gray-600 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-city"
                                                    type="number"
                                                    placeholder="Eg. 18"
                                                    required
                                                    value={age}
                                                    onChange={(e) => setAge(e.target.value)}
                                                />
                                                {ageError ? <p className="text-red-500 text-xs italic">Enter a valid age.</p> : null}
                                            </div>

                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-gray-500 text-md font-bold mb-2" htmlFor="grid-state">
                                                    Gender
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        id="grid-state"
                                                        onChange={(e) => setGender(e.target.value)}
                                                        required
                                                        value={gender}
                                                    >
                                                        <option value="Select">Select</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                                    </div>
                                                    {genderError ? <p className="text-red-500 text-xs italic">Please fill out this field.</p> : null}

                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap mt-5 mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-500 text-md font-bold mb-2" htmlFor="grid-password">
                                                    Questions {PRData ? "for " + PRData.name : null} ?
                                                </label>
                                                <textarea
                                                    className="placeholder-gray-600 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-password"
                                                    type="text"
                                                    placeholder="Eg. What motivates you?"
                                                    value={questions}
                                                    onChange={(e) => setQuestions(e.target.value)}
                                                />
                                                <p className="text-gray-600 text-xs italic">We will ask these questions on your behalf!</p>
                                            </div>
                                            <SubmitButton type="submit">
                                                <span className="text">Submit</span>
                                            </SubmitButton>
                                        </div>
                                    </Form>
                                </FormContainer>
                            </>
                    }
                </Container>
            </div>
        </>

    );
}