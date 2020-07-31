import React, { useEffect, useState } from "react";
import {
  getTeam,
  listEmployees,
  membersByTeam,
  eventsByTeam,
} from "../graphql/queries";
import { createTeamMember, deleteTeamMember } from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import {
  Segment,
  Header,
  Grid,
  Divider,
  Dropdown,
  Button,
  List,
} from "semantic-ui-react";

function TeamDashboard({ team }) {
  const [thisTeam, setThisTeam] = useState([team]);
  const [employees, setEmployees] = useState([]);
  const [teamMemberDash, setTeamMemberDash] = useState();
  const [empId, setEmpId] = useState();
  const [teamMembers, setTeamMembers] = useState([
    { id: "", employeeID: "", employee: "", teamID: "", team: "" },
  ]);
  const [events, setEvents] = useState([]);

  const teamQuery = async () => {
    const result = await API.graphql(graphqlOperation(getTeam, { id: team }));
    const tMems = await API.graphql(
      graphqlOperation(membersByTeam, { teamID: team })
    );
    const evts = await API.graphql(
      graphqlOperation(eventsByTeam, { teamID: team })
    );
    setThisTeam(result.data.getTeam);
    setTeamMembers(tMems.data.membersByTeam.items);
    setEvents(evts.data.eventsByTeam.items);
    console.log({ teamMembers });
  };
  const empQuery = async () => {
    const result = await API.graphql(graphqlOperation(listEmployees));
    const data = result.data.listEmployees.items;
    setEmployees(data);
    console.log(data);
  };
  const handleTeamDashClick = (state) => {
    setTeamMemberDash(state);
  };

  const handleAddEmployee = async (event, data) => {
    setEmpId(data.value);
    const input = { employeeID: data.value, teamID: thisTeam.id };
    await API.graphql(graphqlOperation(createTeamMember, { input }));
    const tMems = await API.graphql(
      graphqlOperation(membersByTeam, { teamID: team })
    );
    setTeamMembers((teamMembers) => tMems.data.membersByTeam.items);
    setTeamMemberDash("");
  };

  const handleTeamMemberDelete = async (id) => {
    const input = { id: id };
    await API.graphql(graphqlOperation(deleteTeamMember, { input }));
    const tMems = await API.graphql(
      graphqlOperation(membersByTeam, { teamID: team })
    );
    setTeamMembers((teamMembers) => tMems.data.membersByTeam.items);
  };

  useEffect(() => {
    teamQuery();
    empQuery();
  }, []);

  const empOptions = employees.map((item) => ({
    key: item.id,
    text:
      "Name: " +
      item.firstName +
      " " +
      item.lastName +
      ", Email: " +
      item.email,
    value: item.id,
  }));

  return (
    <div>
      <Segment.Group>
        <Segment>
          <Grid columns={2} relaxed="very">
            <Grid.Column>
              <Header>Team Info</Header>
              <Divider></Divider>
              <div>{thisTeam.teamName}</div>
              <b>Manager</b>
              <div>{thisTeam.managerName}</div>
              <div>{thisTeam.managerPhone}</div>
              <div>{thisTeam.managerEmail}</div>
            </Grid.Column>
            <Grid.Column>
              <Header>Team Members</Header>
              <Button onClick={() => handleTeamDashClick("Add")}>
                Add Team Member
              </Button>

              {teamMemberDash === "Add" && (
                <div>
                  <Dropdown
                    placeholder="Add Team Member"
                    fluid
                    search
                    selection
                    options={empOptions}
                    onChange={handleAddEmployee}
                    noResultsMessage="Employee not in database"
                  />
                  <input value={empId} />
                </div>
              )}
              <Divider></Divider>
              <Segment style={{ overflow: "auto", maxHeight: 200 }}>
                <List>
                  {teamMembers.map((teamMember) => {
                    if (teamMember.employee != null) {
                      return (
                        <div key={teamMember.id}>
                          <List.Item>
                            <List.Header>
                              {teamMember.employee.firstName +
                                " " +
                                teamMember.employee.lastName}
                            </List.Header>

                            <p>
                              {teamMember.employee.phone}
                              <br />
                              {teamMember.employee.email}
                            </p>
                            <Button
                              onClick={() =>
                                handleTeamMemberDelete(teamMember.id)
                              }
                            >
                              Delete Member
                            </Button>
                          </List.Item>
                          <Divider />
                        </div>
                      );
                    } else {
                      return(
                        <div>
                          <p>teammember error</p>
                        </div>
                      )
                    }
                  })}
                </List>
              </Segment>
            </Grid.Column>
          </Grid>
          <Divider vertical></Divider>
        </Segment>
        <Segment>
          <Header>Events</Header>
          <Divider />
          <List>
            {events.map((evt) => {
              return (
                <div key={evt.id}>
                  <List.Item>
                    <List.Content>
                      <List.Header>{evt.eventName}</List.Header>
                      <b>Team Name</b>
                      <div>{evt.team.teamName}</div>
                      <b>Manager</b>
                      <div>{evt.managerName}</div>
                      <div>{evt.managerPhone}</div>
                      <div>{evt.managerEmail}</div>
                    </List.Content>
                    <Divider></Divider>
                  </List.Item>
                </div>
              );
            })}
          </List>
        </Segment>
      </Segment.Group>
    </div>
  );
}

export default TeamDashboard;
