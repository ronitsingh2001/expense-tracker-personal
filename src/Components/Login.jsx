import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useEffect, useRef, useState } from "react";
import validateForm from "../utils/validateForm";
import Loader from "./Loader";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [errorMes, setErrorMes] = useState(null);
  const [login, setLogin] = useState(true);
  const [isProgress, setIsProgress] = useState(false);
  const user = useSelector((store) => store.user);
  const fullName = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleClick = (e) => {
    setIsProgress(true);
    const isValid = validateForm(email.current.value, password.current.value);
    setErrorMes(isValid);
    if (isValid !== null) {
      setIsProgress(false);
      return;
    }
    if (!login) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullName.current.value,
          })
            .then(() => {
              // Profile updated!
              const user = auth.currentUser;
              dispatch(
                addUser({
                  userId: user?.uid,
                  userName: user?.displayName,
                  userEmail: user?.email,
                })
              );
              setIsProgress(false);
              // ...
            })
            .catch((error) => {
              setIsProgress(false);
              setErrorMes(error.code);
              // An error occurred
              // ...
            });
        })
        .catch((error) => {
          setErrorMes(error.code);
          setIsProgress(false);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((user) => {
          setIsProgress(false);
        })
        .catch((error) => {
          setErrorMes(error.code);
          setIsProgress(false);
        });
    }
  };

  return (
    <div className="w-full h-[100vh] bg-gradient-to-r from-[#171D1C] to-blue-900 flex justify-center items-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-white/10 backdrop-blur-lg px-8 py-4 mx-10 rounded-lg border border-blue-300 shadow-xl shadow-blue-500/50 space-y-4 flex-1"
        action=""
      >
        <h1 className="font-bold text-xl text-white text-center">
          {!login ? "Sign Up" : "Sign In"}
        </h1>
        {!login && (
          <div className="flex flex-col">
            <label className="text-sm font-semibold py-1 text-white">
              Name
            </label>
            <input
              ref={fullName}
              className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/20 text-white"
              type="text"
              placeholder="John Doe"
            />
          </div>
        )}
        <div className="flex flex-col">
          <label className="text-sm font-semibold py-1 text-white">Email</label>
          <input
            ref={email}
            className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/20 text-white"
            type="text"
            placeholder="John.Doe@mail.com"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold py-1 text-white">
            Password
          </label>
          <input
            ref={password}
            className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/20 text-white"
            type="password"
            placeholder="*********"
          />
          {errorMes && (
            <p className="text-xs text-red-300 p-0 m-0 font-semibold rounded-md">
              {errorMes}
            </p>
          )}
        </div>
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleClick}
            className="w-full bg-blue-900 hover:bg-blue-700 my-2 text-white font-bold py-1 px-4 rounded-md transition duration-200 text-sm"
            disabled={isProgress}
          >
            {!isProgress ? !login ? "Sign Up" : "Sign In" : <Loader />}
          </button>
          <hr />
          <button className="text-white text-start text-xs" onClick={() => setLogin(!login)}>
            {!login ? "Already a user?" : "New User?"}
            <span className="underline font-semibold">
              {login ? " Register Now" : " Sign In"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
