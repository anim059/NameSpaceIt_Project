import React ,{useState,useEffect}from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import './PostBlog.css';
function UpdateBlogPost() {

    const [data,setData] = useState({
        title:'',
        body:'',
        blogImage:'',
    });

    const location = useLocation()
    const { id } = location.state
    console.log(id);

    const updatepost = async () =>{
        await axios.get(`http://127.0.0.1:8000/api/blogs/${id}`)
          .then(res=>{
              console.log(res.data.data.title);
              setData({
                title:res.data.data.title,
                body:res.data.data.body,
                blogImage:res.data.data.blogImage,
              });
          })
          .catch((err)=>{
              console.log(err);
          })
      }

      useEffect(()=>{
          updatepost();
          console.log(data.title);
      },[])

    

    const saveinput = async (e) =>{
        e.preventDefault();
        console.log(data);
        const blogdata = new FormData() 
        blogdata.append('title', data.title)
        blogdata.append('body', data.body)
        blogdata.append('blogImage', data.blogImage)
        const res = await axios.put(`http://127.0.0.1:8000/api/blogs/${id}`,blogdata);
        if(res.data.status === 200){
            console.log(res.data.message);
            setData({
                title:'',
                body:''
            });
            document.querySelector("#BlogForm").reset();
        }
     
        
    }

    return(
        <>
          <Header/>
         
                <div className="Form-background">
                    <div className="container">
                        <div className='row'>
                            <h3 className="Form-heading">Post Your Blog</h3>
                                <form onSubmit={saveinput} id="BlogForm">
                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input type="text" name="title" value={data.title} onChange={(e)=>setData({...data,title:e.target.value})} className="form-control" id=""/>
                                        
                                    </div>
                                    <div className="mb-3">
                                        <label  className="form-label">Body</label>
                                        <textarea type="text" name="body" value={data.body} onChange={(e)=>setData({...data,body:e.target.value})} className="form-control" id=""/>
                                    </div>
                                    <div className="mb-3">
                                        <label  className="form-label">Blog Image</label>
                                        <input type="file" name="blogImage"  onChange={(e)=>setData({...data,blogImage:e.target.files[0]})} className="form-control" id=""/>
                                    </div>  
                                    <button type="submit"  className="btn btn-primary">Post</button>
                                </form>
                            </div>
                    </div>
                </div>
        
        </>
    )
}

export default UpdateBlogPost;