import React, { Component } from 'react';
import SideBarComponent from '../NavBar/SideBarComponent';
import FooterComponent from '../NavBar/FooterComponent';
import DashBoardNavBar from '../NavBar/DashBoardNavBar';
import { getLeaderBoard } from '../../utility/actions';
import toastr from '../../utility/Toaster';
import LeaderBoardComponent from '../LeaderBoard/LeaderBoardComponent';

class DashBoardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderBoardData: []
    };
  }
  componentDidMount() {
    this.getLeaderBoardData();
  }
  getLeaderBoardData = async (user_id = '') => {
    const response = await getLeaderBoard(user_id);
    console.log(response);

    const { status = '', data = {} } = response;
    if (status === 200) {
      this.setState({ leaderBoardData: data });
      if (data.Error) {
        toastr.error(data.Error);
        return;
      }
      if (data.Error === 'Invalid Token') {
        toastr.error('Token Expired');
        localStorage.removeItem('authDc');
        this.props.history.push('/');
      }
    }
  };

  handleUserSearch = ({ searchKey }) => {
    this.setState({ searchKey }, () => {
      let user_id = searchKey;
      this.getLeaderBoardData(user_id);
    });
  };

  render() {
    const { leaderBoardData = [] } = this.state;
    return (
      <React.Fragment>
        <SideBarComponent history={this.props.history} />
        <div class='main-content' id='panel'>
          <DashBoardNavBar
            handleUserSearch={this.handleUserSearch}
            searchPlaceHolder='Employee ID'
            history={this.props.history}
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
                  <LeaderBoardComponent leaderBoardData={leaderBoardData} />
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
