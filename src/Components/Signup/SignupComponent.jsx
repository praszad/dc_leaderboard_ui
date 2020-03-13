import React, { Component } from 'react';
import NavbarComponent from '../NavBar/NavbarComponent';
import { addNewEmployee } from '../../utility/actions';
import toastr from '../../utility/Toaster';
import LoginFooter from '../NavBar/LoginFooter';
import history from '../../utility/history';
import SideBarComponent from '../NavBar/SideBarComponent';
import DashBoardNavBar from '../NavBar/DashBoardNavBar';
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
    const { emp_name, user_id } = this.state;
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
        <SideBarComponent history={this.props.history} />
        <div class='main-content' id='panel'>
          <DashBoardNavBar />
          <div class='header pb-6 d-flex align-items-center'>
            <span class='mask bg-gradient-default opacity-10'></span>
          </div>
          <div class='container-fluid mt--6'>
            <div class='row'>
              <div class='col-xl-8 order-xl-1'>
                <div class='card'>
                  <div class='card-body'>
                    <form>
                      <h6 class='heading-small text-muted mb-4'>Create User</h6>
                      <hr class='my-4' />

                      <div class='pl-lg-4'>
                        <div class='row'>
                          <div class='col-md-12'>
                            <div class='form-group'>
                              <label
                                class='form-control-label'
                                for='input-address'
                              >
                                Employee Name *
                              </label>
                              <input
                                id='input-address'
                                name='emp_name'
                                onChange={e => {
                                  this.handleFieldChange(e);
                                }}
                                class='form-control'
                                placeholder='Employee Name'
                                type='text'
                              />
                            </div>
                          </div>
                        </div>
                        <div class='row'>
                          <div class='col-md-12'>
                            <div class='form-group'>
                              <label
                                class='form-control-label'
                                for='input-address'
                              >
                                Employee Id *
                              </label>
                              <input
                                id='input-address'
                                name='user_id'
                                onChange={e => {
                                  this.handleFieldChange(e);
                                }}
                                class='form-control'
                                placeholder='User Id'
                                type='text'
                              />
                            </div>
                          </div>
                        </div>
                        <div class='row'>
                          <div class='col-md-12'>
                            <div class='form-group'>
                              <label
                                class='form-control-label'
                                for='input-address'
                              >
                                Mobile Number *
                              </label>
                              <input
                                id='input-address'
                                name='mobile'
                                onChange={e => {
                                  this.handleFieldChange(e);
                                }}
                                class='form-control'
                                placeholder='Mobile Number'
                                type='number'
                              />
                            </div>
                          </div>
                        </div>
                        <div class='row'>
                          <div class='col-md-12'>
                            <div class='form-group'>
                              <label
                                class='form-control-label'
                                for='input-address'
                              >
                                Employee Name *
                              </label>
                              <input
                                id='input-address'
                                placeholder='Date Of Joining'
                                type='date'
                                class='form-control'
                                name='date_of_joining'
                                onChange={e => {
                                  this.handleFieldChange(e);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div class='card-header'>
                      <div class='row align-items-center'>
                        <div class='col-8'></div>
                        <div class='col-4 text-right'>
                          <a
                            href='javascript:void(0)'
                            onClick={e => {
                              this.handleFormSubmit(e);
                            }}
                            class='btn btn-sm btn-primary'
                          >
                            Create User
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SignupComponent;
