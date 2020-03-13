import React, { Component } from 'react';
import SideBarComponent from '../NavBar/SideBarComponent';
import DashBoardNavBar from '../NavBar/DashBoardNavBar';
import { getCategories, addCategoryItem } from '../../utility/actions';
import toastr from '../../utility/Toaster';

class CategoryItemManagementComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryOptions: []
    };
  }
  componentDidMount() {
    this.getAllCategories();
  }
  getAllCategories = async (page = 1) => {
    const response = await getCategories();
    const { status = '', data = {} } = response;
    if (data.Error) {
      toastr.error('Token Expired');
      localStorage.removeItem('authDc');
      this.props.history.push('/');
      return;
    }
    if (data.length && status === 200) {
      this.setState({ categoryOptions: response.data });
    }
  };
  saveCategoryItem = async () => {
    const {
      categoryId = '',
      itemName = '',
      karmaPoints = 0,
      itemDescription = ''
    } = this.state;

    const response = await addCategoryItem({
      categoryId,
      itemName,
      karmaPoints,
      itemDescription
    });

    const {
      status = '',
      data = {},
      data: { Error: error }
    } = response;
    console.log(response, data);
    if (status === 200) {
      if (error) {
        toastr.error(error);
        return;
      }
      if (error === 'Invalid Token') {
        toastr.error('Token Expired');
        localStorage.removeItem('authDc');
        this.props.history.push('/');
        return;
      }
      this.setState({
        categoryId: '',
        itemName: '',
        karmaPoints: 0,
        itemDescription: ''
      });
      toastr.success('Category Item Added Successfully');
    }
  };
  handleFieldChanges = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      categoryOptions = [],
      categoryId = '',
      itemDescription = '',
      itemName = '',
      karmaPoints = 0
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
                        Add Category Item
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
                                Select Category
                              </label>
                              <select
                                id='input-address'
                                name='categoryId'
                                onChange={e => {
                                  this.handleFieldChanges(e);
                                }}
                                class='form-control'
                                value={categoryId}
                                type='text'
                              >
                                <option value='' disabled>
                                  {'Select Category'}
                                </option>
                                {categoryOptions.length &&
                                  categoryOptions.map(category => {
                                    return (
                                      <option value={category.categoryId}>
                                        {category.categoryName}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                          </div>
                          <div class='col-md-12'>
                            <div class='form-group'>
                              <label
                                class='form-control-label'
                                for='input-address'
                              >
                                Item Name
                              </label>
                              <input
                                id='input-address'
                                name='itemName'
                                onChange={e => {
                                  this.handleFieldChanges(e);
                                }}
                                class='form-control'
                                placeholder='Item Name'
                                value={itemName}
                                type='text'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class='pl-lg-4'>
                        <div class='form-group'>
                          <label class='form-control-label'>
                            Category Item Description
                          </label>
                          <textarea
                            rows='4'
                            name='itemDescription'
                            onChange={e => {
                              this.handleFieldChanges(e);
                            }}
                            value={itemDescription}
                            class='form-control'
                            placeholder='A few words about category item ...'
                          ></textarea>
                        </div>
                        <div class='col-md-12'>
                          <div class='form-group'>
                            <label
                              class='form-control-label'
                              for='input-address'
                            >
                              Karma Points
                            </label>
                            <input
                              id='input-address'
                              name='karmaPoints'
                              onChange={e => {
                                this.handleFieldChanges(e);
                              }}
                              class='form-control'
                              placeholder='Item Name'
                              value={karmaPoints}
                              type='text'
                            />
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
                              this.saveCategoryItem();
                            }}
                            class='btn btn-sm btn-primary'
                          >
                            Save Item Category
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

export default CategoryItemManagementComponent;
