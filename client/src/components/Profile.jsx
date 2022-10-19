import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import httpClient from "../api/http-common";
import store from '../store';
// import {AiFillDelete} from "react-icons/ai";
import * as XLSX from 'xlsx';
import Td from './Td';

import { GiPreviousButton, GiNextButton } from "react-icons/gi";

const Profile = () => {
  const [postResult, setPostResult] = useState({ 'status': null, 'res': null });
  const token = store.getState().auth?.token
  const [tdata, setTdata] = useState();
  const [notes, setNotes] = useState("");
  const [toggl, setToggl] = useState(false);
  const [curid, setCurid] = useState("");

  const [curPage, setCurPage] = useState(1);
  const [pageNum, setPageNum] = useState();
  const [totalN, setTotalN] = useState(0);
  const [offlineN, setOfflineN] = useState(0);


  // refetch 重命名为 getOneWord手动 拾取
  const { data, status, refetch: getForm } = useQuery(
    ['query-form-info', token],
    async () => {
      return await httpClient.get(`/form?page=${curPage}&limit=4`)
    },
    {
      onSuccess: (res) => {
        setPostResult({ status: 'success', res: res?.data })
        // console.log('res',res)
      },
      onError: (err) => { setPostResult({ status: 'error', res: err.response?.data || err }); },
      // refetchOnWindowFocus: true,
      enabled: !!curPage,
      // enabled: false  // 禁用查询自动运行
      // 监听 本地 localStorage 事件
    }
  );

  const { data: totalDATA, refetch: getTotalForm } = useQuery(
    ['query-form-total', token],
    async () => {
      return await httpClient.get(`/form?page=1&limit=1000`)
    },
    {
      enabled: !!curPage,
      staleTime: 1000 * 20,
      cacheTime: 1000 * 5,
    }
  );


  const delHandler = (id) => {
    try {
      httpClient.delete(`/form/${id}`)
      getForm()
    }
    catch (err) {
      console.log(err)
    }
  }

  const { isLoading: isEditing, mutate: editWord } = useMutation(
    delHandler,
    {
      onSuccess: (res) => { console.log(res) },
      onError: (err) => { console.log(err) },
    },
  );


  const downloadExcel = (data) => {
    console.log('totalDATA: ', totalDATA?.data?.forms);

    const formdata = totalDATA?.data?.forms.map((item) => {
      const { name: 姓名, email: 邮箱, tel: 手机号, institution: 机构类型, employedInstitution: 就职单位, position
        : 职位, participation: 参会方式, num: 随行人数, isNeedHotel: 酒店预订, roomNum: 房间数, checkInDate: 入住时间, image: 名片, knowchnl: 获知渠道, note: 备注, updatedAt: 时间 } = item
      return { 姓名, 邮箱, 手机号, 机构类型, 就职单位, 职位, 参会方式, 随行人数, 酒店预订, 房间数, 入住时间, 名片, 获知渠道, 备注, 时间 }
    })

    console.log('formdata: ', formdata);


    const worksheet = XLSX.utils.json_to_sheet(formdata);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "报名表单.xlsx");

  };

  useEffect(() => {
    if (status === 'success') {
      setCurPage(postResult?.res?.currentPage);
      setPageNum(postResult?.res?.totalPages);
      setOfflineN(postResult?.res?.countIsoffline);
      setTotalN(postResult?.res?.count);

    }
    console.log('curPage, pageNum', curPage, pageNum)
  }, [status])

  useEffect(() => {
    setTdata(postResult?.res?.forms)
  }, [postResult?.res?.forms])

  let pageArr = Array.from({ length: postResult?.res?.totalPages }, (_, i) => i + 1)  // 6 页的话：[1,2,3,4,5,6]

  const checkNumber = (num) => {
    if (num <= 0) return 1;
    if (num >= pageNum) return pageNum;
    return num;
  }
  const handleSetpage = (value, e) => {
    console.log('handleSetpage value, ', value)
    setCurPage(value);
  }
  useEffect(() => {
    getForm();
  }, [curPage])
  useEffect(() => { getTotalForm(); }, [])

  if (status === "loading") {
    return <p>Loading...</p>
  }

  return data ? (
    <section className="antialiased bg-gray-100 text-gray-600 w-screen h-full pb-12" x-data="app">
      <div className="flex flex-col justify-center ">
        <div className=" bg-white md:mx-10 md:my-10 shadow-lg rounded-sm border border-gray-200">
          <div className='flex justify-between'>
            <div className="px-5 py-4 border-b font-extrabold border-gray-100">
              <div className="font-semibold text-gray-800 text-xl">报名表单</div>
              <span className='font-normal text-sm'>总报名人数：{totalN} , 线下参会人数：{offlineN}</span>
            </div>
            <button className='mx-2 my-1 h-8 px-4 hover:bg-gray-400 bg-gray-300 rounded'
              onClick={() => downloadExcel()}> 导出表单 </button>

          </div>

          <div className="overflow-x-auto p-3">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th className="p-2">
                    <div className="font-semibold text-left">姓名</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Email</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Tel</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">机构类型</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">就职单位</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">职位</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">参会方式</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">随行人数</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">酒店预订</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">房间数</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">入住时间</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">名片</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">获知渠道</div>
                  </th>

                  <th className="p-2">
                    <div className="font-semibold text-center">备注</div>
                    {/* <button className=' bg-slate-300 rounded-md px-4 py-1 ml-2  text-cyan-900 font-extrabold text-sm shadow-md border-r border-b'> 更改 </button> */}
                  </th>
                  <th></th>
                </tr>
              </thead>

              <tbody className="text-sm divide-y divide-gray-100">

                {/* <!-- record 1 --> */}

                {tdata && (tdata.map(item => {
                  return (
                    <tr key={item._id}>
                      {/* <td className="p-2">
                        <input type="checkbox" className="w-5 h-5" value="id-1"
                        click="toggleCheckbox($el, 2890.66)" />
                      </td> */}
                      <td className="p-2">
                        <div className="font-medium text-gray-800">
                          {item?.name}
                        </div>
                      </td>
                      <td className="p-2"> {item?.email} </td>
                      <td className="p-2"> {item?.tel} </td>
                      <td className="p-2"> {item?.institution} </td>
                      <td className="p-2"> {item?.employedInstitution} </td>
                      <td className="p-2"> {item?.position} </td>
                      <td className="p-2"> {item?.participation} </td>
                      <td className="p-2"> {item?.num} </td>
                      <td className="p-2"> {item?.isNeedHotel} </td>
                      <td className="p-2"> {item?.roomNum} </td>
                      <td className="p-2"> {item?.checkInDate} </td>

                      <td className="p-2">
                        {/* <img src={`data:image/png;base64,${item?.image}`} alt="Red dot" /> */}
                        {item?.image && <img src={item?.image} alt="" className='w-56' />}
                      </td>
                      <td className="p-2"> {item?.knowchnl} </td>
                      <Td note={item?.note} id={item?._id} />
                      {/* <td className="p-2 flex"> 
                     <button onClick={()=>{ setToggl((pre)=>{setToggl(!pre)}); setCurid(item?._id);console.log(item?._id) }}
                      className='text-green-500 h-full items-end'> <FaEdit /> </button>
                    </td> */}
                      {/* 删除数据按钮，暂时下掉吧  
                      <td> <AiFillDelete onClick={ (e) => delHandler(item._id)} /></td> */}
                    </tr>
                  )
                }))}

              </tbody>
            </table>
          </div>


          <div className="flex justify-end font-bold space-x-4 text-base border-t border-gray-100 px-5 py-4">
            <div></div>
          </div>

        </div>
      </div>


      <div className='h-22 relative bg-gray-100 mb-4 pb-4'>
        <div className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]'>
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px">

              <li
                onClick={(e) => { setCurPage((preValue) => { return checkNumber(preValue - 1) }) }}
                aria-current="page"
                className="h-auto px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              ><GiPreviousButton className=' justify-center items-center text-center mt-3' /> </li>

              {curPage && (pageArr.map((value, index) => {
                if (value === curPage) {
                  return (
                    <li
                      key={value}
                      onClick={(e) => handleSetpage(value, e)}
                      aria-current="page" className="py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    >{value}
                    </li>
                  )
                } else {
                  return (
                    <li
                      key={value}
                      onClick={(e) => handleSetpage(value, e)}
                      aria-current="page" className="py-2 px-3 text-grey-500 bg-white border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    >{value}
                    </li>
                  )
                }
              }))}
              <li
                onClick={(e) => { setCurPage((preValue) => { return checkNumber(preValue + 1) }) }}
                aria-current="page"
                className="h-auto px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              > <GiNextButton className=' justify-center items-center text-center mt-3' /> </li>


            </ul>
          </nav>
        </div>
      </div>
    </section>
  ) : null

};

export default Profile;
