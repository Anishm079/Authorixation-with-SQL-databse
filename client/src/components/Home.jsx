import React, { useEffect } from "react";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import funVrKid from "../assets/funVrKid.jpg";
import randomColor from "randomcolor"
import {useNavigate} from  'react-router-dom'

const Home = ({userDetails}) => {
 const {email,password}=userDetails
 const navigate =  useNavigate();

  useEffect(() => {
    if(localStorage.getItem("isAuth")!=="true"){
      navigate("/login");
    }
  }, [])
  
  return (
    <Component>
      <div>
        <nav className="logout-button">
          <Button variant="contained" onClick={()=>{navigate('/login');  localStorage.setItem('isAuth',"false");}} >Logout</Button>
        </nav>
        <main>
          <div className="main-container">  
            <h1>Hello,</h1>
            <h1>Welcome Home</h1>
            <p>{email}</p>
          </div>
        </main>
      </div>
    </Component>
  );
};

const Component = styled.div`
  background: url(${funVrKid}) no-repeat;
  background-size: 50% 80%;
  background-position: right;

  nav.logout-button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 1rem;
  }

  main {
    width: 100%;
    height: 90vh;
    h1 {
      font-size: 3.5rem;
    }

    p {
      font-size: 1.5rem;
      padding: 5px;
      width: 400px;
      color: black;
      text-align:center;
      background-image: linear-gradient(to right,${randomColor()} 0%,${randomColor()} 40%,${randomColor()} 80%);
    }

    .main-container{
        padding:20px 180px;
    }
  }
`;

export default Home;
