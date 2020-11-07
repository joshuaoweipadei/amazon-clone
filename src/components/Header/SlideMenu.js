import React from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from '../Context/StateProvider'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { CgCloseR } from 'react-icons/cg';

import DropdownMenu from './DropdownMenu';

import './SlideMenu.css'

const SlideMenu = ({ handleAuthentication, slideToggle, slideOpen }) => {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className={slideOpen ? 'slide-menu active' : 'slide-menu'}>
      <ul className='side-wrapper'>
        <li className="slide_header_optionUser">
          <div onClick={handleAuthentication} className="slide_header_optionLineOneUser">
            <AccountCircleIcon fontSize="large" /> 
            <Link onClick={slideToggle} to={!user ? '/login' : '/'} className="signin_signup">
              <h5>{!user ? 'Hello Guest' : user.email}</h5>
              <span>{user ? 'Sign Out' : 'Sign In'}</span>
            </Link>
          </div>
          <span onClick={slideToggle} className="slide_header_optionLineTwo">
            <CgCloseR onClick={slideToggle} className="close_icon" />
          </span>
        </li>
        <li className="slide_header_optionOrders">
          <Link onClick={slideToggle} className="slide_header_option line_one" to="/orders">
            <div className="slide_header_option line_one">
              <span className="header_optionLineOne">
                Return
              </span>
              <span className="header_optionLineTwo">
                & Orders
              </span>
            </div>
          </Link>

          <div className="slide_header_option">
            <span className="header_optionLineOne">
              Your
            </span>
            <span className="header_optionLineTwo">
              Prime
            </span>
          </div>
        </li>
        <li>
          <DropdownMenu />
        </li>
      </ul>
    </div>
  )
}

export default SlideMenu
