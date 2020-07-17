import React, { useEffect, useState } from "react";
import { getEvent, responsesByEvent } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { Segment, Header, Divider, Button, List } from "semantic-ui-react";

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
  }, []);

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
          <h3>Response types:</h3>
          <div>{thisEvent.positiveResponse}</div>
          <div>{thisEvent.negativeResponse}</div>
          <Divider horizontal></Divider>
        </Segment>
        <Segment>
          <Header>Responses</Header>
          <Divider></Divider>
          <List>
            {responses.map((response) => {
              if (response.message.includes(thisEvent.negativeResponse)){
                return (
                  <div key={response.id}>
                    <h1>NEEDS ATTENTION</h1>
                    <li style={{border: " 2px solid red"}}>
                      <List.Header>
                        <b>Employee Info:</b>
                        <p>
                          
                          {response.employee.firstName +
                            " " +
                            response.employee.lastName}
                        </p>
                      </List.Header>
                      <p>
                        {response.employee.phone}
                        <br />
                        {response.employee.email}
                      </p>
                      <b>Response Message:</b>
                      <p>{response.message}</p>
                    </li>
                    <Divider />
                  </div>
                );

              }
              else if (response.message.includes(thisEvent.positiveResponse)){
                return (
                  <div key={response.id}>
                    <li style={{border: " 2px solid green"}}>
                      <List.Header>
                        <b>Employee Info:</b>
                        <p>
                          
                          {response.employee.firstName +
                            " " +
                            response.employee.lastName}
                        </p>
                      </List.Header>
                      <p>
                        {response.employee.phone}
                        <br />
                        {response.employee.email}
                      </p>
                      <b>Response Message:</b>
                      <p>{response.message}</p>
                    </li>
                    <Divider />
                  </div>
                );
              }
              else{
                return (
                  <div key={response.id}>
                    <li style={{border: " 2px solid blue"}}>
                      <List.Header>
                        <b>Employee Info:</b>
                        <p>
                          
                          {response.employee.firstName +
                            " " +
                            response.employee.lastName}
                        </p>
                      </List.Header>
                      <p>
                        {response.employee.phone}
                        <br />
                        {response.employee.email}
                      </p>
                      <b>Response Message:</b>
                      <p>{response.message}</p>
                    </li>
                    <Divider />
                  </div>
                );
              }
              
            })}
          </List>
          <Divider />
        </Segment>
      </Segment.Group>
    </div>
  );
}

export default EventDashboard;
