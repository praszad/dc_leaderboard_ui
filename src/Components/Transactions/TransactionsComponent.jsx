import React, { Component } from 'react';
import SideBarComponent from '../NavBar/SideBarComponent';
import FooterComponent from '../NavBar/FooterComponent';
import DashBoardNavBar from '../NavBar/DashBoardNavBar';
import { getUserTransaction } from '../../utility/actions';
import toastr from '../../utility/Toaster';
import TransactionsGridComponent from './TransactionsGridComponent';

class TransactionsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderBoardData: []
    };
  }
  componentDidMount() {
    console.log(this.props.match.params.user_id);
    const { user_id = '' } = this.props.match.params;
    this.getUserTransactionData(user_id);
  }
  getUserTransactionData = async (user_id = '') => {
    const response = await getUserTransaction(user_id);
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

  render() {
    const { leaderBoardData = [] } = this.state;
    return (
      <React.Fragment>
        <SideBarComponent history={this.props.history} />
        <div class='main-content' id='panel'>
          <DashBoardNavBar history={this.props.history} />
          <div class='header bg-primary pb-6'>
            <div class='container-fluid'></div>
          </div>
          <div class='container-fluid mt--6'>
            <div class='row'>
              <div class='col-xl-12'>
                <div class='card'>
                  <TransactionsGridComponent
                    leaderBoardData={leaderBoardData}
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

export default TransactionsComponent;
