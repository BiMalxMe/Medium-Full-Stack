import {Link} from 'react-router-dom'

interface BlogcardType{
    authorName:string,
    title:string,
    content:string,
    publishedDate:string,
    id:string
}

export const BlogCard=({
    id,
    authorName,
    title,
    content,
    publishedDate
}:BlogcardType)=>{
    return (
            <Link to={`/blog/${id}`}>
        <div className="mb-5 cursor-pointer b-4  px-7 border-b border-slate-300 w-screen max-w-screen-lg">
        <div className="font-extralight">
          {<Avatar name={authorName} />}  <span className="font-medium mr-4">{authorName}.</span> {publishedDate}
        </div>
        <div className="text-xl font-semibold">
            {title}
        </div>
   
        <div className=" text-md font-thin">
            {content}
        </div>
        <div className="text-slate-400 pt-3">
            {`${Math.ceil((content.length)/100)} Minute read`}
        </div>
    </div></Link>)
}

export function Avatar({name}:{name:string}){
    return (
        <div className="mr-1 relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
    <span className=" font-medium text-gray-900 dark:text-gray-300">{name[0].toUpperCase()}</span>
        </div>
        )
}