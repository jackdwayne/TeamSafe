import React, { Component } from "react";
import { List, Button, Card, Header, Divider } from "semantic-ui-react";
import { Pagination } from "semantic-ui-react";
import CreateTeamForm from "./CreateTeamForm";
import { teamByManager } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { Auth } from "aws-amplify";

class TeamList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      itemsPerPage: 5,
      hideForm: true,
      user: "",
      teams: [],
    };

    this.handleTeamFormClick = this.handleTeamFormClick.bind(this);
    this.createTeamHandler = this.createTeamHandler.bind(this);
    this.handleTeamNameClicked = this.handleTeamNameClicked.bind(this);
  }

  async componentDidMount() {
    const user = Auth.user.attributes.email;
    const result = await API.graphql(
      graphqlOperation(teamByManager, { managerEmail: user })
    );
    this.setState({ teams: result.data.teamByManager.items });
  }

  handleTeamFormClick(state) {
    this.setState({ hideForm: !state });
  }

  handleTeamNameClicked(id){
    this.props.teamClick(id);
  }

  async createTeamHandler() {
    const user = Auth.user.attributes.email;
    const result = await API.graphql(
      graphqlOperation(teamByManager, { managerEmail: user })
    );
    this.setState({ teams: result.data.teamByManager.items });
  }

  setPageNum = (event, { activePage }) => {
    this.setState({ page: activePage });
  };

  render() {
    const itemsPerPage = 5;
    const { page } = this.state;
    const totalPages = Math.ceil(this.state.teams.length / itemsPerPage);
    const team = this.state.teams.slice(
      (page - 1) * itemsPerPage,
      (page - 1) * itemsPerPage + itemsPerPage
    );

    return (
      <div>
        <div>
          <Button onClick={() => this.handleTeamFormClick(this.state.hideForm)}>
            Create Team
          </Button>
          {this.state.hideForm === false && (
            <CreateTeamForm teamHandler={this.createTeamHandler} />
          )}
        </div>
        <Divider></Divider>
        <div>
          <Header>My Teams</Header>
        </div>

        <Pagination
          boundaryRange={0}
          defaultActivePage={1}
          ellipsisItem={null}

          siblingRange={1}
          totalPages={totalPages}
          onPageChange={this.setPageNum}
        />
        <List>
          {team.map((item) => (
            <div key={item.id}>
              <List.Item onClick={() => this.handleTeamNameClicked(item.id)}>
                <Card>
                  <List.Content>
                    <List.Header><a>{item.teamName}</a></List.Header>
                    <b>Manager</b>
                    <div>{item.managerName}</div>
                    <div>{item.managerPhone}</div>
                    <div>{item.managerEmail}</div>
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
