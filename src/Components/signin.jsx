import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { SignInUser } from "../rtk/reducers/authReducer";
import { toast } from "react-toastify";

function SignIn() {
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('userData===',userData)
        dispatch(SignInUser(userData))
        navigate("/home")
    }

    const handleChange = (e) => {
        setUserData({...userData, [e.target.id]: e.target.value})
    }

    return (
        <div>
            <Box
                height="auto"
                width={400}
                m="auto"
                mt={10}
                p={2}
                display="flex"
                flexDirection="column"
                border="2px solid grey"
                borderRadius={2}
                component="form"
                noValidate
                autoComplete="off"
            >
                <div style={{alignSelf: 'center'}}>
                    <h2>SignUp Form</h2>
                </div>
                <div style={{padding: '10px'}}>
                    <TextField
                        required
                        id="firstname"
                        label="First Name"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleChange}
                        value={userData.firstname || ''}
                    />
                </div>
                <div style={{padding: '10px'}}>
                    <TextField
                        required
                        id="lastname"
                        label="Last Name"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleChange}
                        value={userData.lastname || ''}
                    />
                </div>
                <div style={{padding: '10px'}}>
                    <TextField
                        required
                        id="username"
                        label="User Name"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleChange}
                        value={userData.username || ''}
                    />
                </div>
                <div style={{padding: '10px'}}>
                    <TextField
                        required
                        id="email"
                        label="Email"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleChange}
                        value={userData.email || ''}
                    />
                </div>
                <div style={{padding: '10px'}}>
                    <TextField
                        required
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleChange}
                        value={userData.password || ''}
                    />
                </div>
                {/*<div style={{padding: '10px'}}>*/}
                {/*    <TextField*/}
                {/*        required*/}
                {/*        id="confirmedPassword"*/}
                {/*        label="Confirmed Password"*/}
                {/*        type="password"*/}
                {/*        fullWidth*/}
                {/*        onChange={handleChange}*/}
                {/*        onBlur={handleChange}*/}
                {/*        value={userData.confirmedPassword || ''}*/}
                {/*    />*/}
                {/*</div>*/}
                <div style={{alignSelf: 'center'}}>
                    <Button variant="contained" onClick={handleSubmit}>SIGN IN</Button>
                </div>
            </Box>
        </div>
    )
}

export default SignIn