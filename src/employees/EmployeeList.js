import React, { Component } from "react";
import { List, Button, Card, Header, Divider } from "semantic-ui-react";
import { Pagination } from "semantic-ui-react";
import CreateEmployeeForm from "./AddEmployeeForm";
import { listEmployees } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { deleteEmployee, updateEmployee } from "../graphql/mutations";

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      itemsPerPage: 5,
      hideForm: true,
      user: "",
      employees: [],
    };

    this.handleEmpFormClick = this.handleEmpFormClick.bind(this);
    this.createEmpHandler = this.createEmpHandler.bind(this);
  }

  async componentDidMount() {
    const result = await API.graphql(
      graphqlOperation(listEmployees)
    )
    this.setState({ employees: result.data.listEmployees.items })
  }

  handleEmpFormClick(state) {
    this.setState({ hideForm: !state });
  }

  async createEmpHandler() {
    const result = await API.graphql(
      graphqlOperation(listEmployees)
    )
    this.setState({ employees: result.data.listEmployees.items })

  }

  setPageNum = (event, { activePage }) => {
    this.setState({ page: activePage });
  };

  async deleteClick(id){
    const input = { id: id };
    await API.graphql(graphqlOperation(deleteEmployee, {input}));
    const result = await API.graphql(
      graphqlOperation(listEmployees)
    );
    this.setState({ employees: result.data.listEmployees.items });
  }

  async updateClick(id){
    const input = { id: id };
    await API.graphql(graphqlOperation(updateEmployee, {input}));
    const result = await API.graphql(
      graphqlOperation(listEmployees)
    );
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
        <List>
          {employee.map((item) => (
            <div key={item.id}>
              <List.Item>
                <Card>
                  <List.Content>
                    <List.Header>{item.firstName + item.lastName}</List.Header>
                    <div>{item.phone}</div>
                    <div>{item.email}</div>
                  </List.Content>
                </Card>
                <Button onClick={()=>this.deleteClick(item.id)}>Delete Employee</Button>
                <Button onClick={()=>this.updateClick(item.id)}>Update Employee</Button>
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
