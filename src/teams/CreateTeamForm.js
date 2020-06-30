import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import { API, graphqlOperation } from "aws-amplify";
import { createTeam } from "../graphql/mutations";
import { Auth } from "aws-amplify";

class CreateTeamForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideForm: true,
    };

    this.handleAddTeam = this.handleAddTeam.bind(this);
  }

  handleChangeTeamName = (event) =>
    this.setState({ teamName: event.target.value });
  handleChangeManagerName = (event) =>
    this.setState({ managerName: event.target.value });
  handleChangeManagerEmail = (event) =>
    this.setState({ managerEmail: event.target.value });
  handleChangeManagerPhone = (event) =>
    this.setState({ managerPhone: event.target.value });

  handleAddTeam = async (event) => {
    const { teamName, managerName, managerPhone } = this.state;
    const input = {
      managerName,
      managerEmail: Auth.user.attributes.email,
      managerPhone,
      teamName,
    };
    await API.graphql(graphqlOperation(createTeam, { input })); 
    this.props.teamHandler();
  };

  render() {
    const user = Auth.user.attributes;
    return (
      <Form onSubmit={this.handleAddTeam}>
        <Form.Field>
          <label>Team Name</label>
          <input
            onChange={this.handleChangeTeamName}
            placeholder="e.g. My Team"
          />
        </Form.Field>
        <Form.Field>
          <label>Manager Name</label>
          <input
            onChange={this.handleChangeManagerName}
            placeholder="e.g. Jane Doe"
          />
        </Form.Field>
        <Form.Field>
          <label>Manager Email</label>
          <input value={user.email} />
        </Form.Field>
        <Form.Field>
          <label>Manager Phone</label>
          <input
            onChange={this.handleChangeManagerPhone}
            placeholder="Phone #"
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default CreateTeamForm;
