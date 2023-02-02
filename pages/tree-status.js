import React, {useState, useRef} from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading as HeadingTitle } from "../components/misc/Headings.js";
import bgStyles from "../styles/bgStyles.module.css";
import {
  addDoc,
  collection,
} from "firebase/firestore";
import { useUserContext } from "../services/userContext";
import { useRouter } from "next/router";
import { firestore } from "../services/firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../services/firebase.js";

const Container = tw.div`bg-transparent`;

const SingleColumn = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const FormContainer = tw.div`w-full flex-1 mt-8`;
const Form = tw.form`mx-auto max-w-xl`;
// const Input = tw.input`px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-600 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mx-3 mt-5 tracking-wide font-semibold bg-purple-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

export default function TreeStatus() {
    const router = useRouter();

    const [treeLocation, setTreeLocation] = useState();
    const [treeName, setTreeName] = useState();
    const [ngo, setNgo] = useState();
    const [treeStatus, setTreeStatus] = useState("Select");
    const [file, setFile] = useState();
  
    // Error Handler
    const [yearError, setYearError] = useState(false);
   
    let yearErrorLocal = false;

    function handleFileChange(event) {
        if (!event.target.files) return;
      
        setFile(event.target.files[0]);
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (treeStatus == "Select") {
            setYearError(true);
            yearErrorLocal = true;
        }
        else {
            setYearError(false);
            yearErrorLocal = false;
        }

        let imageUrl = "";
        
        if (yearErrorLocal == false ) {            
                // await changeDisplayName(fname + " " + lname);
                // Add the tree data to the database
                const storageRef = ref(storage, `/files/${file.name}`)
                const uploadTask = uploadBytesResumable(storageRef, file);
                
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        },
                        (err) => console.log(err),
                        () => {
                            // download url
                            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                                imageUrl = url;
                                console.log("Image URL :", url);
                                console.log("Image URL :", imageUrl);
                            });
                        }
                        );
                        
                       addDoc(collection(firestore, "Trees"), { treeLocation, treeName, treeStatus, ngo, imageUrl })
                      .then(() => console.log("Document was saved"))
                      .catch((e) => alert(`Error occured : ${JSON.stringify(e)}`));
                      
                        // router.push("/");

        }
    }

    return (<div className={bgStyles.parent}>
        <div className={bgStyles.stars}></div>
        <Container>
            <SingleColumn>
                <HeadingTitle> Tree Status Update</HeadingTitle>
                <FormContainer>

                    <Form validate={true} onSubmit={handleSubmit}>
                        <div className="flex flex-wrap mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-500 text-md font-bold mb-2" htmlFor="grid-first-name">
                                    Tree Location
                                </label>
                                <input
                                    className="placeholder-gray-600 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500 focus:bg-white"
                                    id="grid-first-name"
                                    type="text"
                                    required
                                    value={treeLocation}
                                    onChange={(e) => setTreeLocation(e.target.value)}
                                />

                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-500 text-md font-bold mb-2" htmlFor="grid-last-name">
                                    Tree Name
                                </label>
                                <input
                                    className="placeholder-gray-600 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-last-name"
                                    type="text"
                                    required
                                    value={treeName}
                                    onChange={(e) => setTreeName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-500 text-md font-bold mb-2" htmlFor="grid-password">
                                    NGO
                                </label>
                                <input
                                    className="placeholder-gray-600 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-phone"
                                    type="tel"
                                    // pattern="+*[0-9]{2}* [0-9]{12}"
                                    required
                                    value={ngo}
                                    onChange={(e) => setNgo(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap mb-2">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-500 text-md font-bold mb-2" htmlFor="grid-state">
                                    Tree Status
                                </label>
                                <div>
                                    <select
                                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-state"
                                        onChange={(e) => setTreeStatus(e.target.value)}
                                        value={treeStatus}
                                        required
                                    >
                                         <option value="Select">Select</option>
                                        <option value="Healthy">Healthy</option>
                                        <option value="Dead">Dead</option>
                                        <option value="Requires Care">Requires Care</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                    {yearError ? <p className="text-red-500 text-xs italic">Please fill out this field.</p> : null}
                                </div>
                                </div>
                                </div>

                        <div className="flex flex-wrap mb-2">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-500 text-md font-bold mb-2" htmlFor="grid-state">
                                    Upload Photo
                                </label>
                                <div className="text-white">
                                    <input 
                                        type="file"
                                        accept="image/*" 
                                        onChange={handleFileChange}
                                     />
                                </div>
                            </div>

                           
                            <SubmitButton type="submit">
                                <span>Submit</span>
                            </SubmitButton>

                        </div>
                    </Form>
                </FormContainer>
            </SingleColumn>
        </Container>
    </div>);
}