import React, { useState, useEffect, useRef } from "react";
import { FaEdit } from 'react-icons/fa';
import { AiOutlineCloudUpload } from "react-icons/ai";
import httpClient from "../api/http-common";


const Td = ( {note, id} ) => {
  // console.log('TD note id', id, note)

  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(id);
  const [text, setText] = useState(note);

  const handleSubmit = (e) => {
    setIsEditing((prevalue) => !prevalue);
    console.log("Invoke handleSubmit ");
    httpClient.put(`/form/${editID}/note`, {text})
    // setEditID(null);  // Edit 状态回到 false
  };

  const onClickHandler = (e) => {
    // e.preventDefault();
    setIsEditing((prevalue) => !prevalue);
  };

  return(
    <td className='flex justify-between'>
      { isEditing ? <textarea rows={2} value={text} onChange={(e)=>setText(e.target.value)} className='p-1' autoFocus /> : <span className="p-2">{text}</span>  }

      {/* 2 buttons  */}
      { isEditing ? (
        <button
          className='text-lg  hover:text-blue-500 font-bold'
          onClick={(e) => handleSubmit(e)}
        >
          <AiOutlineCloudUpload />
        </button>
        ) : (
        <button
          className='text-green-500 hover:text-green-700'
          onClick={onClickHandler}
        >
          <FaEdit />
        </button>
      )}
    </td>
      
  
  )
}
export default Td;