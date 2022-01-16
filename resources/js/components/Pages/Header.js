import React ,{useState,useEffect}from 'react';
import { Link, NavLink } from "react-router-dom";
import './Home.css';

export default function Header() {

   function changeLinkActive(e){
       const active = document.querySelector('.link-active')
       console.log(location.pathname);
       const pathname = location.pathname;
       if(active && pathname == '/'){
           active.classList.remove('link-active');
           e.target.classList.add('link-active')
       }else if(active && pathname == '/PostBlog'){
        active.classList.remove('link-active');
        e.target.classList.add('link-active')
       }
   }

    return(
        <>
            
            <nav class="navbar navbar-expand-lg navbar-light bg-light nav-property">
               <div className="container-fluid">
                    <Link to="/" className="nav-title">UserBlogPost</Link>
  
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-links link-active"  aria-current="page">Home</Link>
                            </li>
                            <li className="nav-item">
                            <Link to="/PostBlog" className="nav-links" >Post</Link>
                            </li>
                        </div>
                    </div>
                    </div>
            </nav>
        </>
    )
}