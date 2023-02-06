import React, { useState, useEffect } from 'react';
import LoadingAnimation from "../components/misc/Loading.js";
import loadingstyles from "./index.module.css";
import styled from "styled-components";
import { useUserContext } from "../services/userContext";
import { useRouter } from "next/router";
import tw from "twin.macro";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from '../services/firebase.js';

import Head from 'next/head';
import styles from './profile.module.css';
import bgStyles from "../styles/bgStyles.module.css";

const HighlightedText = tw.div`text-primary-500`;
const SubmitButton = styled.button`
  ${tw`max-w-xs self-center mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;


export default function Profile() {

    const { user } = useUserContext();
    const router = useRouter();
    const [localData, setLocalData] = useState();

    useEffect(async () => {

        const redirectToLogin = () => {
            window.localStorage.setItem("redirectAfterLogin", "/profile");
            router.push('/login');
            return <LoadingAnimation style={loadingstyles} />
        }

        user ? null : redirectToLogin();


        if (user) {
            const docRef = doc(firestore, "Users", user.email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                let userData = docSnap.data();
                if (!userData.type) {
                    router.push('/setprofile')
                }
                else {
                    window.localStorage.setItem("userData", JSON.stringify(userData));
                    setLocalData(userData);
                }
            }
        }
    }, [user]);


    const getTechnoId = (user) => {
        let date = new Date(user.metadata.creationTime);

        let day = date.getDay().toString();
        if (day.length === 1) day = "0" + day;

        let month = date.getMonth().toString();
        if (month.length === 1) month = "0" + month;

        let hour = date.getHours().toString();
        if (hour.length === 1) hour = "0" + hour;

        let minute = date.getMinutes().toString();
        if (minute.length === 1) minute = "0" + minute;

        let second = date.getSeconds().toString();
        if (second.length === 1) second = "0" + second;

        let millisec = user.metadata.createdAt.toString().slice(-2);
        return day + month + " " + hour + minute + " " + second + millisec
    }



    const editProfile = () => {
        window.localStorage.setItem("profileEditing", true);
        router.push('/setprofile');
    }


    return (
        <>
            <Head>
                <title>{user ? user.displayName ? user.displayName + " @ Tree Transparency" : "Profile | Tree Transparency" : "Profile | Tree Transparency"}</title>
                <link rel="icon" href="/favicon.ico" />

                {/* Meta tags */}
                <meta charset="UTF-8" />
              
            </Head>

            <div className={bgStyles.parent}>
                <div className={bgStyles.stars}></div>
                {
                    user ?
                        <>
                            <div className={styles.container}>
                                <main className={styles.main}>
                                    <h1 className={styles.title}>
                                        Welcome <HighlightedText> {user.displayName} ! </HighlightedText>
                                    </h1>

                                    <p className={styles.description}>
                                        Unique Id <br />
                                        <code className={styles.code}>{getTechnoId(user)}</code>
                                    </p>


                                    {localData ?
                                        <>
                                            <div className="rounded-lg bg-white m-5 p-3 shadow-sm rounded-sm">
                                                <div className="text-gray-700">
                                                    <div className="grid md:grid-cols-2 text-sm">
                                                        <div className="grid grid-cols-2">
                                                            <div className="px-4 py-2 font-semibold">First Name</div>
                                                            <div className="py-2 break-words">{localData.fname}</div>
                                                        </div>
                                                        <div className="grid grid-cols-2">
                                                            <div className="px-4 py-2 font-semibold">Last Name</div>
                                                            <div className="py-2 break-words">{localData.lname}</div>
                                                        </div>
                                                        <div className="grid grid-cols-2">
                                                            <div className="px-4 py-2 font-semibold">Phone Number</div>
                                                            <div className="py-2 break-words">{localData.phone}</div>
                                                        </div>
                                                        
                                                        <div className="grid grid-cols-2">
                                                            <div className="px-4 py-2 font-semibold">User Type</div>
                                                            <div className="py-2 break-words">{localData.type}</div>
                                                        </div>
                                                        <div className="grid grid-cols-2">
                                                            <div className="px-4 py-2 font-semibold ">Email</div>
                                                            <div className="py-2">
                                                                <a className="text-blue-800 break-words" href={"mailto:" + user.email}>{user.email}</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col justify-center items-center">
                                                    <SubmitButton onClick={() => editProfile()}>
                                                        <span className="text">Edit Information</span>
                                                    </SubmitButton>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        null
                                    }

                                </main>
                            </div>

                        </>
                        :
                        <LoadingAnimation styles={loadingstyles} />
                }
            </div>
        </>

    )
}