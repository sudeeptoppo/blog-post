import axios from "axios";
import React from "react";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL2 } from "../config";
import { useNavigate } from "react-router-dom";
export function Publish() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      <Appbar />
      <div className="flex-1 flex justify-center box-border ">
        <div className="max-w-lg w-full mx-auto flex flex-col  box-border">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            className="w-full border border-gray-300 rounded-lg text-sm block focus:ring-blue-500 focus:border-blue-500 p-2 mb-4 mt-20"
            placeholder="Blog Title"
          />
          <TextEditor
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <button
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL2}/api/v1/blog/create`,
                {
                  title,
                  content: description,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              navigate(`/blogs${response.data.id}`);
            }}
            type="submit"
            className=" bg-brand box-border border rounded-lg border-slate-400 hover:bg-slate-50 focus:ring-1 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 "
          >
            {" "}
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
}

function TextEditor({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <div className="w-full mb-4 mt-4 rounded-base bg-neutral-secondary-medium shadow-xs">
        <textarea
          placeholder="Write something…"
          onChange={onChange}
          rows={10}
          className="w-full h-40    rounded-xl  bg-white  px-4   py-3  text-sm   text-gray-900    placeholder:text-gray-400 border   border-gray-300 focus:outline-none  focus:ring-2  focus:ring-blue-500"
        ></textarea>
      </div>
    </div>
  );
}
