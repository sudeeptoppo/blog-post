import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { SignupInput } from "@sudeeptoppo/common-blog";
import axios from "axios";
import { BACKEND_URL2 } from "../config";

export const Auth = ({ type }: { type: "signin" | "signup" }) => {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL2}/api/v1/user/${
          type === "signin" ? "signin" : "signup"
        }`,
        postInputs
      );
      console.log(response);
      const jwt = response.data.jwt;
      console.log(jwt);
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      alert("Something went wrong " + error);
    }
  }
  return (
    <div className="h-screen flex flex-col  justify-center">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-semibold">Create an account</div>
            <div className="text-slate-300">
              {type === "signin"
                ? "Dont have an account?"
                : "Already have an account?"}

              <Link
                className="pl-2 underline"
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Signup" : "Signin"}
              </Link>
            </div>
          </div>

          {type === "signup" ? (
            <LabelInput
              label="Name"
              placeholder="John Doe"
              onChange={(e) => {
                setPostInputs({ ...postInputs, name: e.target.value });
              }}
            />
          ) : null}
          <LabelInput
            label="Email"
            placeholder="johndoe@gmail.com"
            onChange={(e) => {
              setPostInputs({ ...postInputs, email: e.target.value });
            }}
          />
          <LabelInput
            label="Password"
            placeholder="password"
            type="password"
            onChange={(e) => {
              setPostInputs({ ...postInputs, password: e.target.value });
            }}
          />
          <button
            type="button"
            onClick={sendRequest}
            className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2"
          >
            {type === "signin" ? "Signin" : "Signup"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface LabelInputType {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
function LabelInput({ label, placeholder, onChange, type }: LabelInputType) {
  return (
    <div>
      <div>
        <label className="block mb-2.5 text-sm font-semibold text-heading pt-4">
          {label}
        </label>
        <input
          type={type || "text"}
          id="first_name"
          className="focus:outline-none focus:ring-4 focus:ring-gray-300 bg-neutral-secondary-medium border-2 border-solid  text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body "
          placeholder={placeholder}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
}
