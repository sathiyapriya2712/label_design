import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import CartBadge from '../CartBadge/CartBadge';
import logoImg from '../../assets/images/logo.svg';
import './Header.css';

export const Header = ({ searchQuery, setSearchQuery }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isDashboard = location.pathname === '/' || location.pathname === '/dashboard';

  return (
    <header className="main-header">
      <div className="header-container">
        <Link to={isAuthenticated ? "/dashboard" : "/login"} className="logo-section">
          <img src={logoImg} alt="PantryLabel" className="logo-img" />
          <span className="logo-text">Pantry<span className="logo-highlight">Label</span></span>
        </Link>

        {isDashboard && (
          <div className="search-bar-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search pantry ingredients..."
              className="search-input"
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
            )}
          </div>
        )}

        <nav className="header-nav">
          {isAuthenticated ? (
            <>
              <Link to="/cart" className="nav-cart-link" title="Shopping Cart">
                <CartBadge count={cartCount} />
              </Link>
              <div className="user-profile-menu">
                <Link to="/account" className="profile-btn" title="My Account">
                  <span className="user-avatar">👤</span>
                  <span className="user-name-label">{user?.name || 'Account'}</span>
                </Link>
                <button onClick={handleLogout} className="logout-btn" title="Logout">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="login-nav-btn">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
