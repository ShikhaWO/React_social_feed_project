import React, {useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import Link from '@mui/material/Link';
import {logInUser} from "../rtk/reducers/authReducer";
import {useDispatch} from "react-redux";
import {useAuth} from "../Authentication/auth";

function Login() {
    const [loginUser, setLoginUser] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const auth = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(logInUser(loginUser))
        if (logInUser.fulfilled.match(result)) {
            auth.login(result.payload);
        } else {
            console.error(result.payload);
        }
        navigate("/home")
    }

    const handleChange = (e) => {
        setLoginUser({...loginUser, [e.target.id]: e.target.value})
    }

    return (
        <div>
            <Box
                height={300}
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
                    <h2>LogIn Form</h2>
                </div>
                <div style={{padding: '10px'}}>
                    <TextField
                        required
                        id="email"
                        label="Email"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleChange}
                        value={loginUser.email || ''}
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
                        value={loginUser.password || ''}
                    />
                </div>
                <div style={{alignSelf: 'center'}}>
                    <Button variant="contained" onClick={handleSubmit}>LOGIN</Button>
                </div>
                <div style={{padding: '10px'}}>Don't have an account?
                    <Link
                        style={{padding: '10px'}}
                        onClick={() => {
                            navigate('/signin')
                        }}
                    >
                        SIGN UP
                    </Link>
                </div>
            </Box>
        </div>
    )
}

export default Login