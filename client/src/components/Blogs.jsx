import axios from "axios";
import Blog from "./Blog";
import config from "../config";
import { useEffect, useState } from "react";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  async function sendRequest(){
    const res = await axios.get(`${config.BASE_URL}/api/blogs`);
    
    return res.data;
  };

  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);


  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
          key={blog._id}
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            desc={blog.desc}
            img={blog.img}
            user={blog.userName}
            date={new Date(blog.date).toLocaleDateString()}
          />
        ))}
    </div>
  );
};

export default Blogs;
