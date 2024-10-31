import { SignupInput } from "@bimalxme/medium-commons";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate=useNavigate()
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });
  async function RequestSender(){
    try{

    const response=await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs);
    const jwt=response.data.jwt;
    localStorage.setItem('token',"Bearer "+jwt);
    navigate("/blogs")
}catch(e){
    alert("An error occured"+e)
}
}
  return (
    <div className="flex justify-center flex-col h-screen">
      <div className="flex justify-center">
        <div>
          <div className="px-11">
            <div className="text-3xl font-bold">Create an Account</div>
            <div className="text-slate-500">
              {type === "signin"
                ? "Dont have an Account? "
                : "Already have an account?"}
              <Link
                className="pl-2 underline"
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "SignUp" : "SignIn"}
              </Link>
            </div>
          </div>
          <div className="mt-4">
            {type === "signin" ? null : (
              <LabelledInput
                label="Name"
                placeholder="Enter your name ......."
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            )}

            <LabelledInput
              label="Username"
              placeholder="bimal@gmail.com"
              onChange={(e) => {
                setPostInputs(({
                    ...postInputs,
                  username: e.target.value,
                }));
              }}
            />
            <LabelledInput
              type={"password"}
              label="password"
              placeholder="password"
              onChange={(e) => {
                setPostInputs(({
                    ...postInputs,
                  password: e.target.value,
                }));
              }}
            />
            <button onClick={RequestSender}
              type="button"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none 
           focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 
           mb-2 w-full mt-4"
            >
              {type === "signin" ? "Signin" : "Signup"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface Inputstype {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
function LabelledInput({ label, placeholder, onChange, type }: Inputstype) {
  return (
    <div>
      <div>
        <label className="mt-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
        <input
          onChange={onChange}
          placeholder={placeholder}
          type={type || "string"}
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
    </div>
  );
}

