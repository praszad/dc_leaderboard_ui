import React, { Component } from 'react';
import { getLocalUserData } from '../../utility/actions';
import { Link } from 'react-router-dom';

class LeaderBoardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { role_id: '' };
  }
  componentDidMount() {
    let { role_id } = getLocalUserData();
    this.setState({ role_id });
  }
  render() {
    const { leaderBoardData = [] } = this.props;
    const { role_id } = this.state;
    return (
      <React.Fragment>
        <div class='card-header border-0'>
          {role_id == '36' ? (
            <Link to='karma'>
              {' '}
              <h3 class='mb-0'>
                <b>+</b> Add Points | Leader Board
              </h3>
            </Link>
          ) : (
            <h3 class='mb-0'>Leader Board</h3>
          )}
        </div>

        <div class='table-responsive'>
          <table class='table align-items-center table-flush'>
            <thead class='thead-dark'>
              <tr>
                <th scope='col' class='sort' data-sort='name'>
                  Employee Id
                </th>
                <th scope='col' class='sort' data-sort='budget'>
                  Karma Points
                </th>

                <th scope='col'></th>
              </tr>
            </thead>
            <tbody class='list'>
              {leaderBoardData.length
                ? leaderBoardData.map((leader, index) => {
                    return (
                      <tr key={index}>
                        <th scope='row'>
                          <div class='media align-items-center'>
                            <a
                              href='javascript:void(0)'
                              class='avatar rounded-circle mr-3'
                            >
                              <img
                                alt='Image placeholder'
                                src='../assets/img/theme/bootstrap.jpg'
                              />
                            </a>
                            <div class='media-body'>
                              <span class='name mb-0 text-sm'>
                                <Link to={`/transactions/${leader.emp_id}`}>
                                  {' '}
                                  {leader.emp_id}{' '}
                                </Link>
                              </span>
                            </div>
                          </div>
                        </th>
                        <td class='budget'>{leader.karmaPoints}</td>
                        <td class='text-right'>
                          <div class='dropdown'>
                            <a
                              class='btn btn-sm btn-icon-only text-dark'
                              href='#'
                              role='button'
                              data-toggle='dropdown'
                              aria-haspopup='true'
                              aria-expanded='false'
                            >
                              <i class='fas fa-ellipsis-v'></i>
                            </a>
                            <div class='dropdown-menu dropdown-menu-right dropdown-menu-arrow'>
                              <Link to={`/transactions/${leader.emp_id}`}>
                                <a
                                  class='dropdown-item'
                                  href='javascript:void(0)'
                                >
                                  Show Transaction
                                </a>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : 'No Records Found'}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default LeaderBoardComponent;
