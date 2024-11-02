import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";
import { Blog } from "./hooks";


export const FullBlog = ({blog}:{blog:Blog}) => {
    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl">
                <div className=" col-span-8">
                    <div className="text-3xl font-bold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Posted on 2nd December 2023
                    </div>
                    <div>
                        {blog.content}
                    </div>
                    </div>
                <div className="ml-5 col-span-4">
                    <div className="text-slate-700 font-semibold">
                    Author
                    </div>                    
                    <div className="flex mt-2 ">
                        <div className="mr-3 flex flex-col justify-center">
                        <Avatar name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                        <div className="text-xl font-bold"> 
                        {blog.author.name || "Anonymous"}
                    </div>
                    <div className="pt-2 text-slate-500">Lorem ipsum dolor sit uuntur natus! Cumque sequi nulla laboriosam repellat!</div>
                </div>
                        </div>
             
                    </div>
                    
               
            </div>
            </div>
        </div>
    );
};
