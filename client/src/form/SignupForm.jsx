import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "react-query";
import apiClient from "../api/http-common";


export default function SignupForm() {
  const [institution, setInstitution] = useState('高校、研究机构');
  const [participation, setParticipation] = useState('线上');
  const [name, setName] = useState('');
  const [employedInstitution, setEmployedInstitution] = useState('');
  const [position, setPosition] = useState('');
  const [contacts, setContacts] = useState('');
  

  const nameHandler = (e) => {  setName(e.target.value) }
  const employedInstitutionHandler = (e) => {  setEmployedInstitution(e.target.value) }
  const positionHandler = (e) => {  setPosition(e.target.value) }
  const contactsHandler = (e) => {  setContacts(e.target.value) }

  const sumitHandler = (e) => {
    e.preventdefault();
  }
  const handleChange = (e) => {
    setInstitution(e.target.value)
  }
  const handlePartihange = (e) => {
    setParticipation(e.target.value)
  }
  console.log('institution', institution)
  console.log('participation', participation)

  const [postResult, setPostResult] = useState({'status':null, 'res':null});

  const applyFunc = (func, e) => {
    try { 
      alert('报名成功！')
      func(); 
    } 
    catch (err) { 
      console.log('err', err)
     }
  }

  const { isLoading: isPostingTutorial, mutate: postWord } = useMutation(
    async () => {
      return await apiClient.post(`/form`,  {
        name,
        employedInstitution,
        position,
        contacts,
        institution,
        participation,
      })},
    {
      onSuccess: (res) => { setPostResult({status: 'success',res: res}) },
      onError: (err) => { setPostResult({status: 'error', res: err.response?.data || err});},
    }
  );

  return (
    <div className="flex min-h-screen items-center justify-start bg-white">
    <div className="mx-auto w-full max-w-lg">
      <h1 className="text-3xl font-medium">2022 国际化学合成生物学</h1>
      <h1 className="text-2xl font-medium">前沿科技论坛（杭州）</h1>
      <p className="mt-3 text-gray-700">报名表单填写：</p>
  
      <form className="mt-10">
      
        <div className="grid gap-2 sm:grid-cols-1">
          <div className="relative z-0">
            <input type="text" name="name" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-b'a's'e text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " 
              value={name}
              onChange = {nameHandler} />
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">姓名（或称呼）</label>
          </div>



          <div className="relative z-0 mt-4">
            <input type="text" name="name" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-base text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " 
              value={employedInstitution}
              onChange = {employedInstitutionHandler} />
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"> 就职单位 </label>
          </div>

          <div>  {/* institution */}
            <div className='text-base  text-gray-800  mt-4'> 组织机构： </div>
            <div className="flex items-center  pt-2 ml-2">
              <input id="default-radio-1" type="radio" value="高校、研究机构" name="高校、研究机构" className="w-4 h-4  bg-gray-100 border-gray-300  focus:ring-2 " 
                checked={institution === '高校、研究机构'}
                onChange={handleChange}/>
              <label htmlFor="default-radio-1" className="ml-2 text-sm  text-gray-500 dark:text-gray-300">高校、研究机构</label>
            </div>
            <div className="flex items-center pt-2 ml-2">
              <input id="default-radio-2" type="radio" value="企业" name="企业" className="w-4 h-4  bg-gray-100 border-gray-300    dark:ring-offset-gray-800 focus:ring-2"
                checked={institution === '企业'}
                onChange={handleChange}/>
              <label htmlFor="default-radio-2" className="ml-2 text-sm  text-gray-500 dark:text-gray-300">企业</label>
            </div>
            <div className="flex items-center pt-2 ml-2">
              <input id="default-radio-2" type="radio" value="投资机构" name="投资机构" className="w-4 h-4  bg-gray-100 border-gray-300    dark:ring-offset-gray-800 focus:ring-2"
                checked={institution === '投资机构'}
                onChange={handleChange}/>
              <label htmlFor="default-radio-2" className="ml-2 text-sm  text-gray-500 dark:text-gray-300">投资机构</label>
            </div>
          </div>

          <div className="relative z-0 mt-4">
            <input type="text" name="name" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-base text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " 
              value={position}
              onChange = {positionHandler} />
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"> 职务 </label>
          </div>

          <div className="relative z-0 mt-4">
            <input type="text" name="name" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-base text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " 
              value={contacts}
              onChange = {contactsHandler} />
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"> 联系方式（电话/邮箱）</label>
          </div>




          <div>  {/* participation */}
            <div className='text-base  text-gray-800  mt-4'> 参会方式： </div>
            <div className="flex items-center  pt-2">
              <input id="default-radio-3" type="radio" value="线上" name="线上" className="w-4 h-4  bg-gray-100 border-gray-300  focus:ring-2 " 
                checked={participation === '线上'}
                onChange={handlePartihange}/>
              <label htmlFor="default-radio-3" className="ml-2 text-sm  text-gray-500 dark:text-gray-300">线上</label>
            </div>
            <div className="flex items-center pt-2">
              <input id="default-radio-4" type="radio" value="线下" name="线下" className="w-4 h-4  bg-gray-100 border-gray-300    dark:ring-offset-gray-800 focus:ring-2"
                checked={participation === '线下'}
                onChange={handlePartihange}/>
              <label htmlFor="default-radio-4" className="ml-2 text-sm  text-gray-500 dark:text-gray-300">线下</label>
            </div>
          </div>


        </div>
      </form>
      <div className='flex flex-col justify-center'> 
        <button type="submit" className="mt-5  w-auto rounded-md bg-black px-10 py-2 text-white"
            onClick={e => applyFunc(postWord)}> 参会登记 </button>
      </div>
    </div>
  </div>
  );
}
