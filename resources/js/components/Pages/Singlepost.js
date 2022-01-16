import axios from 'axios';
import React, { useState, Component, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './footer';
import Header from './Header';


function Singlepost(){
    //*********used uselocation() for get the Link props ******///// 
    const location = useLocation()
    const { slug } = location.state;
    console.log(slug);
   //*********state data for get post blog ******/////
    const [posts, setPosts] = useState({
        title:"",
        body:"",
        blogImage:"",
    });
    //********* fetchdata function for fetch single blog data  ******/////
    const fetchpost = async () =>{
        await axios.get(`http://127.0.0.1:8000/api/singleblog/${slug}`)
          .then(res=>{
              console.log(res.data.data.title);
              setPosts({
                title:res.data.data.title,
                body:res.data.data.body,
                blogImage:res.data.data.blogImage,
              });
          })
          .catch((err)=>{
              console.log(err);
          })
      }
      useEffect(() => {
        fetchpost();
        console.log(posts.title)
      },[]);

    return(
        <>
        <Header/>
        <div className="container">
            <div className="row">
                <div className="col-12">
                <div className="singlepost-col l8 s12">
  
                <div className="singlepost-card-4 singlepost-margin singlepost-white">
                    <img src={`https://userblog01.herokuapp.com/${posts.blogImage}`} alt="Nature" className='singlepost-image'/>
                    <div className="singlepost-container">
                    <h3><b>{posts.title}</b></h3>
                    <h5>Title description</h5>
                    </div>

                    <div className="singlepost-container">
                    <p>{posts.body}.</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </div> 
        <Footer/>
        </>
    )
}
export default Singlepost;
