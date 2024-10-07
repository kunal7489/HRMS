import React from "react";
import { useState } from "react";
import styles from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../../lib/constants.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const onUpdateField = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: "",
        });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        }

        if (!form.password.trim()) {
            newErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch(`${BASE_API_URL}user/login_auth`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                });

                const data = await response.json();
                setMsg(data.msg);

                if (response.ok) {
                    const authToken = data.authToken;
                    localStorage.setItem("token", authToken);

                    try {
                        const userResponse = await fetch(`${BASE_API_URL}user/getuserbyid?userid=${data.user._id}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': authToken,
                            },
                        });

                        if (!userResponse.ok) {
                            throw new Error('Failed to fetch user data');
                        }

                        const userData = await userResponse.json();
                        const name = `${userData.data.fname} ${userData.data.lname}`;

                        localStorage.setItem("_id", userData.data._id);
                        localStorage.setItem("name", name);
                        localStorage.setItem("email", userData.data.email);
                        localStorage.setItem("role", userData.data.role);

                        if (userData.data.role === "admin") {
                            navigate('/admin');
                        } else {
                            navigate('/user');
                        }

                    } catch (err) {
                        console.error("Error fetching user data:", err);
                    }

                } else {
                    console.error('Login failed');
                }
            } catch (error) {
                console.error('Error occurred:', error);
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

  return (
    <>
            <div className={styles.loginContainer}>
    <form className={styles.form} onSubmit={onSubmitForm}>
        <div className={styles.formGroup}>
            <label className={styles.formLabel}>Login</label>
            <input
                className={styles.formField}
                type="text"
                aria-label="Email field"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={onUpdateField}
            />
            {errors.email && <span className="error" style={{ color: 'red' }}>{errors.email}</span>}
        </div>
        <div className={`${styles.formGroup} ${styles.passwordInputContainer}`} style={{ position: 'relative' }}>
    <input
        className={styles.formField}
        type={showPassword ? "text" : "password"}
        aria-label="Password field"
        name="password"
        placeholder="Enter your password"
        value={form.password}
        onChange={onUpdateField}
        style={{ paddingRight: '30px' }}  
    />
    <FontAwesomeIcon
        icon={showPassword ? faEyeSlash : faEye}
        className={styles.passwordToggleIcon}
        onClick={togglePasswordVisibility}
        style={{ 
            position: 'absolute', 
            right: '10px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            cursor: 'pointer', 
            height: "18px", 
        }}
    />
    {errors.password && <span className="error" style={{ color: 'red' }}>{errors.password}</span>}
</div>

        <div className={styles.formActions}>
            <button className={styles.formSubmitBtn} type="submit">
                Login
            </button>
        </div>
        <h6 style={{ color: 'green' }}>{msg}</h6><div className={styles.formGroup}>
        <label className={styles.formLabelAgain} >
            Need an account?  <Link to="/signup" style={{ color: 'black' }}><span>Signup</span></Link>
        </label>
    </div>
    </form>
    
</div>
        </>
  );
}

export default Login;
