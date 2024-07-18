import React from "react"

const FarmEmoji = props => (
  <span
    className="farm-emoji"
    role="img"
    aria-label={props.label || ""}
    aria-hidden={!props.label}
    style={{ position: "absolute", top: props.top, left: props.left }}
  >
    {props.symbol}
  </span>
)

export default FarmEmoji