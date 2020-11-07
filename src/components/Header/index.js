import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from '../Context/StateProvider'
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import { menus } from './Data'

import { auth } from '../../firebase';

import './header.css'
import SlideMenu from './SlideMenu';

const Header = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const [slideOpen, setSlideOpen] = useState(false)

  const handleAuthentication = () => {
    if(user) {
      auth.signOut();
    }
  }

  const slideToggle = () => {
    setSlideOpen(!slideOpen)
  }

  return (
    <>
    <div className="header">
      <div className="slide-menu-icon">
        <MenuIcon onClick={slideToggle} fontSize="large" className="menu-icon" />
        <SlideMenu handleAuthentication={handleAuthentication} slideToggle={slideToggle} slideOpen={slideOpen} />
      </div>

      <Link to="/">
        <img className="header_logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="img" />
      </Link>

      <div className="header_search">
        <select className="header_select">
          <option>All Deparments</option>
          {menus.map((item, i) => (
            <option key={i} value={item.menu}>{item.menu}</option>
          ))}
        </select>
        <input className="header_searchInput" type="text" />
        <SearchIcon className="header_searchIcon" />
      </div>

      <div className="header_nav">
        <Link to={!user ? '/login' : '/'}>
          <div onClick={handleAuthentication} className="header_option">
            <span className="header_optionLineOne">
              {user ? user.email : 'Guest'}
            </span>
            <span className="header_optionLineTwo">
              {user ? 'Sign Out' : 'Sign In'}
            </span>
          </div>
        </Link>

        <Link to="/orders">
          <div className="header_option">
            <span className="header_optionLineOne">
              Return
            </span>
            <span className="header_optionLineTwo">
              & Orders
            </span>
          </div>
        </Link>

        <div className="header_option">
          <span className="header_optionLineOne">
            Your
          </span>
          <span className="header_optionLineTwo">
            Prime
          </span>
        </div>
        
        <Link to="/checkout">
          <div className="header_optionBasket">
            <ShoppingBasketIcon />
            <span className="header_optionLineTwo header_BasketCount">{basket?.length}</span>
          </div>
        </Link>
      </div>
    </div>
    <div className="header_bottom">
      <select className="header_select">
        <option>All Deparments</option>
        {menus.map((item, i) => (
          <option key={i} value={item.menu}>{item.menu}</option>
        ))}
      </select>
      <input className="header_searchInput" type="text" />
      <SearchIcon className="header_searchIcon" />
    </div>
    </>
  )
}

export default Header
