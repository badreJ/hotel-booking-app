import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  console.log(isLoggedIn);
  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-600 py-6">
      <div className=" container mx-auto flex justify-between items-center px-2 ">
        <span className="text-4xl text-white font-bold tracking-tight">
          <Link to="/" className="">
            Bookit
            <span className="bg-gradient-to-br from-blue-500 to-blue-800 text-transparent bg-clip-text ">
              .com
            </span>
          </Link>
        </span>
        <span className=" bg-gradient-to-r from-blue-500 to-blue-600  px-4 py-2 rounded-lg transition-all duration-150 hover:scale-105  cursor-pointer flex space-x-2 border-r-2 border-l-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center  font-bold hover:underline"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center  font-bold hover:underline"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link to="/sign-in" className=" px-3 text-white font-bold ">
              Sign In
            </Link>
          )}
        </span>
      </div>
    </header>
  );
};

export default Header;
