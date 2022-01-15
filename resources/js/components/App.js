import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import Home from './Pages/Home';
import PostBlog from './Pages/PostBlog';
import UpdateBlogPost from './Pages/UpdateBlogPost';
import Singlepost from './Pages/Singlepost';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/PostBlog" element={<PostBlog />} />
                <Route path="/UpdateBlogpost" element={<UpdateBlogPost />} />
                <Route path="/Singleblog" element={<Singlepost />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App/>, document.getElementById('root'));
}
