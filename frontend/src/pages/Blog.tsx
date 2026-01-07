import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks";
import {useParams} from "react-router-dom";
import { LoadingSkeleton2 } from "../components/LoadingSkeleton2";

export function Blog() {
    // How to create dynamic routes with react-router-dom?
    const {id} = useParams(); 
    const {loading, blog} = useBlog({id: id as string});

    if(loading) {
        return <LoadingSkeleton2 />;
    }
  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
}