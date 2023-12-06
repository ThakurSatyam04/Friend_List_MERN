import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { API_URL } from '../env';
import Button from './Button_comp';
import {toast} from "react-hot-toast";
import "./AddUserForm.css"

const AddUserForm = () => {

    const navigate = useNavigate();

    const domains = ["Finance", "Marketing", "Management", "Sales", "UI Designing", "IT", "Management", "Business Development",]
    const genders = ["Female", "Male", "Polygender", "Genderqueer", "Non-binary", "Bigender", "Agender", "Genderfluid"]

    const [user, setUser] = useState({
        first_name:"",
        last_name:"",
        email:"",
        gender:"",
        domain:"",
        avatar:"",
        available:"false",
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
      const isChecked = event.target.checked;
      setUser({
        ...user,
        available: isChecked,
      });
    };

    const handleAddUser = async(e)=>{
        e.preventDefault();
        try{
          const {first_name,last_name,email,gender,avatar,domain,available} = user;
          if(first_name && last_name && email && gender && avatar && domain && available){
            await axios.post(`${API_URL}/api/user`,user)
             .then(res =>{
               toast.success("User added Successfully!", {
                autoClose: 3000,
              });
               navigate("/");
             })
          }else{
            alert("please fill all the fields");
          }
        }catch(err){
          console.log(err);
          alert("Email already exist")
        }
      }

  return (
    <div>
      <div className="formbold-main-wrapper">
          <div className="formbold-form-wrapper">
            <form onSubmit={handleAddUser} >

              <div className="formbold-form-title">
                <h2 className="flex justify-center">Add User Details</h2>              
              </div>

              <div className="formbold-input-flex">
                <div>
                  <label className="formbold-form-label">
                  First_name
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
                Last_name
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
                Email-id
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
                Avatar
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
              <label className="formbold-form-label">Available</label>
                  <div className="flex items-center gap-5">
                    <input
                      type="checkbox"
                      id="available-checkbox"
                      name="available"
                      onChange={handleChangeAvailable}
                      checked={user.available}
                    />
                    <label htmlFor="available-checkbox" className="ml-2">
                      {user.available ? 'YES' : 'NO'}
                    </label>
                </div>
              </div>
              
              <div>
                <Button btn="+ Add User" type='submit'/>
              </div>
            </form>
          </div>
      </div>

    </div>
  )
}

export default AddUserForm;
