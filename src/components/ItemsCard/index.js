// import {Link} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class ItemsCard extends Component {
  state = {isClicked: true}

  render() {
    const {isClicked} = this.state
    const {itemsDetails, addToCart} = this.props
    const {imageUrl, name, cost, rating, id} = itemsDetails
    const addButton = () => {
      addToCart(id, name, cost, imageUrl, isClicked)
    }
    // this.setState(pv => ({cost: pv.cost + cost}))
    return (
      <>
        <li className="line-out">
          <div className="food-items">
            <div>
              <img src={imageUrl} alt={name} className="each-img" />
            </div>
            <div className="name-cost">
              <h1 className="each-name">{name}</h1>
              <p>{cost}</p>
              <p>{rating}</p>

              <button onClick={addButton} type="button" className="add-button">
                Add
              </button>
            </div>
          </div>
        </li>
      </>
    )
  }
}
export default ItemsCard
