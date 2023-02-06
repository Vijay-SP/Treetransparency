import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styled from "styled-components";
import tw from "twin.macro";
import { SectionHeading as HeadingTitle } from "../components/misc/Headings.js";
import bgStyles from "../styles/bgStyles.module.css";
import { useUserContext } from "../services/userContext";

// import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { doc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";

import { firestore } from '../services/firebase.js';
import { useRouter } from "next/router";

const Container = tw.div`relative bg-transparent`;

const SingleColumn = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const FormContainer = tw.div`w-full flex-1 mt-8`;
const Form = tw.form`mx-auto max-w-xl`;
// const Input = tw.input`px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-600 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mx-3 mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

export default function SetProfile() {

    const { user, changeDisplayName } = useUserContext();
    const router = useRouter();

    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [phone, setPhone] = useState();
    const [type, settype] = useState("Select");
  
    // Error handlers
    const [typeError, settypeError] = useState(false);
   
    let typeErrorLocal = false;
   

    useEffect(async () => {
        user ? null : router.push("/login");

        if (user) {
            const docRef = doc(firestore, "Users", user.email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                let userData = docSnap.data();

                // console.log(userData.age);

                let isEditing = window.localStorage.getItem("profileEditing");

                // Redirect to profile if the user's profile is complete and he/she don't want to edit
                if (userData.fname !== null && isEditing === false) { router.push("/profile"); }

                setFname(userData.fname ?? null);
                setLname(userData.lname ?? null);
                setPhone(userData.phone ?? null);
                settype(userData.type ?? "Select");

            } else {
                // doc.data() will be undefined in this case
                // console.log("No such document!");
            }
        }
    }, [user])


    const handleSubmit = async (e) => {
        e.preventDefault();

        let data = { fname, lname, phone, type };

        

        if (type == "Select") {
            settypeError(true);
            typeErrorLocal = true;
        }
        else {
            settypeError(false);
            typeErrorLocal = false;
        }

        
        
        if (typeErrorLocal == false ) {            
            try {

                await changeDisplayName(fname + " " + lname);
                // Add the user data to the database
                const docRef = doc(firestore, 'Users', user.email);
                await updateDoc(docRef, { ...data, lastUpdated: serverTimestamp() });

                window.localStorage.setItem("userData", JSON.stringify(data));
                window.localStorage.setItem("profileEditing", false);
                
                router.push("/profile");
                

            } catch (e) {
                console.error("Error saving the data: ", e);
            }

        }
    }


    return (
        <>
            <Head>

                <title>{user ? user.displayName ? user.displayName + " @ Tree" : "Set Profile | Tree" : "Set Profile | Tree"}</title>
                <link rel="icon" href="/favicon.ico" />

                {/* Meta tags */}
                <meta charset="UTF-8" />
                
            </Head>

            <div className={bgStyles.parent}>
                <div className={bgStyles.stars}></div>
                <Container>
                    <SingleColumn>
                        <HeadingTitle> User Profile </HeadingTitle>
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
                                            placeholder="Eg. +91 9988776655"
                                            // pattern="+*[0-9]{2}* [0-9]{12}"
                                            required
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                </div>


                                <div className="flex flex-wrap mb-2">


                                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-500 text-md font-bold mb-2" htmlFor="grid-state">
                                            User Type
                                        </label>
                                        <div className="relative">
                                            <select
                                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-state"
                                                onChange={(e) => settype(e.target.value)}
                                                value={type}
                                                required
                                            >
                                                 <option value="Select">Select</option>
                                                <option value="Normal Citizen">Normal Citizen</option>
                                                <option value="Government Bodies / NGO">Government Bodies / NGO</option>
                                                <option value="PVT Organization">PVT Organization</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                            </div>
                                            {typeError ? <p className="text-red-500 text-xs italic">Please fill out this field.</p> : null}
                                        </div>
                                    </div>

                                   
                                    <SubmitButton type="submit">
                                        <span className="text">Submit</span>
                                    </SubmitButton>

                                </div>
                            </Form>
                        </FormContainer>
                    </SingleColumn>
                </Container>
            </div>
        </>

    );
}