import React, { Component } from 'react';
import NavbarComponent from '../NavBar/NavbarComponent';
import { AuthLogin } from '../../utility/actions';
import toastr from 'toastr';
class LoginComponent extends Component {
  constructor(props) {
    super(props);
  }
  handleFieldChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleFormSubmit = e => {
    e.stopPropagation();
    const { user_id, password } = this.state;
    const data = { user_id, password };
    console.log(data);

    if (!data.user_id || !data.password) {
      toastr.error('PLease Fill All the Fields');
      return;
    }
    AuthLogin(data);
  };
  render() {
    return (
      <React.Fragment>
        <NavbarComponent />
        <div class='main-content'>
          <div class='header bg-gradient-primary py-7 py-lg-8 pt-lg-9'>
            <div class='separator separator-bottom separator-skew zindex-100'>
              <svg
                x='0'
                y='0'
                viewBox='0 0 2560 100'
                preserveAspectRatio='none'
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
              >
                <polygon
                  class='fill-default'
                  points='2560 0 2560 100 0 100'
                ></polygon>
              </svg>
            </div>
          </div>
          <div class='container mt--8 pb-5'>
            <div class='row justify-content-center'>
              <div class='col-lg-5 col-md-7'>
                <div class='card bg-secondary border-0 mb-0'>
                  <div class='card-body px-lg-5 py-lg-5'>
                    <form role='form'>
                      <div class='form-group mb-3'>
                        <div class='input-group input-group-merge input-group-alternative'>
                          <div class='input-group-prepend'>
                            <span class='input-group-text'>
                              <i class='ni ni-email-83' />
                            </span>
                          </div>
                          <input
                            class='form-control'
                            placeholder='Emp Id'
                            type='text'
                            name='user_id'
                            onChange={e => {
                              this.handleFieldChange(e);
                            }}
                          />
                        </div>
                      </div>
                      <div class='form-group'>
                        <div class='input-group input-group-merge input-group-alternative'>
                          <div class='input-group-prepend'>
                            <span class='input-group-text'>
                              <i class='ni ni-lock-circle-open'></i>
                            </span>
                          </div>
                          <input
                            class='form-control'
                            placeholder='Password'
                            type='password'
                            name='password'
                            onChange={e => {
                              this.handleFieldChange(e);
                            }}
                          />
                        </div>
                      </div>
                      <div class='text-center'>
                        <button
                          type='button'
                          onClick={e => {
                            this.handleFormSubmit(e);
                          }}
                          class='btn btn-primary my-4'
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div class='row mt-3'>
                  <div class='col-6'>
                    <a href='#' class='text-light'>
                      <small>Forgot password?</small>
                    </a>
                  </div>
                  <div class='col-6 text-right'>
                    <a href='#' class='text-light'>
                      <small>Create new account</small>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer class='py-5' id='footer-main'>
          <div class='container'>
            <div class='row align-items-center justify-content-xl-between'>
              <div class='col-xl-6'>
                <div class='copyright text-center text-xl-left text-muted'>
                  &copy; 2020{' '}
                  <a
                    href='https://www.creative-tim.com'
                    class='font-weight-bold ml-1'
                    target='_blank'
                  >
                    Creative Tim
                  </a>
                </div>
              </div>
              <div class='col-xl-6'>
                <ul class='nav nav-footer justify-content-center justify-content-xl-end'>
                  <li class='nav-item'>
                    <a
                      href='https://www.creative-tim.com'
                      class='nav-link'
                      target='_blank'
                    >
                      Creative Tim
                    </a>
                  </li>
                  <li class='nav-item'>
                    <a
                      href='https://www.creative-tim.com/presentation'
                      class='nav-link'
                      target='_blank'
                    >
                      About Us
                    </a>
                  </li>
                  <li class='nav-item'>
                    <a
                      href='http://blog.creative-tim.com'
                      class='nav-link'
                      target='_blank'
                    >
                      Blog
                    </a>
                  </li>
                  <li class='nav-item'>
                    <a
                      href='https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md'
                      class='nav-link'
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

export default LoginComponent;
