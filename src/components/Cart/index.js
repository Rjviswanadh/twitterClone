import {useState} from 'react'
import {withRouter} from 'react-router-dom'
// import PlaceOrder from '../PlaceOrder'
import Header from '../Header'
import Counter from '../Counter'
import Footer from '../Footer'
import SuccessOrder from '../SuccessOrder'

import './index.css'

const Cart = props => {
  const [order, placeOrderItem] = useState(true)
  const getCartItem = localStorage.getItem('cartData')
  const displayData = JSON.parse(getCartItem)
  // console.log(displayData)

  const placeOrder = () => {
    const {history} = props
    // console.log(history)
    history.push('/')
  }

  const displayItems = () =>
    displayData.map(eachItem => (
      <ul>
        <li className="cart-items">
          <li>
            <img src={eachItem.imageUrl} alt={eachItem.name} />
          </li>
          <p className="p1">{eachItem.name}</p>
          <Counter className="counter" />
          <p className="p1">{eachItem.cost}</p>
        </li>
      </ul>
    ))

  let totalCost = 0
  displayData.forEach(eachCost => {
    totalCost += eachCost.cost
  })

  const placeOrderTo = () => {
    placeOrderItem(pv => !pv.order)
  }

  const renderEmptyPage = () => (
    <>
      <div className="order">
        <div className="cart-display">
          <img
            src="https://res.cloudinary.com/dh0wwy8i8/image/upload/v1678618327/OBJECTSno_orders_ze9hsf.png"
            alt="no orders"
            className="order-img"
          />
        </div>
        <div className="cart-display2">
          <h1>No Orders Yet!</h1>
          <p>Your cart is empty. Add something from the menu.</p>
          <div>
            <button className="order-button" type="button" onClick={placeOrder}>
              Order now
            </button>
          </div>
        </div>
      </div>
    </>
  )

  const renderOrder = () => (
    <>
      <ul className="items-container">
        <li className="heading">
          <p className="item-price">price</p>
        </li>
        <div>{displayItems()}</div>
        <hr className="hr" />
        <div className="place-order">
          <p>Order Total</p>
          <div>
            <p className="bottom">{totalCost}</p>
            <div>
              <button
                className="button-place-order"
                type="button"
                onClick={placeOrderTo}
              >
                place order
              </button>
            </div>
          </div>
        </div>
      </ul>
    </>
  )

  return (
    <>
      <Header />
      <div>
        {displayData === null ? (
          <>{renderEmptyPage()}</>
        ) : (
          <>
            {order ? (
              <>{renderOrder()}</>
            ) : (
              <>
                <SuccessOrder />
              </>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  )
}

export default withRouter(Cart)
