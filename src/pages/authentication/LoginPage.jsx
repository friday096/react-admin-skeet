import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup"; // Import Yup
import './page-auth.css';
import { AuthWrapper } from "./AuthWrapper";
import authService from "../../service/auth.service";
import useLocalStorage from "../../hooks/useLocalStorage";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email is required")
        .email("Email is not valid"),
    password: Yup.string()
        .required("Password is required"),
    rememberMe: Yup.boolean(),
});

export const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema) // Use Yup schema
    });
    const [authToken, setAuthToken] = useLocalStorage('authToken', null);
    const navigate = useNavigate(); 
    const { verifyToken } = useAuth();
    const onSubmit = async (data) => {
        try {
            const response = await authService.authLogin(data);
            if(response.status === 'error'){
                toast.error(response.message)
            }else{
                toast.success(response.message)
                setAuthToken(response.token)
                await verifyToken();
                navigate('/');
            }
            // Handle successful login (e.g., redirect, store token, etc.)
        } catch (error) {
            console.error('Login error:', error);
            // Handle login error (e.g., show error message)
        }
    };

    return (
        <AuthWrapper>
            <h4 className="mb-2">Welcome to Sneat! 👋</h4>
            <p className="mb-4">Please sign-in to your account and start the adventure</p>

            <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email or Username</label>
                    <input
                        type="text"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        {...register("email")}
                        placeholder="Enter your email or username"
                        autoFocus
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>

                <div className="mb-3 form-password-toggle">
                    <div className="d-flex justify-content-between">
                        <label className="form-label" htmlFor="password">Password</label>
                        <Link aria-label="Go to Forgot Password Page" to="/auth/forgot-password">
                            <small>Forgot Password?</small>
                        </Link>
                    </div>
                    <div className="input-group input-group-merge">
                        <input
                            type="password"
                            id="password"
                            {...register("password")}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                            aria-describedby="password"
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                    </div>
                </div>

                <div className="mb-3">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="remember-me"
                            {...register("rememberMe")}
                        />
                        <label className="form-check-label" htmlFor="remember-me"> Remember Me </label>
                    </div>
                </div>

                <div className="mb-3">
                    <button aria-label='Click me' className="btn btn-primary d-grid w-100" type="submit">Sign in</button>
                </div>
            </form>

            <p className="text-center">
                <span>New on our platform? </span>
                <Link aria-label="Go to Register Page" to='/auth/register' className="registration-link">
                    <span>Create an account</span>
                </Link>
            </p>
        </AuthWrapper>
    );
}
