import React, { Component } from "react";
import { List, Button, Card, Header, Divider } from "semantic-ui-react";
import { Pagination } from "semantic-ui-react";
import CreateEmployeeForm from "./AddEmployeeForm";
import { listEmployees } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

class TeamList extends Component {
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
    );
    this.setState({ employees: result.data.listEmployees.items });
  }

  setPageNum = (event, { activePage }) => {
    this.setState({ page: activePage });
  };

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
              <List.Item onClick={this.handleEmpNameClicked}>
                <Card>
                  <List.Content>
                    <List.Header>{item.name}</List.Header>
                    <div>{item.phone}</div>
                    <div>{item.email}</div>
                  </List.Content>
                </Card>
              </List.Item>
            </div>
          ))}
        </List>
      </div>
    );
  }
}

export default TeamList;
