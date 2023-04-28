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
import {
    addDoc,
    collection,
    getDocs,
    query,
    where,
  } from "firebase/firestore";
import { list } from 'firebase/storage';
  

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
                                <div>
                                    <p>{Listings()}</p>
                                   </div>
                                   <br/><br/>
                                   <div>
                                    <p>{Adoption()}</p>
                                   </div>   
                            </div>

                        </>
                        :
                        <LoadingAnimation styles={loadingstyles} />
                }
            </div>
        </>

    )
}

function Listings() {
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


  const { user } = useUserContext();
  const [listing, setListing] = useState([]);
  const isSold = useState();
  const router = useRouter();

  useEffect(() => {
    fetchListings();
  }, []);

  function fetchListings() {
    let data = [];

    getDocs(collection(firestore, "SellTrees")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setListing(data);
    });
  }

  return (
    <div>
      {listing.length > 0 && (
        <div>
          <h1 className="text-white text-center text-3xl">My Listings</h1>
          <div className="flex flex-wrap justify-center">
            {listing.map((listing) => (
              <div className="w-1/4 p-4">
                <div
                  className="card bg-white shadow-xl text-primary-content text-black rounded-lg"
                  key={listing.treeTitle}
                >
                  <div className="card-body">
                    <img
                      className="card-img-top p-3"
                      src={listing.imageUrl}
                      alt="Image1"
                      width={300}
                      height={300}
                    />
                    <h2 className="card-title text-black pl-5">
                      {listing.treeTitle}
                    </h2>
                    <p className="pl-5">
                      Description:{listing.treeDescription}
                      <br />
                      Species:{listing.treeSpecies}
                      <br />
                      Price (In Rupees):{listing.treePrice}
                      <br />
                      Adoption Status:{isSold ? " Adopted" : " Not Adopted"}
                      <br />
                      Adopted By:{getTechnoId(user)}
                    </p>
                    {/*<div className="card-actions justify-end">
                        <button className="btn bg-purple-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900" onClick={() => editListing()}>
                          Edit
                        </button>
                  </div>*/}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Adoption() {
  const [adoption, setAdoption] = useState([]);

  useEffect(() => {
    fetchAdoption();
  }, []);

  function fetchAdoption() {
    let data = [];

    getDocs(collection(firestore, "SellTrees")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // alert(doc.id + " => " + doc.data());
        data.push(doc.data());
      });
      setAdoption(data);
    });
  }

  return (
    <div>
      <h1 className="text-white text-center text-3xl">My Adoptions</h1>
      <div className="flex flex-row flex-wrap">
        {adoption.map((adoption) => (
          <div className="w-1/4 p-4" key={adoption.treeTitle}>
            <div className="card bg-white shadow-xl text-primary-content text-black rounded-lg">
              <img
                className="card-img-top p-3 pl-2 pr-2"
                src={adoption.imageUrl}
                alt="Image1"
                width={300}
                height={300}
              />
              <div className="card-body">
                <h2 className="card-title pl-5">{adoption.treeTitle}</h2>
                <p className='pl-5'>
                  Description: {adoption.treeDescription}
                  <br />
                  Species: {adoption.treeSpecies}
                  <br />
                  Height: {adoption.treeHeight}
                  <br/>
                  Location:{adoption.treeCity},{adoption.treeState}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


 /*function Listings() {
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


const { user } = useUserContext();
    const [listing, setListing] = useState([]);
    const isSold=useState();
    useEffect(() => {
      fetchListings();
    }, []);

    
  
  function fetchListings() {
      let data = [];
  
      getDocs(collection(firestore, "SellTrees")).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // alert(doc.id + " => " + doc.data());
          data.push(doc.data());
        });
        setListing(data);
      });
    }
  
    return (
      <div>
        {(
            <div>
              <h1 className="text-white text-center text-3xl">My Listings</h1><br/>
         
            {listing.map((listing) => (
              <div className="flex flex-row flex-wrap"> 
           
        <div className="card w-75 bg-white shadow-xl text-primary-content m-4 text-black rounded-lg" key={listing.treeTitle}>
  <div className="card-body">
  <img
                  className="card-img-top p-3"
                  src={
                    listing.imageUrl
                  }
                  alt="Image1"
                  width={300}
                  height={300}
                />
                
    <h2 className="card-title text-black pl-5">{listing.treeTitle}</h2>
    <p className="pl-5">
      Description:{listing.treeDescription}<br></br>
      Species:{listing.treeSpecies}<br></br>
      Price(In Rupees):{listing.treePrice}<br/>
      Adoption Status:{isSold? " Adopted": " Not Adopted"} <br/>
      Adopted By:{ getTechnoId(user)}
    </p>
    
  </div>
</div>

</div>
               
          ))}
          
        </div>
      )}
      </div>
      );

}*/

 /* function Adoption() {
    const [adoption, setAdoption] = useState([]);
  
    useEffect(() => {
      fetchAdoption();
    }, []);
  
    function fetchAdoption() {
      let data = [];
  
      getDocs(collection(firestore, "SellTrees")).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // alert(doc.id + " => " + doc.data());
          data.push(doc.data());
        });
        setAdoption(data);
      });
    }
  
    return (
      <div>
        {(
            <div>
              <h1 className="text-white text-center text-3xl">My Adoptions</h1><br/>
            {adoption.map((adoption) => (
              <div className="flex flex-row flex-wrap"> 
           
        <div className="card w-75 bg-white shadow-xl text-primary-content m-4 text-black rounded-lg" key={adoption.treeTitle}>
  <div className="card-body">
  <img
                  className="card-img-top p-3"
                  src={
                    adoption.imageUrl
                  }
                  alt="Image1"
                  width={300}
                  height={300}
                />
                
    <h2 className="card-title text-black pl-5">{adoption.treeTitle}</h2>
    <p className="pl-5">
      Description:{adoption.treeDescription}<br></br>
      Species:{adoption.treeSpecies}<br></br>
    </p>
    
  </div>
</div>

</div>
               
          ))}
          
        </div>
      )}
      </div>);
  }*/