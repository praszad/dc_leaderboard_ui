import React, { Component } from 'react';

class SideBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  redirectPage = page => {
    this.props.history.push(page);
  };
  componentDidMount() {
    let lsUserData = localStorage.getItem('authDc');
    lsUserData = JSON.parse(lsUserData);
    let {
      userData: { emp_name, role_id }
    } = lsUserData;
    this.setState({ userName: emp_name, role_id });
  }
  render() {
    const { role_id = '' } = this.state;
    return (
      <React.Fragment>
        <nav
          class='sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white'
          id='sidenav-main'
        >
          <div class='scrollbar-inner'>
            <div class='sidenav-header  align-items-center'>
              <a
                class='navbar-brand'
                onClick={() => {
                  this.redirectPage('/');
                }}
                href='javascript:void(0)'
              >
                <img
                  src='../assets/img/brand/blue.png'
                  class='navbar-brand-img'
                  alt='...'
                />
              </a>
            </div>
            <div class='navbar-inner'>
              <div class='collapse navbar-collapse' id='sidenav-collapse-main'>
                <ul class='navbar-nav'>
                  <li class='nav-item'>
                    <a
                      class='nav-link active'
                      onClick={() => {
                        this.redirectPage('/');
                      }}
                      href='javascript:void(0)'
                    >
                      <i class='ni ni-tv-2 text-primary'></i>
                      <span class='nav-link-text'>Dashboard</span>
                    </a>
                  </li>

                  {role_id == 36 ? (
                    <li class='nav-item'>
                      <a
                        class='nav-link'
                        href='javascript:void(0)'
                        onClick={() => {
                          this.redirectPage('/adduser');
                        }}
                      >
                        <i class='ni ni-circle-08 text-pink'></i>
                        <span class='nav-link-text'>Create User</span>
                      </a>
                    </li>
                  ) : null}
                  <li class='nav-item'>
                    <a
                      class='nav-link'
                      onClick={() => {
                        this.redirectPage('/profile');
                      }}
                      href='javascript:void(0)'
                    >
                      <i class='ni ni-single-02 text-yellow'></i>
                      <span class='nav-link-text'>Profile</span>
                    </a>
                  </li>
                  <li class='nav-item'>
                    <a
                      class='nav-link'
                      href='javascript:void(0)'
                      onClick={() => {
                        this.redirectPage('/employees');
                      }}
                    >
                      <i class='ni ni-bullet-list-67 text-default'></i>
                      <span class='nav-link-text'>Employees</span>
                    </a>
                  </li>
                </ul>
                <hr class='my-3' />
              </div>
            </div>
          </div>
        </nav>
        ;
      </React.Fragment>
    );
  }
}
export default SideBarComponent;
