import React, { Component } from 'react';
import toastr from '../../utility/Toaster';
import SideBarComponent from '../NavBar/SideBarComponent';
import DashBoardNavBar from '../NavBar/DashBoardNavBar';
import { changePassword, getLocalUserData } from '../../utility/actions';
class ChangePasswordComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    let { emp_name, role_id, emp_id } = getLocalUserData();
    this.setState({ userName: emp_name, role_id, emp_id });
  }
  savePassword = async () => {
    const {
      confirmPassword = '',
      newPassword = '',
      password = '',
      emp_id = ''
    } = this.state;
    if (newPassword !== confirmPassword) {
      toastr.error('Password Fields Are Not Same');
      return;
    }
    if (!newPassword.length) {
      toastr.error('Password Fields Are Not To Be Blank');
      return;
    }
    const response = await changePassword({
      newPassword,
      password,
      user_id: emp_id
    });

    const { status = '', data = {} } = response;
    if (status === 200) {
      if (data.Error === 'Invalid Token') {
        toastr.error('Token Expired');
        localStorage.removeItem('authDc');
        this.props.history.push('/');
        return;
      }

      toastr.success('Password Changed Successfully');
      this.props.history.push('/');
    }
  };
  handleFieldChanges = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      newPassword = '',
      password = '',
      confirmPassword = ''
    } = this.state;

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
                      <h6 class='heading-small text-muted mb-4'>
                        Change Password
                      </h6>
                      <hr class='my-4' />

                      <div class='pl-lg-4'>
                        <div class='row'>
                          <div class='col-md-12'>
                            <div class='form-group'>
                              <label
                                class='form-control-label'
                                for='input-address'
                              >
                                Current Password *
                              </label>
                              <input
                                id='input-address'
                                name='password'
                                onChange={e => {
                                  this.handleFieldChanges(e);
                                }}
                                class='form-control'
                                placeholder='Current Password'
                                value={password}
                                type='password'
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
                                New Password *
                              </label>
                              <input
                                id='input-address'
                                name='newPassword'
                                onChange={e => {
                                  this.handleFieldChanges(e);
                                }}
                                class='form-control'
                                placeholder='New Password'
                                value={newPassword}
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
                                Confirm Password *
                              </label>
                              <input
                                id='input-address'
                                name='confirmPassword'
                                onChange={e => {
                                  this.handleFieldChanges(e);
                                }}
                                class='form-control'
                                placeholder='Confirm Password'
                                value={confirmPassword}
                                type='text'
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
                            onClick={() => {
                              this.savePassword();
                            }}
                            class='btn btn-sm btn-primary'
                          >
                            Change Password
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

export default ChangePasswordComponent;
