import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
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
    username: Yup.string().required("Username is required"),
    email: Yup.string()
        .required("Email is required")
        .email("Email is not valid"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    // terms: Yup.bool()
    //     .oneOf([true], "You must accept the terms and conditions"),
});

export const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema) // Use Yup schema
    });
    const [authToken, setAuthToken] = useLocalStorage('authToken', null);
    const navigate = useNavigate(); 
    const { verifyToken } = useAuth();

    const onSubmit = async (data) => {
        try {
            // console.log('Form submitted:', data);
            const response = await authService.createUser(data);
            // console.log('Registration successful:', response);
            if(response.status === 'error'){
                toast.error(response.message)
            }else{
                toast.success(response.message)
                setAuthToken(response.token)
                await verifyToken();
                navigate('/');
            }

            // Handle successful registration (e.g., redirect, show message)
        } catch (error) {
            console.error('Registration error:', error);
            // Handle registration error (e.g., show error message)
        }
    };

    return (
        <AuthWrapper>
            <h4 className="mb-2">Adventure starts here 🚀</h4>
            <p className="mb-4">Make your app management easy and fun!</p>

            <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        id="username"
                        {...register("username")}
                        placeholder="Enter your username"
                        autoFocus
                    />
                    {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="text"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        {...register("email")}
                        placeholder="Enter your email"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>

                <div className="mb-3 form-password-toggle">
                    <label className="form-label" htmlFor="password">Password</label>
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
                            className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`}
                            type="checkbox"
                            id="terms-conditions"
                            {...register("terms")}
                        />
                        <label className="form-check-label" htmlFor="terms-conditions">
                            I agree to
                            <a aria-label="privacy policy and terms" href="#"> privacy policy & terms</a>
                        </label>
                    </div>
                    {errors.terms && <div className="invalid-feedback">{errors.terms.message}</div>}
                </div>

                <button aria-label='Click me' className="btn btn-primary d-grid w-100">Sign up</button>
            </form>

            <p className="text-center">
                <span>Already have an account?</span>
                <Link aria-label="Go to Login Page" to="/auth/login" className="d-flex align-items-center justify-content-center">
                    <i className="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
                    Back to login
                </Link>
            </p>
        </AuthWrapper>
    );
}
