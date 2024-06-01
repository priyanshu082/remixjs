 import { json } from "@remix-run/node";
 import { useLoaderData } from "@remix-run/react";
 

 export const loader= async({params})=>{
    const res=await fetch(`https://jsonplaceholder.typicode.com/posts/${params.BlogId}`)

    const data=await res.json();
    console.log(data)
    return json({blog:data})
 }

const Blogs = () => {

    const {blog}=useLoaderData()

  return (
    <div>
        {blog.body}
    </div>
  )
}

export default Blogs