import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../config"

export const useBlogs=()=>{
    const [loading,setloading]=useState(true)
    const [blogs,setBlogs]=useState([])

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`)
        .then(response=>{
            setBlogs(response.data)
            setloading(false)
        })
    },[])
    return {
        loading,
        blogs
    }
}