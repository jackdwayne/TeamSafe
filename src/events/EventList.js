import React, { Component } from "react";
import { List, Button, Card, Header, Divider } from "semantic-ui-react";
import { Pagination } from "semantic-ui-react";
import CreateEventForm from "./CreateEventForm";
import { eventByManager } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { deleteEvent } from "../graphql/mutations";
import { Auth } from "aws-amplify";

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      itemsPerPage: 5,
      hideForm: true,
      user: "",
      events: [],
    };

    this.handleEventFormClick = this.handleEventFormClick.bind(this);
    this.createEventHandler = this.createEventHandler.bind(this);
    this.handleEventNameClicked = this.handleEventNameClicked.bind(this);
  }

  async componentDidMount() {
    const user = Auth.user.attributes.email;
    const result = await API.graphql(
      graphqlOperation(eventByManager, { managerEmail: user })
    );
    this.setState({ events: result.data.eventByManager.items });
  }

  handleEventFormClick(state) {
    this.setState({ hideForm: !state });
  }

  async handleDelete(id) {
    const user = Auth.user.attributes.email;
    const input = { id: id };
    await API.graphql(graphqlOperation(deleteEvent, { input }));
    const result = await API.graphql(
      graphqlOperation(eventByManager, { managerEmail: user })
    );
    this.setState({ events: result.data.eventByManager.items });
  }

  async createEventHandler() {
    const user = Auth.user.attributes.email;
    const result = await API.graphql(
      graphqlOperation(eventByManager, { managerEmail: user })
    );
    this.setState({ events: result.data.eventByManager.items });
  }

  setPageNum = (event, { activePage }) => {
    this.setState({ page: activePage });
  };

  handleEventNameClicked(id){
    this.props.eventClick(id);
  }

  render() {
    const itemsPerPage = 5;
    const { page } = this.state;
    const totalPages = Math.ceil(this.state.events.length / itemsPerPage);
    const event = this.state.events.slice(
      (page - 1) * itemsPerPage,
      (page - 1) * itemsPerPage + itemsPerPage
    );

    return (
      <div>
        <div>
          <Button
            onClick={() => this.handleEventFormClick(this.state.hideForm)}
          >
            Create Event
          </Button>
          {this.state.hideForm === false && (
            <CreateEventForm eventHandler={this.createEventHandler} />
          )}
        </div>
        <Divider></Divider>
        <div>
          <Header>My Events</Header>
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
          {event.map((item) => (
            <div key={item.id}>
              <List.Item onClick={() => this.handleEventNameClicked(item.id)}>
                <Card>
                  <List.Content>
                    <List.Header>{item.eventName}</List.Header>
                    <b>Team Name</b>
                    <div>{item.team.teamName}</div>
                    <b>Manager</b>
                    <div>{item.managerName}</div>
                    <div>{item.managerPhone}</div>
                    <div>{item.managerEmail}</div>
                  </List.Content>
                  <Button onClick={() => this.handleDelete(item.id)}>
                    Delete Event
                  </Button>
                </Card>
              </List.Item>
            </div>
          ))}
        </List>
      </div>
    );
  }
}

export default EventList;
