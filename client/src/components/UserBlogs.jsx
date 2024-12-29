import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import DeleteButton from "./DeleteBlogs";
import { makeStyles } from "@mui/styles";
import config from "../config";

const useStyles = makeStyles((theme)=>({
  container:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    margin:'20px auto',
    width:'70%'
  },
  blogContainer:{
    display:"flex",
    flexDirection:"column",
    flex:"1",
    alignItems:"center",
    padding:"20px",
    border:"1px solid #ccc",
    borderRadius:"10px",
    marginBottom:"20px",
    boxShadow:"0px 2px 4px rgba(0,0,0,0.1)"

  },
  blogImage:{
    width:"100%",
    height:"auto",
    borderRadius:"10px",
    marginBottom:"10px"
  },
 
}))


const UserBlogs = () => {

  const classes = useStyles()
  const [user,setUser] = useState()
  const id = localStorage.getItem("userId")

  const sendRequest = async ()=>{
    const res= await axios.get(`${config.BASE_URL}/api/blogs/user/${id}`)
    return res.data
  }

  useEffect(()=>{
    sendRequest().then(data=> setUser(data.user))
  },[])

  const handleDelete=async(blogId)=>{
    
    try {
      await axios.delete(`${config.BASE_URL}/api/blogs/${blogId}`)
      const data = await sendRequest()
      setUser(data.user)
    } catch (error) {
      console.log(error);
      
    }
    console.log("triggered");
  }


  
  return (
    <div className={classes.container}>
      {user && user.blogs && (user.blogs.map((blog,index)=>(
        <div key={index} className={classes.blogContainer}>
            <Blog
            id={blog._id}
            title={blog.title}
            isUser={true}
            desc={blog.desc}
            img = {blog.img}
            user={user.name}
            handleDelete = {handleDelete}
            />
    
            
        </div>
      )))}
    </div>
    
  )
}

export default UserBlogs