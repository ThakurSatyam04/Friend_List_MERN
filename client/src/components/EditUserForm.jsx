import React, { useEffect } from 'react'
import "./AddUserForm.css"
import {toast} from "react-hot-toast";
import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button_comp'
import { API_URL } from '../env';

const EditUserForm = () => {

    const {userId} = useParams();
    const navigate = useNavigate();

    const domains = ["Finance", "Marketing", "Management", "Sales", "UI Designing", "IT", "Management", "Business Development",]
    const genders = ["Female", "Male", "Polygender", "Genderqueer", "Non-binary", "Bigender", "Agender", "Genderfluid"]


    const [user, setUser] = useState({
        // id:"",
        first_name:"",
        last_name:"",
        email:"",
        gender:"",
        avatar:"",
        domain:"",
        available:""
    })

    const handleChange = async(e)=>{
        const {name,value} = e.target;
            setUser({
            ...user,
            [name]:value
        })
    }

    const handleGenderChange = (event) => {
      setUser({
        ...user,
        gender: event.target.value
      });
    };
  
    const handleDomainChange = (event) => {
      setUser({
        ...user,
        domain: event.target.value
      });
    };

    const handleChangeAvailable = (event) => {
      setUser({
        ...user,
        available: event.target.value === 'true'
      });
    }

    const FormData = async()=>{
        try{
        const data = await axios.get(`${API_URL}/api/user/${userId}`)
        console.log(data)
          setUser(
            {
              first_name: data.data.first_name,
              last_name: data.data.last_name,
              email: data.data.email,
              gender: data.data.gender,
              avatar: data.data.avatar,
              domain: data.data.domain,
              available: data.data.available,
            }
          )
        }catch(err){
          console.log(err)
        }
      }
      console.log(userId)

      const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
          const {first_name,last_name,email,gender,avatar,domain,available} = user;
          if(first_name && last_name && email && gender && avatar && domain && available){
            await axios.put(`${API_URL}/api/user/${userId}`,user)
             .then(res =>{
               console.log(res)
               toast.success("User edited Successfully!", {
                autoClose: 3000, 
              });
               navigate("/");
             })
          }else{
            alert("please fill all the fields");
          }
        }catch(err){
          console.log(err);
        }
      }
    
      useEffect(() => {
        FormData()
      },[])


  return ( 
    <div>
      <div className="formbold-main-wrapper">
          <div className="formbold-form-wrapper">
            <form onSubmit={handleSubmit} >
              <div className="formbold-form-title">
                <h2 className="flex justify-center">Edit User Details</h2>              
              </div>

              <div className="formbold-input-flex">
                <div>
                  <label className="formbold-form-label">
                  first_name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    className="formbold-form-input"
                    onChange={handleChange}
                    value={user.first_name}                    
                  />
                </div>
                
              </div>

              <div className="formbold-mb-3">
                <label className="formbold-form-label">
                last_name
                </label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  className="formbold-form-input"
                  onChange={handleChange}
                  value={user.last_name}
                />
              </div>
              <div className="formbold-mb-3">
                <label className="formbold-form-label">
                email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="formbold-form-input"
                  onChange={handleChange}
                  value={user.email}
                />
              </div>

              <div className="flex flex-col space-y-4">
                <label htmlFor="gender" className="formbold-form-label">Select Gender:</label>
                <select id="gender" value={user.gender} onChange={handleGenderChange} className="p-2 border border-gray-300 rounded-md">
                  <option value="" className="text-gray-500">Select</option>
                  {genders.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
                  
                <label htmlFor="domain" className="formbold-form-label">Select Domain:</label>
                <select id="domain" value={user.domain} onChange={handleDomainChange} className="p-2 border border-gray-300 rounded-md">
                  <option value="" className="text-gray-500">Select</option>
                  {domains.map((domain) => (
                    <option key={domain} value={domain}>
                      {domain}
                    </option>
                  ))}
                </select>
              </div>


              <div className="formbold-mb-3">
                <label className="formbold-form-label">
                avatar
                </label>
                <input
                  type="text"
                  name="avatar"
                  id="avatar"
                  className="formbold-form-input"
                  onChange={handleChange}
                  value={user.avatar}
                />
              </div>
              

              <div className="formbold-mb-3">
                <label className="formbold-form-label">
                  Available
                </label>

                <div className="flex items-center space-x-4">
                  <label htmlFor="available-true" className="formbold-form-label">
                    True
                  </label>
                  <input
                    type="radio"
                    id="available-true"
                    name="available"
                    className="formbold-form-input"
                    onChange={handleChangeAvailable}
                    value="true"
                    checked={user.available === true}
                  />

                  <label htmlFor="available-false" className="formbold-form-label">
                    False
                  </label>
                  <input
                    type="radio"
                    id="available-false"
                    name="available"
                    className="formbold-form-input"
                    onChange={handleChangeAvailable}
                    value="false"
                    checked={user.available === false}
                  />
                </div>
              </div>
              
              <div>
                <Button btn="+ Edit User" type='submit'/>
              </div>
    </form>
  </div>
</div>
    </div>
  )
}

export default EditUserForm
