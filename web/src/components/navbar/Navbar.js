import React, { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthStore'

import logo from '../../assets/img/logo.svg'

const renderNavLinkClassName = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container">
        <Link className='navbar-brand' to="/">
          <img src={logo} alt="Iron Projects" width="30" height="30" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink to="/" className={renderNavLinkClassName}>Home</NavLink></li>
            <li className="nav-item"><NavLink to="/projects" className={renderNavLinkClassName}>Projects</NavLink></li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            {(user?.email) ? (
              <>
                <li className="nav-item"><NavLink to="/students/me" className={renderNavLinkClassName}>{user.email}</NavLink></li>
                <li className="nav-item"><button className='nav-link' onClick={() => logout()}>Logout</button></li>
              </>
            ) : (
              <>
                <li className = "nav-item"><NavLink to = "/register" className = { renderNavLinkClassName }>Register</NavLink></li>
                <li className="nav-item"><NavLink to="/login" className={renderNavLinkClassName}>Login</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar