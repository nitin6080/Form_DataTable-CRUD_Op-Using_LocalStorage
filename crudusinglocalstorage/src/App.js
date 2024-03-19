import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ValidatedForm from "./components/Form";
import InfoContainer from "./components/Table";

function App() {
  const [editMode, setEditMode] = useState(false);

  // debugger;
  console.log(editMode);
  //CREATE i.e. Function to add new user data
  const [userData, setUserData] = useState([
    {
      id:1,
      username: "Alphonso",
      email: "A@gmail.com",
      password: "1961",
      confirmPassword: "1961",
    },
    {
      id:2,
      username: "Bueno",
      email: "B@gmail.com",
      password: "1972",
      confirmPassword: "1972",
    },
    {
      id:3,
      username: "Shining Star",
      email: "Earth@gmail",
      password: "1975",
      confirmPassword: "1975",
    },
  ]);
  console.log({ userData });
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <InfoContainer {...{ userData, setUserData, setEditMode }} />
            }
          />
          <Route
            path="/form"
            element={
              <ValidatedForm
                {...{ userData, setUserData, editMode, setEditMode }}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;