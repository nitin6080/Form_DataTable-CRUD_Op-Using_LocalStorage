import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { validEmail, validPassword } from "./regex";

const ValidatedForm = ({
  userData,
  setUserData = () => null, //default value given setUserData function to avoid
  editMode,
  setEditMode,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUserName] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [conPass, setconPass] = useState("");
  const [err, setErr] = useState(false);
  const [emailerr, setEmailerr] = useState(false);

  useEffect(() => {
    // debugger;
    // Check if location state has data, if yes, set edit mode and pre-fill form fields
    if (location.state) {
      const { username, email, password, confirmPassword } = location.state;
      setUserName(username);
      setemail(email);
      setpassword(password);
      setconPass(confirmPassword);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // let { value, name } = e.target; // before edit it was existing

    if (!validEmail.test(email)) {
      alert("Please enter a proper email");
      return;
    }

    if (password !== conPass) {
      alert("Passwords do not match");
      return;
    }

    const newUser = {
      username,
      email,
      password,
      confirmPassword: conPass,
    };
    // debugger;
    if (editMode) {
      const { id } = editMode || {};
      // console.log(editMode); // to check data prior edit
      const updatedUserData = userData.map((user) => {
        console.log({ user });
        return user.id === id ? newUser : user;
      });
      setUserData(updatedUserData);
      // console.log(updatedUserData); // to check data after edit
      setEditMode(false);
    } else {
      const data = {
        ...newUser,
        id: new Date().getTime(),
      };
      setUserData((prevUserData) => [...prevUserData, data]);
    }

    navigate("/"); // Navigate back to the list after updating or adding a user
  };

  // console.log(userData); // final data post all ops
  return (
    <div className="flex h-full justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white shadow-md rounded px-4 py-2 text-start"
      >
        <div className="">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        {emailerr && <p>please enter proper email</p>}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={conPass}
            onChange={(e) => setconPass(e.target.value)}
          />
        </div>
        {err && <p>miss matched</p>}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onSubmit={handleSubmit}
          >
            {editMode ? "Update" : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ValidatedForm;
