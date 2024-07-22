import React from 'react'
import './Navbar.scss'
import { NavLink } from 'react-router-dom'

export type links = { path: string; text: string }[]

interface NavbarProps {
  links: links
}

const Navbar: React.FC<NavbarProps> = ({ links }) => {
  return (
    <nav className="navbar">
      <div className="navbar__links">
        {links.map((route) => (
          <NavLink to={route.path} key={route.path} className="navbar__link">
            {route.text}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
