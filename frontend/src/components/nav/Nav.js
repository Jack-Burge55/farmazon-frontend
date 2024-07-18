import { Link, Redirect } from "react-router-dom"
import React from "react"

function Nav({ passedUser, setPassedUser }) {
  const [user, setUser] = React.useState("")
  const [isActive, setIsActive] = React.useState(false)

  React.useEffect(() => {
    fetch(`http://localhost:8080/users/${passedUser.id}`)
      .then(resp => resp.json())
      .then(data => {
        setUser(data)
      })
  }, [passedUser.id])

  function handleClick() {
    setPassedUser("")
    window.location.reload()
  }

  return (user.id === undefined ? <p> loading... </p> :
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/products">
            <img src="https://i.ibb.co/sWJKXGD/farmazon-coloured.png" width="202px" height="48.33px" />
          </Link>

          <a onClick={() => setIsActive(!isActive)} role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
          <div className="navbar-start">
            <Link className="navbar-item" onClick={() => setIsActive(!isActive)} to="/earncredit">{user.credit}💰</Link>
            <Link className="navbar-item" onClick={() => setIsActive(!isActive)} to="/products">Products</Link>
            <Link className="navbar-item" onClick={() => setIsActive(!isActive)} to={`/farm/${user.id}`}>{user.farmName}</Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link className="button is-success" onClick={() => setIsActive(!isActive)} to={`/cart/${user.id}`}>🛒</Link>
                <a className="button is-dark" onClick={handleClick}><strong>Sign Out</strong></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {(passedUser.id === "") && <Redirect push to="/" />}
    </nav>
  )
}

export default Nav