

interface BlogcardType{
    authorName:string,
    title:string,
    content:string,
    publishedDate:string
}

export const BlogCard=({
    authorName,
    title,
    content,
    publishedDate
}:BlogcardType)=>{
    return (<div className="pb-4  px-7">
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
    </div>)
}

export function Avatar({name}:{name:string}){
    return (
        <div className="mr-1 relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
    <span className=" font-medium text-gray-900 dark:text-gray-300">{name[0].toUpperCase()}</span>
        </div>
        )
}