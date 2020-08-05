import React from "react";
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignOut,
  AmplifySignIn,
  AmplifyConfirmSignUp,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { Menu, Grid, Segment, Divider } from "semantic-ui-react";
import TeamList from "./teams/TeamList";
import EmployeeList from "./employees/EmployeeList";
import EventList from "./events/EventList";
import { Auth } from "aws-amplify";
import TeamDashboard from "./teams/TeamDashboard";
import EventDashboard from "./events/EventDashboard";

function App (){
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();
  const [dashboard, setDashboard] = React.useState();
  const [team, setTeam] = React.useState();
  const [event, setEvent] = React.useState();
  const [instructions, setInstructions] = React.useState(false);

  React.useEffect(() => {
    setDashboard('home');
  });

  const handleTeamClick = event => {
    setTeam(event);
    setDashboard('team');
  }
  
  const handleEventClick = event => {
    setEvent(event);
    setDashboard('event');
  }



  return (
    <div className="App">
      <AmplifyAuthenticator>
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[
          {
            type: "email",
            label: "Email Address *",
            placeholder: "Enter your email address",
            required: true,
          },
          {
            type: "password",
            label: "Password *",
            placeholder: "Enter your password",
            required: true,
          },
          {
            type: "name",
            label: "Full Name *",
            placeholder: "Enter your first and last name",
            required: true,
          },
          {
            type: "phone_number",
            label: "Phone Number *",
            placeholder: "Enter your phone number",
            required: true,
          },
        ]}
      />
      <AmplifySignIn slot="sign-in" usernameAlias="email" />
      <Menu>
        <Menu.Item onClick={() => setDashboard("home")}>Home</Menu.Item>
        <Menu.Item onClick={() => setDashboard("employees")}>
          Employee Management
        </Menu.Item>
        <Menu.Item onClick={() => setInstructions(!instructions)}>
          Instructions
        </Menu.Item>

        <Menu.Menu position="right">
          <AmplifySignOut />
        </Menu.Menu>
      </Menu>

      {instructions === true && (
         <div><p>1. Create a team <br/>2. Create Employees in Employee Management<br/> 3. Add employees to the team you created<br/> 4. Create event for the team</p></div>
       )
      }

      {dashboard === "home" && (
        <div>
         
        <Segment>
          <Grid columns={2} relaxed="very">
            <Grid.Column>
              <TeamList teamClick={handleTeamClick}></TeamList>
            </Grid.Column>
            <Grid.Column>
              <EventList eventClick={handleEventClick}></EventList>
            </Grid.Column>
          </Grid>

          <Divider vertical></Divider>
        </Segment>
        </div>
      )}
      {dashboard=== "employees" && (
        <EmployeeList></EmployeeList>
      )}
      {dashboard === "team" && (
        <TeamDashboard team={team}/>
      )}
      {dashboard === "event" && (
        <EventDashboard event={event}/>
      )}
    </AmplifyAuthenticator>
    </div>
    )
    

};

export default App;