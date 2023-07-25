// import {Component} from 'react'

import {
  FaPinterestSquare,
  FaTwitter,
  FaInstagram,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <>
    <div className="end">
      <div className="ending">
        <img
          src="https://res.cloudinary.com/dh0wwy8i8/image/upload/v1677431347/Frame_275white-logo_mmk4m0.png"
          alt="website-footer-logo"
          className="logo"
        />
        <h1 className="heading2">Tasty Kitchen</h1>
      </div>
      <p className="heading-p">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="facebook">
        <FaPinterestSquare
          className="facebook-icon"
          testid="pintrest-social-icon"
        />
        <FaInstagram className="insta" testid="instagram-social-icon" />
        <FaTwitter className="twitter" testid="twitter-social-icon" />
        <FaFacebookSquare
          className="facebook-icon"
          testid="facebook-social-icon"
        />
      </div>
    </div>
  </>
)
export default Footer
