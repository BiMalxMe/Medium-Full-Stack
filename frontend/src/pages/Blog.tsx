import { useParams } from "react-router-dom";
import { useBlog } from "../components/hooks";
import { FullBlog } from "../components/FullBlog";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { Appbar } from "../components/Appbar";


export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
  if (loading) {
    // If data is still loading, show the skeleton loaders
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  } else if (blog) {
    // If the blog data is available, render FullBlog
    return (
      <div>
        <FullBlog blog={blog} />
      </div>
    );
  } else {
    // If there's an error (i.e., blog is not available)
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>An error occurred. Please try again later.</div>
        </div>
      </div>
    );
  }
}  