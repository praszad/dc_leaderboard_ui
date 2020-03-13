import React, { Component } from 'react';

class EmployeesComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      employeeList = [],
      page = 1,
      totalCount = 0,
      pageSize = 2
    } = this.props;

    return (
      <React.Fragment>
        <div class='card-header border-0'>
          <h3 class='mb-0'>Light table</h3>
        </div>

        <div class='table-responsive'>
          <table class='table align-items-center table-flush'>
            <thead class='thead-light'>
              <tr>
                <th scope='col' class='sort' data-sort='name'>
                  Employee Name
                </th>
                <th scope='col' class='sort' data-sort='budget'>
                  Employee Id
                </th>
                <th scope='col' class='sort' data-sort='budget'>
                  Mobile No
                </th>
                <th scope='col' class='sort' data-sort='status'>
                  Role Assigned
                </th>
                <th scope='col'>Date Of Join</th>

                <th scope='col'></th>
              </tr>
            </thead>
            <tbody class='list'>
              {employeeList.length
                ? employeeList.map((employee, index) => {
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
                                {employee.emp_name}
                              </span>
                            </div>
                          </div>
                        </th>
                        <td class='budget'>{employee.emp_id}</td>
                        <td class='budget'>{employee.mobile}</td>
                        <td>
                          <span class='badge badge-dot mr-4'>
                            <i class='bg-warning'></i>
                            <span class='status'>
                              {' '}
                              {employee.role_id == 36 ? 'Admin' : 'User'}
                            </span>
                          </span>
                        </td>
                        <td>
                          <div class='d-flex align-items-center'>
                            <td class='budget'>{employee.date_of_joining}</td>
                          </div>
                        </td>
                        <td class='text-right'>
                          <div class='dropdown'>
                            <a
                              class='btn btn-sm btn-icon-only text-light'
                              href='#'
                              role='button'
                              data-toggle='dropdown'
                              aria-haspopup='true'
                              aria-expanded='false'
                            >
                              <i class='fas fa-ellipsis-v'></i>
                            </a>
                            <div class='dropdown-menu dropdown-menu-right dropdown-menu-arrow'>
                              <a class='dropdown-item' href='#'>
                                Action
                              </a>
                              <a class='dropdown-item' href='#'>
                                Another action
                              </a>
                              <a class='dropdown-item' href='#'>
                                Something else here
                              </a>
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

        <div class='card-footer py-4'>
          <nav aria-label='...'>
            <ul class='pagination justify-content-end mb-0'>
              {page !== 1 ? (
                <li class='page-item '>
                  <a
                    class='page-link'
                    href='javascript:void(0)'
                    onClick={() => this.props.handlePagination(page - 1)}
                  >
                    <i class='fas fa-angle-left'></i>
                    <span class='sr-only'>Previous</span>
                  </a>
                </li>
              ) : null}
              <li class='page-item active'>
                <a
                  class='page-link'
                  href='javascript:void(0)'
                  onClick={() => this.props.handlePagination(page)}
                >
                  {page}
                </a>
              </li>
              {totalCount >= page * pageSize ? (
                <li class='page-item'>
                  <a
                    class='page-link'
                    href='javascript:void(0)'
                    onClick={() => this.props.handlePagination(page + 1)}
                  >
                    <i class='fas fa-angle-right'></i>
                    <span class='sr-only'>Next</span>
                  </a>
                </li>
              ) : null}
            </ul>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default EmployeesComponent;
