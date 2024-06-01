import { Link, json, useLoaderData } from "@remix-run/react";
import React from "react";
export const meta = () => {
  return [
    { title: "Remix Tutorial" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader= async ()=>{
  const res= await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
  const data= await res.json()
  // console.log(data)
  return json({blogs:data})
}

export default function Index() {

  const {blogs}=useLoaderData()

  const [counter, setCounter] = React.useState(0)

  const handleIncrement=()=>{
    setCounter(counter+1)
  }
  const handleDecrement=()=>{
    setCounter(counter-1)
  }

  return (
    <div >
      <div 
      onClick={handleIncrement}
      className="bg-yellow-500 p-[10px]">
        +
      </div>
      <div
      onClick={handleDecrement}
       className="bg-pink-500 p-[10px]">
        -
      </div>

      {counter}

      <h1 className="text-sm font-bold underline">
      Hello world!
    </h1>

    {blogs.map((item,key)=>(
        <Link 
        to={`/blogs/${item.id}`}
        key={key} 
        className="w-[400px] shadow-xl border-[1px] flex flex-col gap-[10px] mt-[20px] bg-gray-200 p-[10px]">
          <div>Number:-{item.id}</div>
          <div>Title:-{item.title}</div>
          <div>Content:-{item.body}</div>
        </Link>
    ))}
    </div>
  );
}
