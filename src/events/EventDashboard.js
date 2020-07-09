import React, { useEffect, useState } from "react";
import { getEvent, responsesByEvent } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import {
  Segment,
  Header,
  Divider,
  Button,
  List,
} from "semantic-ui-react";

function EventDashboard({ event }) {
  const [thisEvent, setThisEvent] = useState([event]);
  const [responses, setResponses] = useState([]);

  const eventQuery = async () => {
    const result = await API.graphql(graphqlOperation(getEvent, { id: event }));
    const resps = await API.graphql(
      graphqlOperation(responsesByEvent, { eventID: event })
    );
    setThisEvent(result.data.getEvent);
    setResponses(resps.data.responsesByEvent.items);
  };

  useEffect(() => {
    eventQuery();
  },[]);

  return (
    <div>
      <Segment.Group>
        <Segment>
            <Header>Event Info</Header>
            <Button>Delete Event</Button>
            <Divider></Divider>
            <div>{thisEvent.eventName}</div>
            <b>Manager</b>
            <div>{thisEvent.managerName}</div>
            <div>{thisEvent.managerPhone}</div>
            <div>{thisEvent.managerEmail}</div>
            <h3>Message:</h3>
            <div>{thisEvent.eventMessage}</div>
            <Divider horizontal></Divider>
        </Segment>
        <Segment>
          <Header>Responses</Header>
          <Divider></Divider>
          <List>
            {responses.map((response) => {
              return (
                <div key={response.id}>
                  <List.Item>
                    <List.Header>
                      {response.employee.firstName +
                        " " +
                        response.employee.lastName}
                    </List.Header>
                    <p>
                      {response.id} <br />
                      {response.employee.phone}
                      <br />
                      {response.employee.email}
                    </p>
                    <p>{response.message}</p>
                  </List.Item>
                  <Divider />
                </div>
              );
            })}
          </List>
          <Divider />
        </Segment>
      </Segment.Group>
    </div>
  );
}

export default EventDashboard;
