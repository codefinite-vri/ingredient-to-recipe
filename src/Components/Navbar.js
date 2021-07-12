import React, { Component } from 'react'
import { Container, Nav, NavItem, NavLink, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Button} from 'reactstrap'
import './Navbar.css'
import {useAuth} from '../Contexts/AuthContext'


function getCurrentUser(Component) {
  return function WrappedComponent(props) {
    const {currentUser, logout} = useAuth();
    return <Component {...props} currentUser={currentUser} logout={logout}/>;
  }
}

class MobileMenu extends Component {
  state = { isOpen: false ,currentUser:null , logout:null, error:''}
  toggle = () => this.setState({ isOpen: !this.state.isOpen })

  async handleLogout(){
    try{
    await this.state.logout()
     
  }catch(error){
      this.setState({error: error.message})
  }
  }

  static getDerivedStateFromProps(props,state) {
    return {
      currentUser:props.currentUser,
      logout:props.logout
    }
  }

  render() {
    return (
      <div className="mobile-wrapper">
        <div className="mobile-menu">
          <Container className="pos-ref">
            <i
              className="fas fa-times mobile-menu__close-bt"
              onClick={this.props.hideNav}
            />
          </Container>
        </div>
        <Nav vertical className={'mobile-nav'}>
        {this.state.currentUser === null?
          <NavItem className="nav-item-m">
            <NavLink href="/Login" className="navL">Login</NavLink>
          </NavItem>
        :
          <div>
            <NavItem className="nav-item-m"><NavLink className="navL">Hello, {this.state.currentUser.displayName}</NavLink></NavItem>
          </div>
        }
          <NavItem className="nav-item-m">
            <NavLink href="/" className="navL">Home</NavLink>
          </NavItem>
          <NavItem className="nav-item-m">
            <NavLink href="/aboutus" className="navL">About</NavLink>
          </NavItem>
          <NavItem className="nav-item-m">
            <NavLink href="/recipes" className="navL">Recipes</NavLink>
          </NavItem>
          <NavItem className="nav-item-m">
            <NavLink className="navL">Dadi Ke Nuske</NavLink>
          </NavItem>
          {/* <NavItem className="nav-item-m">
            <NavLink href="/foodium" className="navL">Foodium</NavLink>
          </NavItem> */}
          <NavItem>
            <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
              <DropdownToggle className="drop-item" caret>
                Features
              </DropdownToggle>
              <DropdownMenu className="drop-menu">
                <DropdownItem href="/meal-planner">Meal Planner</DropdownItem>
                <DropdownItem href="/shopping-list">Shopping List</DropdownItem>
                <DropdownItem href='/favorites'>Favorites</DropdownItem>
                <DropdownItem href="/surprise-recipe">Surprise</DropdownItem>
                <DropdownItem href="/settings">Settings</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
          <NavItem className="nav-item-m">
            <NavLink href="/help" className="navL">Help</NavLink>
          </NavItem>          
          <NavItem className="nav-item-m">
            <NavLink href="/contact" className="navL">Contact</NavLink>
          </NavItem>

          {this.state.currentUser?
          <div>
            <NavItem className="nav-item-m"><NavLink href="/login" onClick={this.handleLogout} className="navL">Log Out</NavLink></NavItem>
          </div>
          :
          <></>
          }
        </Nav>
        <style jsx>
          {`
          /* {.nav-n.nav{
            border-bottom: 2px solid black ;
          } */}
            .mobile-wrapper {
              display: none;
              
            }
            .mobile-menu {
              display: none;
              z-index: 2;
              position: fixed;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              background-color: hsla(0, 9.1%, 2.2%, 0.7);
            }
            .mobile-menu .mobile-menu__close-bt {
              position: absolute;
              font-size: 1.6rem;
              color: white;
              right: 1.3rem;
              top: 1rem;
              cursor: pointer;
              z-index: 1;
            }

            .pos-ref {
              position: relative;
            }
            .mobile-nav {
              position: fixed;
              left: 0;
              width: 250px;
              padding-top: 1.6rem;
              align-items: strech;
              background-color:#C90F03;
              transition: all 1s;
              transform: translate(-100%);
              height: 100%;
              z-index: 2;
            }
            .nav-item-m {
              cursor: pointer;
              color: white !important;
              font-size: 14px;
              text-transform: capitalize;
            }

            .navL{
              color:white!important;
              text-decoration:none !important;
            }
            .nav-item-m a {
              width: 100%;
              text-align: left;
            }
            .drop-menu {
              width: 100%;
            }
            .drop-item {
              width: 100%;
              text-align: left;
              padding: 0.5rem 1rem;
              border: none;
              font-size: 14px;
              background-color:white;
              color: #C90F03;
            }
            .drop-item:hover {
              background-color: transparent;
            }
            .drop-item:after {
              position: absolute;
              right: 1rem;
              top: 1rem;
            }
            .drop-menu  {
              display: block;
            }
          `}
        </style>
      </div>
    )
  }
}



 class NavigationBar extends Component {
  dropNav = React.createRef();

  constructor(props){
    super(props);
    this.state = { 
    currentUser : null,
    logout: null,
    error :''};

   this.handleLogout = this.handleLogout.bind(this);
     
  }

  hamButton = React.createRef()

  async handleLogout(){
    try{
    await this.state.logout()
     
  }catch(error){
      this.setState({error: error.message})
  }
  }

  over = () => {
    this.dropNav.current.style.display = 'block'
    this.opacityTiemOut = setTimeout(() => {
      this.dropNav.current.style.opacity = '1'
    })
  }
  out = () => {
    this.dropNav.current.style.transition = 'all .5s 1s'
    this.dropNav.current.style.opacity = '0'
  }
  onHide = () => {
    if (this.dropNav.current.style.opacity === '1') return
    this.dropNav.current.style.display = 'none'
    this.dropNav.current.style.transition = 'all .5s'
  }

  hideNav = e => {
    document.body.style.overflow = 'visible'
    this.mobileMenu.style.display = 'none'
    this.hamButton.style.display = ''
    this.mobileNav.style.transform = `translateX(-100%)`
  }

  showNav = e => {
    e.preventDefault()
    document.body.style.overflow = 'hidden'
    this.hamButton.style.display = 'none'
    this.menuWrapper.style.display = 'block'
    this.mobileMenu.style.display = 'block'
    setTimeout(() => {
      this.mobileNav.style.transform = 'translateX(0px)'
    }, 200)
  }
  fixedNav() {
    const nav = document.querySelector('.navi-menu')
    const navHeigth = parseInt(window.getComputedStyle(nav).height, 10)
    const scrollEl = document.scrollingElement
    if (scrollEl.scrollTop > navHeigth) {
      nav.style.position = 'fixed'
      nav.classList.add('scroll-nav')
    } else {
      nav.style.position = 'static'
      nav.classList.remove('scroll-nav')
    }
  }



  static getDerivedStateFromProps(props,state) {
    console.log(props)
    return {
      currentUser:props.currentUser,
      logout:props.logout,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.fixedNav)
    this.menuWrapper = document.querySelector('.mobile-wrapper')
    this.mobileMenu = document.querySelector('.mobile-menu')
    this.mobileNav = document.querySelector('.mobile-nav')
    this.hamButton = document.querySelector('.ham')
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.fixedNav)
  }
  render() {

    return (
      <div className="navi-menu">
        <Container>
          <MobileMenu 
          currentUser={this.state.currentUser}
          hideNav={this.hideNav} />

          <Nav className="nav-n">
            <NavItem className="nav-item-n logo">
              <NavLink className="logo-navlink" href="/"><img className="logo-small" src="images/logo1.png"></img></NavLink>
            </NavItem>
            <NavItem className="nav-item-n ham" onClick={this.showNav}>
              <NavLink href="">
                <i className="fas fa-bars" />
              </NavLink>
            </NavItem>
            <NavItem className="nav-item-n left-nav">
              <NavLink className="nav-hover" href="/aboutus">about</NavLink>
            </NavItem>
            <NavItem className="nav-item-n left-nav">
              <NavLink className="nav-hover" href="/recipes">recipes</NavLink>
            </NavItem>
            <NavItem className="nav-item-n left-nav">
              <NavLink className="nav-hover" href="/home-remedies">Dadi Ke Nuske</NavLink>
            </NavItem>
            {/* <NavItem className="nav-item-n left-nav">
              <NavLink className="nav-hover" href="/foodium">foodium</NavLink>
            </NavItem> */}
            <div
              className="drop"
              onMouseOver={this.over}
              onMouseOut={this.out}
              onTransitionEnd={this.onHide}
            >
              <NavItem className="nav-item-n left-nav">
                <NavLink href="#" className="nav-item-n navD left-nav nav-hover caret">
                  Features
              </NavLink>
              </NavItem>
              <div className="drop__item" ref={this.dropNav}>
                <Nav vertical>
                  <NavItem className="nav-item-n">
                    <NavLink href="/meal-planner">Meal Planner</NavLink>
                  </NavItem>
                  <NavItem className="nav-item-n">
                    <NavLink href="/favorites">Favorites</NavLink>
                  </NavItem>
                  <NavItem className="nav-item-n">
                    <NavLink href="/shopping-list">Shopping List</NavLink>
                  </NavItem>
                  <NavItem className="nav-item-n">
                    <NavLink href="/surprise-recipe">Surprise</NavLink>
                  </NavItem>
                </Nav>
              </div>
            </div>
            <NavItem className="nav-item-n right-nav">
              <NavLink href="/contact" className="nav-hover">Contact</NavLink>
            </NavItem>
            {this.state.currentUser === null?
              <NavItem className="nav-item-n right-nav l-n">
                <NavLink href="/Login">Login</NavLink>
              </NavItem>
            :
              <div
                className="drop"
                onMouseOver={this.over}
                onMouseOut={this.out}
                onTransitionEnd={this.onHide}
              >
                <NavItem className="nav-item-n right-nav">
                  <NavLink href="#" className="nav-item-n navD right-nav nav-hover caret">
                  Hello, {this.state.currentUser.displayName}
                  </NavLink>
                </NavItem>
                <div className="drop__item" ref={this.dropNav}>
                  <Nav vertical>
                    <NavItem className="nav-item-n">
                      <NavLink href="/settings">Settings</NavLink>
                    </NavItem>
                    <NavItem className="nav-item-n">
                      <NavLink href="/login" onClick={this.handleLogout}>Log out</NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </div>
            }         
          </Nav>
        </Container>
        <style jsx>{`
          .l-n{
            border: 4px solid white;
            border-radius: 5px;
            background-color:white;
            color: #C90F03 !important;
            margin-left:20% !important;
          }
          .scroll-nav {
            background: #C90F03;
            width: 100%;
            z-index: 4;
            box-shadow: #e1dfdf 1px 1px 11px;
          }
          .left-nav{
            margin-right: auto !important;
          }
          .right-nav{
            margin-left:auto;
          }
          .navD{
            color:#C90F03;
          }
          .nav-n {
            align-items: center;
          }
          .nav-item-n {
            display: none;
            font-size: 14px;
            color:white;
          }
          .nav-item-n:not(.logo) {
            text-transform: capitalize;
          }
          .nav-hover:hover{
            border-bottom: 3px solid black;
          }
          .nav-item-n a {
            padding: 0.5rem 0.6rem;
            color: inherit;
          }
          .nav-item-n:not(.ham):not(.logo):hover {
            color: var(--brand-color);
          }
          .logo {
            font-family: 'Philosopher', sans-serif;
            font-size: 2em;
          }
          .logo:first-letter {
            color: var(--brand-color);
          }
          @media (min-width: 1024px) {
            .nav-item-n {
              display: block;
            }
          }
          .logo,
          .ham {
            display: block;
          }
          .ham {
            margin-left: auto;
            font-size: 1.4rem;
          }
          @media (min-width: 1024px) {
            .ham {
              display: none;
            }
            .logo {
              margin-right: auto;
            }
          }

          .drop {
            position: relative;
          }
          .drop__item {
            position: absolute;
            display: none;
            transition: all 0.5s;
            width: 200px;
            padding: 0.5rem 0;
            z-index:9;
            background-color:#C90F03;
            border-radius:5px;
            box-shadow: 0px 0px 20px 0px #f1f1f1d1, 0px 0px 20px 0px #ffffff2b;
          }
          .drop__item .nav {
            align-items: flex-start;
          }
          .drop__item a {
            padding: 0.65rem 1.3rem;
          }
          .caret:after {
            content: '';
            display: inline-block;
            vertical-align: middle;
            margin-left: 5px;
            width: 5px;
            height: 5px;
            border: none;
            border-left: 2px solid;
            border-bottom: 2px solid;
            transform: rotate(-45deg);
            
          }
          .navi-menu{
            background-color: #C90F03;
          }
        `}</style>
      </div>
    )
  }
}
export default getCurrentUser(NavigationBar);