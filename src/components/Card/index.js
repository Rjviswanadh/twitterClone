import {Link} from 'react-router-dom'

import './index.css'

const Card = props => {
  const {cardDetails} = props
  const {
    //  costForTwo,
    cuisine,
    imageUrl,
    menuType,
    id,
    name,
    userRating,
  } = cardDetails

  return (
    <>
      <Link to={`Restaurant-details/${id}`} className="link">
        <li className="margin">
          <div className="products-image">
            <img className="product-images" src={imageUrl} alt={menuType} />
          </div>
          <div>
            <p className="name">{name}</p>
            <p className="type">{cuisine}</p>
            <p>{userRating.rating}</p>
          </div>
        </li>
      </Link>
    </>
  )
}
export default Card
