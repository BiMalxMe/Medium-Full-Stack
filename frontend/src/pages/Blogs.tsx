import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../components/hooks"



export const Blogs=()=>{
    const {loading,blogs}=useBlogs()
    if(loading){
        return <div>
            Loading........
        </div>
    }
    
    return <div>
    <Appbar />
    <div className="flex justify-center mb-4 ">
    <div className="border-b border-slate-300">
     {blogs.map(blog=><BlogCard   
    id={blog.id}  
    authorName={blog.author.name || "Anonymous"}
    title={blog.title}
    content={blog.content}
    publishedDate={"2nd Feb 2022"}/>
)} 
    </div>
    </div>
    </div>
}