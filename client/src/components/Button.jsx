import React from "react";
import { useNavigate } from "react-router-dom";
import logintakepartin from '../assets/slices/logintakepartin.png';
import logintakepartinEn from '../assets/slices/logintakepartinEn.png';

const Button = (props) => {
  const navigate = useNavigate();
  return (
    <>
    <button
      className="bg-no-repeat text-white font-[Poppins] py-1 rounded-lg md:ml-44  duration-200"
      onClick={() => navigate("/form")}
    >
      <img src={logintakepartin} className='w-[120px] h-[41px]'/>
      {/* {props.children} */}
    </button>
    
    </>
  );
};

const ButtonEng = (props) => {
  const navigate = useNavigate();
  return (
    <>
    <button
      className="bg-no-repeat text-white font-[Poppins] py-1 rounded-lg md:ml-44  duration-200"
      onClick={() => navigate("/form")}
    >
      <img src={logintakepartinEn} className='w-[120px] h-[41px]'/>
      {/* {props.children} */}
    </button>
    
    </>
  );
};

export {ButtonEng, Button} ;
