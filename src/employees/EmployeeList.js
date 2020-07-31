import React, { Component } from "react";
import { List, Button, Card, Header, Divider } from "semantic-ui-react";
import { Pagination } from "semantic-ui-react";
import CreateEmployeeForm from "./AddEmployeeForm";
import UpdateEmployeeForm from "./UpdateEmployeeForm";
import { listEmployees } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { deleteEmployee } from "../graphql/mutations";

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      itemsPerPage: 5,
      hideForm: true,
      hideUpdateForm: true,
      user: "",
      employees: [],
    };

    this.handleEmpFormClick = this.handleEmpFormClick.bind(this);
    this.handleUpdateFormClick = this.handleUpdateFormClick.bind(this);
    this.createEmpHandler = this.createEmpHandler.bind(this);
    this.updateEmpHandler = this.updateEmpHandler.bind(this);
  }

  async componentDidMount() {
    const result = await API.graphql(graphqlOperation(listEmployees));
    this.setState({ employees: result.data.listEmployees.items });
  }

  handleEmpFormClick(state) {
    this.setState({ hideForm: !state });
  }

  handleUpdateFormClick(state, id, firstName, lastName, phone, email) {
    this.setState({ hideUpdateForm: !state });
    this.setState({ updateId: id });
    this.setState({ updateFirst: firstName });
    this.setState({ updateLast: lastName });
    this.setState({ updatePhone: phone });
    this.setState({ updateEmail: email });
  }

  async createEmpHandler() {
    const result = await API.graphql(graphqlOperation(listEmployees));
    this.setState({ employees: result.data.listEmployees.items });
  }

  async updateEmpHandler(state) {
    const result = await API.graphql(graphqlOperation(listEmployees));
    this.setState({ employees: result.data.listEmployees.items });
    this.setState({ hideUpdateForm: !state });
  }

  setPageNum = (event, { activePage }) => {
    this.setState({ page: activePage });
  };

  async deleteClick(id) {
    const input = { id: id };
    await API.graphql(graphqlOperation(deleteEmployee, { input }));
    const result = await API.graphql(graphqlOperation(listEmployees));
    this.setState({ employees: result.data.listEmployees.items });
  }

  render() {
    const { employees } = this.state;
    const itemsPerPage = 5;
    const { page } = this.state;
    const totalPages = Math.ceil(this.state.employees.length / itemsPerPage);
    const employee = this.state.employees.slice(
      (page - 1) * itemsPerPage,
      (page - 1) * itemsPerPage + itemsPerPage
    );
    console.log(employees);

    return (
      <div>
        <div>
          <Button onClick={() => this.handleEmpFormClick(this.state.hideForm)}>
            Create Employee
          </Button>
          {this.state.hideForm === false && (
            <CreateEmployeeForm empHandler={this.createEmpHandler} />
          )}
          <div></div>
          <Divider></Divider>
        </div>
        <div>
          <Header>Employees</Header>
        </div>

        <Pagination
          boundaryRange={0}
          defaultActivePage={1}
          ellipsisItem={null}
          totalPages={totalPages}
          onPageChange={this.setPageNum}
        />
        {this.state.hideUpdateForm === false && (
          <UpdateEmployeeForm
            updateHandler={this.updateEmpHandler}
            id={this.state.updateId}
            firstName = {this.state.updateFirst}
            lastName = {this.state.updateLast}
            phone = {this.state.updatePhone}
            email = {this.state.updateEmail}
          />
        )}
        <List>
          {employee.map((item) => (
            <div key={item.id}>
              <List.Item>
                <Card>
                  <List.Content>
                    <List.Header>{item.firstName +" "+ item.lastName}</List.Header>
                    <div>{item.phone}</div>
                    <div>{item.email}</div>
                  </List.Content>
                </Card>
                <Button onClick={() => this.deleteClick(item.id)}>
                  Delete Employee
                </Button>
                <Button
                  onClick={() =>
                    this.handleUpdateFormClick(this.state.hideUpdateForm, item.id, item.firstName, item.lastName, item.phone, item.email )
                  }
                >
                  Update Employee
                </Button>
              </List.Item>
              <Divider></Divider>
            </div>
          ))}
        </List>
      </div>
    );
  }
}

export default EmployeeList;
