import axios from 'axios';
import React, { useState, Component, useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";
import Pagination from "react-js-pagination";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './footer';
import Header from './Header';
import UpdateBlogPost from './UpdateBlogPost';

 function Home() {
 
   //********* all state declaration  ******///// 
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState({});
  const [value, setValue] = useState("");

   
  //********* fetchdata function for fetch all blog data  ******/////
  const fetchdata = async (pageNumber = 1) =>{
    await axios.get(`https://userblog01.herokuapp.com/api/blogs?page=${pageNumber}`)
      .then(res=>{
          console.log(res.data.data.current_page);
          setPosts(res.data.data.data);
          setPages(res.data.data);
      })
      .catch((err)=>{
          console.log(err);
      })
  }



/*
  const updatePost = async (props) =>{
    console.log(props);
    await axios.get(`http://127.0.0.1:8000/api/blogs/${props}`)
          .then(res=> {
            console.log(res.data.data);
            setData({
              title:res.data.data.title,
              body:res.data.data.body,
              blogImage:res.data.data.blogImage,
            })
          })
          .catch((err)=>{
              console.log(err);
          });
    <UpdateBlogPost props={"id is"} />
    console.log(data.title);
    console.log(data.body);
    console.log(data.blogImage);
  }
*/
//********* DeletePost function for delete blog   ******/////
  const DeletePost = async (props) =>{
    console.log(props);
    await axios.delete(`https://userblog01.herokuapp.com/api/blogs/${props}`)
          .then(res=>{
            if(res.data.status===200){
              console.log(res.data.message);
            }
          })
          .catch((err)=>{
              console.log(err);
          });
          fetchdata();
  }

  useEffect(() => {
    fetchdata();
  },[]);

    return(
        <>
          <Header/>
          <div className="container">
            <div className="row">
              <div className="col-12">
              <div className='Blog-body' >
              {posts.map(posts=>
             

               
                  <div className="Blog-body-content" key={posts.slug}>
                    <div className="card" >
                      <img className="content-img " src={`https://userblog01.herokuapp.com/${posts.blogImage}`}/>
                        <div className="card-body">
                          <h5 className="card-title"><Link Link  to='/Singleblog'
                           state={{ slug: posts.slug }} >{posts.title}</Link></h5>
                        
                          <p className="card-text">{`${posts.body.substring(0, 170)}...`}</p>
                          <Link  to='/UpdateBlogpost'
                           state={{ id: posts.id }} className="  edit" type='button'>Edit</Link>
                          <button className=" delete" onClick={()=>{DeletePost(posts.id)}}>Delete</button>
                        </div>
                    </div>
                  </div>
      
                  
                )}
                </div>
              </div>
            </div>
          
           <div>
             {
           <Pagination
              activePage={pages.current_page ? pages.current_page : 0}
              itemsCountPerPage={pages.per_page ? pages.per_page : 0 }
              totalItemsCount={pages.total ? pages.total : 0}
              onChange={(pageNumber) => {
                fetchdata(pageNumber)
              }}
              pageRangeDisplayed={8}
              itemClass="page-item"
              linkClass="page-link"
              firstPageText="First Page"
              lastPageText="Last Lage"
          />
          }
           </div>

            
          </div>
          <Footer/>
        </>
    )
}
export default Home;