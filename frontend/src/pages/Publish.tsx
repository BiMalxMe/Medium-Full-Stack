import { ChangeEvent, useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export const Publish = () => {
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const navigate=useNavigate()
    console.log(title,description)
  return (
    <div>
      <Appbar />
      <div className="flex justify-center pt-7 ">
        <div className="max-w-screen-lg w-full ">
          <input
            onChange={(e) => {
                setTitle(e.target.value)
            }}
            id="message"
            className="block p-2.5 w-full text-sm text-gray-900
                        bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 
                        focus:border-blue-500"
            placeholder="Enter the title here"
          ></input>
        </div>
      </div>
      <div>
        <Textareaa  onChange={(e) => {
                setDescription(e.target.value)
            }} />
        <div className="flex justify-center ">
          <div className="max-w-screen-lg w-full">
            <div className="w-full mb-4  rounded-lg bg-gray-50 border border-slate-300">
              <div className="flex items-center justify-left px-3 py-2 border-t dark:border-gray-600">
                <button
                  onClick={async()=>{
                   const response=await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                        title,
                        content:description
                    },{
                        headers:{
                            Authorization:localStorage.getItem('token')
                        }
                    })
                    navigate(`/blog/${response.data.id}`)
                  }}
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                >
                Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
function Textareaa({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void}) {
  return (
    <div className="flex justify-center pt-4">
      <form className="max-w-screen-lg w-full">
        <div className="w-full mb-1  rounded-lg bg-gray-50 border border-slate-300">
          <div className=" bg-white rounded-t-lg">
            <label className="sr-only">Enter Description</label>
            <textarea
              onChange={onChange}
              id="comment"
              rows={5}
              className="w-full px-0 text-sm text-gray-900 bg-white pl-4 pr-4"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  );
}
