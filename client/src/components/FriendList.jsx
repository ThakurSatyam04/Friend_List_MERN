import { toast } from "react-hot-toast";
import {MdDeleteForever} from "react-icons/md"
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/TeamSlice";

const FriendList = ({user}) => {

  const dispatch = useDispatch();

  // console.log(user)

  const removeFromFriendList = () => {
    dispatch(remove(user._id));
    toast.success("Friend Removed")
  }

  return (
    <div className="w-[80%] mx-auto ">

      <div className="lg:flex lg:flex-row my-3 flex flex-col items-center">

        <div className="h-[180px] w-[30%] m-4">
          <img src={user.avatar} className="h-full w-full"  alt="" />
        </div>

        <div className="w-[70%]">
          <h1 className="text-gray-700 font-semibold text-lg mt-1 w-96">{user.first_name} {user.last_name}</h1>
          <h1 className="w-80 py-3 text-gray-400 font-normal text-[15px] text-left">{user.gender}</h1>
          <h1 className="w-80 py-3 text-gray-400 font-normal text-[15px] text-left">{user.email}</h1>
          <div className="flex justify-between w-80">
            <p className={`text-sm ${user.available === "true" ? "text-green-500" : "text-red-500"}`}>{user.available==="true" ? "available" : "not available"}</p>
            <div
            className="bg-red-500 cursor-pointer rounded-full w-[25px] flex items-center justify-center"
            onClick={removeFromFriendList}>
              <MdDeleteForever/>
            </div>
          </div>
        </div>

      </div>

      <div className="w-[100%] h-[0.5px] bg-slate-500">

      </div>

    </div>
  )
};

export default FriendList;
