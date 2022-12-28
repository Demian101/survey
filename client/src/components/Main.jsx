import React, { useRef, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { Button } from "./Button";
import { AiOutlineMenu } from "react-icons/ai";

// png
import arrow from '../assets/slices/arrow.png';

import location from '../assets/slices/zhiyuandidian3@2x.png'
import calendar from '../assets/slices/Calendar@2x.png'
import logo from '../assets/slices/logo@2x.png';
import menu from '../assets/slices/menu.png';

import date from '../assets/date.png'

import CorpLianchuan from '../assets/corps/CorpLianchuan.png'
import corpLvcheng from '../assets/corps/corpLvcheng.png'
import corpTianhua from '../assets/corps/corpTianhua.png'
import CropDonggeng from '../assets/corps/CropDonggeng.png'
import CropZhonghua from '../assets/corps/CropZhonghua.png'
import CorpDeshang from '../assets/corps/CorpDeshang.png'
import CorpMirui from '../assets/corps/CorpMirui.png'

import organization from '../assets/corps/organization.png'
import MeetingBg from '../assets/corps/MeetingBg.png'
import Connect from '../assets/corps/Connect.png'
import livepng from '../assets/corps/live.png'
import weblive from '../assets/corps/weblive.png'


import Frame1 from '../assets/Timelineslices/Frame1@2x.png';
import Frame2 from '../assets/Timelineslices/Frame2@2x.png';
import triarrow from '../assets/Timelineslices/triarrow.png';


import MeetingArrange from '../assets/Timelineslices/MeetingArrange.png';
import round1 from '../assets/Timelineslices/round1.png';
import { useNavigate } from "react-router-dom";

import logintakepartin from '../assets/slices/logintakepartin.png';
import MainEng from './MainEng';



const Main = () => {
  const [lang, setLang] = useState('zh')
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

  const scrollDown = (ref, setFlag = true) => {
    if (setFlag) { setOpen(!open) }
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


  if (lang === 'en') {
    return (<MainEng />)
  }
  return (
    <div className='w-screen h-auto bg-appbg md:bg-webbghome bg-contain bg-repeat mt-14 bg-clip-padding' ref={topRef}>
      {/* <NavBar {...argRef}/> */}

      {/* NavBar  */}
      {/* <div className="shadow-md z-20 w-full fixed top-0 left-0  bg-gradient-to-r from-indigo-800 via-purple-600 to-black"> */}
      <div className="shadow-md w-full fixed top-0 left-0 bg-webaboutbg  z-20">
        <div className="flex items-center justify-between md:px-10 py-3 px-7">

          <div>
            <img src={logo} className={`${isMobile ? "w-7/12 h-auto pb-2" : "w-[264px] h-[69px] mr-20 ml-32"}`} alt="logo" />
          </div>
          <div>
            <select
              className={`${isMobile ? 'visible' : 'hidden'} bg-inherit text-gray-50 text-sm mr-2`}
              defaultValue="zh"
              onChange={(e) => onChangeHandler(e)} >
              <option value="zh">Zh</option>
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
            className={`md:text-base md:flex md:items-center md:pb-0 pb-2 rounded-md absolute md:static bg-gray-900 bg-opacity-90 md:bg-inherit md:z-auto -z-40 left-0 w-full md:w-auto md:pl-0 pl-9  duration-75 transition-all  ease-in ${open ? " top-[55px]" : "top-[-490px]"
              }`}
          >

            <li className="md:ml-8 md:my-0 my-7">
              {/* <a href={"/"} className="text-slate-50 hover:text-gray-400 duration-500" >
                {"首页"} </a> */}
              <button onClick={() => scrollDown(topRef)} className="text-slate-50 hover:text-gray-400 duration-500" >
                首页 </button>

            </li>
            <li className="md:ml-8  md:my-0 my-7">
              <button onClick={() => scrollDown(argRef)} className="text-slate-50 hover:text-gray-400 duration-500" >
                会议安排 </button>
            </li>


            <li className="md:ml-8   md:my-0 my-7">
              <button onClick={() => scrollDown(liveRef)} className="text-slate-50 hover:text-gray-400 duration-500" >
                直播 </button>
            </li>

            <li className="md:ml-8 md:my-0 my-7">
              <button onClick={() => scrollDown(aboutRef)} className="text-slate-50 hover:text-gray-400 duration-500" >
                关于 </button>
            </li>

            {/* <li className="md:ml-8 text-xl md:my-0 my-7">
              <button onClick={()=>scrollDown(guestRef)} className="text-slate-50 hover:text-gray-400 duration-500" >
              嘉宾 </button>
            </li> */}


            <div className='flex md:flex-row md:items-center md:justify-between md:content-center text-white py-1 rounded-lg md:ml-12  duration-200'>
              <select
                className={`${isMobile ? 'hidden' : 'visible'} bg-inherit text-gray-50 text-lg mr-2`}
                defaultValue="zh"
                onChange={(e) => onChangeHandler(e)} >
                <option value="zh">zh</option>
                <option value="en">Eng</option>
              </select>

              <button
                className="bg-no-repeat "
                onClick={() => navigate("/form")}
              >
                <img src={logintakepartin} className='w-[120px] h-[41px]' />
                {/* {props.children} */}
              </button>
            </div>


            {/* <button className='w-10 z-30 h-6'>注册参会</button> */}
          </ul>

        </div>
      </div>   {/* NavBar */}


      <div> &nbsp; </div>
      {/* <div className='bg-[url("../../assets/slices/logintakepartin.png")] bg-no-repeat'> 2222222222</div> */}

      {/* 论坛 大海报 */}
      {isMobile ?
        (<div>
          <img src={'./maintitle/-s-main.png'} className="cursor-pointer w-4/5 mt-24 mx-10 md:w-9/12 md:mt-24 md:ml-36" alt="logo" />
        </div>) : (

          // Web 端主图大海报
          <div className='flex items-center justify-center align-middle content-center pr-4 mt-24 pt-20'>
            <img src={'./maintitle/-s-main title.png'} className="cursor-pointer  w-9/12" alt="logo" />
          </div>
        )
      }

      {/* 时间表、地址 */}
      {/* <div className='flex justify-center'>
        <div className='pt-2'>
          <span> <img src={calendar} className='w-4 inline pb-1' /></span>
          <span className='text-lg text-slate-50 pt-10 ml-1'> 2023 年1月7日  &nbsp;&nbsp;&nbsp; </span>
        </div>
        <div className='pt-2 pl-4'>
          <span> <img src={location} className='w-4 inline pb-1' /></span>
          <span className='text-lg text-slate-50 pt-10 ml-1'> 杭州市钱塘区  &nbsp;&nbsp;&nbsp; </span>
        </div>
      </div> */}
      <div className='grid grid-cols-1 gap-1 md:flex md:justify-center'>
        <div className='pt-2 pl-10'>
          <span> <img src={calendar} className='w-4 inline pb-1' /></span>
          <span className='text-lg text-slate-50 pt-10 ml-1'> 2023 年1月7日  &nbsp;&nbsp;&nbsp; </span>
        </div>
        <div className='pt-2 pl-10'>
          <span> <img src={location} className='w-4 inline pb-1' /></span>
          <span className='text-lg text-slate-50 pt-10 ml-1'> 杭州市钱塘区  &nbsp;&nbsp;&nbsp; </span>
        </div>
      </div>


      {/* 注册参会按钮 */}
      <div className='md:flex md:justify-center pt-10 px-10 md:mb-5'>
        <button className='px-6 py-3 bg-gradient bg-no-repeat rounded-md shadow-2xl text-lg text-black w-[160px] h-[61px]'
          onClick={() => navigate("/form")}>
          注册参会
        </button>
      </div>

      {isMobile &&
        <div className='pt-4 mb-36 '
          onClick={() => scrollDown(argRef, false)}>
          <span className='text-white px-14 pt-4 mt-4 '> 会议议程
            <img src={arrow} className='ml-1 w-[8pt] h-[5pt] inline' />
          </span>
        </div>
      }

      {isMobile && (
        // {/* 11.06 内容 - 移动端！！！！！！！ */}
        <div className='md:bg-webbgschedule bg-appbgschedule bg-cover bg-no-repeat w-screen h-auto text-slate-50 pb-40'>
          <div className='grid grid-cols-1 gap-2 pl-8 font-PingFang pt-16' ref={argRef}>
            <img src={MeetingArrange} className='w-[102pt] h-[23pt]' />
          {/*
            <img src={date} className='w-[216pt] h-[45pt] mt-4 mb-3' />
            <p className='text-[20px]'>2022 合成生物学国际论坛</p>
            <p className='text-[16px] w-full pb-2'>暨杭州市科技成果转移转化首选地“钱塘论坛”</p>
            <div>
              <span><img src={location} className='w-[12.5pt] h-[16pt] inline pb-1' /></span>
              <span className='text-[20px] pb-8  inline'> 杭州市钱塘区 </span>
            </div>

            <div className='mt-12 text-center pr-4 text-[20px]'>
              <p className=''> 请点击下方按钮下载  </p>
              <p className='text-center'> 详细会议议程  </p>
              <div className='md:flex md:justify-center pt-6 px-10 md:mb-5'>
                <button className='py-1 bg-gradient bg-cover rounded-md shadow-2xl text-lg text-black w-[120px] h-[45px]'>
                  <a href='./2022_合成生物学国际论坛暨杭州市科技成果转移转化首选地“钱塘.docx'>下载议程</a>
                </button>
              </div>
            </div> 
          */}
          <img src="./img1215/tmp11月07mobile.png" className="p-4"/>

          </div>
        </div>
      )}


      {/*
      *
      ****  Web 网页端  **************************************************************************
      *
      */}
      {!isMobile && (
        // 11.06 内容
        <div className='bg-webbgschedule pt-24 pb-24' ref={argRef}>
          <div className='flex items-center justify-center content-center flex-col'> {/* 1106 的 flex */}

            <div className='relative' >
              <div className='w-[102.5pt] h-[23pt] pt-1 pb-3'>
                <img src={MeetingArrange} className='w-auto ml-10' />
              </div>

            {/* 
              <img className='w-[1025px] h-auto pt-10' src={'./img/schedule1.png'} />
              <img className='w-[1025px] h-auto pt-10' src={'./img/schedule2.png'} /> 
            */}
              <img className="pt-28" src={'./img1215/tmp11月07.png'} /> 
            </div>   {/* 1106 的 flex */}

          </div>
        </div>     // 会议议程 - 网页端 
      )}



      {/* 会议直播 */}
      {/* 修改直播图片大小的话， 直接修改下面的 py-96  */}
      <div className='grid grid-cols-1 items-center justify-items-center py-52 md:bg-appBglive md:bg-contain bg-appBglive bg-contain'
        ref={liveRef}
      >
        {isMobile ? (
          <><div><img src={livepng} className='w-[246pt] h-[239pt] cursor-pointer'
            onClick={jumplink} /></div>
            <div><p className='pt-2 text-gray-100 text-lg font-thin cursor-pointer'
              onClick={jumplink} >观看会议直播</p></div>
          </>)
          :
          (
            <><div><img src={weblive} className='w-[838px] h-[434px] cursor-pointer'
              onClick={jumplink} /></div>
              <div><p className='pt-2 text-gray-100 text-lg font-thin cursor-pointer'
                onClick={jumplink} >观看会议直播</p></div>
            </>
          )}
      </div>


      {/* 移动端：关于 */}
      {isMobile ? (
        <div className='bg-appbgabout bg-cover'>
          <div className='pl-[30px] grid grid-cols-1  pt-20 pb-6 text-gray-50 text-base' ref={aboutRef} >
            <img src={organization} className='w-[100pt] h-[22pt]' />
            <div className='pt-4'>
              <span className='pt-4 inline' > 指导单位： 浙江省科学技术厅  天津大学</span>
            </div>
            <div className='pt-4'>
              <span className='pt-4 inline' > 主办单位：   杭州市科学技术局  </span>
              <p className='pl-[84px]'> 杭州市钱塘新区管理委员会    </p>
              <p className='pl-[84px]'> 天津大学浙江校友会    </p>

            </div>
          </div>

          <div className='w-screen h-auto bg-white pl-[30px]'>
            <p className='font-bold text-lg py-8' > 承办单位：</p>
            <p className='text-base  pb-8'> 杭州市钱塘区经济信息化和科学技术局</p>

            <p className='text-base  pb-8'> 杭州市钱塘区医药港管理办公室</p>

            <img src={corpTianhua} className='w-[36pt] h-[24pt] mb-1' />
            <p className='text-base pb-8  pr-4'>天津大学浙江校友会校友之家(浙江天化科技发展有限公司)</p>

            <p className='text-base  pb-8'>天津大学浙江研究院</p>

            <p className='font-bold text-lg py-8'> 企业社群：</p>

            {/* <img src={corpLvcheng} className='w-[65.5pt] h-[20pt] mb-1'/>
      <p className='text-base'>  绿城科技产业服务集团有限公司</p> */}

            <img src={CorpLianchuan} className='w-[65.5pt] h-[20pt] mb-1' />
            <p className='text-base pb-8'>  杭州联川生物技术股份有限公司</p>


            <img src={CropZhonghua} className='w-[55.5pt] h-[28.5pt] mb-1' />
            <p className='text-base pb-2'>  中化蓝天集团有限公司</p>
            <p className='text-base pb-8'>  蓝启生科（浙江)新材料有限公司</p>

            <img src={CropDonggeng} className='w-[57.5pt] h-[19pt] mb-1' />
            <p className='text-base pb-8'>  上海东庚化工技术有限公司</p>

            <img src={CorpDeshang} className='w-[43.5pt] h-[27.5pt] mb-1' />
            <p className='text-base pb-8'>  天津德尚科技有限公司</p>

            <img src={CorpMirui} className='w-[91pt] h-[24pt] mb-1' />
            <p className='text-base pb-8'>  觅瑞(杭州）生物科技有限公司</p>
          </div>

          <div className='px-[30px] text-gray-50'>
            <img src={MeetingBg} className='w-[102.5pt] h-[23pt] mt-10 mb-8' />
            <p> 合成生物学是现代科学最富前景的领域之一，是将生物科技领域基础研究转化为社会生产力的关键技术。天津大学是国内最早开展合成生物学研究的单位之一，是国内首个建立合成生物学专业硕士点、博士点以及本科生培养的单位。浙江省自 2019 年与天津大学签订战略合作，已在化工、应急医学、智能智造等多领域展开深入合作。 </p>
            <p className='pt-2'> 本次会议依托国家“科技强国”战略，浙江省与天津大学联袂举办合成生物学领域高水平会议，邀请了多位国内外学术界院士级专家、上市企业负责人及著名投资人共同探讨政产学研用各方协同，支持合成生物学研究，推动相关产业高质量发展，打造浙江省合成生物学高地。 </p>
          </div>


          <div className='px-[30px] text-gray-50  pt-2'>
            <img src={Connect} className='w-[102.5pt] h-[23pt] mt-10 mb-8' />
          </div>
          <div className='grid grid-cols-4 gap-4 pl-[30px] text-gray-50 text-left pb-10'>
            <div>会议酒店 </div>
            <div className='col-span-3'>
              <div>杭州市钱塘区</div>
              <div className='text-sm'>浙江省杭州市钱塘江区金沙大道523号</div>
            </div>
            <div className='flex justify-between pr-3'>
              <div>联 </div>
              <div>系 </div>
              <div>人 </div>
            </div>
            <div className='col-span-3'>
              <div>潘清 18689857586</div>
            </div>
            <div className='flex justify-between pr-3'>
              <div>邮 </div>
              <div>箱 </div>
            </div>
            <div className='col-span-3'>
              <div>panqing@zj-th.com.cn</div>
            </div>
            {/* <div>协办单位 </div>
      <div className='col-span-3'>
        <div>绿城科技产业服务集团有限公司</div>
      </div> */}
          </div>
        </div>)


        :



        //  web 端的关于
        (
          <div ref={aboutRef}>
            <div className='flex items-center justify-center content-center flex-row md:bg-webaboutbg'> {/* 1106 的 flex */}
              <div>
                <img src={organization} className='w-[102.5pt] h-[24pt] mr-10' />
              </div>

              <div className='text-gray-50 text-base font-light pl-16 pb-6 pt-8'>
                <div className='pt-4  '>
                  <span className='pt-4 inline' > 指导单位： 浙江省科学技术厅  天津大学</span>
                </div>
                <div className='pt-4'>
                  {/* <span className='pt-4 inline' > 主办单位：   杭州市钱塘新区  杭州市科技局  天津大学浙江校友会  北洋海棠基金</span> */}
                  <span className='pt-4 inline' >主办单位：   杭州市科学技术局  杭州市钱塘新区管理委员会  天津大学浙江校友会</span>
                </div>
              </div>
            </div>


            {/* web */}
            <div className='flex bg-white justify-center flex-row  pl-[24px] pt-14 items-end'>
              <table className="">
                <tbody className="">
                  <tr>
                    <td className="pt-[40px] text-left"> 承办单位：</td>

                    <td className='pl-8 pt-[10px]'>
                      <p className='text-base pb-8'>  杭州市钱塘区经济信息化和科学技术局</p>
                    </td>
                    <td className="text-left pt-[10px] pl-8">
                      <p className='text-base pb-8'>  杭州市钱塘区医药港管理办公室</p>
                    </td>
                  </tr>

                  <tr>
                    <td></td>
                    <td className="text-left pt-1 pl-8">
                      <div className=''>
                        <img src={corpTianhua} className='w-[36pt] h-[24pt] mb-1' />
                        <p className='text-base'>浙江天化科技发展有限公司(浙江天化科技发展有限公司)</p>
                      </div>
                    </td>

                    <td className="text-left pt-1 pl-8">
                      <div className=''>
                        <p className='text-base'>天津大学浙江研究院</p>
                      </div>
                    </td>

                  </tr>



                  <tr>
                    <td className="pt-[40px] text-left"> 企业社群</td>

                    <td className='pl-8 pt-[10px]'>
                      <img src={CorpLianchuan} className='w-[65.5pt] h-[20pt] mb-1 mt-8' />
                      <p className='text-base pb-8'>  杭州联川生物技术股份有限公司</p>
                    </td>
                    <td className="text-left pt-1 pl-8">
                      <div className='pt-2'>

                      </div>
                    </td>            </tr>

                  <tr>
                    <td className="pt-[40px] text-left"> </td>
                    <td className="text-left pt-1 pl-8">
                      <div className='pt-7'>
                        <img src={CropZhonghua} className='w-[55.5pt] h-[28.5pt] mb-1' />
                        <p className='text-base pb-2'>  中化蓝天集团有限公司</p>
                        <p className='text-base pb-8'>  蓝启生科（浙江)新材料有限公司</p>
                      </div>
                    </td>
                    <td className='pl-8 pt-[10px]'>
                      <img src={CropDonggeng} className='w-[57.5pt] h-[19pt] mb-1' />
                      <p className='text-base pb-8'>  上海东庚化工技术有限公司</p>
                    </td>
                  </tr>


                  <tr>
                    <td className="pt-[40px] text-left"> </td>
                    <td className="text-left pt-1 pl-8">
                      <div className=''>
                        <img src={CorpDeshang} className='w-[43.5pt] h-[27.5pt] mb-1' />
                        <p className='text-base pb-8'>  天津德尚科技有限公司</p>
                      </div>
                    </td>
                    <td className='pl-8 pt-2'>
                      <img src={CorpMirui} className='w-[91pt] h-[24pt] mb-1' />
                      <p className='text-base pb-8'>  觅瑞(杭州）生物科技有限公司</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>


            {/* web 会议背景 */}
            <div className='flex justify-center content-center flex-row md:bg-webaboutbg text-gray-50 pl-[240px] py-6 pb-4 pr-60'> {/* 1106 的 flex */}
              <div className='pt-14'>  {/* mr-20 pt-14 */}
                <img src={MeetingBg} className='w-[115.5pt] h-[23pt]' />
              </div>
              <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <div className='w-96 pl-[64px]'>
                <p> 合成生物学是现代科学最富前景的领域之一，是将生物科技领域基础研究转化为社会生产力的关键技术。天津大学是国内最早开展合成生物学研究的单位之一，是国内首个建立合成生物学专业硕士点、博士点以及本科生培养的单位。浙江省自 2019 年与天津大学签订战略合作，已在化工、应急医学、智能智造等多领域展开深入合作。 </p>
                <p className='pt-2'> 本次会议依托国家“科技强国”战略，浙江省与天津大学联袂举办合成生物学领域高水平会议，邀请了多位国内外学术界院士级专家、上市企业负责人及著名投资人共同探讨政产学研用各方协同，支持合成生物学研究，推动相关产业高质量发展，打造浙江省合成生物学高地。 </p>
              </div>
              {/* <div className='grid grid-cols-4 gap-4 pl-[30px] text-gray-50 text-left font-light mt-14 mb-10'>
          <div className='col col-start-2 col-span-3'>
            <p> 合成生物学是现代科学最富前景的领域之一，是将生物科技领域基础研究转化为社会生产力的关键技术。天津大学是国内最早开展合成生物学研究的单位之一，是国内首个建立合成生物学专业硕士点、博士点以及本科生培养的单位。浙江省自 2019 年与天津大学签订战略合作，已在化工、应急医学、智能智造等多领域展开深入合作。 </p>
            <p className='pt-2'> 本次会议依托国家“科技强国”战略，浙江省与天津大学联袂举办合成生物学领域高水平会议，邀请了多位国内外学术界院士级专家、上市企业负责人及著名投资人共同探讨政产学研用各方协同，支持合成生物学研究，推动相关产业高质量发展，打造浙江省合成生物学高地。 </p>
          </div>          
        </div> */}

            </div>


            {/* web 联系地址*/}
            <div className='flex justify-center content-center flex-row md:bg-webaboutbg'> {/* 1106 的 flex */}
              <div className='mr-20 pt-8'>
                <img src={Connect} className='w-[115.5pt] h-[23pt]' />
              </div>

              <div className='grid grid-cols-4 gap-4 pl-[30px] text-gray-50 text-left font-light mt-8 mb-10'>
                <div>会议酒店 </div>
                <div className='col-span-3'>
                  <div>杭州市钱塘区</div>
                  <div className='text-sm'>浙江省杭州市钱塘江区金沙大道523号</div>
                </div>
                <div className='flex justify-between pr-3'>
                  <div>联 </div>
                  <div>系 </div>
                  <div>人 </div>
                </div>
                <div className='col-span-3'>
                  <div>潘清 18689857586</div>
                </div>
                <div className='flex justify-between pr-3'>
                  <div>邮 </div>
                  <div>箱 </div>
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
        <hr className='md:mx-64 mx-12' />
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

export default Main;


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
