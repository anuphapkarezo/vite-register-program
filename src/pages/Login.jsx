//* Login page component *//

import "./styles/Login.css";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import authorixation from "../assets/authorixation.png";
import lock from "../assets/lock.png";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Translate } from "@mui/icons-material";

function Login() {
  //*State for user login and password*//
  const [password, setPassword] = useState("");
  const [userLogin, setUserLogin] = useState("");
  const system_no = 6;

  //*Navigate to home page*//
  const navigate = useNavigate();

  //*Database for user login and password*//
  const userDatabase = `http://10.17.66.242:3001/api/smart_register/filter-user-login-smart-register?user_login=${userLogin}&system_no=${system_no}`;

  //*Check user login and password in database*//
  const handleLogin = (event) => {
    event.preventDefault();

    axios
      .get(userDatabase)
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (
          data[0].user_login === userLogin &&
          data[0].user_password === password &&
          data[0].system_no === 6
        ) {
          localStorage.setItem("userToken", JSON.stringify(data[0]));
          console.log("Logged in successfully");
          Swal.fire({
            icon: "success",
            title: "Login Success",
            text: "Welcome to Smart Planning",
          });
          navigate("/home");
        } else {
          console.log("Login failed");
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "Please check your username or password",
          });
        }
      })
      .catch((error) => {
        console.error("There was a problem with the request:", error.message);
        Swal.fire({
          icon: "error",
          title: "User does not exist",
          text: "Please check your username or password",
        });
      });
  };

  const handleGuest = () => {
    localStorage.setItem(
      "guestToken",
      JSON.stringify({
        user_login: "Guest",
        role_type: "Guest",
        system_no: 4,
        role_no: 4,
      })
    );
    Swal.fire({
      icon: "warning",
      title: "Guest Mode",
      text: "Guest mode for read only",
    });
  };

  return (
    <>
      <div className="container">
        <div className="login-container h-fit">
            {/* <img
                src={authorixation}
                alt="authorixation"
                className="login-logo"
                style={{
                  width: 40,
                }}
            /> */}
          <div className="title-container flex justify-center">
            <div className="flex items-center">
                <img
                  src={lock}
                  alt="authorixation"
                  className="login-logo"
                  style={{
                    width: 40,
                  }}
                />
              <p className="login-title">Register Authorization</p>
                  
            </div>
          </div>

          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              variant="standard"
              margin="normal"
              value={userLogin}
              onChange={(event) => setUserLogin(event.target.value)}
            />
            <br />
            <TextField
              label="Password"
              variant="standard"
              margin="normal"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ m: 4 }}
            >
              Login <LockOpenOutlinedIcon sx={{ ml: 1 }} />
            </Button>
            <br />
            {/* <Link to="/home" onClick={handleGuest}>
              Go to dashboard with guest
            </Link> */}
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
