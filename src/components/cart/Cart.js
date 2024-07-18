import ProductLineCard from "../productLineCard/ProductLineCard"
import React from "react"
import { Redirect, Link } from "react-router-dom"
import "./cart.scss"
import Column from "../Column/Column"

function Cart() {

  const [productLines, setProductLines] = React.useState([])
  const [productLinesInCart, setProductLinesInCart] = React.useState([])
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("farmazonUser")))

  function clearCart(id) {
    fetch(`http://localhost:8080/deleteproductlinebyid/${id}`, {
      method: "DELETE",
    })
  }

  function onClear() {
    productLinesInCart.forEach(line => {
      clearCart(line.id)
    })
    window.location.reload()
  }

  React.useEffect(() => {
    fetch(`http://localhost:8080/users/${user.id}`)
      .then(resp => resp.json())
      .then(data => {
        setProductLines(data.productLines)
        setUser(data)
      })
  }, [user.id])

  React.useEffect(() => {
    const filteredProductLines = productLines.filter(productLine => productLine.inCart === true)
    setProductLinesInCart(filteredProductLines)
  }, [productLines])


  return (
    <div className="cart-page">
      <Column />
      <div className="cart-body">
        <div className="cart-heading-container">
          <h1 className="cart-heading title is-1" id="cart-heading">{user !== "" && user.username.charAt(user.username.length - 1) === "s" ? user.username.toUpperCase() + "' " : user.username.toUpperCase() + "'S "}CART</h1>
          { productLinesInCart[0] !== undefined && <div className="buttons">
            <button className="cart-checkout-button button is-danger is-right" onClick={onClear}>
              Clear cart
            </button>
            <Link to={`/checkout/${user.id}`}>
              <button className="cart-checkout-button button is-success">
                Checkout
              </button>
            </Link>
          </div>}
        </div>
        <div className="product-lines-in-cart-container">
          {productLinesInCart.map((productLine) => {
            const parsedEmoji = productLine.product.emoji.replace(/&#/g, "").replace(/;/g, "").toString(16)

            return (
              <ProductLineCard
                key={productLine.id}
                {...productLine}
                parsedEmoji={parsedEmoji}
                {...productLinesInCart}
              />
            )
          })}
        </div>
        {(productLinesInCart[0] === undefined) && <div className="container" id="cart-empty-container"><h3 className="title is-3"> Your cart is empty! Click below to go to the products page 😊 </h3><Link className="button is-primary" id="cart-head-to-products-button" to="/products">Head to Products</Link></div>}

        {(user === "") && <Redirect push to="/" />}
      </div>
      <Column />
    </div>





  )
}

export default Cart