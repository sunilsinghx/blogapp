import {Route,Routes} from "react-router-dom"
import Header from "./components/Header"
import Login from "./components/Login"
import Blogs from "./components/Blogs"
import UserBlogs from "./components/UserBlogs"
import AddBlog from "./components/AddBlog"
import BlogDetail from "./components/BlogDetail"
import Home from "./components/Home"
import "./App.css"
const App = () => {
  return (
  <>
  <header>

    <Header/>
  </header>
  
  <main>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/blogs" element={<Blogs/>}/>
      <Route path="/myBlogs" element={<UserBlogs/>}/>
      <Route path="/myBlogs/:id" element={<BlogDetail/>}/>
      <Route path="/blogs/create" element={<AddBlog/>}/>
    </Routes>
  </main>
  
  
  
  </>
  
  )
}

export default App