import React from "react"
import { Link, Redirect } from "react-router-dom"
import "./checkout.scss"
import Column from "../Column/Column"

function CheckOut({ setPassedUser }) {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("farmazonUser")) || "")

  React.useEffect(() => {
    fetch(`http://localhost:8080/users/${user.id}`)
      .then(resp => resp.json())
      .then(data => {
        setUser(data)
      })
  }, [user.id])

  function success() {

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: -totalToSpend,
    }
    fetch(`http://localhost:8080/users/${user.id}/changecredit`, requestOptions)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("farmazonUser", JSON.stringify(data))
        setPassedUser(data)
      })
    const requestOptions1 = {
      method: "PUT",
    }
    fetch(`http://localhost:8080/checkout/${user.id}/`, requestOptions1)
      .catch(e => console.log(e))
  }

  const productLinesToBuy = user.productLines.filter(element => {
    return element.inCart === true
  })
  const totalToSpend = productLinesToBuy.reduce((acc, line) => {
    return acc + line.totalPrice
  }, 0)
  const totalAnimals = productLinesToBuy.reduce((acc, line) => {
    return acc + line.quantity
  }, 0)
  const total = user.credit
  return (
    <div className="checkout-main">
      <Column />
      <div className="checkout-central">
        <h1 className="cout-h1 title is-1">Checkout</h1>
        <div className="divider"></div>
        <h2 className="cout-h2">Number of products: {productLinesToBuy.length}</h2>
        <h2 className="cout-h2">Number of animals: {totalAnimals}</h2>
        <h2 className="cout-h2">Total: {totalToSpend}💰</h2>
        <h2 className="cout-h2">{user.username}&apos;s Credits: {total}💰</h2>
        <h2 className="cout-h2">Credits after Transaction: {total - totalToSpend}💰</h2>
        {total - totalToSpend < 0 ? <h3>You can&apos;t afford this! Go earn some credits 🤠</h3> : <Link to="/confirmation"><button className="button is-success cout-button is-large" onClick={success}>Purchase</button></Link>}
        <Link to={`/cart/${user.id}`}><button className={"button is-danger cout-button"}>Return to cart</button></Link>
      </div>
      <Column />
      {user === "" && <Redirect push to="/" />}
    </div>
  )
}

export default CheckOut