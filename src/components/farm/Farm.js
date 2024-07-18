import "./farm.scss"
import FarmEmoji from "../emoji/FarmEmoji"
import { Redirect } from "react-router-dom"
import React from "react"

function Farm() {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("farmazonUser")))
  const [filteredUserLines, setFilteredUserLines] = React.useState([])
  const [fieldAnimals, setFieldAnimals] = React.useState([])
  const [waterAnimals, setWaterAnimals] = React.useState([])
  const [desertAnimals, setDesertAnimals] = React.useState([])
  const [airAnimals, setAirAnimals] = React.useState([])
  const [mysticalAnimals, setMysticalAnimals] = React.useState([])
  let emoji

  const regionEmojis = (regionArray) => {
    return regionArray.map(line => {
      const quantity = line.quantity
      if (line.product.emoji !== undefined) {      
        line.product.emoji.includes("emoji") ? emoji = line.product.emoji : emoji = line.product.emoji.replace(/&#/g, "").replace(/;/g, "").toString(16)
      }
      return Array(quantity).fill(emoji.includes("emoji") ? emoji : String.fromCodePoint(emoji))
    }).flat()
  }

  const fieldEmojis = regionEmojis(fieldAnimals)
  const waterEmojis = regionEmojis(waterAnimals)
  const desertEmojis = regionEmojis(desertAnimals)
  const airEmojis = regionEmojis(airAnimals)
  const mysticalEmojis = regionEmojis(mysticalAnimals)

  React.useEffect(() => {
    fetch(`http://localhost:8080/users/${user.id}`)
      .then(resp => resp.json())
      .then(data => {
        setUser(data)
      })
  }, [user.id])

  React.useEffect(() => {
    if (user !== "") {
      setFilteredUserLines(user.productLines.filter(line => !line.inCart))
    }
  }, [user])

  React.useEffect(() => {
    function filterRegion(region) {
      return filteredUserLines.filter(line => line.product.region === region)
    }
    setFieldAnimals(filterRegion("field"))
    setDesertAnimals(filterRegion("desert"))
    setAirAnimals(filterRegion("air"))
    setWaterAnimals(filterRegion("water"))
    setMysticalAnimals(filterRegion("mystical"))
  }, [filteredUserLines])

  function FixedEmoji ({ emoji, top, left, fontSize = "50px", zIndex = 0 }) {
    return <div style={{ top: `${top}%`, left: `${left}%`, fontSize: `${fontSize}px`, zIndex, position: "absolute" }}>{emoji}</div>
  }

  const mapEmojis = (emojiArray) => {
    return emojiArray.map((emoji, i) => {
      const randWidth = Math.random() * 80 + 10
      const randHeight = Math.random() * 80 + 10
      return <FarmEmoji className="farm-emoji" symbol={emoji} key={i} top={randHeight + "%"} left={randWidth + "%"} />
    })
  }

  return <>
    <div className="main">
      <div className="sky">
        <FixedEmoji emoji="☁️" top="20" left="50"/>
        <FixedEmoji emoji="☁️" top="40" left="14"/>
        <FixedEmoji emoji="☁️" top="12" left="34"/>
        <FixedEmoji emoji="🌞" top="5" left="82"/>
        <FixedEmoji emoji="⛰️" top="74" left="42" fontSize="70" zIndex={-2}/>
        <FixedEmoji emoji="⛰️" top="74" left="38" fontSize="65" zIndex={-2}/>
        <FixedEmoji emoji="⛰️" top="74" left="20" fontSize="65" zIndex={-2}/>
        {mapEmojis(airEmojis)}
      </div>
      <div className="land">
        <div className="grass">
          <div className="house">🏠</div>
          <FixedEmoji emoji="🌳" top="30" left="45" zIndex={1}/>
          <FixedEmoji emoji="🌲" top="64" left="81" zIndex={1}/>
          <FixedEmoji emoji="🌳" top="-4" left="75" zIndex={1}/>
          <FixedEmoji emoji="🌲" top="78" left="20" zIndex={1}/>
          {mapEmojis(fieldEmojis)}

        </div>
        <div className="desert">
          <FixedEmoji emoji="🌴" top="23" left="56" zIndex={1}/>
          <FixedEmoji emoji="🌴" top="46" left="72" zIndex={1}/>
          <FixedEmoji emoji="🌴" top="53" left="45" zIndex={1}/>
          <div className="oasis"></div>
          <FixedEmoji emoji="🌵" top="3" left="85" zIndex={1}/>
          <FixedEmoji emoji="🌵" top="63" left="25" zIndex={1}/>
          {mapEmojis(desertEmojis)}
        </div>
      </div>
      <div className="water">
        <FixedEmoji emoji="⛵" top="40" left="53"/>
        {mapEmojis(waterEmojis)}
      </div>
      {mapEmojis(mysticalEmojis)}
    </div>

    {user === "" && <Redirect push to="/"/>}
  </>
}

export default Farm