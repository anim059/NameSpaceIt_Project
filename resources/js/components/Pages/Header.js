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
            <nav className="navbar navbar-expand-lg nav-property">
                <div className="container-fluid">
                    <Link to="/" className="nav-title">UserBlogPost</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                            <Link to="/" className="nav-links link-active" onClick={changeLinkActive} aria-current="page">Home</Link>
                            </li>
                            <li className="nav-item">
                            <Link to="/PostBlog" className="nav-links" onClick={changeLinkActive}>Post</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}