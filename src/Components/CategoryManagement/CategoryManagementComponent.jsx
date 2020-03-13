import React, { Component } from 'react';
import SideBarComponent from '../NavBar/SideBarComponent';
import DashBoardNavBar from '../NavBar/DashBoardNavBar';
import { addCategory } from '../../utility/actions';
import toastr from '../../utility/Toaster';

class CategoryManagementComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  saveCategory = async () => {
    const { categoryName = '', categoryDescription = '' } = this.state;
    if (!categoryName || !categoryDescription) {
      toastr.error('All Fields Are Mandatory');
      return;
    }
    const response = await addCategory({ categoryName, categoryDescription });

    const { status = '', data = {} } = response;
    if (status === 200) {
      if (data.Error === 'Invalid Token') {
        toastr.error('Token Expired');
        localStorage.removeItem('authDc');
        this.props.history.push('/');
        return;
      }
      this.setState({ categoryName: '', categoryDescription: '' });

      toastr.success('Category Added Successfully');
    }
  };
  handleFieldChanges = e => {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { categoryName = '', categoryDescription = '' } = this.state;

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
                        Add Category
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
                                Category Name *
                              </label>
                              <input
                                id='input-address'
                                name='categoryName'
                                onChange={e => {
                                  this.handleFieldChanges(e);
                                }}
                                class='form-control'
                                placeholder='Category Name'
                                value={categoryName}
                                type='text'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class='pl-lg-4'>
                        <div class='form-group'>
                          <label class='form-control-label'>
                            Category Description *
                          </label>
                          <textarea
                            rows='4'
                            name='categoryDescription'
                            onChange={e => {
                              this.handleFieldChanges(e);
                            }}
                            value={categoryDescription}
                            class='form-control'
                            placeholder='A few words about category ...'
                          ></textarea>
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
                              this.saveCategory();
                            }}
                            class='btn btn-sm btn-primary'
                          >
                            Save Category
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

export default CategoryManagementComponent;
