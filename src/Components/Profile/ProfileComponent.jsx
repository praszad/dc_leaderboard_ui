import React, { Component } from 'react';
import FooterComponent from '../NavBar/FooterComponent';
import NavbarComponent from '../NavBar/NavbarComponent';
import SideBarComponent from '../NavBar/SideBarComponent';
import DashBoardNavBar from '../NavBar/DashBoardNavBar';
import { getUserData } from '../../utility/actions';
import { Link } from 'react-router-dom';

class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {}
    };
  }
  componentDidMount() {
    const userData = getUserData();
    this.setState({ userData });
  }
  handleProfileEdit = (emp_id = '') => {};
  render() {
    const {
      userData: { emp_name, mobile, date_of_joining, karmaPoints, emp_id }
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
              <div class='col-xl-4 order-xl-2'>
                <div class='card card-profile'>
                  <img
                    src='../assets/img/theme/img-1-1000x600.jpg'
                    alt='Image placeholder'
                    class='card-img-top'
                  />
                  <div class='row justify-content-center'>
                    <div class='col-lg-3 order-lg-2'>
                      <div class='card-profile-image'>
                        <a href='#'>
                          <img
                            src='../assets/img/theme/team-4.jpg'
                            class='rounded-circle'
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class='card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4'>
                    <div class='d-flex justify-content-between'>
                      <a
                        href='javascript:void(0)'
                        class='btn btn-sm btn-info  mr-4 '
                      >
                        Points:{karmaPoints}
                      </a>
                      <a
                        href='javascript:void(0)'
                        onClick={() => {
                          this.handleProfileEdit(emp_id);
                        }}
                        class='btn btn-sm btn-default float-right'
                      >
                        Edit
                      </a>
                    </div>
                  </div>
                  <div class='card-body pt-0'>
                    <div class='text-center'>
                      <h5 class='h3'>
                        {emp_name} ( {emp_id})
                      </h5>
                      <div class='h5 font-weight-300'>
                        <i class='ni location_pin mr-2'></i>
                        {mobile}
                      </div>
                      <div class='h5 mt-4'>
                        <i class='ni business_briefcase-24 mr-2'></i>
                        Date Of Join : {date_of_joining}
                      </div>
                      <Link to='changepassword'>
                        <div class='h5 mt-4'>
                          <i class='ni business_briefcase-24 mr-2'></i>
                          <u>Change Password </u>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <FooterComponent />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProfileComponent;
