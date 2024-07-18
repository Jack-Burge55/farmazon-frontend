import React from "react"
import { Link, Redirect } from "react-router-dom"
import "./confirmation.scss"
import Confetti from "react-confetti"
import Column from "../Column/Column"

function Confirmation() {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("farmazonUser")) || "")

  React.useEffect(() => {
    fetch(`http://localhost:8080/users/${user.id}`)
      .then(resp => resp.json())
      .then(data => {
        localStorage.setItem("farmazonUser", JSON.stringify(data))
        setUser(data)
      })
  }, [user.id])

  return <>
    <Confetti />
    <div className="confirmation-main">
      <Column />
      <div className="confirmation-central">
        <h1 className="conf-h1">Thank you for your order farmer!</h1>
        <h2 className="conf-h2">Your new animals should arrive at your farm soon!</h2>
        <Link to={`/farm/${user.id}`}><button className="button conf-button">Go to your Farm</button></Link>
        <Link to="/products"><button className="button conf-button">Back to products</button></Link>
      </div>
      <Column />
    </div>
    {user === "" && <Redirect push to="/" />}
  </>
}

export default Confirmation
