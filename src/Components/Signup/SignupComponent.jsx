import React, { Component } from 'react';
import NavbarComponent from '../NavBar/NavbarComponent';
import { addNewEmployee } from '../../utility/actions';
import toastr from '../../utility/Toaster';
import LoginFooter from '../NavBar/LoginFooter';
import history from '../../utility/history';
class SignupComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleFieldChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleFormSubmit = async e => {
    e.stopPropagation();
    const { password, password1, emp_name, user_id } = this.state;
    const userObject = { ...this.state };

    if (!emp_name || !user_id) {
      toastr.error('Please Fill All the Fields');
      return;
    }
    console.log(userObject);

    let responseObject = await addNewEmployee(userObject);
    console.log(responseObject);
    const { data, status } = responseObject;

    if (user_id === data?.emp_id && status === 200) {
      toastr.success('User Created Successfully');
      history.push('/');
    } else {
      toastr.error(data);
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
                              <i className='ni ni-user-83' />
                            </span>
                          </div>
                          <input
                            className='form-control'
                            placeholder='Emp Name'
                            type='text'
                            name='emp_name'
                            onChange={e => {
                              this.handleFieldChange(e);
                            }}
                          />
                        </div>
                      </div>
                      <div className='form-group mb-3'>
                        <div className='input-group input-group-merge input-group-alternative'>
                          <div className='input-group-prepend'>
                            <span className='input-group-text'>
                              <i className='ni ni-user-83' />
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
                      <div className='form-group mb-3'>
                        <div className='input-group input-group-merge input-group-alternative'>
                          <div className='input-group-prepend'>
                            <span className='input-group-text'>
                              <i className='ni ni-user-83' />
                            </span>
                          </div>
                          <input
                            className='form-control'
                            placeholder='Mobile Number'
                            type='text'
                            name='mobile'
                            onChange={e => {
                              this.handleFieldChange(e);
                            }}
                          />
                        </div>
                      </div>
                      <div className='form-group mb-3'>
                        <div className='input-group input-group-merge input-group-alternative'>
                          <div className='input-group-prepend'>
                            <span className='input-group-text'>
                              <i className='ni ni-user-83' />
                            </span>
                          </div>
                          <input
                            className='form-control'
                            placeholder='Date Of Joining'
                            type='date'
                            name='date_of_joining'
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
                          Add User
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <LoginFooter />
      </React.Fragment>
    );
  }
}

export default SignupComponent;
