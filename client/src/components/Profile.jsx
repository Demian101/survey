import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import httpClient from "../api/http-common";
import store from '../store';
// import {AiFillDelete} from "react-icons/ai";
import * as XLSX from 'xlsx';
import Td from './Td';

const Profile = () => {
  const [postResult, setPostResult] = useState({ 'status': null, 'res': null });
  const token = store.getState().auth?.token
  const [notes, setNotes] = useState("");
  const [toggl, setToggl] = useState(false);
  const [curid, setCurid] = useState("");

  useEffect(() => { }, [])

  // refetch 重命名为 getOneWord手动 拾取
  const { data, status, refetch: getForm } = useQuery(
    ['query-form-info', token],
    async () => {
      return await httpClient.get(`/form`)
    },
    {
      onSuccess: (res) => {
        setPostResult({ status: 'success', res: res?.data })
        // console.log('res',res)
      },
      onError: (err) => { setPostResult({ status: 'error', res: err.response?.data || err }); },
      refetchOnWindowFocus: true,
      enabled: true,
      staleTime: 1000 * 60
      // enabled: false  // 禁用查询自动运行
      // 监听 本地 localStorage 事件
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
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "报名表单.xlsx");
  };

  console.log('postResult.res', postResult.res)

  if (status === "loading") {
    return <p>Loading...</p>
  }

  console.log('curid', curid, 'toggl', toggl)
  return data ? (
    <section className="antialiased bg-gray-100 text-gray-600 w-screen h-full" x-data="app">
      <div className="flex flex-col justify-center ">
        <div className=" bg-white md:mx-10 md:my-10 shadow-lg rounded-sm border border-gray-200">
          <div className='flex justify-between'>
            <div className="px-5 py-4 border-b font-extrabold border-gray-100">
              <div className="font-semibold text-gray-800">报名表单 </div>
            </div>
            <button className='mx-2 my-1 h-8 px-4 hover:bg-gray-400 bg-gray-300 rounded'
              onClick={() => downloadExcel(postResult.res)}> 导出表单 </button>

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

                {postResult?.res?.map(item => {
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
                        {item?.image && <img src={item?.image} alt="" className='' />}
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
                })}

              </tbody>
            </table>
          </div>


          <div className="flex justify-end font-bold space-x-4 text-base border-t border-gray-100 px-5 py-4">
            <div></div>
          </div>

        </div>
      </div>
    </section>
  ) : null

};

export default Profile;
