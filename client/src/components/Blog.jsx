import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./utils";
import config from "../config"


const Blog = ({ title, desc, img, user, isUser, id ,handleDelete}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  


  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

 

 
  return(
  <div>
    {" "}
    <Card
      sx={{
        width: "50%",
        margin: "auto",
        borderRadius:"10px",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      {isUser && (
        <Box display={"flex"}>
      

          <button style={{backgroundColor:"#ccc"
            ,cursor:"pointer",fontWeight:"bold"
            ,padding:"10px 5px" ,borderRadius:"10px",marginRight:"5px" ,width:"50%",}}
            onClick={handleEdit}
            >Edit </button>
          <button style={{backgroundColor:"red", borderRadius:"10px 5px" ,padding:"5px",
          fontWeight:"bold"
          ,width:"50%",marginLeft:"5px",
cursor:"pointer"

          }}
          onClick={()=>{
            
            handleDelete(id)
          }}
          >Delete </button>


        </Box>
      )}

      <CardHeader
        avatar={
          <Avatar
            className={classes.font}
            sx={{ bgcolor: "red" }}
            aria-label="user"
          >
            {user ? user.charAt(0).toUpperCase() : ""}
          </Avatar>
        }
        title={title}
      />

      <CardMedia component="img" height={"80%"} image={img} alt="image" />

      <CardContent>
        <hr />
        <br />
        <Typography
          className={classes.font}
          color="text.secondary"
          variant="body2"
        >
          <b>{user}</b> {": "} {desc}
        </Typography>
      </CardContent>
    </Card>
  </div>)
};

export default Blog;
