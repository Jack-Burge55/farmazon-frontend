import React from "react"
import { Redirect } from "react-router-dom"
require("./login.scss")

function Login({ setUser, setUserLoggedIn, userLoggedIn }) {
  const [usersData, setUsersData] = React.useState([])
  const [userNotFound, setUserNotFound] = React.useState(false)
  const [loginForm, setLoginForm] = React.useState({
    username: "",
    password: "",
  })

  React.useEffect(() => {
    fetch("http://localhost:8080/users")
      .then(resp => resp.json())
      .then(users => {
        setUsersData(users)
      })
  }, [])

  function handleChange(e) {
    const { id, value } = e.target
    setLoginForm({
      ...loginForm,
      [id]: value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (
      loginForm.username &&
      loginForm.password
    ) {
      const filteredUsers = usersData.filter((user) => {
        return user.username === loginForm.username && user.password === loginForm.password
      })
      if (filteredUsers[0] !== undefined) {
        setUserLoggedIn(true)
        setUser(filteredUsers[0])
      } else {
        setUserNotFound(true)
        setUser("login")
      }
    }
  }

  return (
    <div className="login-body">
      <img src="https://i.ibb.co/sWJKXGD/farmazon-coloured.png" alt="farmazon_logo" width="400" />
      <h1 className="heading is-1 login-h1 " id="login-heading">Log in</h1>
      <form className="login-form" aria-labelledby="login-heading" onSubmit={handleSubmit}>

        <label className="login-label" htmlFor="username">Username</label>
        <input
          className="login-input"
          id="username"
          type="text"
          placeholder="username"
          autoComplete="username"
          value={loginForm.username}
          onChange={handleChange}
        />
        {userNotFound && <p>User not found!</p>}

        <label className="login-label" htmlFor="password">Password</label>
        <input
          className="login-input"
          id="password"
          type="password"
          placeholder="password"
          value={loginForm.password}
          onChange={handleChange}
        />
        <div className="login-button-container">
          <button className="login-button" type="submit">
            Submit
          </button>
        </div>

      </form>
      <div className="login-link-container">
        <h3 className="login-link-text"> Not yet registered? </h3>
        <a href="/" ><button className="login-link-button" onClick={() => setUser("")}>Sign up here...</button></a>
      </div>

      {userLoggedIn && <Redirect push to="/products" />}
    </div>
  )
}

export default Login