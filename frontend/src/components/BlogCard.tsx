

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
    return (<div>
        <div>
          {<Avatar name={authorName}/>}  {authorName}. {publishedDate}
        </div>
        <div>
            {title}
        </div>
   
        <div>
            {content}
        </div>
    </div>)
}

function Avatar({name}:{name:string}){
    return (<div>
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-medium text-gray-600 dark:text-gray-300">{name[0].toUpperCase()}</span>
</div>
    </div>)
}