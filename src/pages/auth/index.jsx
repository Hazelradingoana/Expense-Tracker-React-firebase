import {auth,provider} from '../../config/firebase-config.js';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate, Navigate} from "react-router-dom";
import { useGetUserInfo } from '../../hooks/useGetUserInfo.js'; 
import "./styles.css";
import { useEffect } from 'react';

export const Auth = () => {
    const navigate = useNavigate();
    const {isAuth} = useGetUserInfo();

    const SignInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        const authInfo = {
            userID: result.user.uid,
            name: result.user.displayName,
            profilePhoto: result.user.photoURL,
            isAuth: true,
        };
        localStorage.setItem("auth",JSON.stringify(authInfo));
        navigate("/expense-tracker");

    };

        if (isAuth) {
            return <Navigate to="/expense-tracker" />;
        }
    return (
        <div className="login-page">
        <p>Sign in with Google to continue</p>
        <button className="login-with=google-btn" onClick={SignInWithGoogle}>Sign in with Google</button>
    </div>    );
};

