import React from "react"

const Emoji = props => (
  <span
    className="emoji"
    role="img"
    aria-label={props.label || ""}
    aria-hidden={!props.label}
  >
    {props.symbol}
  </span>
)

export default Emoji