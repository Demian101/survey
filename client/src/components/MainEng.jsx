import React, { useRef, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { ButtonEng } from "./Button";
import { AiOutlineMenu } from "react-icons/ai";

// png
import main_title from '../assets/slices/maintitleEWeb.png';
import maintitle_phone from '../assets/slices/maintitle-phoneEn.png';
import arrow from '../assets/slices/arrow.png';
import location from '../assets/slices/zhiyuandidian3@2x.png'
import calendar from '../assets/slices/Calendar@2x.png'
import logo from '../assets/slices/logo@2x.png';
import menu from '../assets/slices/menu.png';
import MeetingArrange from '../assets/ele/AGENDA@2x.png';
import date1106 from '../assets/1106en.png'
import date1107 from '../assets/1107en.png'

import Connect from '../assets/ele/CONTACT@2x.png'
import MeetingBg from '../assets/ele/INTRODUCTION@2x.png'
import organization from '../assets/ele/ORGANIZATION@2x.png'


import CorpLianchuan from '../assets/corps/CorpLianchuan.png'
import corpLvcheng from '../assets/corps/corpLvcheng.png'
import corpTianhua from '../assets/corps/corpTianhua.png'
import CropDonggeng from '../assets/corps/CropDonggeng.png'
import CropZhonghua from '../assets/corps/CropZhonghua.png'
import CorpDeshang from '../assets/corps/CorpDeshang.png'
import CorpMirui from '../assets/corps/CorpMirui.png'

import livepng from '../assets/corps/live.png'
import weblive from '../assets/corps/weblive.png'


import Frame1 from '../assets/Timelineslices/Frame1@2x.png';
import Frame2 from '../assets/Timelineslices/Frame2@2x.png';
import triarrow from '../assets/Timelineslices/triarrow.png';
import logintakepartinEn from '../assets/slices/logintakepartinEn.png';


import round1 from '../assets/Timelineslices/round1.png';
import { useNavigate } from "react-router-dom";
import Main from './Main';

const MainEng = () =>{
  const [lang, setLang] = useState('en')
  const onChangeHandler = (e) => {
    setLang(e.target.value)
  }

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    let Links = [
    { name: "嘉宾", link: "/" },
  ];
  const navigate = useNavigate();

  const topRef = useRef(null);
  const argRef = useRef(null);
  const guestRef = useRef(null);
  const aboutRef = useRef(null);
  const liveRef = useRef(null);

  let [open, setOpen] = useState(false);

  const scrollDown = (ref, setFlag=true) => { 
    if(setFlag){setOpen(!open)}
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: 'smooth',
    });
  };


  const jumplink = () => {
    const liveurl = "https://wx.vzan.com/live/page/9A17846543DDA7556F5DEAB8C5A8FF0A?topicid=262691401&shauid=P6sbCBC4MEGJA2TYmizZsg**&vprid=0&sharetstamp=1663328096048"
    window.location.href = liveurl
  }

  const jumpoffice = () => {
    const liveurl = "https://beian.miit.gov.cn/"
    window.location.href = liveurl
  }

  if( lang==='zh' ){
    return( <Main />)
  }
  return (
    <div className='w-screen h-auto bg-appbg md:bg-webbghome bg-contain bg-no-repeat mt-14 bg-clip-padding' ref={topRef}>
      {/* <NavBar {...argRef}/> */}

      {/* NavBar  */}
      {/* <div className="shadow-md z-20 w-full fixed top-0 left-0  bg-gradient-to-r from-indigo-800 via-purple-600 to-black"> */}
      <div className="shadow-md w-full fixed top-0 left-0 bg-webaboutbg z-20">
        <div className="flex items-center justify-between md:px-10 py-3 px-7">
          
          <div>
            <img src={logo} className={`${isMobile ? "w-7/12 h-auto pb-2": "w-[264px] h-[69px] mr-20 ml-32 "}`} alt="logo" />  {/* ml-44 */}
          </div>
          <div>
            <select
              className={`${isMobile ? 'visible' : 'hidden'} bg-inherit text-gray-50 text-sm mr-2`}
              defaultValue="en"
              onChange={(e) => onChangeHandler(e)} >
              <option  value="zh">zh</option>
              <option value="en">Eng</option>
            </select>
          </div>

          <div
            onClick={() => setOpen(!open)}
            // className="text-4xl absolute right-8 top-10 cursor-pointer md:hidden"
            className="text-4xl cursor-pointer md:hidden"
          >
            {/* <AiOutlineMenu className='text-white text-g' name={open ? "close" : "menu"} /> */}
            <img src={menu} className='w-[24px] h-[22]px' name={open ? "close" : "menu"} />
          </div>



            <ul
              className={`md:text-base md:flex md:items-center md:pb-0 pb-4 rounded-md absolute md:static bg-gray-900 bg-opacity-90 md:bg-inherit md:z-auto left-0 w-full md:w-auto md:pl-0 pl-9  duration-75 transition-all  ease-in ${
                open ? " top-[55px]" : "top-[-490px]"
              }`}
            >
              <li className="md:ml-8 md:my-0 my-7">
                {/* <a href={"/"} className="text-slate-50 hover:text-gray-400 duration-500" >
                  {"首页"} </a> */}
                <button onClick={()=>scrollDown(topRef)} className="text-slate-50 hover:text-gray-400 duration-500" >
                Home </button>

              </li>
              <li className="md:ml-8  placeholder:md:my-0 my-7">
                <button onClick={()=>scrollDown(argRef)} className="text-slate-50 hover:text-gray-400 duration-500" >
                Agenda </button>
              </li>


              <li className="md:ml-8  md:my-0 my-7">
                <button onClick={()=>scrollDown(liveRef)} className="text-slate-50 hover:text-gray-400 duration-500" >
                Live stream </button>
              </li>

              <li className="md:ml-8  md:my-0 my-7">
                <button onClick={()=>scrollDown(aboutRef)} className="text-slate-50 hover:text-gray-400 duration-500" >
                About us </button>
              </li>

              {/* <li className="md:ml-8   md:my-0 my-7">
                <button onClick={()=>scrollDown(guestRef)} className="text-slate-50 hover:text-gray-400 duration-500" >
                嘉宾 </button>
              </li> */}
                
              <div className='flex md:flex-row md:items-center md:justify-between md:content-center text-white py-1 rounded-lg md:ml-12  duration-200'>
                <select
                  className={`${isMobile ? 'hidden' : 'visible'} bg-inherit text-gray-50 text-lg mr-2`}
                  defaultValue="en"
                  onChange={(e) => onChangeHandler(e)} >
                  <option  value="zh">zh</option>
                  <option value="en">Eng</option>
                </select>

                <button
                  className="bg-no-repeat "
                  onClick={() => navigate("/form", { state: { lang: lang }})}
                >
                  <img src={logintakepartinEn} className='w-[120px] h-[41px]'/>
                  {/* {props.children} */}
                </button>
              </div>
            </ul>
          </div>
    </div>   {/* NavBar */}


      <div> &nbsp; </div>
      {/* <div className='bg-[url("../../assets/slices/logintakepartin.png")] bg-no-repeat'> 2222222222</div> */}

      {/* 论坛 大海报 */}
      {isMobile ? 
        ( <div>
            <img src={maintitle_phone} className="cursor-pointer w-4/5 mt-24 mx-10 md:w-9/12 md:mt-24 md:ml-36"  alt="logo" />
          </div>):(

            // Web 端主图大海报
          <div className='flex items-center justify-center align-middle content-center pr-4 mt-24  pt-20'>
            <img src={main_title} className="cursor-pointer w-9/12"  alt="logo" />
           </div>
        )
      }



      <div className='grid grid-cols-1 gap-1 md:flex md:justify-center'>
        <div className='pt-2 pl-10'>
          <span> <img src={calendar} className='w-4 inline pb-1' /></span>
          <span className='text-lg text-slate-50 pt-10 ml-1'> January 07th,2023   &nbsp;&nbsp;&nbsp; </span>
        </div>
        <div className='pt-2 pl-10'>
          <span> <img src={location} className='w-4 inline pb-1' /></span>
          <span className='text-lg text-slate-50 pt-10 ml-1'> QianTang District, Hangzhou   &nbsp;&nbsp;&nbsp; </span>
        </div>
      </div>


      {/* 注册参会按钮 */}
      <div className='md:flex md:justify-center pt-10 px-10 md:mb-5'>
        <button className='px-6 py-3 bg-gradient bg-no-repeat rounded-md shadow-2xl text-lg text-black w-[160px] h-[61px]'
           onClick={()=> navigate("/form", { state: { lang: lang }})}>
            Register
        </button>
      </div>

      {isMobile && 
        <div className='pt-4 pb-32'
          onClick={()=>scrollDown(argRef, false)}>
          <span className='text-white px-14 pt-4 mt-4 '>  Agenda
            <img src={arrow} className='ml-1 w-[8pt] h-[5pt] inline' />
          </span>
        </div>
      }

    {isMobile && (
     // {/* 11.06 内容 - 移动端！！！！！！！ */}
    <div className='md:bg-webbgschedule bg-appbgschedule bg-cover bg-no-repeat w-screen h-auto'>  
    
    <div className='grid grid-cols-1 gap-2 pl-8 font-PingFang pt-16 items-start' ref={argRef}>
      <img src={MeetingArrange} className='w-[102pt] h-[23pt]'/>
      <img src={date1106} className='w-[132pt] h-[45pt] mt-2'/>
      <div>
        <span><img src={location} className='w-[12.5pt] h-[16pt] inline pb-1' /></span>
        <span className='text-[22px] pb-8 text-slate-50 inline'> Smart Valley </span>
      </div>
      <table className="table-fixed ">
        <tbody className=" text-white text-left px-2 text-sm">
              <tr > 
                <td className="pb-3"> <img src={round1} className='inline pb-1 pr-1 w-[8pt] h-[8pt]' />12:00-14:30</td>
                <td className="pl-2 pb-3">Registration</td>
              </tr>
              <tr>
                <td className="pb-3"> <img src={round1} className='inline pb-1 pr-1 w-[8pt] h-[8pt]' />14:30-15:00</td>
                <td className="pl-2  pb-3">
                  <p>Opening Ceremony& </p>
                  <p>Leader's Speech </p>
                </td>
              </tr>
              <tr>
                <td className="pb-3"> <img src={round1} className='inline pb-1 pr-1 w-[8pt] h-[8pt]' />15:00-17:00</td>
                <td className="pl-2 pb-3">Plenary Lecture</td>
              </tr>
              <tr>
                <td className="pb-3"> <img src={round1} className='inline pb-1 pr-1 w-[8pt] h-[8pt]' />17:00</td>
                <td className="pl-2 pb-3">
                  <p> Return to hotel</p>
                  <p> Dinner</p>

                </td>
              </tr>
      </tbody>
      </table>
    </div>

    <hr className='mx-10 mt-4'/>

    {/* 11.07 内容 - 移动端！！！！！！！  */}
    <div className='grid grid-cols-1 gap-2 pl-8 font-PingFang  pt-4'>
      <img src={date1107} className='w-[132pt] h-[45pt] mt-2'/>
      <div>
        <span><img src={location} className='w-[12.5pt] h-[16pt] inline pb-1' /></span>
        <span className='text-[22px] pb-8 text-slate-50 inline'> QianTang District, Hangzhou </span>
      </div>
      <table className="table-fixed">
        <tbody className=" text-white px-2 text-sm">
          <tr> 
                <td className="pb-3"> <img src={round1} className='inline pb-1 pr-1 w-[8pt] h-[8pt] text-right' /> 08:30-09:00</td>
                <td className="pl-1 pb-3">Registration</td>
              </tr>
              <tr>
                <td className="pb-3"> <img src={round1} className='inline pb-1 pr-1 w-[8pt] h-[8pt] text-right' /> 09:00-10:00</td>
                <td className="pl-1 pb-3">
                  <p>Academician's Speech</p>
                  <p>on Chemical Synthetic</p>
                  <p> Biology</p>
                </td>
              </tr>
              <tr>
                <td className="pb-3"> <img src={round1} className='invisible inline pb-1 pr-1 w-[8pt] h-[8pt] text-right' /> 10:00-10:15</td>
                <td className="pl-1 pb-3 italic">Coffee Break</td>
              </tr>
              <tr>
                <td className="pb-3"> <img src={round1} className='inline pb-1 pr-1 w-[8pt] h-[8pt] text-right' /> 10:15-11:00</td>
                <td className="pl-1 pb-3">
                  <p>Entrepreneur's Speech</p>
                  <p>on Chemical Synthetic </p>
                  <p>Biology</p>
                </td>
              </tr>
              <tr>
                <td className="pb-3"> <img src={round1} className='inline pb-1 pr-1 w-[8pt] h-[8pt] text-right' /> 11:00-12:00</td>
                <td className="pl-1 pb-3">
                  <p>Academic Frontier of</p>
                  <p>Chemical Synthetic Biology</p>
                </td>
              </tr>
              <tr>
                <td className="pb-3"> <img src={round1} className='invisible inline pb-1 pr-1 w-[8pt] h-[8pt] text-right' /> 12:00-12:15</td>
                <td className="pl-1 pb-3 italic">Group photograph</td>
              </tr>
              <tr>
                <td className="pb-3"> <img src={round1} className='inline pb-1 pr-1 w-[8pt] h-[8pt] text-right' /> 12:15-13:30</td>
                <td className="pl-1 pb-3">Lunch</td>
              </tr>
              <tr>
                <td className="pb-3"> <img src={round1} className='inline pb-1 pr-1 w-[8pt] h-[8pt] text-right' /> 13:30-14:30</td>
                <td className="pl-1 pb-3">
                  <p>Academician's Speech </p>
                  <p>on Chemical Synthetic </p>
                  <p>Biology</p>
                </td>
              </tr>
              <tr>
                <td className="pb-3"> <img src={round1} className='inline pb-1 pr-1 w-[8pt] h-[8pt] text-right' /> 14:30-16:30</td>
                <td className="pl-1 pb-3">
                  <p>Entrepreneur's Speech</p>
                  <p> on Chemical Synthetic </p>
                  <p> Biology</p>
                </td>
              </tr>
              <tr>
                <td className="pb-3"> <img src={round1} className='invisible inline pb-1 pr-1 w-[8pt] h-[8pt] text-right' /> 16:30-16:45</td>
                <td className="pl-1 pb-3 italic">Coffee Break</td>
              </tr>
              <tr>
                <td className="pb-3"> <img src={round1} className='inline pb-1 pr-1 w-[8pt] h-[8pt] text-right' /> 16:45-18:00</td>
                <td className="pl-1 pb-3">
                  <p>Roundtable Forum on</p>
                  <p>Chemical Synthetic </p>
                  <p>Biology Investment</p>
                </td>
              </tr>
              <tr>
                <td className="pb-3"> <img src={round1} className='inline pb-1 pr-1 w-[8pt] h-[8pt] text-right' /> 18:00-19:00</td>
                <td className="pl-1 pb-3">Dinner</td>
              </tr>
              <tr>
                <td className="pb-3"> <img src={round1} className='inline pb-1 pr-1 w-[8pt] h-[8pt] text-right' /> 19:00-22:00</td>
                <td className="pl-1 pb-3">Sub-Fourm</td>
              </tr>
        </tbody>
      </table>
    </div>  // {/* 11.07 内容 - 移动端！！！！！！！  */}
    </div>
    )}


    {/*
      *
      ****  Web 网页端  **************************************************************************
      *
      */}
    { !isMobile && (
    // 11.06 内容
    <div className='bg-webbgschedule pt-24 pb-24'  ref={argRef}>
      <div className='flex items-center justify-center content-center flex-col'> {/* 1106 的 flex */}

        <div className='relative' >
          <div className='w-[102.5pt] h-[23pt] pt-2 pb-3 mb-2'>
            <img src={MeetingArrange} className='w-auto'/>
          </div>

        <div className='flex flex-row'>
          <img src={Frame1} className='w-[156pt] h-[134pt] mt-6 mr-9'/>
          {/* <span className='col-start-2 text-gray-100 inline-grid absolute z-50 left-3 top-12'> 1111</span>      */}
          <div className='pt-4 pb-1 inline absolute left-[38px] top-20'>
            <span><img src={triarrow} className='inline w-[8pt] mr-1 mb-1' ></img></span>
            <span className='inline text-slate-50 text-lg'> Nov</span>
            <span className='inline text-slate-50 text-4xl'> 06</span>
            <span className='inline text-slate-50 text-lg'> th</span>
          </div>   

          <div className="text-slate-50 pt-4 font-light relative" >
            <span className='text-2xl text-slate-50'>Smart Valley </span>
            <table className="table-fixed">
              <tbody className="">
                <tr> 
                  <td className="text-left text-xs pr-6 pb-4 pt-4"> <img src={round1} className='inline pb-[2px] pr-1 w-[8pt]' />12:00-14:30</td>
                  <td className="text-left text-sm pb-4  pt-4">Registration</td>
                </tr>
                <tr>
                  <td className="text-left text-xs pr-6 pb-4"> <img src={round1} className='inline pb-[2px] pr-1 w-[8pt]' />14:30-15:00</td>
                  <td className="text-left text-sm pb-4">
                    <p>Opening Ceremony &</p>
                    <p>Leader's Speech</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-left text-xs pr-6 pb-4"> <img src={round1} className='inline pb-[2px] pr-1 w-[8pt]' />15:00-17:00</td>
                  <td className="text-left text-sm pb-4">Plenary Lecture</td>
                </tr>
                <tr>
                  <td className="text-left text-xs pr-6 pb-4"> <img src={round1} className='inline pb-[2px] pr-1 w-[8pt]' />17:00</td>
                  <td className="text-left text-sm pb-4">
                    <p>Return to hotel & Dinner</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <hr className='ml-60  mt-4' />

      </div>   {/* 1106 的 flex */}


      {/* 1107 的 flex */}
      <div className='flex flex-row pl-24'>
        <div className='relative'>
          <img src={Frame2} className='w-[155.5pt] h-[418pt] pt-10 mr-8'/>
          {/* <span className='col-start-2 text-gray-100 inline-grid absolute z-50 left-3 top-12'> 1111</span>  */}
          <div className='pt-4 pb-1 inline absolute left-[49px] top-16'>
            <span><img src={triarrow} className='inline w-[8pt] mr-1 mb-1' ></img></span>
            <span className='inline text-slate-50 text-lg'>Nov </span>
            <span className='inline text-slate-50 text-4xl'>07</span>
            <span className='inline text-slate-50 text-lg'>th</span>
          </div>   
        </div>

          <div className="text-slate-50 pt-12 font-light relative" >
            <span className='text-2xl text-slate-50'> QianTang District, Hangzhou </span>
            <table className="table-fixed">
              <tbody className="">
              <tr> 
                <td className="text-left text-xs pr-6 pb-4 pt-4"> <img src={round1} className='inline pb-[2px] pr-1 w-[8pt]' /> 08:30-09:00</td>
                <td className="text-left text-sm pb-4 pt-4">Registration</td>
              </tr>
              <tr>
                <td className="text-left text-xs pr-6 pb-4"> <img src={round1} className='inline pb-[2px] pr-1 w-[8pt]' /> 09:00-10:00</td>
                <td className="text-left text-sm pb-4">
                  <p>Academician's Speech on</p>
                  <p>Chemical Synthetic Biology</p>
                </td>
              </tr>
              <tr>
                <td className="text-left text-xs pr-6 pb-4"> <img src={round1} className='invisible inline pb-[2px] pr-1 w-[8pt]' /> 10:00-10:15</td>
                <td className="text-left text-sm pb-4 italic">Coffee Break</td>
              </tr>
              <tr>
                <td className="text-left text-xs pr-6 pb-4"> <img src={round1} className='inline pb-[2px] pr-1 w-[8pt]' /> 10:15-11:00</td>
                <td className="text-left text-sm pb-4">
                  <p>Entrepreneur's Speech on </p>
                  <p>Chemical Synthetic Biology</p>
                </td>
              </tr>
              <tr>
                <td className="text-left text-xs pr-6 pb-4"> <img src={round1} className='inline pb-[2px] pr-1 w-[8pt]' /> 11:00-12:00</td>
                <td className="text-left text-sm pb-4">
                  <p>Academic Frontier of</p>
                  <p>Chemical Synthetic Biology</p>
                </td>
              </tr>
              <tr>
                <td className="text-left text-xs pr-6 pb-4"> <img src={round1} className='invisible inline pb-[2px] pr-1 w-[8pt]' /> 12:00-12:15</td>
                <td className="text-left text-sm pb-4 italic">Group photograph</td>
              </tr>
              <tr>
                <td className="text-left text-xs pr-6 pb-4"> <img src={round1} className='inline pb-[2px] pr-1 w-[8pt]' /> 12:15-13:30</td>
                <td className="text-left text-sm pb-4">Lunch</td>
              </tr>
              <tr>
                <td className="text-left text-xs pr-6 pb-4"> <img src={round1} className='inline pb-[2px] pr-1 w-[8pt]' /> 13:30-14:30</td>
                <td className="text-left text-sm pb-4">
                  <p>Academician's Speech on</p>
                  <p>Chemical Synthetic Biology</p>
                </td>
              </tr>
              <tr>
                <td className="text-left text-xs pr-6 pb-4"> <img src={round1} className='inline pb-[2px] pr-1 w-[8pt]' /> 14:30-16:30</td>
                <td className="text-left text-sm pb-4">
                  <p>Entrepreneur's Speech on </p>
                  <p>Chemical Synthetic Biology</p>
                </td>
              </tr>
              <tr>
                <td className="text-left text-xs pr-6 pb-4"> <img src={round1} className='invisible inline pb-[2px] pr-1 w-[8pt]' /> 16:30-16:45</td>
                <td className="text-left text-sm pb-4 italic">Coffee Break</td>
              </tr>
              <tr>
                <td className="text-left text-xs pr-6 pb-4"> <img src={round1} className='inline pb-[2px] pr-1 w-[8pt]' /> 16:45-18:00</td>
                <td className="text-left text-sm pb-4">
                  <p>Roundtable Forum on </p>
                  <p>Chemical Synthetic Biology Investment</p>
                </td>
              </tr>
              <tr>
                <td className="text-left text-xs pr-6 pb-4"> <img src={round1} className='inline pb-[2px] pr-1 w-[8pt]' /> 18:00-19:00</td>
                <td className="text-left text-sm pb-4">Dinner</td>
              </tr>
              <tr>
                <td className="text-left text-xs pr-6 pb-4"> <img src={round1} className='inline pb-[2px] pr-1 w-[8pt]' /> 19:00-22:00</td>
                <td className="text-left text-sm pb-4">Sub-Fourm</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>  
      </div>  {/* 1107 的 flex */}
     </div>     // 会议议程 - 网页端 
    )}



   {/* 会议直播 */}
   {/* 修改直播图片大小的话， 直接修改下面的 py-96  */}
   <div className='grid grid-cols-1 items-center justify-items-center  py-52  md:bg-appBglive md:bg-contain bg-appBglive bg-contain' 
    ref={liveRef}
    >
      { isMobile ? (
        <><div><img src={livepng} className='w-[246pt] h-[239pt] cursor-pointer'
              onClick = {jumplink} /></div>
      <div><p className='pt-2 text-gray-100 text-lg font-light cursor-pointer'
              onClick = {jumplink} >Watch the meeting live</p></div>
              </>)
              :
      (
        <><div><img src={weblive} className='w-[838px] h-[434px] cursor-pointer'
              onClick = {jumplink} /></div>
      <div><p className='pt-2 text-gray-100 text-lg font-light cursor-pointer'
              onClick = {jumplink} >Watch the meeting live</p></div>
              </>
      )}
    </div>


    {/* 移动端：关于 */}
    { isMobile ? (
    <div className='bg-appbgabout bg-cover'>
      <div className='pl-[30px] grid grid-cols-1  pt-20 pb-6 text-gray-50 text-base' ref={aboutRef} >
        <img src={organization} className='w-[171pt] h-[14.5pt]' />
        <div className='pt-4'>
          <span className='pt-4 inline' > Directed by  Tianjin University;  Science and Technology Department of Zhejiang Province </span>  
        </div>
        <div className='pt-4'>
          <span className='pt-4 inline' > Hosted by  Zhejiang Alumni of Tianjin University；Peiyang Begonia Fund</span>
        </div>
      </div>
      

    <div className='w-screen h-auto bg-white pl-[30px] '>
      {/* <p className='font-bold text-lg py-8' > 承办单位：</p> */}
      <p className='text-base  py-8'> Organized by Hangzhou Qiantang New Area Bureau of Economic lnformatization, Science and Technology</p>
      <img src={corpTianhua} className='w-[36pt] h-[24pt] mb-1'/>
      <p className='text-base'>Zhejiang Tianhua Technology Development Co., Ltd.</p>

      {/* <p className='font-bold text-lg py-8'> 协办单位：</p> */}
      <img src={corpLvcheng} className='w-[65.5pt] h-[20pt] mb-1 py-8'/>
      <p className='text-base'>  Supported by Greentown Technology Industry Group Co.,Ltd.</p>

      <img src={CorpLianchuan} className='w-[65.5pt] h-[20pt] mb-1 mt-8'/>
      <p className='text-base pb-8'>  Lc-bio Technologies (Hangzhou)Co.,Ltd.</p>


      <img src={CropZhonghua} className='w-[55.5pt] h-[28.5pt] mb-1'/>
      <p className='text-base pb-2'>  Sinochem Lantian Group Co.,Ltd.</p>
      <p className='text-base pb-8'>  Lanqi Biotech nology (zhejiang)New Materials Co.,Ltd</p>

      <img src={CropDonggeng} className='w-[57.5pt] h-[19pt] mb-1'/>
      <p className='text-base pb-8'>  Shanghai Dodgen Chemical Technology Co.,Ltd.</p>

      <img src={CorpDeshang} className='w-[43.5pt] h-[27.5pt] mb-1'/>
      <p className='text-base pb-8'>  Tianjin Brillante Technology Co.,Ltd.</p>

      <img src={CorpMirui} className='w-[91pt] h-[24pt] mb-1'/>
      <p className='text-base pb-8'>  MiRXES(Hangzhou) Biotechnology Co.,Ltd. </p>
    </div>

    <div className='px-[30px] text-gray-50'>
      <img src={MeetingBg} className='w-[163pt] h-[14.5pt] mt-10 mb-8' />
      <p>
      Synthetic biology is one of the most promising fields of modern science and the key technology to transform and boost the future chemical and energy industry. Tianjin University is one of the earliest units to carry out research on synthetic biology in China, and the first university to establish master's , doctor's program and undergraduate training program in synthetic biology in China. This forum, jointly held betweeen Tianjin University and Zhejiang Province, has invited international academic, industry and investment experts to show the most frontier science, technology, industry level and needs, and investment strategy, and to discuss the collaboration of all parties involved. 
      </p>

    </div>


    <div className='px-[30px] text-gray-50  pt-2'>
      <img src={Connect} className='w-[97pt] h-[14.5pt] mt-10 mb-8' />
    </div>
    <div className='grid grid-cols-4 gap-4 pl-[30px] text-gray-50 text-left pb-12'>
      <div>Venue </div>
      <div className='col-span-3'>
        <div>QianTang District, Hangzhou</div>
        <div className='text-sm'>No.523，Jinsha Avenue,HEDA,Hangzhou，310008,zhejiang,China</div>
      </div>
      <div className='flex justify-between pr-3'>
        <div>Contact </div>

      </div>        
      <div className='col-span-3'>
        <div>Ms.Qing Pan, 18689857586</div>
      </div>
      <div className='flex justify-between pr-3'>
        <div>E-mail </div>

      </div>        
      <div className='col-span-3'>
        <div>panqing@zj-th.com.cn</div>
      </div>
    </div>
    </div>)


     :



    //  web 端的 About
    (
    <div ref={aboutRef}>
      <div className='flex items-center justify-center content-center flex-row md:bg-webaboutbg pl-20 pt-12'> {/*  1106 的 flex */}
        <div>
          <img src={organization} className='w-[171pt] h-[14.5pt] mr-10' />
        </div>

        <div className='text-gray-50 text-base pl-16 pb-6 pt-8'>
          <div className='pt-4  '>
            <span className='pt-4 inline' > Directed by  Tianjin University;  Science and Technology Department of Zhejiang Province</span>  
          </div>
          <div className='pt-4'>
            <span className='pt-4 inline' > Hosted by  Zhejiang Alumni of Tianjin University；Peiyang Begonia Fund</span>  
          </div>
        </div>
      </div>


     {/* web */}
      <div className='flex  justify-center flex-row  pl-[24px] pt-14 items-end'>
        <table className="">
          <tbody className="">
            <tr> 
              <td className="pt-[40px] text-left"> Organized by </td>
              <td className="text-left pt-1 pl-8">
                <div className=''>
                  <img src={corpTianhua} className='w-[36pt] h-[24pt] mb-1'/>
                  <p className='text-base'>Zhejiang Tianhua Technology Development Co., Ltd.</p>  
                </div>  
              </td>
              <td className='flex items-end pl-8'>
                <div className='flex items-end'>
                  <div className='text-base pt-10'>
                    <p> Hangzhou Qiantang New Area Bureau of </p>
                    <p>Economic lnformatization, Science and Technology </p>
                  </div>
                </div>
              </td>
            </tr>
            <tr> 
              <td className="pt-[40px] text-left"> supported by </td>
              <td className="text-left pt-1 pl-8">
                <div className='pt-2'>
                  <img src={corpLvcheng} className='w-[65.5pt] h-[20pt] mb-1'/>
                  <p className='text-base'>  Greentown Technology Industry Group Co.,Ltd.</p>
                </div>  
              </td>
              <td className='pl-8 pt-[10px]'>
                <img src={CorpLianchuan} className='w-[65.5pt] h-[20pt] mb-1 mt-8'/>
                <p className='text-base pb-8'> Lc-bio Technologies (Hangzhou)Co.,Ltd.</p>
              </td>
            </tr>

            <tr> 
              <td className="pt-[40px] text-left"> </td>
              <td className="text-left pt-1 pl-8">
                <div className='pt-7'>
                  <img src={CropZhonghua} className='w-[55.5pt] h-[28.5pt] mb-1'/>
                  <p className='text-base pb-2'>  Sinochem Lantian Group Co.,Ltd.</p>
                  <p className='text-base pb-8'>  Lanqi Biotech nology (zhejiang)New Materials Co.,Ltd.</p>
                </div>  
              </td>
              <td className='pl-8 pt-[10px]'>
                <img src={CropDonggeng} className='w-[57.5pt] h-[19pt] mb-1'/>
                <p className='text-base pb-8'>  Shanghai Dodgen Chemical Technology Co.,Ltd.</p>
              </td>
            </tr>


            <tr> 
              <td className="pt-[40px] text-left"> </td>
              <td className="text-left pt-1 pl-8">
                <div className=''>
                  <img src={CorpDeshang} className='w-[43.5pt] h-[27.5pt] mb-1'/>
                  <p className='text-base pb-8'>  Tianjin Brillante Technology Co.,Ltd.</p>
                </div>  
              </td>
              <td className='pl-8 pt-2'>
                <img src={CorpMirui} className='w-[91pt] h-[24pt] mb-1'/>
                <p className='text-base pb-8'>  MiRXES(Hangzhou) Biotechnology Co.,Ltd. </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>


      {/* web 会议背景  Introduction */}
      <div className='flex  justify-center content-center flex-row md:bg-webaboutbg text-gray-50 pl-[100px] py-6 pb-4'> {/* 1106 的 flex */}
        <div className='mr-20 pt-14'>
          <img src={MeetingBg} className='w-[163pt] h-[14.5pt]' />
        </div>
          <div className='w-[700px]'>
            <p> Synthetic biology is one of the most promising fields of modern science and the key technology to transform and boost the future chemical and energy industry. Tianjin University is one of the earliest units to carry out research on synthetic biology in China, and the first university to establish master's , doctor's program and undergraduate training program in synthetic biology in China. </p>
            <p className='pt-2'> This forum, jointly held betweeen Tianjin University and Zhejiang Province, has invited international academic, industry and investment experts to show the most frontier science, technology, industry level and needs, and investment strategy, and to discuss the collaboration of all parties involved. </p>
            </div>
      </div>


      {/* web 联系地址*/}
      <div className='flex justify-center content-center flex-row md:bg-webaboutbg'> {/* 1106 的 flex */}
        <div className='mr-20 pt-8'>
          <img src={Connect} className='w-[97pt] h-[14.5pt]' />
        </div>

        <div className='grid grid-cols-4 gap-4 pl-[30px] text-gray-50 text-left font-light mt-8 mb-10'>
          <div>Venue: </div>
          <div className='col-span-3'>
            <div>QianTang District, Hangzhou</div>
            <div className='text-sm'>No.523，Jinsha Avenue,HEDA,Hangzhou，310008,zhejiang,China</div>
          </div>
          <div className='flex justify-between pr-3'>
            <div>Contact: </div>

          </div>        
          <div className='col-span-3'>
            <div>Ms.Qing Pan，18689857586</div>
          </div>
          <div className='flex justify-between pr-3'>
            <div>E-mail: </div>

          </div>        
          <div className='col-span-3'>
            <div>panqing@zj-th.com.cn</div>
          </div>
          {/* <div>协办单位 </div>
          <div className='col-span-3'>
            <div>绿城科技产业服务集团有限公司</div>
          </div> */}
        </div>
      </div>
    </div>
    )
    }  {/*关于*/} 

    
    {/*  备案信息 */}
      <div className='bg-webaboutbg bg-cover'>
        {/* <div  className="h-[5px] w-96 bg-gradient-to-r from-[#6DD6EC] to-[#DC7DFB]"></div> */}
        <hr className='md:mx-64 mx-12'/>
        <div className='py-4 flex justify-center items-center content-center text-center text-slate-50'>
          <button onClick={jumpoffice}> 浙ICP备2022028247号-1 </button>
        </div>
      </div>

    {/* 
        <div className=" bg-inherit pt-20 text-gray-500" ref={guestRef}>
            <h2>嘉宾-施工中</h2>
        </div>
    */}

  </div>
  )
};

