import React from 'react'
import { Outlet } from '@remix-run/react'

const BlogLayout = () => {
  return (
    <div> <header>BlogApplication</header>
    <Outlet/></div>
  )
}

export default BlogLayout