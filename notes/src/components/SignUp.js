import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    let navigation = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const SignUp = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }) // body data type must match "Content-Type" header
        });
        const res = await response.json(); // parses JSON response into native JavaScript objects
        console.log(res);
        navigation('/')
    }
    return (
        <div >
            <h2 className="shadow titleWidth">NotesOnCloud</h2>
            <div className="container my-3 shadow loginwidth">
                <form>
                    <div className="mb-3">
                        <h5 style={{ textAlign: "left" }}>Name</h5>
                        <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} id="exampleInputPName1" />
                    </div>
                    <div className="mb-3">
                        <h5 style={{ textAlign: "left" }}>Email</h5>
                        <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <h5 style={{ textAlign: "left" }}>Password</h5>
                        <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                    </div>

                    <button type="submit" className="btn btn-danger mb-2" style={{backgroundColor:"black", color:"cadetblue",fontSize:"20px",borderRadius:"7px"}} onClick={SignUp}>SignUp</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp