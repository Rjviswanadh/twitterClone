import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'

import Footer from '../Footer'

import ItemsCard from '../ItemsCard'

import './index.css'

class RestaurantDetails extends Component {
  state = {
    productDetails: [],
    foodItems: [],
    cartList: [],
  }

  componentDidMount() {
    this.renderRestaurantDetails()
  }

  renderRestaurantDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt-token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response10 = await fetch(
      `https://apis.ccbp.in/restaurants-list/${id}`,
      options,
    )
    const data10 = await response10.json()
    console.log(data10)
    const brifeDetails = {
      costForTwo: data10.cost_for_two,
      cuisine: data10.cuisine,
      imageUrl: data10.image_url,
      foodItems: data10.food_items,
      id: data10.id,
      location: data10.location,
      name: data10.name,
      opensAt: data10.opens_at,
      rating: data10.rating,
      reviewsCount: data10.reviews_count,
    }

    const order = data10.food_items.map(eachItem => ({
      cost: eachItem.cost,
      name: eachItem.name,
      id: eachItem.id,
      rating: eachItem.rating,
      imageUrl: eachItem.image_url,
      foodType: eachItem.food_type,
    }))
    this.setState({productDetails: brifeDetails, foodItems: order})
  }

  updateCart = (id, name, cost, imageUrl, quantity, isClicked) => {
    console.log(isClicked)
    const addCartList = {
      name,
      id,
      cost,
      imageUrl,
      quantity,
    }
    this.setState(pv => ({cartList: [...pv.cartList, addCartList]}))
  }

  render() {
    const {productDetails, foodItems, cartList} = this.state
    console.log(cartList)
    localStorage.setItem('cartData', JSON.stringify(cartList))

    const {
      costForTwo,
      cuisine,
      imageUrl,
      location,
      name,
      rating,
      reviewsCount,
    } = productDetails

    return (
      <>
        <div>
          <Header />
          <div className="details">
            <div>
              <img src={imageUrl} alt={name} className="food-img" />
            </div>
            <div className="resturant-details">
              <div>
                <h1 className="names">{name}</h1>
                <p className="cuisine">{cuisine}</p>
                <p className="cuisine">{location}</p>
              </div>
              <div className="rating-review">
                <div>
                  <p>{rating}</p>
                  <p>{`${reviewsCount} + Ratings`}</p>
                </div>
                <hr />
                <div>
                  <p>Rs {costForTwo} /- </p>
                  <p>Cost For Two</p>
                </div>
              </div>
            </div>
          </div>
          <ul className="line-up">
            {foodItems.map(eachFoodItem => (
              <ItemsCard
                itemsDetails={eachFoodItem}
                key={eachFoodItem.id}
                addToCart={this.updateCart}
                cartList={cartList}
              />
            ))}
          </ul>
          <Footer />
        </div>
      </>
    )
  }
}
export default RestaurantDetails
