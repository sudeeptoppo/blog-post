import { Link } from "react-router-dom";
interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
        <div className="border-b border-slate-200 p-4 w-screen max-w-screen-md cursor-pointer hover:bg-slate-50">
      <div className="flex">
        <div>
            <Avatar name={authorName} size={"small"} />
        </div>

        <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
          {authorName}
        </div>
        <div className="flex justify-center flex-col pl-2 ">
          <Circle />
        </div>
        <div className="font-thin text-slate-400 text-s pl-2 text-sm flex justify-center flex-col">
          {publishedDate}
        </div>
      </div>
      <div className="pt-2 text-xl font-bold ">{title}</div>
      <div className=" text-md font-thin">
        {content.slice(0, 100) + "..."}
      </div>
      <div className="text-slate-400 text-sm font-thin pt-4">
        {`${Math.ceil(content.length / 200)} min read`}
      </div>
    </div>
    </Link>
  );
};

function Circle() {
  return <div className="h-1 w-1  rounded-full bg-slate-500"></div>;
}

export function Avatar({ name, size }: { name: string, size: "small" | "big"}) {
  return (
    <div className={`relative inline-flex items-center justify-center overflow-hidden bg-slate-200 rounded-full ${size === "small" ? "w-4 h-4" : "w-10 h-10"}`}>
      <span className={`font-medium text-body ${size === "small" ? "text-xs" : "text-sm"}`}>
        {name[0]}
      </span>
    </div>
  );
}
