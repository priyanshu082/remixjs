import { useState } from "react";
import React from "react";
export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {

  const [counter, setCounter] = React.useState(0)
  
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div className="bg-yellow-500 p-[10px]">
        +
      </div>
      <div className="bg-pink-500 p-[10px]">
        -
      </div>
    </div>
  );
}
