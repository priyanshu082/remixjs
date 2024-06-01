import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";

export const loader = async ({ params }) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.BlogId}`
  );

  const data = await res.json();
  
//   console.log(data);
  return json({ blog: data });
};

export const action=async({request,params})=>{
    const formData=await request.formData();
    const title=formData.get("title")
    console.log(title,params)

    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${params.BlogId}`,
        {
            body:JSON.stringify({title}),
            method:'PATCH',
        }
      );

      const data=await res.json()
console.log(data)
    return json({post:data})

}

const Blogs = () => {
  const { blog } = useLoaderData();

  return (
    <div>
      <button>
        <Link to="/">Home</Link>
      </button>
      <div
        to={`/blogs/${blog.id}`}
        className="w-[400px] shadow-xl border-[1px] flex flex-col gap-[10px] mt-[20px] bg-gray-200 p-[10px]"
      >
        <div>Number:-{blog.id}</div>
        <div>Title:-{blog.title}</div>
        <div>Content:-{blog.body}</div>
      </div>

      <Form method="patch">
      <div className="mt-[20px] bg-yellow-200 p-[10px]">
        <input name="title" placeholder="title"/>
        <button type="submit" className="ml-[20px] bg-pink-400 px-[10px] py-[3px] rounded-md">
            update
        </button>
      </div>
      </Form>

     
    </div>
  );
};

export default Blogs;
