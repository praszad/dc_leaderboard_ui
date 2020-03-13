import React, { Component } from 'react';
import history from '../../utility/history';
import { getUserData } from '../../utility/actions';
import { Link } from 'react-router-dom';

class DashBoardNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { userData: {} };
  }
  clearStorage = () => {
    localStorage.removeItem('authDc');
    history.push('/');
  };
  componentDidMount() {
    const userData = getUserData();

    this.setState({ userData });
  }
  handleUserSearch = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      const { searchKey = '' } = this.state;
      const { handleUserSearch } = this.props;
      handleUserSearch && handleUserSearch({ searchKey });
    });
  };
  render() {
    const {
      userData: { emp_name = '', karmaPoints = '' }
    } = this.state;
    const { handleUserSearch = '' } = this.props;
    return (
      <nav class='navbar navbar-top navbar-expand navbar-dark bg-primary border-bottom'>
        <div class='container-fluid'>
          <div class='collapse navbar-collapse' id='navbarSupportedContent'>
            {handleUserSearch ? (
              <form
                class='navbar-search navbar-search-light form-inline mr-sm-3'
                id='navbar-search-main'
              >
                <div class='form-group mb-0'>
                  <div class='input-group input-group-alternative input-group-merge'>
                    <div class='input-group-prepend'>
                      <span class='input-group-text'>
                        <i class='fas fa-search'></i>
                      </span>
                    </div>
                    <input
                      class='form-control'
                      placeholder='Search'
                      name='searchKey'
                      onChange={e => this.handleUserSearch(e)}
                      type='text'
                    />
                  </div>
                </div>
                <button
                  type='button'
                  class='close'
                  data-action='search-close'
                  data-target='#navbar-search-main'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>×</span>
                </button>
              </form>
            ) : null}
            <ul class='navbar-nav align-items-center  ml-md-auto '>
              <li class='nav-item d-xl-none'>
                <div
                  class='pr-3 sidenav-toggler sidenav-toggler-dark'
                  data-action='sidenav-pin'
                  data-target='#sidenav-main'
                >
                  <div class='sidenav-toggler-inner'>
                    <i class='sidenav-toggler-line'></i>
                    <i class='sidenav-toggler-line'></i>
                    <i class='sidenav-toggler-line'></i>
                  </div>
                </div>
              </li>
              <li class='nav-item d-sm-none'>
                <a
                  class='nav-link'
                  href='#'
                  data-action='search-show'
                  data-target='#navbar-search-main'
                >
                  <i class='ni ni-zoom-split-in'></i>
                </a>
              </li>
              <li class='nav-item dropdown'>
                <div class='dropdown-menu dropdown-menu-xl  dropdown-menu-right  py-0 overflow-hidden'>
                  <div class='list-group list-group-flush'>
                    <a href='#!' class='list-group-item list-group-item-action'>
                      <div class='row align-items-center'>
                        <div class='col-auto'>
                          <img
                            alt='Image placeholder'
                            src='../assets/img/theme/team-1.jpg'
                            class='avatar rounded-circle'
                          />
                        </div>
                        <div class='col ml--2'>
                          <div class='d-flex justify-content-between align-items-center'>
                            <div>
                              <h4 class='mb-0 text-sm'>
                                {emp_name}({karmaPoints})
                              </h4>
                            </div>
                            <div class='text-right text-muted'>
                              <small>2 hrs ago</small>
                            </div>
                          </div>
                          <p class='text-sm mb-0'>
                            Let's meet at Starbucks at 11:30. Wdyt?
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
            <ul class='navbar-nav align-items-center  ml-auto ml-md-0 '>
              <li class='nav-item dropdown'>
                <a
                  class='nav-link pr-0'
                  href='#'
                  role='button'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  <div class='media align-items-center'>
                    <span class='avatar avatar-sm rounded-circle'>
                      <img
                        alt='Image placeholder'
                        src='../assets/img/theme/team-4.jpg'
                      />
                    </span>
                    <div class='media-body  ml-2  d-none d-lg-block'>
                      <span class='mb-0 text-sm  font-weight-bold'>
                        {emp_name}({karmaPoints})
                      </span>
                    </div>
                  </div>
                </a>
                <div class='dropdown-menu  dropdown-menu-right '>
                  <div class='dropdown-header noti-title'>
                    <h6 class='text-overflow m-0'>Welcome!</h6>
                  </div>
                  <Link to='/profile'>
                    <a href='javascript:void(0)' class='dropdown-item'>
                      <i class='ni ni-single-02'></i>
                      <span>My profile</span>
                    </a>
                  </Link>
                  <Link to='/profile'>
                    <a href='javascript:void(0)' class='dropdown-item'>
                      <i class='ni ni-calendar-grid-58'></i>
                      <span>Transactions</span>
                    </a>
                  </Link>
                  <a href='javascript:void(0)' class='dropdown-item'>
                    <i class='ni ni-support-16'></i>
                    <span>Support</span>
                  </a>
                  <div class='dropdown-divider'></div>
                  <a
                    href='javascript:void(0)'
                    onClick={() => {
                      this.clearStorage();
                    }}
                    class='dropdown-item'
                  >
                    <i class='ni ni-user-run'></i>
                    <span>Logout</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
export default DashBoardNavBar;
