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
    <div className="flex justify-center">
    <div className="border-b border-slate-300  max-w-xl">
       <BlogCard     
    authorName={"Bimal"}
    title={"the todays Generation"}
    content={"It is based  on the first asdgjnbaikreiorefjhgierhgiewrhgirewjhigrhgirehgikcentury of the world development"}
    publishedDate={"2nd Feb 2022"}/>
      
    </div>
    </div>
    </div>
}