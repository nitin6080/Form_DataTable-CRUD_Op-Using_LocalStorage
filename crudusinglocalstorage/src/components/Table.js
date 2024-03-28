import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ValidatedForm from "./Form";

const InfoContainer = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const [editIndex, setEditIndex] = useState(null);

  const [editMode, setEditMode] = useState(false); // Moved editMode state
  const editUserData = (index) => {
    // setEditIndex(index);
    setEditIndex(index);
    setEditMode(true); // Set editMode to true when editing
  };

  const saveUserData = () => {
    console.log(userData);
    // Implement saving edited data here
    setEditIndex(null); // Resetting editIndex here after every save
  };

  const saveEditedContent = (index, field, content) => {
    // Update the user data with the edited content
    const updatedUserData = [...userData];
    updatedUserData[index][field] = content;
    setUserData(updatedUserData);

    // Reset editIndex after saving
    setEditIndex(null);
  };
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  console.log("updatedCell", userData);

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
            <tr
              className=""
              key={index}
              onClick={(e) => console.log("value", e)}
            >
              <td className={ editIndex === index ? "relative border-2 border-yellow-400" : "border-2 border-blue-400" }
                contentEditable={editIndex === index}
                onBlur={(e) => {
                  console.log(e.target.innerText);
                  saveEditedContent(index, "username", e.target.innerText);
                }}
              >
                {data.username}
                {/* {""}
                {editIndex === index && (
                  <span className="absolute top-0 right-1">✎</span>
                )} */}
              </td>
              <td className={ editIndex === index ? "relative border-2 border-yellow-400" : "border-2 border-blue-400" }
                contentEditable={editIndex === index}
                onBlur={(e) => {
                  console.log(e.target.innerText);
                  saveEditedContent(index, "email", e.target.innerText);
                }}
              >
                {data.email}
                {""}
                {/* {editIndex === index && (
                  <span className="absolute top-0 right-1">✎</span>
                )} */}
              </td>
              <td className={ editIndex === index ? "relative border-2 border-yellow-400" : "border-2 border-blue-400" }
                contentEditable={editIndex === index}
                onBlur={(e) => {
                  console.log(e.target.innerText);
                  saveEditedContent(index, "password", e.target.innerText);
                }}
              >
                {data.password}
                {""}
                {editIndex === index && (
                  <span className="absolute top-0 right-1">✎</span>
                )}
              </td>
              <td
                className={ editIndex === index ? "relative border-2 border-yellow-400" : "border-2 border-blue-400"}
                contentEditable={editIndex === index}
                onBlur={(e) => {
                  console.log(e.target.innerText);
                  saveEditedContent(index, "confirmPassword", e.target.innerText);
                }}
              >
                {data.confirmPassword}
                {""}
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
      {/* Pass editMode and setEditMode to ValidatedForm */}
      <div className="hidden">
        <ValidatedForm
          userData={userData}
          setUserData={setUserData}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      </div>
    </div>
  );
};

export default InfoContainer;
