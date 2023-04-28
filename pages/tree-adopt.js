import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import tw from "twin.macro";
import Image1 from "/public/images/ash-tree.jpg";
import Image2 from "/public/images/tree2.jpg";
import { SectionHeading as HeadingTitle } from "../components/misc/Headings.js";
import loadingstyles from "./index.module.css";
import LoadingAnimation from "../components/misc/Loading.js";
//import { useUserContext } from "services/userContext.js";
import {
  addDoc,
  collection,
  updateDoc,
  getDocs,
  doc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../services/firebase.js";
import { useUserContext } from "../services/userContext.js";

/*export default function adoptTrees() {
  const [isFetching, setFetching] = useState(true);
  //const { user} = useUserContext();
  const [sales, setSales] = useState([]);
  useEffect(() => {
    fetchSales();
  }, []);

  function fetchSales() {
    setFetching(true);
    let data = [];

    getDocs(collection(firestore, "SellTrees")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // alert(doc.id + " => " + doc.data());
        data.push(doc.data());
      });

      setFetching(false);
      setSales(data);
    });
  }
  
  return (
    <div>
      {(
        <div>
        <div>
              <HeadingTitle>TREES TO ADOPT</HeadingTitle>
            </div>
          {sales.map((sales)=>(
            <div className="flex flex-row pr-5 m-5"> 
           
        <div className="card w-75 bg-white shadow-xl text-primary-content m-4 text-black rounded-lg" key={sales.treeTitle}>
  <div className="card-body">
  <img
                  className="card-img-top p-3"
                  src={
                    sales.imageUrl
                  }
                  alt="Image1"
                  width={300}
                  height={300}
                />
                
    <h2 className="card-title text-black pl-5">{sales.treeTitle}</h2>
    <p className="pl-5">
      Description:{sales.treeDescription}<br></br>
      Species:{sales.treeSpecies}<br></br>
      Price(In Rupees):{sales.treePrice}
    </p>
    <div className="card-actions justify-end">
      <Link href="/treepay">
      <a>
        <button  className="btn  bg-purple-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900">Adopt Now</button>
      </a>
    </Link>
    
    </div>
    
  </div>
</div>

</div>
               
          ))}
          <h1 className="text-white text-center text-2xl">Want to list your trees for Adoption?<a href='/tree-seller' className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-center text-white font-bold items-center justify-center hover:bg-primary-500 hover:text-white'>List Here</a></h1>
        </div>
      )}
      </div>
      );

}*/

export default function adoptTrees() {
  const [isFetching, setFetching] = useState(true);
  const [sales, setSales] = useState([]);
  const { user } = useUserContext();

  useEffect(() => {
    fetchSales();
  }, []);

  // function fetchSales() {
  //   setFetching(true);
  //   let data = [];

  //   getDocs(collection(firestore, "SellTrees")).then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       data.push(doc.data());
  //     });

  //     setFetching(false);
  //     setSales(data);
  //   });
  // }
  function fetchSales() {
    setFetching(true);
    let data = [];

    const q = query(
      collection(firestore, "SellTrees"),
      where("isSold", "==", false)
    );

    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push({id:doc.id,...doc.data()});
      });

      setFetching(false);
      setSales(data);
    });
  }

  // async function adoptTree(treeId, userId) {
  //   const treeRef = doc(firestore, "SellTrees", treeId);

  //   try {
  //     await updateDoc(treeRef, {
  //       isadopted: true,
  //       soldto: userId
  //     });
  //     console.log("Tree adopted successfully!");
  //   } catch (error) {
  //     console.error("Error adopting tree: ", error);
  //   }
  // }
  async function adoptTree(treeId) {
    const treeRef = doc(firestore, "SellTrees", treeId);
    const soldToSnapshot = await getDoc(treeRef);
    

    if (soldToSnapshot.exists() && !soldToSnapshot.data().isSold) {
  
      try {
        await updateDoc(treeRef, {
          isSold: true,
          soldTo: user.uid,
        });
        alert("Tree adopted successfully!");
      } catch (error) {
        alert("Error adopting tree: "+ error);
      }
    } else {
      alert(
        "Error adopting tree: The tree is already adopted or does not exist"
      );
    }
  }

  return (
    <div>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <div>
          <HeadingTitle>TREES TO ADOPT</HeadingTitle>
          <div className="flex flex-wrap">
            {sales.map((sale, index) => (
              <div className="w-1/4 p-4" key={sale.treeTitle}>
                <div className="card w-75 bg-white shadow-xl text-primary-content m-4 text-black rounded-lg">
                  <div className="card-body">
                    <img
                      className="card-img-top p-3"
                      src={sale.imageUrl}
                      alt="Image1"
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                    <h2 className="card-title text-black pl-5">
                      {sale.treeTitle}
                    </h2>
                    <p className="pl-5">
                      Description:{sale.treeDescription}
                      <br></br>
                      Height:{sale.treeHeight}
                      <br/>
                      Status:{sale.Status}
                      <br/>
                      Species:{sale.treeSpecies}
                      <br></br>
                      Location:{sale.treeCity},{sale.treeState}
                    </p>
                    <div className="card-actions justify-end">
                    
                        <a>
                          <button
                            className="btn bg-purple-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900"
                            onClick={() => {
                              const index = sales.indexOf(sale);
                              // do something with the index
                              adoptTree(sale.id)
                            }}
                          >
                            Adopt Now
                          </button>
                        </a>
             
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h1 className="text-white text-center text-2xl">
            Want to list your trees for Adoption?
            <a
              href="/tree-seller"
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-center text-white font-bold items-center justify-center hover:bg-primary-500 hover:text-white"
            >
              List Here
            </a>
          </h1>
        </div>
      )}
    </div>
  );
}
