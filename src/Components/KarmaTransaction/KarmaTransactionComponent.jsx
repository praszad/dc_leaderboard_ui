import React, { Component } from 'react';
import Select from 'react-select';
import SideBarComponent from '../NavBar/SideBarComponent';
import DashBoardNavBar from '../NavBar/DashBoardNavBar';
import {
  getAllUsers,
  getCategories,
  getCategoryItems,
  getUserData,
  addNewKarma
} from '../../utility/actions';
import toastr from '../../utility/Toaster';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
class KarmaTransactionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userOptions: [],
      selectedItem: {},
      selectedUser: {}
    };
  }
  componentDidMount() {
    this.getAllUserList();
    this.getAllCategories();
    const userData = getUserData();
    this.setState({ userData });
  }
  getAllUserList = async () => {
    const response = await getAllUsers();
    const { status = '', data = {} } = response;

    if (data.Error) {
      toastr.error('Token Expired');
      localStorage.removeItem('authDc');
      this.props.history.push('/');
      return;
    }
    if (data.length && status === 200) {
      let userOptions = data.map(user => {
        return { value: user.emp_id, label: user.emp_name };
      });
      this.setState({ userOptions });
    }
  };
  saveKarmaTransaction = async () => {
    const {
      karmaPoints = 0,
      selectedUser: { value: emp_id = '' },
      categoryId = '',
      selectedItem: { value: itemId = '' },
      karmaDateTime = '',
      userData
    } = this.state;
    const data = {
      emp_id,
      itemId,
      categoryId,
      karmaPoints,
      karmaDateTime,
      createdBy: userData.emp_id,
      createdAt: new Date()
    };

    const response = await addNewKarma(data);
    const {
      status = '',
      data: { Error: error, errors }
    } = response;

    if (status === 200) {
      if (error) {
        toastr.error(error);
        return;
      }
      if (errors) {
        toastr.error(response.data._message);
        return;
      }
      if (error === 'Invalid Token') {
        toastr.error('Token Expired');
        localStorage.removeItem('authDc');
        this.props.history.push('/');
        return;
      }
      toastr.success('Category Item Added Successfully');
      this.props.history.push('/');
    }
  };
  handleFieldChanges = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
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
  getAllItemsByCategory = async (categoryId = '') => {
    const response = await getCategoryItems(categoryId);
    const { status = '', data = {} } = response;

    if (data.Error) {
      toastr.error(data.Error);
      return;
    }
    if (data.length && status === 200) {
      let itemsData = response.data;
      let itemOptions = response.data.map(item => {
        return { value: item.itemId, label: item.itemName };
      });
      this.setState({ itemsData, itemOptions });
    }
  };
  handleChange = selectedUser => {
    this.setState({ selectedUser });
  };
  handleCategoryChange = selectedCategory => {
    this.setState(
      {
        selectedCategory,
        categoryId: selectedCategory.value,
        itemOptions: [],
        itemsData: [],
        karmaPoint: ''
      },
      () => {
        this.getAllItemsByCategory(selectedCategory.value);
      }
    );
  };
  handleItemChange = selectedItem => {
    let { itemsData = [] } = this.state;

    let karmaPoint =
      itemsData.length &&
      itemsData.filter(item => {
        return item.itemId == selectedItem.value;
      });
    const { karmaPoints } = karmaPoint[0];

    this.setState({ selectedItem, karmaPoints });
  };
  changeKarmaDate = value => {
    const karmaDateTime = value.valueOf();
    this.setState({ karmaDateTime });
  };
  render() {
    const {
      userOptions = [],
      karmaDateTime = '',
      categoryOptions = [],
      itemOptions = [],
      selectedItem = {},
      selectedCategory = {},
      selectedUser = {},
      karmaPoints = ''
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
                        Add Karma Point
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
                                Select User
                              </label>
                              <Select
                                value={selectedUser}
                                onChange={this.handleChange}
                                options={userOptions}
                              />
                            </div>
                          </div>
                          <div class='col-md-6'>
                            <div class='form-group'>
                              <label
                                class='form-control-label'
                                for='input-address'
                              >
                                Select Category
                              </label>
                              <Select
                                value={selectedCategory}
                                onChange={this.handleCategoryChange}
                                options={categoryOptions}
                              />
                            </div>
                          </div>
                          <div class='col-md-6'>
                            <div class='form-group'>
                              <label
                                class='form-control-label'
                                for='input-address'
                              >
                                Select Item
                              </label>
                              <Select
                                value={selectedItem}
                                onChange={this.handleItemChange}
                                options={itemOptions}
                              />
                            </div>
                          </div>
                          <div class='col-md-12'>
                            <div class='form-group'>
                              <label
                                class='form-control-label'
                                for='input-address'
                              >
                                Karma Date And Time
                              </label>
                              <DatePicker
                                onChange={this.changeKarmaDate}
                                class='form-control'
                                format='DD-MM-YYYY HH:mm a'
                                showTime
                                // value={
                                //   karmaDateTime
                                //     ? moment(
                                //         moment(karmaDateTime).format(
                                //           'DD-MM-YYYY HH:mm a'
                                //         )
                                //       )
                                //     : ''
                                // }
                              />
                            </div>
                          </div>
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
                              disabled
                              class='form-control'
                              placeholder='Karma Point'
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
                              this.saveKarmaTransaction();
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

export default KarmaTransactionComponent;
