import React, { useState } from 'react';
import Editor from 'react-simple-wysiwyg';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function CreateBlog() {
     
     const [html, setHtml] = useState('Description');
     const [imageId, setImageId] = useState();
     
     const navigate = useNavigate();
     
     function onChange(e) {
          setHtml(e.target.value);
     }
     
     const handleFileChange = async (e) => {
          const file = e.target.files[0];
          const formData = new FormData();
          formData.append('image', file);
          
          const res = await fetch('http://localhost:8000/api/save-temp-image', {
               method : "POST", 
               body: formData,
          });
          
          const result = await res.json();
          
          if (result.status == false) {
               alert(result.error.image);
               e.target.value = null;
          }
          
          setImageId(result.image.id);
          
          console.log(result);
     }
     
     const {
          register,
          handleSubmit,
          watch,
          formState: { errors },
     } = useForm();
     
     const formSubmit = async (data) => {
          const newData = { ...data, "description": html, image_id: imageId }
          
          const res = await fetch("http://localhost:8000/api/blogs", {
               method: "POST",
               headers: {
                    'Content-type': 'application/json'
               },
               body: JSON.stringify(newData)
          });
          
          toast("Blog added successfully!");
          
          navigate('/');
          // console.log(newData);
     }
     
     
  return (
    <div className='container mb-5'>
          <div className='d-flex justify-content-between pt-5 mb-4'>
               <h4>Create Blog</h4>
               <a href="/" className='btn btn-dark'>Back</a>
          </div>
          <div className='card border-0 shadow-lg'>
                 <form onSubmit={handleSubmit(formSubmit)}>
                 <div className="card-body">
                    <div className="mb-3">
                         <label htmlFor="" className='form-label'>Title</label>
                                <input
                                     {...register('title', {required: true})}
                                     type="text" className={`form-control ${errors.title && 'is-invalid'}`} placeholder='Title' />
                                {errors.title && <p className='invalid-feedback'>Title field is required</p>}
                      </div>
                      <div className="mb-3">
                         <label htmlFor="" className='form-label'>Short Description</label>
                                <textarea
                                     {...register('shortDesc')}
                                     id="" cols="30" rows="5" className='form-control'></textarea>
                    </div>
                    <div className="mb-3">
                         <label htmlFor="" className='form-label'>Description</label>
                           {/* <textarea name="" id=""></textarea> */}
                           <Editor containerProps={{ style: { height: '400px' } }} value={html} onChange={onChange} />
                      </div>
                      <div className="mb-3">
                         <label htmlFor="" className='form-label'>Image</label><br />
                         <input type="file" onChange={handleFileChange}/>
                      </div>
                      <div className="mb-3">
                         <label htmlFor="" className='form-label'>Author</label>
                                <input
                                   {...register('author', {required: true})}
                                     type="text" className={`form-control ${errors.author && 'is-invalid'}`} placeholder='Author' />
                                {errors.author && <p className='invalid-feedback'>Author field is required</p>}
                      </div>
                      <button className='btn btn-dark'>Create</button>
               </div>
                 </form>
          </div> 
    </div>
  )
}

export default CreateBlog
