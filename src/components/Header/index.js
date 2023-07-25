import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiMenu} from 'react-icons/fi'
import './index.css'
// import Popup from 'reactjs-popup'

const Header = props => {
  const ClickToLogout = () => {
    Cookies.remove('jwt-token')
    const {history} = props
    history.replace('/login')
  }

  const clickForMenu = () => {
    console.log('hello')
  }

  /* <>
      <Popup>
        <div className="header">
          <Link to="/" className="home">
            Home
          </Link>
          <Link to="/cart" className="cart">
            Cart
          </Link>
          <div>
            <button type="button" className="button" onClick={ClickToLogout}>
              Logout
            </button>
          </div>
        </div>
      </Popup>
    </> */

  return (
    <>
      <div className="header2">
        <div className="over-all-div">
          <Link to="/" className="header1">
            <img
              src="https://res.cloudinary.com/dh0wwy8i8/image/upload/v1677208098/v1tdt4xjocsweem0hmgc.jpg"
              alt="header"
              className="header-image"
            />
            <h1 className="kitchen">Tasty kitchen</h1>
          </Link>
          <FiMenu className="menu-icon" onClick={clickForMenu} />
        </div>
        <div className="header">
          <Link to="/" className="home">
            Home
          </Link>
          <Link to="/cart" className="cart">
            Cart
          </Link>
          <div>
            <button type="button" className="button" onClick={ClickToLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default withRouter(Header)