export default MainEng;


// /*
//     <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
//       <div className="container flex flex-wrap justify-between items-center mx-auto">
//       <a href="https://flowbite.com/" className="flex items-center">
//           <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
//           <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
//       </a>
//       <div className="flex items-center md:order-2">
//           <button type="button" data-dropdown-toggle="language-dropdown-menu" className="inline-flex justify-center items-center p-2 text-sm text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
//             {/* <svg className="mr-2 w-5 h-5 rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 3900 3900"><path fill="#b22234" d="M0 0h7410v3900H0z"/><path d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0" stroke="#fff" stroke-width="300"/><path fill="#3c3b6e" d="M0 0h2964v2100H0z"/><g fill="#fff"><g id="d"><g id="c"><g id="e"><g id="b"><path id="a" d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"/><use xlink:href="#a" y="420"/><use xlink:href="#a" y="840"/><use xlink:href="#a" y="1260"/></g><use xlink:href="#a" y="1680"/></g><use xlink:href="#b" x="247" y="210"/></g><use xlink:href="#c" x="494"/></g><use xlink:href="#d" x="988"/><use xlink:href="#c" x="1976"/><use xlink:href="#e" x="2470"/></g></svg> */}
//             English (US)
//           </button>
//           {/* <!-- Dropdown --> */}
//           <div className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700" id="language-dropdown-menu">
//             <ul className="py-1" role="none">
//               <li>
//                 <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
//                   <div className="inline-flex items-center">
//                     {/* <svg aria-hidden="true" className="h-3.5 w-3.5 rounded-full mr-2" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-us" viewBox="0 0 512 512"><g fill-rule="evenodd"><g stroke-width="1pt"><path fill="#bd3d44" d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z" transform="scale(3.9385)"/><path fill="#fff" d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z" transform="scale(3.9385)"/></g><path fill="#192f5d" d="M0 0h98.8v70H0z" transform="scale(3.9385)"/><path fill="#fff" d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7L74 8.5l-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 24.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 21.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 38.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 35.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 52.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 49.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 66.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 63.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9z" transform="scale(3.9385)"/></g></svg>               */}
//                     English (US)
//                   </div>
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
//                   <div className="inline-flex items-center">
//                     {/* <svg className="h-3.5 w-3.5 rounded-full mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-de" viewBox="0 0 512 512"><path fill="#ffce00" d="M0 341.3h512V512H0z"/><path d="M0 0h512v170.7H0z"/><path fill="#d00" d="M0 170.7h512v170.6H0z"/></svg> */}
//                     Deutsch
//                   </div>
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
//                   <div className="inline-flex items-center">
//                     {/* <svg className="h-3.5 w-3.5 rounded-full mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-it" viewBox="0 0 512 512"><g fill-rule="evenodd" stroke-width="1pt"><path fill="#fff" d="M0 0h512v512H0z"/><path fill="#009246" d="M0 0h170.7v512H0z"/><path fill="#ce2b37" d="M341.3 0H512v512H341.3z"/></g></svg>               */}
//                     Italiano
//                   </div>
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
//                   <div className="inline-flex items-center">
//                     {/* <svg className="h-3.5 w-3.5 rounded-full mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="flag-icon-css-cn" viewBox="0 0 512 512"><defs><path id="a" fill="#ffde00" d="M1-.3L-.7.8 0-1 .6.8-1-.3z"/></defs><path fill="#de2910" d="M0 0h512v512H0z"/><use width="30" height="20" transform="matrix(76.8 0 0 76.8 128 128)" xlink:href="#a"/><use width="30" height="20" transform="rotate(-121 142.6 -47) scale(25.5827)" xlink:href="#a"/><use width="30" height="20" transform="rotate(-98.1 198 -82) scale(25.6)" xlink:href="#a"/><use width="30" height="20" transform="rotate(-74 272.4 -114) scale(25.6137)" xlink:href="#a"/><use width="30" height="20" transform="matrix(16 -19.968 19.968 16 256 230.4)" xlink:href="#a"/></svg> */}
//                     中文 (繁體)
//                   </div>
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <button data-collapse-toggle="mobile-menu-language-select" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-language-select" aria-expanded="false">
//           <span className="sr-only">Open main menu</span>
//           {/* <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" aria-hidden="true" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg> */}
//         </button>
//       </div>
//       <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-language-select">
//         <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//           <li>
//             <a href="#" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
//           </li>
//           <li>
//             <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
//           </li>
//           <li>
//             <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
//           </li>
//           <li>
//             <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Pricing</a>
//           </li>
//           <li>
//             <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
//           </li>
//         </ul>
//       </div>
//       </div>
//     </nav>
// */


//生成代码：
