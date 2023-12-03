import { useSelector } from "react-redux";
import { Link } from "react-router-dom/dist";
import CartItem from "../components/FriendList";
import { useEffect, useState } from "react";
import "./Cart.css";

const Cart = () => {

  const {team} = useSelector((state) => state);


  return (
    <div className=" max-w-6xl mx-auto mt-10">
      {
        team.length > 0 ?
        (
          <div className="container">
            <div className="w-[60%]">
              {
                team.map((user) => {
                  return <CartItem key={user._id} user={user} />
                })
              }
            </div>

            <div className=" w-[40%] flex flex-col max-h-screen ">
              <div>
                <div className="text-green-600 font-semibold text-2xl">Your Team</div>
                <p className="mt-4">
                  <span className="font-semibold text-xl">Total friends : {team.length}</span>
                </p>
              </div>
            </div>
          </div>
        ) :
        (
          <div className="w-full flex items-center flex-col">
            <h1 className="font-semibold text-2xl">No friends in your team</h1>
            <Link to={"/"}>
              <button className=" text-xl">
                Add more members
              </button>
            </Link>

          </div>
        )
      }
    </div>
  )
};

export default Cart;
