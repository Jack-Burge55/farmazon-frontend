import React from "react"
import { Link, Redirect } from "react-router-dom"
import "./creditConfirmation.scss"
import Confetti from "react-confetti"

function CreditConfirmation() {
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
    <div className="credit-confirmation-page">
      <div className="credit-confirmation-central">
        <h1 className="conf-h1">Congratulations!</h1>
        <div className="divider"></div>
        <h2 className="conf-h2">You are rewarded for your hard work at the farm and the new credits should be in your wallet now!</h2>
        <div className="buttons-credit-confirm">
          <Link to={`/farm/${user.id}`}><button className="credit-conf-button">Go to your Farm</button></Link>
          <Link to="/products"><button className="credit-conf-button">Back to products</button></Link>
        </div>
      </div>
    </div>
    {user === "" && <Redirect push to="/" />}


  </>
}

export default CreditConfirmation