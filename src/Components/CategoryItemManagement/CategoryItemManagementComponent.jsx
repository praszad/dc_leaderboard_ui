import React, { Component } from 'react';
import SideBarComponent from '../NavBar/SideBarComponent';
import DashBoardNavBar from '../NavBar/DashBoardNavBar';
import { getCategories, addCategoryItem } from '../../utility/actions';
import toastr from '../../utility/Toaster';
import Select from 'react-select';

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
  getAllCategories = async () => {
    const response = await getCategories();
    const { status = '', data = {} } = response;
    if (data.Error) {
      toastr.error('Token Expired');
      localStorage.removeItem('authDc');
      this.props.history.push('/');
      return;
    }
    if (data.length && status === 200) {
      let categoryOptions = response.data.map(category => {
        return { value: category.categoryId, label: category.categoryName };
      });

      this.setState({ categoryOptions });
    }
  };
  saveCategoryItem = async () => {
    const {
      itemName = '',
      karmaPoints = 0,
      itemDescription = '',
      selectedCategory = {}
    } = this.state;

    const response = await addCategoryItem({
      categoryId: selectedCategory.value,
      itemName,
      karmaPoints,
      itemDescription
    });

    const {
      status = '',
      data = {},
      data: { Error: error, errors }
    } = response;
    if (status === 200) {
      if (error) {
        toastr.error(error);
        return;
      }
      if (errors) {
        toastr.error(response.data.message);
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
  handleChange = selectedCategory => {
    this.setState({ selectedCategory });
  };
  render() {
    const {
      categoryOptions = [],
      categoryId = '',
      itemDescription = '',
      itemName = '',
      karmaPoints = 0,
      selectedCategory = {}
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
                              <Select
                                value={selectedCategory}
                                onChange={this.handleChange}
                                options={categoryOptions}
                              />
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
