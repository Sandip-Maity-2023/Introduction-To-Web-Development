import React, { useState } from "react";
import "./Form.css";
import { useForm } from "react-hook-form";

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitSuccessful },
    watch,
    reset,
  } = useForm();

  //   const onSubmit = (data) => {
  //     console.log("Form submitted successfully!", data);
  //   };

  const [showPassword, setshowpassword] = useState(false);
  const [passStrength, setpassStrength] = useState("");
  const password = watch("password");
  const confirm = watch("confirm");

  const checkpassStrength = (value) => {
    if (!value) return setpassStrength("");
    if (value.length < 6) return setpassStrength("weak");
    if (
      /[A-Z]/.test(value) &&
      /[0-9]/.test(value) &&
      /[^A-Za-z0-9]/.test(value)
    ) {
      return setpassStrength("Strong");
    }
    setpassStrength("Medium");
  };

  const onSubmit = (data) => {
    console.log("Form submitted successfully!", data);
    alert("Form submitted successfully!");
    reset();
    setpassStrength("");
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Form Validation</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-group">
          <label className="form-label">Username:</label>

          {/* username */}
          <input
            className={`form-input ${errors.username ? "invalid" : "valid"}`}
            type="text"
            //name="username"  this will big input box
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 4,
                message: "Username must be at least 4 characters long",
              },
            })}
          />

          {errors.username && (
            <span className="error-message">{errors.username.message}</span>
          )}
        </div>

        {/* email */}
        <div>
          <label className="form-label">Email:</label>
          <input
            className={`form-input ${errors.email ? "invalid" : "valid"}`}
            type="email"
            name="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /\S+@\S+\.\S+/, message: "Email is invalid" },
            })}
          />

          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label className="form-label">Phone Number:</label>
          <input
            className={`form-input ${errors.phone ? "invalid" : "valid"}`}
            type="tel"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit number",
              },
            })}
          />
          {errors.phone && (
            <span className="error-message">{errors.phone.message}</span>
          )}
        </div>

        {/* password field */}
        <div className="form-group">
          <label className="form-label">Password:</label>
          <div className="pass-container">
            <input
              className={`form-input ${errors.password ? 'invalid' : 'valid'}`}
              type={showPassword ? "text" : "password"}
              name="password"
              {...register("password", {
                required: "Password is reqired",
                minLength: {
                  value: 8,
                  message: "Password mut be at least 8 characters long",
                },
              })}
              onChange={(e) => checkpassStrength(e.target.value)}
            />

            <button
              type="button"
              className="show-password-btn"
              onClick={() => setshowpassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {passStrength && (
            <span className={`password-strength ${passStrength.toLowerCase()}`}>
              Strength: {passStrength}
            </span>
          )}

          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}
        </div>

        {/* confirm password field */}
        <div className="form-group">
          <label className="form-label">Confirm Password:</label>
          <input
            className={`form-input ${
              errors.confirm ? "invalid" : "valid"
            }`}
            type={showPassword ? "text" : "password"}
            {...register("confirm", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirm && (
            <span className="error-message">
              {errors.confirm.message}
            </span>
          )}
        </div>

        <button className="submit-button" type="submit">
          Submit
        </button>

          {isSubmitSuccessful && <p className="success-message">🎉 Form submitted</p>}

      </form>
    </div>
  );
}

export default Form;
