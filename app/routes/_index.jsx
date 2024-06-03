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
    <p id="index-page">
      This is a demo for Remix.
      <br />
      Check out{" "}
      <a href="https://remix.run">the docs at remix.run</a>.
    </p>
  );
}
