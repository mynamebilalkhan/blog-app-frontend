import React from 'react'
import BlogCard from './BlogCard'

function Blogs() {
  return (
    <div className="container mb-5">
          <div className="d-flex justify-content-between pt-5 pb-4">
               <h4>Blogs</h4>
               <a href="/create" className="btn btn-dark">Create</a>
          </div>
          <div className="row">
               <BlogCard />
               <BlogCard />
               <BlogCard />
               <BlogCard />
          </div>
      </div>
  )
}

export default Blogs
