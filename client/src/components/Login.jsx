import React, { useState } from "react";
import Grid from "@mui/system/Unstable_Grid";
import styled from "@emotion/styled";
import cartoonGirl from "../assets/cartoonGirl.jpg";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({userDetails, setUserDetails}) => {


  const navigate=useNavigate();

  const userVarification=async ({email,password})=>{
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        {
          email,
          password,
        }
      );
      
      console.log(response.data)
      
      if (response.data.isAuthorized) {
        toast.error("successfully registered", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        localStorage.setItem('isAuth',"true");
        return navigate("/");
      } else {
        toast.error("enter valid credentials", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return navigate("/");

      }
    } catch (err) {
      // console.log();
      toast.error(err.response.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  const error = (
    <TextField
      error
      id="outlined-error-helper-text"
      label="Error"
      defaultValue="Hello World"
      helperText="Incorrect entry."
      color="warning"
      focused
      autoFocus
    />
  );

  return (
    <Component>
      <Grid container spacing={0}>
        <Grid xs={4}>
          <div className="image-container">
            <img src={cartoonGirl} alt="girlPhoto" width={"100%"} />
          </div>
        </Grid>
        <Grid xs={8}>
          <form className="login-container" onSubmit={(e)=>{
            e.preventDefault();
            userVarification(userDetails)
            }}>
            <h1>Hi There</h1>
            <div className="details-container">
              <TextField
                id="standard-basic"
                label="Email Id"
                variant="standard"
                type="email"
                onChange={(e) => {
                  setUserDetails((prev) => {
                    return { ...prev, email: e.target.value };
                  });
                }}
              />
              <TextField
                id="standard-basic"
                label="Password"
                variant="standard"
                onChange={(e) => {
                  setUserDetails((prev) => {
                    return { ...prev, password: e.target.value }
                  });
                }}
              />
              <p>
                <span>
                  New user ? <Link to="/register">signup</Link>
                </span>
              </p>
            </div>
            <Button type="submit" variant="contained" sx={{ marginTop: "25px" }}>
              Login{" "}
            </Button>
          </form>
        </Grid>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Grid>
    </Component>
  );
};

var Component = styled.div`
  .image-container {
    width: 100%;
    height: 100vh;
    background-color: black;
    overflow: hidden;
  }

  .login-container {
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-top: 7rem;

    h1 {
      font-size: 2.2em;
      margin: 3rem;
    }

    .details-container {
      display: flex;
      width: 300px;
      height: 180px;
      flex-direction: column;
      justify-content: space-around;

      * {
        font-size: 1rem;
      }

      p {
        font-size: 1rem;
        color: #7e8086;
      }
    }
  }
`;
export default Login;
