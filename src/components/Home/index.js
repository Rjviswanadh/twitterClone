import {Component} from 'react'

import Slider from 'react-slick'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsFilterLeft} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'
import Card from '../Card'
import Pagmentation from '../Pagmentation'

import './index.css'

// const totalPages = 4

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 1,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    // sortBy: sortByOptions[0].value,
    //  currentPage: 1,
    products: [],
    apiStatus: apiStatusConstants.initial,
    isTrue: true,
    next10: 0,
    displayOffers: [],
    //  activePage: 1,
  }

  componentDidMount() {
    this.getCarosuls()
    this.getProducts()
    // this.selectRange()
  }

  // GET CAROSULS
  getCarosuls = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    this.setState(pv => ({isTrue: !pv.isTrue}))
    const jwtToken = Cookies.get('jwt-token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/restaurants-list/offers',
      options,
    )

    const data = await response.json()
    console.log(data, '0')
    const displayOffer = data.offers.map(offer => ({
      id: offer.id,
      imageUrl: offer.image_url,
    }))
    this.setState({displayOffers: displayOffer})
  }

  banner = () => {
    const Settings = {
      dots: true,
      autoplay: true,
      speed: 500,
      SlidesToShow: 1,
      SlidesToScroll: 1,
      infinite: true,
      autoPlaySpeed: 2000,
    }
    const {displayOffers} = this.state
    return (
      <Slider {...Settings}>
        {displayOffers.map(eachIng => (
          <li>
            <img src={eachIng.imageUrl} alt="offers" className="banner" />
          </li>
        ))}
      </Slider>
    )
  }

  receiveOffset = offset => {
    this.setState({next10: offset})
  }

  selectRange = async event => {
    //  event.preventDefault()
    const jwtToken = Cookies.get('jwt-token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response1 = await fetch(
      `https://apis.ccbp.in/restaurants-list/?sort_by_rating=${event.target.value}`,
      options,
    )
    const data1 = await response1.json()
    //  console.log(data1)

    const camelCase = data1.restaurants.map(items => ({
      costForTwo: items.cost_for_two,
      cuisine: items.cuisine,
      groupByTime: items.group_by_time,
      imageUrl: items.image_url,
      hasTableBooking: items.has_table_booking,
      menuType: items.menu_type,
      id: items.id,
      location: items.location,
      name: items.name,
      opensAt: items.opens_at,
      hasOnlineDelivery: items.has_online_delivery,
      userRating: items.user_rating,
    }))
    this.setState({products: camelCase})
  }

  getProducts = async () => {
    const {next10} = this.state
    console.log(next10, 'hello')
    const jwtToken = Cookies.get('jwt-token')
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response1 = await fetch(
      `https://apis.ccbp.in/restaurants-list/?offset=${next10}&limit=10`,
      options,
    )
    if (response1.ok === true) {
      const data1 = await response1.json()
      console.log(data1, '00')
      const camelCase = data1.restaurants.map(items => ({
        costForTwo: items.cost_for_two,
        cuisine: items.cuisine,
        groupByTime: items.group_by_time,
        imageUrl: items.image_url,
        hasTableBooking: items.has_table_booking,
        menuType: items.menu_type,
        id: items.id,
        location: items.location,
        name: items.name,
        opensAt: items.opens_at,
        hasOnlineDelivery: items.has_online_delivery,
        userRating: items.user_rating,
      }))
      this.setState({
        products: camelCase,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response1.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoader = () => (
    <>
      <div className="products-loader-container loader">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    </>
  )

  renderProducts = () => {
    const {products} = this.state

    return (
      <>
        <Header className="header" />
        <div>{this.banner()}</div>
        <div className="products-container2">
          <div className="options">
            <div>
              <h1 className="popular-class">Popular Restaurants</h1>
              <p className="paras">
                Select Your favourite restaurant special dish and make your day
                happy...
              </p>
            </div>
            <div className="select-option">
              <BsFilterLeft className="filter" />
              <p className="select">Select by</p>
              <select className="selects" onChange={this.selectRange}>
                {sortByOptions.map(option => (
                  <>
                    <option className="option" key={option.id}>
                      {option.displayText}
                    </option>
                  </>
                ))}
              </select>
            </div>
          </div>
          <hr />
          <div className="ul-list-items">
            <ul className="ul-list">
              {products.map(eachProduct => (
                <Card cardDetails={eachProduct} key={eachProduct.id} />
              ))}
            </ul>
          </div>
          <div className="aline">
            <Pagmentation sendOffset={this.receiveOffset} />
          </div>
        </div>
        <Footer className="footer" />
      </>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProducts()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }
}
export default Home
