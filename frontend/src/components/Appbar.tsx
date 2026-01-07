import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
export const Appbar = () => {
  return (
    <div className="border-b border-gray-200 flex justify-between px-10 py-4">
      <Link to="/blogs">
        <div className="flex items-center cursor-pointer">Medium</div>
      </Link>
      <div>
        <Link to="/publish">
          <button className="text-white bg-green-700 box-border border border-transparent hover:bg-green-800 focus:ring-4 shadow-xs font-medium  rounded-full text-sm px-4 mx-3 py-1.5">
            New
          </button>
        </Link>
        <Avatar name={"John Doe"} size={"big"}></Avatar>
      </div>
    </div>
  );
};
