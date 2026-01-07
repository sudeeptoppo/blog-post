import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
export function Blogs() {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return <LoadingSkeleton />;
  }
  return (
    <div>
      <Appbar />
      <div className="flex flex-col justify-center items-center ">
        {blogs.map((blog) => {
          return (
            
            <BlogCard
                id={blog.id}
              authorName={blog.author.name || "Unknown"}
              title={blog.title}
              content={blog.content}
              publishedDate={"Jan 1, 2024"}
            />
          );
        })}
        
      </div>
    </div>
  );
}
