import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowForward } from 'react-icons/io'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { CSSTransition } from 'react-transition-group';

import './DropdownMenu.css'

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('Main Menu');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  const calcHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  console.log(menuHeight+`px`)

  function DropdownItem(props) {
    return (
      <a href="#!" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="menu-link">{props.children}</span>
        {props.rightIcon && <span className="icon-button-right">{props.rightIcon}</span>}
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'Main Menu'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <div className="menu-header">
            <h4>SHOP BY CATEGORY</h4>
          </div>
          <DropdownItem
            rightIcon={<IoIosArrowForward />}
            goToMenu="Amazon Music"
          >
            Amazon Music
          </DropdownItem>
          <DropdownItem
            rightIcon={<IoIosArrowForward />}
            goToMenu='Appstore for Android'
          >
            Appstore for Android
          </DropdownItem>
          <DropdownItem
            rightIcon={<IoIosArrowForward />}
            goToMenu="Electronics">
            Electronics
          </DropdownItem>
          <DropdownItem>Computers</DropdownItem>
          <DropdownItem>Smart Home</DropdownItem>
          <DropdownItem>Art & Crafts</DropdownItem>
          <DropdownItem>Automotive</DropdownItem>
          <DropdownItem>Beauty and personal care</DropdownItem>
          <DropdownItem>Men's Fashion</DropdownItem>
          <DropdownItem>Women's Fashion</DropdownItem>
          <DropdownItem>Health and Household</DropdownItem>
          <DropdownItem>Home and Kitchen</DropdownItem>
          <DropdownItem>Luggage</DropdownItem>
          <DropdownItem>Movies & Television</DropdownItem>
          <DropdownItem>Software</DropdownItem>
          <DropdownItem>Sports and Outdoors</DropdownItem>
          <DropdownItem>Toys and Games</DropdownItem>
          <DropdownItem>Video Games</DropdownItem>
          <DropdownItem>Gift Card</DropdownItem>
          <DropdownItem>Amazon Live</DropdownItem>
          <DropdownItem>International Shipping</DropdownItem>
          <DropdownItem>Amazon Explore</DropdownItem>
          <DropdownItem>Full Store Directory</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'Amazon Music'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <div onClick={() => setActiveMenu('Main Menu')} className="menu-header">
            <ArrowBackIcon className="left-icons"/>
            <h5>Main Menu</h5>
          </div>
          <div className="subtitle">{activeMenu}</div>
          <DropdownItem>Amazon Music Unlimited</DropdownItem>
          <DropdownItem>Amazon Music HD</DropdownItem>
          <DropdownItem>Prime Music</DropdownItem>
          <DropdownItem>Free Streaming Music</DropdownItem>
          <DropdownItem>Open Web Player</DropdownItem>
          <DropdownItem>CDs & Vinyl</DropdownItem>
          <DropdownItem>Download Store</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'Appstore for Android'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <div onClick={() => setActiveMenu('Main Menu')} className="menu-header">
            <ArrowBackIcon className="left-icons"/>
            <h5>Main Menu</h5>
          </div>
          <div className="subtitle">{activeMenu}</div>
          <DropdownItem>All Apps and Games</DropdownItem>
          <DropdownItem>Games</DropdownItem>
          <DropdownItem>Amazon Coins</DropdownItem>
          <DropdownItem>Download Amazon Appstore</DropdownItem>
          <DropdownItem>Amazon Apps</DropdownItem>
          <DropdownItem>Your Apps and Subscriptions</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'Electronics'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <div onClick={() => setActiveMenu('Main Menu')} className="menu-header">
            <ArrowBackIcon className="left-icons"/>
            <h5>Main Menu</h5>
          </div>
          <div className="subtitle">{activeMenu}</div>
          <DropdownItem>Accessories & Supplies</DropdownItem>
          <DropdownItem>Camera & Photo</DropdownItem>
          <DropdownItem>Car & Vehicle Electronics</DropdownItem>
          <DropdownItem>Cell Phones & Accessories</DropdownItem>
          <DropdownItem>Computers & Accessories</DropdownItem>
          <DropdownItem>GPS & Navigation</DropdownItem>
          <DropdownItem>Headphones</DropdownItem>
          <DropdownItem>Home Audio</DropdownItem>
          <DropdownItem>Office Electronics</DropdownItem>
          <DropdownItem>Portable Audio & Video</DropdownItem>
          <DropdownItem>Security & Surveillance</DropdownItem>
          <DropdownItem>Service Plans</DropdownItem>
          <DropdownItem>Television & Video</DropdownItem>
          <DropdownItem>Video Game Consoles & Accessories</DropdownItem>
          <DropdownItem>Video Projectors</DropdownItem>
          <DropdownItem>Wearable Technology</DropdownItem>
          <DropdownItem>eBook Readers & Accessories</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default DropdownMenu;