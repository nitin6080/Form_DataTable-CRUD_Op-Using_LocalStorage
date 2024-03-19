import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InfoContainer = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const [editIndex, setEditIndex] = useState(null);

  const editUserData = (index) => {
    setEditIndex(index);
  };

  const saveUserData = () => {
    // Implement saving edited data here
    setEditIndex(null); // Resetting editIndex here after every save
  };

  return (
    <div className="p-6">
      <button
        className="bg-red-500 text-white p-3 rounded-lg mr-6"
        onClick={() => navigate("/form")}
      >
        Add User
      </button>
      <button
        className="bg-green-600 text-white p-3 rounded-lg"
        onClick={saveUserData}
      >
        Save
      </button>
      <table className="table-auto w-full text-center mt-6">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Confirm Password</th>
            <th>{""}</th>
            <th>{""}</th>
          </tr>
        </thead>
        <tbody className="">
          {userData.map((data, index) => (
            <tr className="" key={index}>
              <td
                className={
                  editIndex === index
                    ? "relative border-2 border-yellow-400"
                    : "border-2 border-blue-400"
                }
                contentEditable={editIndex === index}
              >
                {data.username}{''}
                {editIndex === index && (
                  <span className="absolute top-0 right-1">✎</span>
                )}
              </td>
              <td
                className={
                  editIndex === index
                    ? "relative border-2 border-yellow-400"
                    : "border-2 border-blue-400"
                }
                contentEditable={editIndex === index}
              >
                {data.email}{''}
                {editIndex === index && (
                  <span className="absolute top-0 right-1">✎</span>
                )}
              </td>
              <td
                className={
                  editIndex === index
                    ? "relative border-2 border-yellow-400"
                    : "border-2 border-blue-400"
                }
                contentEditable={editIndex === index}
              >
                {data.password}{''}
                {editIndex === index && (
                  <span className="absolute top-0 right-1">✎</span>
                )}
              </td>
              <td
                className={
                  editIndex === index
                    ? "relative border-2 border-yellow-400"
                    : "border-2 border-blue-400"
                }
                contentEditable={editIndex === index}
              >
                {data.confirmPassword}{''}
                {editIndex === index && (
                  <span className="absolute top-0 right-1">✎</span>
                )}
              </td>
              <td className="">
                <button
                  className="bg-yellow-500 text-white p-3 rounded-lg"
                  onClick={() => editUserData(index)}
                >
                  <span>✎ </span>Edit
                </button>
              </td>
              <td className="text-center flex">
                <button
                  className="bg-cyan-400 text-white p-3 rounded-lg"
                  onClick={() =>
                    setUserData(userData.filter((_, i) => i !== index))
                  }
                >
                  <span className="">❌ </span>Trash
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InfoContainer;
