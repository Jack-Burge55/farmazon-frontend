import Emoji from "../emoji/Emoji"
import React from "react"
import "./productLineCard.scss"

function ProductLineCard({ id, productName, parsedEmoji, product, quantity, totalPrice }) {
  function handleRemove() {
    fetch(`http://localhost:8080/deleteproductlinebyid/${id}`, {
      method: "DELETE",
    })
    window.location.reload()
  }

  return (
    <div className="column">
      <div className="row">
        <div className="card box-shadow">
          <div className="card-header">
            <div className="card-header-title is-centered">{productName}</div>
          </div>
          <div className="card-image">
            <figure className="image">
              <div className="emoji">
                {<Emoji className="emoji" symbol={String.fromCodePoint(parsedEmoji)} />}
              </div>
            </figure>
            <div className="card-footer is-centered">
              <div className="card-footer-item">
                <p>Region: {product.region}</p>
              </div>
              <div className="card-footer-item">
                <p> Price: {product.price}💰</p>
              </div>
              <div className="card-footer-item">
                <p> Quantity: {quantity} </p>
              </div>
              <div className="card-footer-item">
                <p>Total Price: {totalPrice}💰</p>
              </div>
              <div className="card-footer-item">
                <button className="button is-danger" onClick={handleRemove}>
                Remove
                </button>
              </div>
            </div>
          </div>
          <div className="card-footer">
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductLineCard
