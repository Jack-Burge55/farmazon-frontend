import Emoji from "../emoji/Emoji"

export default function Column () {
  return <div className="cout-cow-column">
    <figure className="image image-is-1by1">
      <div className="emoji">
        <Emoji className="emoji" symbol={"💰"} />
      </div>
      <div className="emoji">
        <Emoji className="emoji" symbol={"🐮"} />
      </div>
      <div className="emoji">
        <Emoji className="emoji" symbol={"💰"} />
      </div>
    </figure>
  </div>
}
