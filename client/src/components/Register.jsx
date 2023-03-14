import React from "react";
import Grid from "@mui/system/Unstable_Grid";
import styled from "@emotion/styled";
import funBackpacker from "../assets/funBackpacker.jpg";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  const navigate = useNavigate();
  const newUserCreation = async ({ email, password, confirm_password }) => {
    if (password !== confirm_password) {
      toast.error("enter matching password in confirm password", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        {
          email,
          password,
        }
      );

      if (data.isAuthorized) {
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
        return navigate("/login");
      } else {
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
  };

  return (
    <Component>
      <Grid container spacing={0}>
        <Grid xs={4}>
          <div className="image-container">
            <img
              src={funBackpacker}
              alt="girlPhoto"
              width={"100%"}
              height={"100%"}
            />
          </div>
        </Grid>
        <Grid xs={8}>
          <form
            className="login-container"
            onSubmit={(e) => {
              e.preventDefault();
              newUserCreation(userDetails);
            }}
          >
            <h1>Hi There</h1>
            <div className="details-container">
              <TextField
                id="standard-basic"
                label="email"
                type="email"
                variant="standard"
                onChange={(e) => {
                  setUserDetails((prev) => {
                    return { ...prev, email: e.target.value };
                  });
                }}
              />
              <TextField
                id="standard-basic"
                label="password"
                variant="standard"
                onChange={(e) => {
                  setUserDetails((prev) => {
                    return { ...prev, password: e.target.value };
                  });
                }}
              />
              <TextField
                id="standard-basic"
                label="confirm password"
                variant="standard"
                onChange={(e) => {
                  setUserDetails((prev) => {
                    return { ...prev, confirm_password: e.target.value };
                  });
                }}
              />
              <p>
                <span>
                  Already a user ? <Link to="/login">login</Link>
                </span>
              </p>
            </div>
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: "25px" }}
            >
              Sign up{" "}
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
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 90px 0px;

    h1 {
      font-size: 2.2em;
      margin: 3rem;
    }

    .details-container {
      display: flex;
      width: 300px;
      height: 300px;
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
export default Register;
