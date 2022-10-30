import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import "./style.css"

const Login = () => {

    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const LogIn = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }) // body data type must match "Content-Type" header
        });
        const res = await response.json(); // parses JSON response into native JavaScript objects

        console.log("response", res.error)
        if (res.error == null) {
            localStorage.setItem("token", res)
            console.log("authtoken", res)
            navigate('/')
        }
        else {
            alert("Invalid Credentials")
        }
    }
    return (
        <div >
            <h2 className="shadow titleWidth">NotesOnCloud</h2>
            <div className="container my-3 shadow loginwidth">
                <form>
                    <div className="mb-3">
                        <h5 style={{ textAlign: "left" }}>Email</h5>
                        <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3">
                        <h5 style={{ textAlign: "left" }}>Password</h5>
                        <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                    </div>
                    {/* className="btn btn-danger mb-2" */}
                    <button type="submit" className="mb-2" style={{backgroundColor:"black", color:"cadetblue",fontSize:"20px",borderRadius:"7px"}} onClick={LogIn}>LogIn</button>
                </form>
            </div>
        </div>
    )
}

export default Login