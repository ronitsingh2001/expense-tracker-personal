import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { SVG } from "../utils/constants";
import { collection, getDocs } from "firebase/firestore";
import { clearExpense, initialiseExpense } from "../utils/expenseSlice";

const Header = () => {
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedInUser = useSelector((store) => store.user);

  const logout = () => {
    setDropdown(false);
    signOut(auth)
      .then(() => {
        dispatch(clearExpense());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchDataFromFirestore = async (userData) => {
    try {
      const querySnapshot = await getDocs(collection(db, userData.userId));
      const dataList = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        dataList.push({ id: doc.id, ...doc.data() });
      });
      dispatch(initialiseExpense(dataList));
    } catch (e) {
      console.error("Error fetching documents: ", e);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const userData = {
          userId: user?.uid,
          userName: user?.displayName,
          userEmail: user?.email,
        };
        fetchDataFromFirestore(userData);
        dispatch(addUser(userData));
        // ...
      } else {
        navigate("/login");
        // User is signed out
        // ...
        dispatch(removeUser());
      }
    });
  }, []);
  return (
    <div className="flex justify-between bg-blue-950 text-white shadow-lg w-full absolute z-20 uppercase">
      <div className="p-4">
        <div className="w-36 logo">
          <img src="" alt="" />
        </div>
        <h1>Expense Tracker</h1>
      </div>
      {loggedInUser && (
        <div className="flex items-center">
          <ul className="flex p-4 space-x-4">
            <div className="flex items-center">
              <div className="relative">
                <button
                  onMouseEnter={() => setDropdown(true)}
                  onClick={() => setDropdown(!dropdown)}
                  className="focus:outline-none flex items-center"
                >
                  {SVG}
                </button>
                {dropdown && (
                  <div
                    onMouseLeave={() => setDropdown(false)}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-50 overflow-hidden"
                  >
                    <p className="ps-4 text-blue-900 font-bold pt-2">
                      {loggedInUser?.userName || "Guest"}
                    </p>
                    <hr />
                    <ul>
                      <li
                        onClick={() => setDropdown(false)}
                        className="text-black ps-4 pt-2 cursor-pointer"
                      >
                        <Link to="/">Home</Link>
                      </li>
                      <li
                        onClick={() => setDropdown(false)}
                        className="text-black ps-4 pt-2 cursor-pointer"
                      >
                        <Link to="/dashboard">Dashboard</Link>
                      </li>
                      <li
                        onClick={() => setDropdown(false)}
                        className="text-black ps-4 pt-2 cursor-pointer"
                      >
                        <Link to="/reports">Reports</Link>
                      </li>
                    </ul>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-300"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
