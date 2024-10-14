import React from "react";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const GoogleLoginButton = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate()
    const { login } = useAuth();

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const token = credentialResponse.credential;
            const user = jwtDecode(token);
            console.log(user);

            const { email, name, sub: googleId, picture: Photo, email_verified } = user
            console.log({
                email,
                name,
                googleId,
                Photo,
                email_verified
            });
            const res = await fetch(`${API_URL}/api/users/google`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    name,
                    googleId,
                    Photo,
                    email_verified
                })
            });
            const data = await res.json()

            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('id', data.id);
                login(data);
                if (data.message.includes("complete your profile")) {
                    navigate("/complete-profile")
                } else {
                    navigate("/")
                }
            }
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    )

}

export default GoogleLoginButton