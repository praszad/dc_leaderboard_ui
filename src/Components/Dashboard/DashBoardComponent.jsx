import React, { Component } from 'react';
import SideBarComponent from '../NavBar/SideBarComponent';
import FooterComponent from '../NavBar/FooterComponent';
import DashBoardNavBar from '../NavBar/DashBoardNavBar';
import EmployeesComponent from '../Employees/EmployeesComponent';
import { getEmployees } from '../../utility/actions';
import toastr from '../../utility/Toaster';

class DashBoardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeList: [],
      pageSize: 2
    };
  }
  componentDidMount() {
    this.getEmployeeData();
  }
  getEmployeeData = async (page = 1) => {
    const { searchKey = '' } = this.state;
    const response = await getEmployees({ user_id: searchKey, page });
    const {
      status = '',
      data: { response: responseData },
      data = {},
      Error
    } = response;
    const { totalCount } = data;
    console.log(totalCount, data);
    if (status === 200) {
      this.setState({ employeeList: responseData, totalCount });
      if (data.Error === 'Invalid Token') {
        toastr.error('Token Expired');
        localStorage.removeItem('authDc');
        this.props.history.push('/');
      }
    }
  };
  handlePagination = page => {
    this.setState({ page }, () => {
      this.getEmployeeData(page);
    });
  };
  handleUserSearch = ({ searchKey }) => {
    this.setState({ searchKey }, () => {
      this.getEmployeeData();
    });
  };

  render() {
    const {
      employeeList = [],
      page,
      totalCount = 0,
      pageSize = 2
    } = this.state;
    return (
      <React.Fragment>
        <SideBarComponent history={this.props.history} />
        <div class='main-content' id='panel'>
          <DashBoardNavBar
            history={this.props.history}
            handleUserSearch={this.handleUserSearch}
          />
          <div class='header bg-primary pb-6'>
            <div class='container-fluid'>
              <div class='header-body'>
                <div class='row'>
                  <div class='col-xl-3 col-md-6'>
                    <div class='card card-stats'>
                      <div class='card-body'>
                        <div class='row'>
                          <div class='col'>
                            <h5 class='card-title text-uppercase text-muted mb-0'>
                              Total traffic
                            </h5>
                            <span class='h2 font-weight-bold mb-0'>
                              350,897
                            </span>
                          </div>
                          <div class='col-auto'>
                            <div class='icon icon-shape bg-gradient-red text-white rounded-circle shadow'>
                              <i class='ni ni-active-40'></i>
                            </div>
                          </div>
                        </div>
                        <p class='mt-3 mb-0 text-sm'>
                          <span class='text-success mr-2'>
                            <i class='fa fa-arrow-up'></i> 3.48%
                          </span>
                          <span class='text-nowrap'>Since last month</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class='col-xl-3 col-md-6'>
                    <div class='card card-stats'>
                      <div class='card-body'>
                        <div class='row'>
                          <div class='col'>
                            <h5 class='card-title text-uppercase text-muted mb-0'>
                              New users
                            </h5>
                            <span class='h2 font-weight-bold mb-0'>2,356</span>
                          </div>
                          <div class='col-auto'>
                            <div class='icon icon-shape bg-gradient-orange text-white rounded-circle shadow'>
                              <i class='ni ni-chart-pie-35'></i>
                            </div>
                          </div>
                        </div>
                        <p class='mt-3 mb-0 text-sm'>
                          <span class='text-success mr-2'>
                            <i class='fa fa-arrow-up'></i> 3.48%
                          </span>
                          <span class='text-nowrap'>Since last month</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class='col-xl-3 col-md-6'>
                    <div class='card card-stats'>
                      <div class='card-body'>
                        <div class='row'>
                          <div class='col'>
                            <h5 class='card-title text-uppercase text-muted mb-0'>
                              Sales
                            </h5>
                            <span class='h2 font-weight-bold mb-0'>924</span>
                          </div>
                          <div class='col-auto'>
                            <div class='icon icon-shape bg-gradient-green text-white rounded-circle shadow'>
                              <i class='ni ni-money-coins'></i>
                            </div>
                          </div>
                        </div>
                        <p class='mt-3 mb-0 text-sm'>
                          <span class='text-success mr-2'>
                            <i class='fa fa-arrow-up'></i> 3.48%
                          </span>
                          <span class='text-nowrap'>Since last month</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class='col-xl-3 col-md-6'>
                    <div class='card card-stats'>
                      <div class='card-body'>
                        <div class='row'>
                          <div class='col'>
                            <h5 class='card-title text-uppercase text-muted mb-0'>
                              Performance
                            </h5>
                            <span class='h2 font-weight-bold mb-0'>49,65%</span>
                          </div>
                          <div class='col-auto'>
                            <div class='icon icon-shape bg-gradient-info text-white rounded-circle shadow'>
                              <i class='ni ni-chart-bar-32'></i>
                            </div>
                          </div>
                        </div>
                        <p class='mt-3 mb-0 text-sm'>
                          <span class='text-success mr-2'>
                            <i class='fa fa-arrow-up'></i> 3.48%
                          </span>
                          <span class='text-nowrap'>Since last month</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class='container-fluid mt--6'>
            <div class='row'>
              <div class='col-xl-12'>
                <div class='card'>
                  <EmployeesComponent
                    employeeList={employeeList}
                    page={page}
                    handlePagination={this.handlePagination}
                    totalCount={totalCount}
                    pageSize={pageSize}
                  />
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

export default DashBoardComponent;
