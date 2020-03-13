import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavbarComponent extends Component {
  render() {
    return (
      <nav
        id='navbar-main'
        className='navbar navbar-horizontal navbar-transparent navbar-main navbar-expand-lg navbar-light'
      >
        <div className='container'>
          <Link to='/dashboard'>
            <a className='navbar-brand' href='javascript:void(0)'>
              <img src='../assets/img/brand/white.png' />
            </a>
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-togglez='collapse'
            data-target='#navbar-collapse'
            aria-controls='navbar-collapse'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div
            className='navbar-collapse navbar-custom-collapse collapse'
            id='navbar-collapse'
          >
            <div className='navbar-collapse-header'>
              <div className='row'>
                <div className='col-6 collapse-brand'>
                  <a href='dashboard.html'>
                    <img src='../assets/img/brand/blue.png' />
                  </a>
                </div>
                <div className='col-6 collapse-close'>
                  <button
                    type='button'
                    className='navbar-toggler'
                    data-toggle='collapse'
                    data-target='#navbar-collapse'
                    aria-controls='navbar-collapse'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                  >
                    <span></span>
                    <span></span>
                  </button>
                </div>
              </div>
            </div>
            <hr className='d-lg-none' />
            <ul className='navbar-nav align-items-lg-center ml-lg-auto'>
              <li className='nav-item d-none d-lg-block ml-lg-4'>
                <a
                  href='javascript:void(0)'
                  className='btn btn-neutral btn-icon'
                >
                  <span className='nav-link-inner--text'>Tech Fox</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
export default NavbarComponent;
