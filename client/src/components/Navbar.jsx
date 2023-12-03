import {FaShoppingCart} from "react-icons/fa"
import { NavLink } from "react-router-dom/dist";
import { useSelector } from "react-redux";

const Navbar = () => {

  const {team} = useSelector((state) => state);

  return (
  <div>
    <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto">

      <NavLink to="/">
        <div>
          {/* <img className="w-20" src={logo} alt="" /> */}
        </div>
      </NavLink>

      <div className="flex items-center space-x-3 text-white text-lg">
        <NavLink to="/">
          <p>Home</p>
        </NavLink>

        <NavLink to="/cart">
          <div className="relative">
            {/* <FaShoppingCart className="text-2xl"/> */}
            <img className="w-8 rounded-full bg-white" src="https://icons.veryicon.com/png/o/miscellaneous/site-icon-library/team-28.png" alt="" />
            {
              team.length > 0 && 
              <span className="absolute -top-1 -right-2 bg-green-500 animate-bounce w-5 h-5 rounded-full flex justify-center items-center text-xs">
                {team.length}
              </span>
            }
          </div>  
        </NavLink>
      </div>

    </nav>
  </div>
  )
};

export default Navbar;
