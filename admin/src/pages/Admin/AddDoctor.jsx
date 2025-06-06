import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'

import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {


     const [docImg,setDocImg]=useState(false)
     const [name,setName]=useState('')
     const [email,setEmail]=useState('')
     const [password,setPassword]=useState('')
     const [experience,setExperience]=useState('1 Year')
     const [fees,setFees]=useState('')
     const [about,setAbout]=useState('')
     const [speciality,setSpeciality]=useState('General physician ')
     const [degee,setDegree]=useState('')
     const [address1,setAdress1]=useState('')
     const [address2,setAdress2]=useState('')

     const {backendUrl,aToken}=useContext(AdminContext)

     const onSubmitHandler=async (event)=>{
        event.preventDefault()

        try{
            if(!docImg){
                return toast.error("image not selected")

            }
            const formData=new FormData()
            formData.append('image',docImg)
            formData.append('name',name)
            formData.append('email',email)
            formData.append('password',password)
            formData.append('degree',degee)
            formData.append('experience',experience)
            formData.append('fees',Number(fees))
            formData.append('about',about)
            formData.append('speciality',speciality)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

            //console log form data
            formData.forEach((value,key)=>{
               console.log(`${key};${value}`);
  
            })
            const {data}=await axios.post(backendUrl+'/api/admin/add-doctor',formData,{headers:{aToken}})
            
            if(data.success){
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAdress1('')
                setAdress2('')
                setDegree('')
                setAbout('')
                setFees('')

                
            }else{
                toast.error(data.message)

            }
        }catch(error){
            toast.error(error.message)
            console.log(error)
        }

     }


    return (
        <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-8">
            <p className="text-2xl font-semibold text-gray-800 mb-6">Add Doctor</p>

            <div className="space-y-6">
                {/* Upload Section */}
                <div className="flex flex-col items-center cursor-pointer w-48 mx-auto">
                    <label htmlFor="doc-img" className="flex flex-col items-center gap-2">
                        <img src={docImg?URL.createObjectURL(docImg) :assets.upload_area} alt="Upload Area" className="w-32 h-32 object-contain cursor-pointer" />
                        <p className="text-gray-600 text-sm">Upload Doctor Image</p>
                    </label>
                    <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
                </div>

                {/* Doctor Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="space-y-4">
                        <div>
                            <p className="mb-1 font-medium text-gray-700">Doctor Name</p>
                            <input
                                onChange={(e)=> setName(e.target.value) }
                                value={name}
                                type="text"
                                placeholder="Name"
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div>
                            <p className="mb-1 font-medium text-gray-700">Doctor Email</p>
                            <input
                                onChange={(e)=> setEmail(e.target.value) }
                                value={email}
                                type="email"
                                placeholder="Email"
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div>
                            <p className="mb-1 font-medium text-gray-700">Doctor Password</p>
                            <input
                                onChange={(e)=> setPassword(e.target.value) }
                                value={password}
                                type="password"
                                placeholder="password"
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div>
                            <p className="mb-1 font-medium text-gray-700">Experience</p>
                            <select
                                onChange={(e)=> setExperience(e.target.value) }
                                value={experience}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name=""
                                id=""
                            >
                                {Array.from({ length: 10 }, (_, i) => (
                                    <option key={i} value={`${i + 1} Year`}>
                                        {i + 1} Year
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <p className="mb-1 font-medium text-gray-700">Fees</p>
                            <input
                                onChange={(e)=> setFees(e.target.value) }
                                value={fees}
                                type="number"
                                placeholder="fees"
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            
                            <p className="mb-1 font-medium text-gray-700">Speciality</p>
                            <select
                                onChange={(e)=> setSpeciality(e.target.value) }
                                value={speciality}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name=""
                                id=""
                            >
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>

                        <div>
                            <p className="mb-1 font-medium text-gray-700">Education</p>
                            <input
                                onChange={(e)=> setDegree(e.target.value) }
                                value={degee}
                                type="text"
                                placeholder="Education"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div>
                            <p className="mb-1 font-medium text-gray-700">Address</p>
                            <input
                                onChange={(e)=> setAdress1(e.target.value) }
                                value={address1}
                                type="text"
                                placeholder="Address 1"
                                className="w-full mb-2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <input
                                onChange={(e)=> setAdress2(e.target.value) }
                                value={address2}
                                type="text"
                                placeholder="Address 2"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>
                </div>

                {/* About Doctor */}
                <div>
                    <p className="mb-1 font-medium text-gray-700">About Doctor</p>
                    <textarea
                        onChange={(e)=> setAbout(e.target.value) }
                                value={about}
                        placeholder="write about doctor"
                        rows={5}
                        required  
                        className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Submit Button */}
                <div className="mt-6 flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer"
                    >
                        Add Doctor
                    </button>
                </div>

            </div>
        </form>
    )
}

export default AddDoctor
