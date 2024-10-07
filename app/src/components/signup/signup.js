import { useState } from "react";
import "./signup.css"; // Link to the CSS file
import { Link } from "react-router-dom";
import { BASE_API_URL } from "../../lib/constants.jsx";

const SignUpForm = () => {
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    standard: "",
    address: "",
    city: "",
    state: "",
  });

  const [msg, setMsg] = useState();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

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

  const onUpdateField = (e) => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(`${BASE_API_URL}user/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setMsg(data.msg);
            setForm({
              fname: "",
              lname: "",
              email: "",
              password: "",
              dob: "",
              gender: "",
              standard: "",
              address: "",
              city: "",
              state: "",
            });
          } else {
            setMsg(data.msg);
          }
        } else {
          console.error("Signup failed");
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    }
  };

  return (
    <div className="loginContainer">            
      <form className="form" onSubmit={onSubmitForm}>
        <span>{msg}</span>
        <label className="formLabel">Signup</label>
        <div className="one">
          <div className="formGroup">
            <input
              className="formField"
              type="text"
              aria-label="fname Field"
              name="fname"
              placeholder="Enter your First name"
              value={form.fname}
              onChange={onUpdateField}
            />
          </div>
          <div className="formGroup">
            <input
              className="formField"
              type="text"
              aria-label="lname Field"
              name="lname"
              placeholder="Enter your Last name"
              value={form.lname}
              onChange={onUpdateField}
            />
          </div>
        </div>
        <div className="two">
          <div className="formGroup">
            <input
              className="formField"
              type="email"
              aria-label="Email field"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={onUpdateField}
            />
            {errors.email && (
              <span className="error" style={{ color: "red" }}>
                {errors.email}
              </span>
            )}
          </div>
          <div className="formGroup">
            <input
              className="formField"
              type="password"
              aria-label="Password field"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={onUpdateField}
            />
            {errors.password && (
              <span className="error" style={{ color: "red" }}>
                {errors.password}
              </span>
            )}
          </div>
        </div>
        <div className="three">
          <div className="formGroup">
            <input
              className="formField"
              type="date"
              aria-label="dob field"
              name="dob"
              placeholder="Enter your DOB"
              value={form.dob}
              onChange={onUpdateField}
            />
          </div>
          <div className="formGroup">
            <input
              className="formField"
              type="text"
              aria-label="gender Field"
              name="gender"
              placeholder="Enter your gender"
              value={form.gender}
              onChange={onUpdateField}
            />
          </div>
        </div>
        <div className="four">
          <div className="formGroup">
            <input
              className="formField"
              type="text"
              aria-label="standard Field"
              name="standard"
              placeholder="Enter your standard"
              value={form.standard}
              onChange={onUpdateField}
            />
          </div>
          <div className="formGroup">
            <input
              className="formField"
              type="text"
              aria-label="address Field"
              name="address"
              placeholder="Enter your address"
              value={form.address}
              onChange={onUpdateField}
            />
          </div>
        </div>
        <div className="five">
          <div className="formGroup">
            <input
              className="formField"
              type="text"
              aria-label="city Field"
              name="city"
              placeholder="Enter your city"
              value={form.city}
              onChange={onUpdateField}
            />
          </div>
          <div className="formGroup">
            <input
              className="formField"
              type="text"
              aria-label="state Field"
              name="state"
              placeholder="Enter your state"
              value={form.state}
              onChange={onUpdateField}
            />
          </div>
        </div>
        <div className="formActions">
          <button className="formSubmitBtn" type="submit">
            Signup
          </button>
        </div>
        <label className="formLabelAgain">
          Already have an account.{" "}
            <Link to="/login" style={{ color: "black" }}>
              <span>Login</span>
            </Link>
        </label>
      </form>
    </div>
  );
};

export default SignUpForm;
