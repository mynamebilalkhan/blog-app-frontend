// import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BlogCard from './components/BlogCard';
import { Route, Routes } from 'react-router-dom';
import Blogs from './components/Blogs';
import CreateBlog from './components/CreateBlog';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Contact from './components/Contact';


function App() {

  return (
    <>
      <div className='bg-dark text-center py-2 shadow-lg'>
        <h1 className='text-white'>React & Laravel Blog</h1>
      </div>
      <Routes>
        <Route path="/" element={<Blogs/>} />
        {/* <Route path="/contact" element={<Contact/>} /> */}
        <Route path="/create" element={<CreateBlog/>} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
