import React, { Component } from 'react';
import NavbarComponent from '../NavBar/NavbarComponent';
import { AuthLogin } from '../../utility/actions';
import toastr from '../../utility/Toaster';
import { Link } from 'react-router-dom';
class NotFoundComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <NavbarComponent />
        <div className='main-content'>
          <div className='header bg-gradient-primary py-7 py-lg-8 pt-lg-9'>
            <div className='separator separator-bottom separator-skew zindex-100'>
              <svg
                x='0'
                y='0'
                viewBox='0 0 2560 100'
                preserveAspectRatio='none'
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
              >
                <polygon
                  className='fill-default'
                  points='2560 0 2560 100 0 100'
                ></polygon>
              </svg>
            </div>
          </div>
          <div className='container mt--8 pb-5'>
            <div className='row justify-content-center'>
              <div className='col-lg-5 col-md-7'>
                <div className='card bg-secondary border-0 mb-0'>
                  <div className='card-body px-lg-5 py-lg-5'>
                    <form role='form'>
                      <div className='text-center'>
                        <button type='button' className='btn btn-primary my-4'>
                          Component Not Found
                        </button>
                      </div>
                      <div className='text-center'>
                        <Link to='/dashboard'>
                          <button
                            type='button'
                            className='btn btn-primary my-4'
                          >
                            Take Me To Dashboard
                          </button>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='row mt-3'>
                  <div className='col-6'>
                    <a href='#' className='text-light'>
                      <small>Forgot password?</small>
                    </a>
                  </div>
                  <div className='col-6 text-right'>
                    <a href='#' className='text-light'>
                      <small>Create new account</small>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className='py-5' id='footer-main'>
          <div className='container'>
            <div className='row align-items-center justify-content-xl-between'>
              <div className='col-xl-6'>
                <div className='copyright text-center text-xl-left text-muted'>
                  &copy; 2020{' '}
                  <a
                    href='https://www.creative-tim.com'
                    className='font-weight-bold ml-1'
                    target='_blank'
                  >
                    Creative Tim
                  </a>
                </div>
              </div>
              <div className='col-xl-6'>
                <ul className='nav nav-footer justify-content-center justify-content-xl-end'>
                  <li className='nav-item'>
                    <a
                      href='https://www.creative-tim.com'
                      className='nav-link'
                      target='_blank'
                    >
                      Creative Tim
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a
                      href='https://www.creative-tim.com/presentation'
                      className='nav-link'
                      target='_blank'
                    >
                      About Us
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a
                      href='http://blog.creative-tim.com'
                      className='nav-link'
                      target='_blank'
                    >
                      Blog
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a
                      href='https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md'
                      className='nav-link'
                      target='_blank'
                    >
                      MIT License
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default NotFoundComponent;
