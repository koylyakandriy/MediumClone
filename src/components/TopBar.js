import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import { CurrentUserContext } from "../context/currentUser";

const TopBar = () => {
  const [currentUserState] = useContext(CurrentUserContext);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Medium
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink to="/home" className="nav-link">
              Home
            </NavLink>
          </li>
          {currentUserState.isLoggedIn === false && (
            <>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Sign in
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Sign up
                </NavLink>
              </li>
            </>
          )}

          {currentUserState.isLoggedIn && (
            <>
              <li className="nav-item">
                <NavLink to="/article/new" className="nav-link">
                  <i className="ion-compose" />
                  &nbsp; New Post
                </NavLink>
              </li>
  
              <li className="nav-item">
                <NavLink to="/settings" className="nav-link">
                  <i className="ion-gear-a" />
                  &nbsp; Settings
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to={`/profile/${currentUserState.currentUser.username}`}
                  className="nav-link"
                >
                  {currentUserState.currentUser.image && (
                    <img
                      className="user-pic"
                      src={currentUserState.currentUser.image}
                      alt="profile"
                    />
                  )}
                  &nbsp; {currentUserState.currentUser.username}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default TopBar;
