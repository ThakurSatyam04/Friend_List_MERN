import { toast } from "react-hot-toast";
import {MdDeleteForever} from "react-icons/md"
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/Slices/TeamSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../env"

const Users = ({post}) => {

  const {team} = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = post._id


  const handleEdit = () => {
    navigate(`/EditUserForm/${userId}`)
  }

  const addFriend = () => {
    if(post.available === "true"){
      dispatch(add(post));
      toast.success("user added to team");
    }
    else{
      toast.error("user is not available")
    }
  }

  const removeFromCart = () => {
    dispatch(remove(post.id));
    toast.error("user removed from team")
  }

  const removeUser = async () => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete the user?");
  
      if (confirmed) {
        const deleteLab = await axios.delete(`${API_URL}/api/deleteUser/${userId}`);
        window.location.reload();
        toast.success("User deleted successfully");
      } else {
        toast.success("User deletion cancelled");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
    <div className="flex flex-col rounded-xl border-2 border-slate-200 gap-3 p-1 mt-5  ml-1 mr-1 items-center justify-between hover:scale-105 transition duration-300 ease-in hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] ">
      
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4">
          <div
            className="bg-red-500 cursor-pointer rounded-full w-[27px] h-[27px] flex items-center justify-center"
            onClick={removeUser}>
              <MdDeleteForever/>
          </div>

      </div>
          <div className="flex flex-col items-center pb-10">
              <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={post.avatar} alt="Bonnie_image"/>
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{post.first_name + " " + post.last_name}</h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">{post.email}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{post.gender}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{post.domain}</span>
              <span className={`text-sm ${post.available === "true" ? "text-green-500" : "text-red-500"}`}>{post.available === "true" ? "available" : "not available"}</span>
              <div className="flex mt-4 md:mt-6">
                  <button onClick={addFriend}  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</button>
                  <button onClick={handleEdit}  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3">Edit</button>
              </div>
          </div>
      </div>
      </div>

      
    </div>
  )
};

export default Users;
