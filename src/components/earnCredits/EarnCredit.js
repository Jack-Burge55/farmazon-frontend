import React from "react"
import { Redirect } from "react-router-dom"
import "./earnCredits.scss"

function EarnCredit() {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("farmazonUser")))
  const [newCredits, setNewCredits] = React.useState(0)
  const [creditAdded, setCreditAdded] = React.useState(false)

  React.useEffect(() => {
    fetch(`http://localhost:8080/users/${user.id}`)
      .then(resp => resp.json())
      .then(data => {
        setUser(data)
      })
  }, [user.id])

  React.useEffect(() => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: newCredits,
    }
    fetch(`http://localhost:8080/users/${user.id}/changecredit`, requestOptions)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("farmazonUser", JSON.stringify(data))
      })
  }, [newCredits, user.id])

  function handleCredits(e) {
    setNewCredits(parseInt(e.target.value))
    setCreditAdded(true)
  }

  function Credits ({ title, subtitle, value }) {
    return <div className="box-credits">
      <div className="box-info">
        <h3>{title}</h3>
        <h3>{subtitle}</h3>
      </div>
      <button value={value} className="button-earn-credits" onClick={handleCredits}>Collect</button>
    </div>
    
  }

  return <>
    <div className="earnCredits-body">
      <h1 className="earn-credits-heading">Earn Credits 👩‍🌾</h1>
      <Credits title="Sell Milk 🥛" subtitle="Earn: 10💰" value="10"/>
      <Credits title="Sell at farmers market 🛍️" subtitle="Earn: 100💰" value="100"/>
      <Credits title="Seedy dealings... 🤝💼👀" subtitle="Earn: 10000💰" value="10000"/>
    </div>
    {user === "" && <Redirect push to="/" />}
    {creditAdded && <Redirect push to="/creditconfirmation" />}
  </>
}

export default EarnCredit
