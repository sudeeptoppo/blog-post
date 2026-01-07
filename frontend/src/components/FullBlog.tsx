import { Appbar } from "./Appbar";
import type { Blog } from "../hooks";
import { Avatar } from "./BlogCard";
export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className=" flex justify-center items-center mt-10">
        <div className="grid grid-cols-12 px-10 bg-green-500 py-4 max-w-screen-xl">
          <div className=" col-span-8 ">
            <div className="text-5xl font-extrabold bg-yellow-500 ">
              {blog.title}
            </div>
            <div className="text-slate-500 pt-4">
              posted on 2nd December 2023
            </div>
            <div className="pt-4 text-lg ">{blog.content}</div>
          </div>
          <div className=" col-span-4 bg-blue-400 p-3 text-slate-600 text-lg">
            Author
            <div className="flex w-full">
              <div className="flex items-center px-4">
                <Avatar name={blog.author.name || "U"} size={"big"} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Unknown"}
                </div>
                <div className="pt-2 text-slate-500">
                  Random bio about the author. This is just a placeholder text
                  to show where the author's bio will go.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
