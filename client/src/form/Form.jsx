// https://www.tonyvu.co/posts/react-hook-form-tailwind-css
import React, { useState } from "react";
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import httpClient, { baseURL } from "../api/http-common";
import Select from 'react-select'
import { AiOutlineCloudUpload } from "react-icons/ai";
import i18next, { use } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// import * as yup from 'yup' 
// import { yupResolver} from '@hookform/resolvers/yup'
import axios from 'axios'

i18next.use(LanguageDetector).init({
  detection: {
    // order and from where user language should be detected
    order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],

    // keys or params to lookup language from
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    lookupSessionStorage: 'i18nextLng',
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,

    // cache user language on
    caches: ['localStorage', 'cookie'],
    excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

    // optional expire and domain for set cookie
    cookieMinutes: 10,
    cookieDomain: 'myDomain',

    // optional htmlTag with lang attribute, the default is:
    htmlTag: document.documentElement,

    // optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
    cookieOptions: { path: '/', sameSite: 'strict' }
  },
});



const Form = (props) => {

  // 如果需要自己判断的话，原来的逻辑
  const options = [
    { value: 'zh-CN', label: 'zh-CN' },
    { value: 'en-US', label: 'en-US' },
  ]

  const [language, setLanguage] = useState("zh-CN");
  const [selectDefault, setSelectDefault] = useState();  // 语言选择

  const languageHandler = (v, e) => {
    //  console.log('e.target.value', e,v)
    setLanguage(v.value)
  }

  useEffect(() => {
    setLanguage(i18next.language)
  }, [i18next.language]);

  const [data, setData] = useState();  // set Formdata
  const [image, setImage] = useState("");   // 图片上传
  const [isNeed, setIsNeed] = useState(false); // 是否需要酒店
  const [isOnline, setIsOnline] = useState(false); // 线上 or 线下


  // console.log(selectDefault)
  useEffect(() => {
    const dv = options.filter(item => { return item.label === language })
    if (dv?.length > 0) {
      setSelectDefault(dv)
    }
    setSelectDefault({ value: 'zh-CN', label: 'zh-CN' })
  }, [language])

  const [postResult, setPostResult] = useState({ 'status': null, 'res': null });
  const { register, handleSubmit, watch, getValues, formState: { errors } } = useForm();


  const filevalues = getValues('files')
  const convert2base64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result.toString());
    };
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (filevalues && filevalues[0]) {
      convert2base64(filevalues[0])
    }
  }, [filevalues])

  const onSubmit = async (data) => {
    console.log('data', data)
    const formData = new FormData();
    formData.append("files", data.files[0]);
    // formData.append("name", data.name);    // formData.append("email", data.email);
    const keys = Object.keys(data);
    keys.forEach((key, index) => {
      formData.append(key, data[key]);
    });

    setData(formData);

  };

  const postFormdata = async (formData) => {
    // const [_, formData] = queryKey    // 解构出 formData
    console.log('postFormdata 里的 formData', formData)
    const res = await fetch(`${baseURL}/form`, {
      method: "POST",
      headers: {
        Accept: "multipart/form-data",
      },
      body: formData,
    }).then((res) => res.json());
    return res
  }

  const { isLoading: isPostingTutorial, mutate: postForm } = useMutation(
    ['postForm', data],
    () => postFormdata(data),
    {
      onSuccess: (res) => { setPostResult({ status: 'success', res: res }) },
      onError: (err) => { setPostResult({ status: 'error', res: err.response?.data || err }); },
    }
  );

  useEffect(() => {
    // console.log('useEffect postForm!!!!!!!  data.image', data?.image?.substr(0,10))
    if (data) {
      const token = localStorage.getItem("submittedFlag");
      const s_T = localStorage.getItem("submittedTime");
      let diff = (Date.now() - s_T) / (1000 * 60)
      // console.log(diff)
      if (token && diff < 2) {
        alert("您已提交过，请等待 2 分钟后再提交。")
      }
      // else if (!data.image) { console.log('data.image is null ......... ') }
      else {
        localStorage.setItem("submittedFlag", 'submitted');
        localStorage.setItem("submittedTime", Date.now());
        console.log('Post —— postForm ', data)
        postForm();
        alert("提交成功 ~ ")
      }
    }
  }, [data]);




  const [isChnlChecked, setIsChnlChecked] = useState(false);
  const [checkedValue, setCheckedValue] = useState("");

  const chnlOnChange = (e) => {
    if (e.target.value) {
      console.log('chnlOnChange', e.target.value)
      setIsChnlChecked(true)
      setCheckedValue(e.target.value)
    }
  }
  const setInputValue = (e) => {
    // console.log(' setInputValue e.target.value', e.target.value)
    setCheckedValue(e.target.value)
  }

  return (
    <>
      {selectDefault &&
        <div className="flex justify-items-end justify-end pr-2 pt-2">
          <p className='pt-2 pr-1'>language: </p>
          <Select options={options}
            defaultValue={selectDefault}
            onChange={e => languageHandler(e)}
          />
        </div>
      }

      {/* 中文页面 */}
      {(language.startsWith('zh')) ? (

        // <h1 className='text-center text-4xl font-semibold mt-10'>Post a job</h1> 
        <>
          <h1 className="pt-20 text-center text-3xl font-medium">2022 国际化学合成生物学</h1>
          <h1 className="text-center text-2xl font-medium">前沿科技论坛（杭州）</h1>

          <form
            className='max-w-xl w-screen m-auto py-10 mt-10 px-8 border text-gray-700'  // 
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="mb-3 text-gray-500">报名表单填写：</p>
            <label className='text-gray-700 font-medium'>*姓名、称呼：</label>

            <input
              className='border-solid border-gray-300 border py-1 mt-1 px-4 w-full rounded text-gray-700'
              name=''
              placeholder=''
              autoFocus
              {...register("name", { 'required': "Please enter a your name.", })}
            />
            {errors?.name && (
              <div className='mb-3 text-normal text-red-500'>
                {errors?.name.message}
              </div>
            )}

            {/* Radios 单选 - 机构类型  */}
            <label className='text-gray-700 font-medium block mt-4'>*机构类型：</label>
            {errors?.institution && (
              <div className='text-normal text-red-500 '>
                {errors?.institution.message}
              </div>
            )}
            <div>
              <label className='ml-4 inline-block text-sm'>
                <input className='mt-2 mr-1'
                  value='高校、研究机构'
                  type='radio'
                  {...register("institution", { 'required': "This is required.", })}
                />高校、研究机构
              </label></div>

            <div>
              <label className='ml-4 inline-block text-sm'>
                <input className='mt-2 mr-1' type='radio' value='企业' {...register("institution")} />
                企业
              </label>
            </div>

            <div>
              <label className='ml-4 inline-block text-sm'>
                <input className='mt-2 mr-1' type='radio' value='投资机构' {...register("institution")} />
                投资机构
              </label>
            </div>



            {/* Radios 单选 - 就职单位名称： */}
            <label className='text-gray-700 font-medium block mt-4'>*就职单位名称：</label>
            <input
              className='border-solid border-gray-300 border py-1 mt-1 px-4  w-full rounded text-gray-700'
              type='text'
              placeholder=''
              {...register("employedInstitution", { 'required': "This is required.", })}
            />
            {errors?.employedInstitution && (
              <div className='mb-3 text-normal text-red-500 '>
                {errors?.employedInstitution.message}
              </div>
            )}

            <label className='text-gray-700 font-medium block mt-4'>*职务：</label>
            <input
              className='border-solid border-gray-300 border py-1 mt-1 px-4  w-full rounded text-gray-700'
              type='text'
              placeholder=''
              {...register("position", { 'required': "This is required.", })}
            />
            {errors?.position && (
              <div className='mb-3 text-normal text-red-500 '>
                {errors?.position.message}
              </div>
            )}

            <label className='text-gray-700 font-medium block mt-4'>*邮箱：</label>
            <input
              className='border-solid border-gray-300 border py-1 mt-1 px-4  w-full rounded text-gray-700'
              type='email'
              placeholder='请填写 Email...'
              {...register("email", { required: "Please enter your email", })}
            />
            {errors?.email && (
              <div className='mb-3 text-normal text-red-500 '>
                {errors?.email.message}
              </div>
            )}


            <label className='text-gray-700 font-medium block mt-4'>*手机号：</label>
            <input
              className='border-solid border-gray-300 border py-1 mt-1 px-4  w-full rounded text-gray-700'
              type='tel'
              placeholder='请填写手机号...'
              {...register("tel", { required: "Please enter your mobile number.", minLength: 11, maxLength: 11, })}
            />
            {errors?.tel && (
              <div className='mb-3 text-normal text-red-500 '>
                {errors?.tel.message}
              </div>
            )}

            {/*  Radios 单选 - 参与形式  */}
            <label className='text-gray-700 font-medium block mt-4'>*参会形式：</label>
            {errors?.participation && (
              <div className='text-normal text-red-500 '>
                {errors?.participation.message}
              </div>
            )}
            <div> <label className='ml-4 inline-block text-sm'>
              <input
                className='mt-2 mr-1'
                value='线上'
                type='radio'
                onClick={() => { setIsOnline(false) }}
                {...register("participation", { 'required': "This is required.", })}
              />
              线上
            </label></div>

            <div><label className='ml-4 inline-block text-sm'>
              <input className='mt-2 mr-1' type='radio' value='线下' {...register("participation")}
                onClick={() => { setIsOnline(true) }} />
              线下
            </label></div>

            {/* {!watch('files') || watch('files').length === 0 ? ( */}
            <div className='text-gray-700 font-medium mt-4'>
              {image && <img src={image} className='w-48' />}
              {/* <label id="fileupload" className='text-gray-700 font-medium block mt-4'>*参会形式：</label> */}
              <input type="file" id='fileupload' {...register('files', { 'required': '请上传“名片”图片。' })} className='hidden' />
              *<label htmlFor='fileupload'
                className='cursor-pointer '>
                <span className='inline'>请上传“名片” </span>
                <AiOutlineCloudUpload className='w-12 h-6 inline mx-2 bg-slate-300 rounded border-b border-r shadow' />
              </label>
              {errors?.files && <div className='mb-3 text-normal text-red-500'> {errors?.files.message}</div>}
            </div>
            {watch('files') && <strong>{watch('files')[0]?.name}</strong>}

            {isOnline &&
              <>
                <label className='text-gray-700 font-medium block mt-4'>随行人数：</label>
                <input
                  className='border-solid border-gray-300 border py-1 mt-1 px-4  w-full rounded text-gray-700'
                  type='number'
                  {...register("num")}
                />
                {errors?.num && (
                  <div className='mb-3 text-normal text-red-500 '>
                    {errors?.num.message}
                  </div>
                )}

                <label className='text-gray-700 font-medium block mt-4'>是否需要预定会议酒店（￥520/间）</label>
                <p className='itelic font-thin text-gray-500 text-xs'>*注：大会报告特邀嘉宾免房费，协办企业 2 人以内免房费</p>
                <label className='ml-4 inline-block text-sm'>
                  <input
                    className='mt-2 mr-1'
                    value='是'
                    type='radio'
                    onClick={() => { setIsNeed(true) }}
                    {...register("isNeedHotel")}
                  />是
                </label>

                <label className='ml-4 inline-block text-sm'>
                  <input className='mt-2 mr-1' type='radio' value='否' {...register("isNeedHotel")}
                    onClick={() => { setIsNeed(false) }}
                  />
                  否
                </label>
                {errors?.isNeedHotel && (
                  <div className='mb-3 text-normal text-red-500 '>
                    {errors?.isNeedHotel.message}
                  </div>
                )}

                {isNeed &&
                  <>
                    <label className='text-gray-700 font-medium block mt-4'>房间数量：</label>
                    <input
                      className='border-solid border-gray-300 border py-1 mt-1 px-4  w-full rounded text-gray-700'
                      type='number'
                      {...register("roomNum")}
                    />
                    {errors?.roomNum && (
                      <div className='mb-3 text-normal text-red-500 '>
                        {errors?.roomNum.message}
                      </div>
                    )}

                    <label className='text-gray-700 font-medium block mt-4'>入住日期</label>
                    <input
                      type='checkbox'
                      value='11月06日'
                      placeholder='11月06日'
                      {...register('checkInDate')}
                      className='mx-3'
                    />
                    <label htmlFor=''>11月06日</label>

                    <input
                      type='checkbox'
                      value='11月07日'
                      placeholder='11月07日'
                      {...register('checkInDate')}
                      className='mx-3'
                    />
                    <label htmlFor=''>11月07日</label>
                  </>}

              </>}

            <div onChange={(e) => chnlOnChange(e)}>
              <label className='text-gray-700 font-medium block mt-4'>*通过何种渠道了解到会议：</label>
              <label className='ml-4 inline-block  text-sm'>
                <input className='mt-2 mr-1' type='radio' value='会务方邀请' {...register("knowchnl", { 'required': "This is required.", })} />会务方邀请
              </label>
              <label className='ml-4 inline-block  text-sm'>
                <input className='mt-2 mr-1' type='radio' value='投资机构推荐' {...register("knowchnl")} />投资机构推荐
              </label>
              <label className='ml-4 inline-block  text-sm'>
                <input className='mt-2 mr-1' type='radio' value='高校研究院所推荐' {...register("knowchnl")} />高校研究院所推荐
              </label>
              <label className='ml-4 inline-block  text-sm'>
                <input className='mt-2 mr-1' type='radio' value='企业推荐' {...register("knowchnl")} />企业推荐
              </label>
              <label className='ml-4 inline-block  text-sm'>
                <input className='mt-2 mr-1' type='radio' value='公司委派参会' {...register("knowchnl")} />公司委派参会
              </label>
              <label className='ml-4 inline-block  text-sm'>
                <input className='mt-2 mr-1' type='radio' value='公众号' {...register("knowchnl")} />公众号
              </label>
              <label className='ml-4 inline-block  text-sm'>
                <input className='mt-2 mr-1' type='radio' value='deeptech' {...register("knowchnl")} />deeptech
              </label>
            </div>
            {/* {! && */}
            <div
              className={`${isChnlChecked ? 'invisible hidden' : 'visible'}`}
              onChange={(e) => setInputValue(e)}
            >
              <label className='ml-4 inline-block  text-sm'>其他：
                <input className='mt-1 border-solid border-gray-300 border  rounded text-gray-700'
                  type='text'
                  value={checkedValue}
                  {...register("knowchnl")} />
              </label>
            </div>

            {errors?.knowchnl && (
              <div className='mb-3 text-normal text-red-500 '>
                {errors?.knowchnl.message}
              </div>
            )}

            <label className='text-gray-700 font-medium block mt-4'>备注：</label>
            <textarea
              rows={2}
              className='border-solid border-gray-300 border py-1 mt-1 px-4  w-full rounded text-gray-700'
              {...register("note")}
            />
            {errors?.note && (
              <div className='mb-3 text-normal text-red-500 '>
                {errors?.note.message}
              </div>
            )}

            <button
              className='mt-4 w-full rounded-md bg-black px-20  py-2 text-white border font-semibold text-md'
              type='submit'
            > 提交
            </button>
          </form>
        </>
      )











        :











        (
          <>
            <h1 className="pt-20 text-center text-3xl font-medium">International Forum on Chemical Synthetic Biology (Hangzhou)</h1>

            <form
              className='max-w-xl m-auto py-10 mt-10 px-12 border'
              onSubmit={handleSubmit(onSubmit)}
            >
              <p className="mb-3 text-gray-500">Please fill out the registration form:</p>
              <label className='text-gray-700 font-medium'>* Name:</label>

              <input
                className='border-solid border-gray-300 border py-1 mt-1 px-4 w-full rounded text-gray-700'
                name=''
                placeholder=''
                autoFocus
                {...register("name", { 'required': "Please enter a your name.", })}
              />
              {errors?.name && (
                <div className='mb-3 text-normal text-red-500'>
                  {errors?.name.message}
                </div>
              )}

              {/* Radios 单选 - 机构类型  */}
              <label className='text-gray-700 font-medium block mt-4'>Type of your employer:</label>
              <div>
                <label className='ml-4 inline-block text-sm'>
                  <input className='mt-2 mr-1'
                    value='高校、研究机构'
                    type='radio'
                    {...register("institution", { required: true })}
                  />University/Research Institution
                </label></div>

              <div>
                <label className='ml-4 inline-block text-sm'>
                  <input className='mt-2 mr-1' type='radio' value='企业' {...register("institution")} />
                  Industry
                </label>
              </div>

              <div>
                <label className='ml-4 inline-block text-sm'>
                  <input className='mt-4 mr-1' type='radio' value='投资机构' {...register("institution")} />
                  Investment Institution
                </label>
              </div>
              {errors?.institution && (
                <div className='mb-3 text-normal text-red-500 '>
                  {errors?.institution.message}
                </div>
              )}


              {/* Radios 单选 - 就职单位名称： */}
              <label className='text-gray-700 font-medium block mt-4'>Employer:</label>
              <input
                className='border-solid border-gray-300 border py-1 mt-1 px-4  w-full rounded text-gray-700'
                type='text'
                placeholder=''
                {...register("employedInstitution", { required: true })}
              />
              {errors?.employedInstitution && (
                <div className='mb-3 text-normal text-red-500 '>
                  {errors?.employedInstitution.message}
                </div>
              )}

              <label className='text-gray-700 font-medium block mt-4'>Title:</label>
              <input
                className='border-solid border-gray-300 border py-1 mt-1 px-4  w-full rounded text-gray-700'
                type='text'
                placeholder=''
                {...register("position")}
              />
              {errors?.position && (
                <div className='mb-3 text-normal text-red-500 '>
                  {errors?.position.message}
                </div>
              )}

              <label className='text-gray-700 font-medium block mt-4'>* Contact: email:</label>
              <input
                className='border-solid border-gray-300 border py-1 mt-1 px-4  w-full rounded text-gray-700'
                type='text'
                {...register("email", { required: "Please enter your email", })}
              />
              {errors?.email && (
                <div className='mb-3 text-normal text-red-500 '>
                  {errors?.email.message}
                </div>
              )}

              {/*  Radios 单选 - 参与形式  */}
              <label className='text-gray-700 font-medium block mt-4'>Form of Participation:</label>
              <div> <label className='ml-4 inline-block text-sm'>
                <input
                  className='mt-4 mr-1'
                  value='线上'
                  type='radio'
                  {...register("participation")}
                />
                online
              </label></div>

              <div><label className='ml-4 inline-block text-sm'>
                <input className='mt-4 mr-1' type='radio' value='线下' {...register("participation")} />
                offline
              </label></div>
              {errors?.participation && (
                <div className='mb-3 text-normal text-red-500 '>
                  {errors?.participation.message}
                </div>
              )}

              <button
                className='mt-4 w-full rounded-md bg-black px-20  py-2 text-white border font-semibold text-md'
                type='submit'
              > Registration
              </button>
            </form>
          </>
        )}


      {/* <label className='text-gray-700 font-medium block mt-4'>
          Description
        </label>
        <textarea
          className='border-solid border-gray-300 border py-20 px-4 w-full rounded text-gray-700'
          rows={5}
          cols={5}
          {...register("description",{
            required: "Please enter a job description",
          })}
        />
        {errors?.description && (
          <div className='mb-3 text-normal text-red-500 '>
            {errors?.description.message}
          </div>
        )} */}

      {/* <label className='text-gray-700 font-medium block mt-4'>
          Link to apply for this job
        </label>
        <input
          className='border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700'
          type='text'
          placeholder='https://www.customerengjobs.com'
          {...register("link", {
            required: "Please enter a link",
          })}
        />
        {errors?.link && (
          <div className='mb-3 text-normal text-red-500 '>
            {errors?.link?.message}
          </div>
        )}

        <label className='text-gray-700 font-medium block mt-4'> Email </label>
        <input className='border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700' 
          type="email" 
          {...register("email", {
            required: "Please enter a link",
          })}
        />
        {errors?.email && (
          <div className='mb-3 text-normal text-red-500 '>
            {errors?.email?.message}
          </div>
        )} */}

      {/* <Modal showModal={showModal} /> */}
    </>
  );
};

export default Form;
