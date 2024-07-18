import * as React from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

import Login from "./components/login/Login"
import SignUp from "./components/signUp/SignUp"
import Products from "./components/productsList/ProductsList"
import ProductPage from "./components/productPage/ProductPage"
import Farm from "./components/farm/Farm"
import Cart from "./components/cart/Cart"
import CheckOut from "./components/checkOut/CheckOut"
import Confirmation from "./components/confirmation/Confirmation"
import EarnCredit from "./components/earnCredits/EarnCredit"
import Nav from "./components/nav/Nav"
import ConfirmationNav from "./components/confirmationNav/ConfirmationNav"
import CreditConfirmation from "./components/creditConfirmation/CreditConfirmation"
import Footer from "./components/footer/Footer"

function App() {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("farmazonUser")) || "")
  const [userLoggedIn, setUserLoggedIn] = React.useState(false)
  const [userClickedSignOut, setUserClickedSignOut] = React.useState(false)

  React.useEffect(() => {
    if (user === "") {
      localStorage.setItem("farmazonUser", JSON.stringify(""))
      localStorage.setItem("farmazonUserId", JSON.stringify(""))
    } else if (user === "login" || user === undefined) {
      localStorage.setItem("farmazonUser", JSON.stringify("login"))
      localStorage.setItem("farmazonUserId", JSON.stringify(""))
    } else {
      localStorage.setItem("farmazonUser", JSON.stringify(user))
      localStorage.setItem("farmazonUserId", JSON.stringify(user.id))
    }
  }, [user])

  const validUser = user !== "" && user !== "login" && user !== undefined

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {user === ""
            ? <SignUp setUser={setUser} />
            : !userLoggedIn || user === undefined
              ? <Login setUser={setUser} setUserLoggedIn={setUserLoggedIn} userLoggedIn={userLoggedIn} />
              : <Redirect to="/products" />
          }
        </Route>

        <Route path="/products">
          {validUser && <Nav passedUser={user} setPassedUser={setUser} userClickedSignOut={userClickedSignOut} setUserClickedSignOut={setUserClickedSignOut} />}
          <Products />
        </Route>

        <Route path="/product/:productId">
          {validUser && <Nav passedUser={user} setPassedUser={setUser} userClickedSignOut={userClickedSignOut} setUserClickedSignOut={setUserClickedSignOut} />}
          <ProductPage />
        </Route>

        <Route path="/farm/:userId">
          {validUser && <Nav passedUser={user} setPassedUser={setUser} userClickedSignOut={userClickedSignOut} setUserClickedSignOut={setUserClickedSignOut} />}
          <Farm />
        </Route>

        <Route path="/cart/:cartId">
          {validUser && <Nav passedUser={user} setPassedUser={setUser} userClickedSignOut={userClickedSignOut} setUserClickedSignOut={setUserClickedSignOut} />}
          <Cart userId={user.id} />
        </Route>

        <Route path="/checkout/:cartId">
          {validUser && <Nav passedUser={user} setPassedUser={setUser} userClickedSignOut={userClickedSignOut} setUserClickedSignOut={setUserClickedSignOut} />}
          <CheckOut setPassedUser={setUser} />
        </Route>

        <Route path="/confirmation">
          <ConfirmationNav />
          <Confirmation setPassedUser={setUser} />
        </Route>

        <Route path="/earncredit">
          {validUser && <Nav passedUser={user} setPassedUser={setUser} userClickedSignOut={userClickedSignOut} setUserClickedSignOut={setUserClickedSignOut} />}
          <EarnCredit user={user} setUser={setUser} />
        </Route>

        <Route path="/creditconfirmation">
          <ConfirmationNav />
          <CreditConfirmation setUser={setUser} />
        </Route>

      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App
