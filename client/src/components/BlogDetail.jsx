import { Button, InputLabel, TextField, Typography,TextareaAutosize } from "@mui/material";
import { Box, fontSize, fontWeight } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from "../config";
import {useStyles} from "./utils"
const labelStyles = {
  mb: 1,
  mt: 2,
  fontSize: "24px",
  fontWeight: "bold",
};

const BlogDetail = () => {
  const classes  = useStyles()
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/blogs/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  console.log("inside BlogDetail: ",blog);
  


  useEffect(() => {
    fetchDetails()
      .then((data) => {
        setBlog(data.blog);
        setInputs({
          title: data.blog.title,
          description: data.blog.desc,
          imageURL:data.blog.img,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const sendRequest = async () => {
    const res = await axios.put(`${config.BASE_URL}/api/blogs/${id}`, {
      title: inputs.title,
      desc: inputs.description,
      img:inputs.imageURL
    });
    return res.data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(()=>navigate("/myBlogs"))
    
  };

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin={"auto"}
            marginTop={3}
            display={"flex"}
            flexDirection={"column"}
            width={"80%"}
          >
            <Typography
              fontWeight={"bold"}
              padding={3}
              color={"grey"}
              variant="h2"
              textAlign={"center"}
            >
              Update Your Blog
            </Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              name="title"
              onChange={handleChange}
              value={inputs.title}
              margin="auto"
              variant="outlined"
            />
            <InputLabel sx={labelStyles}>Desciption</InputLabel>

            <TextareaAutosize
              name="description"
              onChange={handleChange}
              value={inputs.description}
              margin="auto"
              variant="outlined"
            />
              <InputLabel className={classes.font} sx={labelStyles}>
                ImageURL
              </InputLabel>
              <TextField
                className={classes.font}
                name="imageURL"
                onChange={handleChange}
                value={inputs.imageURL}
                margin="auto"
                variant="outlined"
              />

              <Button
                sx={{ mt: 2, borderRadius: 4 }}
                variant="contained"
                color="warning"
                type="submit"
              >
                Update
              </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetail;
