import React from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
  return (
    <>
        <div> Home </div>
        <button onClick={() => {navigate("/about");}}>
            About Us
        </button>
    </>
  )
}

export default Home