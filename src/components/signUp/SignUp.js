import React from "react"
import "./signUp.scss"

function SignUp({ setUser }) {
  const [form, setForm] = React.useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    farmName: "",
    termsAndConditions: false,
    marketing: false,
  })
  const [passwordMismatch, setPasswordMismatch] = React.useState(false)
  const [termsError, setTermsError] = React.useState(false)

  function handleChange(e) {
    const { id, value, type, checked } = e.target
    setForm({
      ...form,
      [id]: type === "checkbox" ? checked : value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (
      form.username &&
      form.password &&
      form.passwordConfirmation &&
      form.email &&
      form.farmName &&
      form.password === form.passwordConfirmation &&
      form.termsAndConditions
    ) {
      fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
          farmName: form.farmName,
          acceptedTerms: form.termsAndConditions,
          wantsNewsletter: form.marketing,
        }),
      })
        .then((resp) => resp.json())
        .then(() => {
          setUser("login")
        })
        .catch((err) => err)
    }
  }

  return (
    <div className="signup-body">
      <img src="https://i.ibb.co/sWJKXGD/farmazon-coloured.png" alt="farmazon_logo" width="400" />
      <h1 className="signup-h1" id="sign-up-heading">Sign up</h1>
      <form className="signup-form" aria-labelledby="sign-up-heading" onSubmit={handleSubmit}>
        <label className="signup-label" htmlFor="username">Username</label>
        <input
          className = ".signup-input"
          id="username"
          type="text"
          placeholder="username"
          autoComplete="username"
          value={form.username}
          onChange={handleChange}
        />
        
        <label className="signup-label" htmlFor="password">Password</label>
        <input
          className = ".signup-input"
          id="password"
          type="password"
          placeholder="password"
          value={form.password}
          onChange={handleChange}
        />

        <label className="signup-label" htmlFor="passwordConfirmation">Password Confirmation</label>
        <input
          className = ".signup-input"
          id="passwordConfirmation"
          type="password"
          placeholder="confirm your password"
          value={form.passwordConfirmation}
          onChange={(e) => {
            if (passwordMismatch && form.password === e.target.value) {
              setPasswordMismatch(false)
            }
            handleChange(e)
          }}
          onBlur={() => {
            if (form.password !== form.passwordConfirmation) {
              setPasswordMismatch(true)
            }
          }}
        />
        {passwordMismatch && (
          <p
            className="error"
            aria-live={passwordMismatch ? "assertive" : "off"}
          >
            Passwords do not match
          </p>
        )}

        <label className="signup-label" htmlFor="email">Email</label>
        <input
          className = ".signup-input"
          id="email"
          type="email"
          placeholder="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
        />

        <label className="signup-label" htmlFor="farmName">Farm Name</label>
        <input
          className = ".signup-input"
          id="farmName"
          type="text"
          placeholder="Farm Name"
          value={form.farmName}
          onChange={handleChange}
        />

        <label className="signup-label" htmlFor="termsAndConditions">
          <input
            className = ".signup-input"
            type="checkbox"
            id="termsAndConditions"
            checked={form.termsAndConditions}
            onChange={(e) => {
              if (termsError && e.target.checked) {
                setTermsError(false)
              }
              handleChange(e)
            }}
          />
          Tick here to accept the terms and conditions
        </label>
        {termsError && (
          <p
            className="error"
            aria-live={termsError && !passwordMismatch ? "assertive" : "off"}
          >
            You must accept the terms and conditions to continue
          </p>
        )}

        <label className="signup-label" htmlFor="marketing">
          <input
            className = ".signup-input"
            type="checkbox"
            id="marketing"
            checked={form.marketing}
            onChange={handleChange}
          />
          Tick this box if you would like to receive our mooosletter
        </label>

        <button
          className="signup-button"
          type="submit"
          onClick={() => setTermsError(!form.termsAndConditions)}
        >
          Submit
        </button>

      </form>
      <div className="signup-link-container">
        <h3 className="signup-link-text"> Already registered? </h3>
        <a href="/" ><button className="signup-link-button" onClick={() => setUser("login")}>Log in here...</button></a>
      </div>
    </div>
  )
}

export default SignUp
