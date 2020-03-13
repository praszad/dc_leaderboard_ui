import React, { Component } from 'react';
import NavbarComponent from '../NavBar/NavbarComponent';
import { AuthLogin } from '../../utility/actions';
import toastr from '../../utility/Toaster';
class ChangePasswordComponent extends Component {
  constructor(props) {
    super(props);
  }
  handleFieldChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleFormSubmit = async e => {
    e.stopPropagation();
    const { user_id, password } = this.state;
    const data = { user_id, password };

    if (!data.user_id || !data.password) {
      toastr.error('PLease Fill All the Fields');
      return;
    }
    let canLogin = await AuthLogin(data);
    if (canLogin) {
      this.props.history.push('dashboard');
    }
  };
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
                      <div className='form-group mb-3'>
                        <div className='input-group input-group-merge input-group-alternative'>
                          <div className='input-group-prepend'>
                            <span className='input-group-text'>
                              <i className='ni ni-email-83' />
                            </span>
                          </div>
                          <input
                            className='form-control'
                            placeholder='Emp Id'
                            type='text'
                            name='user_id'
                            onChange={e => {
                              this.handleFieldChange(e);
                            }}
                          />
                        </div>
                      </div>
                      <div className='form-group'>
                        <div className='input-group input-group-merge input-group-alternative'>
                          <div className='input-group-prepend'>
                            <span className='input-group-text'>
                              <i className='ni ni-lock-circle-open'></i>
                            </span>
                          </div>
                          <input
                            className='form-control'
                            placeholder='Password'
                            type='password'
                            name='password'
                            onChange={e => {
                              this.handleFieldChange(e);
                            }}
                          />
                        </div>
                      </div>
                      <div className='text-center'>
                        <button
                          type='button'
                          onClick={e => {
                            this.handleFormSubmit(e);
                          }}
                          className='btn btn-primary my-4'
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='row mt-3'></div>
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

export default ChangePasswordComponent;
