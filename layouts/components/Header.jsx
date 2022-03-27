import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import cn from 'classnames'
import Headroom from 'react-headroom'
import { scroller } from 'react-scroll'
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavbarText,
  NavLink,
} from 'reactstrap'

const Header = (props) => {
  const { setTheme, resolvedTheme } = useTheme()
  const [collapsed, setCollapsed] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    setIsDarkMode(resolvedTheme === 'dark-mode')
    toggleDarkMode()
  }, [])

  const toggleDarkMode = () => {
    if (isDarkMode) setTheme('light-mode')
    else setTheme('dark-mode')

    setIsDarkMode(!isDarkMode)
  }

  const scrollTo = (elementId) => {
    if (typeof document === 'undefined') {
      return
    }

    scroller.scrollTo(elementId, {
      duration: 500,
      delay: 100,
      smooth: true,
      offset: 50,
      containerId: 'main-container',
    })
  }

  const toggleNavbar = () => setCollapsed(!collapsed)

  return (
    <Headroom>
      <Navbar expand="sm" container light>
        <NavbarBrand href="/">
          <i className="uil uil-user"></i> Anhttok
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar}>
          <span className="navbar-toggler-icon"></span>
          <span className="navbar-toggler-icon"></span>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <Collapse navbar isOpen={!collapsed}>
          <Nav className="mx-auto" navbar>
            <NavItem>
              <NavLink href="/#about">
                <span data-hover="About" onClick={() => scrollTo('about')}>
                  About
                </span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/#project">
                <span data-hover="Projects">Projects</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/#resume">
                <span data-hover="Resume">Resume</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/demos">
                <span data-hover="Demos">Demos</span>
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarText>
            <div
              className="color-mode d-lg-flex justify-content-center align-items-center"
              onClick={toggleDarkMode}
            >
              <i
                className={cn('color-mode-icon', {
                  active: !isDarkMode,
                })}
              ></i>
            </div>
          </NavbarText>
        </Collapse>
      </Navbar>
    </Headroom>
  )
}

export default Header
