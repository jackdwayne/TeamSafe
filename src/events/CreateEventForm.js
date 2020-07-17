import React, { Component } from "react";
import { Button, Form, Dropdown } from "semantic-ui-react";
import { API, graphqlOperation } from "aws-amplify";
import { createEvent } from "../graphql/mutations";
import { teamByManager, messageEvent, membersByTeam } from "../graphql/queries";
import { Auth } from "aws-amplify";
import Calendar from "react-calendar";


class CreateEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      itemsPerPage: 5,
      hideForm: true,
      user: "",
      teams: [],
      destinationNumbers: [],
    };
    this.handleAddEvent = this.handleAddEvent.bind(this);
  }

  async componentDidMount() {
    const user = Auth.user.attributes.email;
    const result = await API.graphql(
      graphqlOperation(teamByManager, { managerEmail: user })
    );
    this.setState({ teams: result.data.teamByManager.items });
  }

  handleChangeEventName = (event) =>
    this.setState({ eventName: event.target.value });

  handleChangeEventMessage = (event) =>
    this.setState({ eventMessage: event.target.value });

  handleChangeAutoReplyPosMessage = (event) =>
    this.setState({ autoReplyPosMessage: event.target.value });

  handleChangeAutoReplyNegMessage = (event) =>
    this.setState({ autoReplyNegMessage: event.target.value });

  handleChangePositiveResponse = (event) =>
    this.setState({ positiveResponse: event.target.value });

  handleChangeNegativeResponse = (event) =>
    this.setState({ negativeResponse: event.target.value });

  handleChangeEventEnd = (eventEnd) => this.setState({ eventEnd: eventEnd });

  handleChangeNoResponseResendTime = (event, { value }) =>
    this.setState({ noResponseResendTime: value });

  handleChangeTeamID = async (event, data) => {
    this.setState({ teamID: data.value });
    console.log(data.value);
    const tMems = await API.graphql(
      graphqlOperation(membersByTeam, { teamID: data.value })
    );
    await this.setState({ teamMembers: tMems.data.membersByTeam.items });
    let i = 0;
    console.log(tMems.data.membersByTeam.items.length);
    let phoneNumbers = [];
    while (i < tMems.data.membersByTeam.items.length) {
      
      phoneNumbers.push(tMems.data.membersByTeam.items[i].employee.phone);
      this.setState({ destinationNumbers: phoneNumbers });

      i++;
    }

    console.log(this.state.destinationNumbers);
  };

  handleChangeLongCode = (event) =>
    this.setState({ longCode: event.target.value });

  handleAddEvent = async (event) => {
    const {
      eventMessage,
      autoReplyPosMessage,
      autoReplyNegMessage,
      positiveResponse,
      negativeResponse,
      eventEnd,
      noResponseResendTime,
      eventName,
      teamID,
      longCode
    } = this.state;
    const input = {
      managerName: Auth.user.attributes.name,
      managerEmail: Auth.user.attributes.email,
      managerPhone: Auth.user.attributes.phone_number,
      alertManagerSetting : this.props.alertManagerSetting,
      eventMessage,
      autoReplyPosMessage,
      autoReplyNegMessage,
      positiveResponse,
      negativeResponse,
      eventStart: new Date(),
      eventEnd,
      noResponseResendTime,
      eventStatus: "Active",
      eventName,
      teamID,
      longCode,
    };
    const crtEvt = await API.graphql(graphqlOperation(createEvent, { input }));
    this.props.eventHandler();
    console.log(crtEvt.data.createEvent.id);
    await API.graphql(
      graphqlOperation(messageEvent, {
        destinationNumbers: this.state.destinationNumbers,
        message: 'AWS Team Safe message sent by '+ Auth.user.attributes.name 
          + ': ' + '\' ' + eventMessage + ' \'' + " ------" + "RESPONSE REQUIRED: you will recieve an event ID along with this message, please copy and paste and separate it with a space in your response for it to be recorded, thank you." ,
        eventID: crtEvt.data.createEvent.id,
        alertManagerSetting: this.props.alertManagerSetting
      })
    );
  };

  handleAddPromoEvent = async (event) => {
    const {
      eventMessage,
      eventName,
      teamID
    } = this.state;
    const input = {
      managerName: Auth.user.attributes.name,
      managerEmail: Auth.user.attributes.email,
      managerPhone: Auth.user.attributes.phone_number,
      alertManagerSetting : this.props.alertManagerSetting,
      eventMessage,
      eventStart: new Date(),
      eventStatus: "Complete",
      eventName,
      teamID,

    };
    const crtEvt = await API.graphql(graphqlOperation(createEvent, { input }));
    this.props.eventHandler();
    console.log(crtEvt.data.createEvent.id);
    await API.graphql(
      graphqlOperation(messageEvent, {
        destinationNumbers: this.state.destinationNumbers,
        message: 'AWS Team Safe message sent by '+ Auth.user.attributes.name 
          + ': ' + '\' ' + eventMessage + ' \'' + " ------" + "No Response Needed, This message is for your knowledge" ,
        alertManagerSetting: this.props.alertManagerSetting
      })
    );
  };

 
  render() {
    const { teams } = this.state;
    const { teamID } = this.state;
    const { noResponseResendTime } = this.state;

    const teamOptions = teams.map((item) => ({
      key: item.id,
      text: item.teamName,
      value: item.id,
    }));
    const resendOptions = [
      {
        key: "30 Min",
        text: "30 Min",
        value: "30 Min",
      },
      {
        key: "60 Min",
        text: "60 Min",
        value: "60 Min",
      },
      {
        key: "120 Min",
        text: "120 Min",
        value: "120 Min",
      },
    ];
    if (this.props.alertManagerSetting ===  "TRANSACTIONAL"){
      return (
        <Form onSubmit={this.handleAddEvent}>
          <Form.Field>
            <label>Event Name</label>
            <input
              placeholder="Write the name of the event"
              onChange={this.handleChangeEventName}
            />
          </Form.Field>
  
          <label>Event End</label>
          <Calendar
            onChange={this.handleChangeEventEnd}
            value={this.state.eventEnd}
          />
          <input value={this.state.eventEnd} />
  
          <Form.Field>
            <label>Team Name</label>
            <Dropdown
              placeholder="Select one of your teams"
              selection
              onChange={this.handleChangeTeamID}
              options={teamOptions}
              value={teamID}
            />
          </Form.Field>
          <Form.Field>
          </Form.Field>
          <Form.Field>
            <label>Event Message</label>
            <input
              onChange={this.handleChangeEventMessage}
              placeholder="Your message to be sent out"
            />
          </Form.Field>
          <Form.Field>
            <label>Message Resend Time</label>
            <Dropdown
              placeholder="Select one of your teams"
              selection
              onChange={this.handleChangeNoResponseResendTime}
              options={resendOptions}
              value={noResponseResendTime}
            />
            <input value={noResponseResendTime}></input>
          </Form.Field>
          <Form.Field>
            <label>Positive Auto Reply</label>
            <input
              onChange={this.handleChangeAutoReplyPosMessage}
              placeholder="Auto reply message to positive responses"
            />
          </Form.Field>
          <Form.Field>
            <label>Negative Auto Reply</label>
            <input
              onChange={this.handleChangeAutoReplyNegMessage}
              placeholder="Auto reply message to negative responses"
            />
          </Form.Field>
          <Form.Field>
            <label>Positive Reply</label>
            <input
              onChange={this.handleChangePositiveResponse}
              placeholder="A positive message your team can select"
            />
          </Form.Field>
          <Form.Field>
            <label>Negative Reply</label>
            <input
              onChange={this.handleChangeNegativeResponse}
              placeholder="A negative message your team can select"
            />
          </Form.Field>
  
          <Button type="submit">Submit</Button>
        </Form>
      );
    }
    else if(this.props.alertManagerSetting === "PROMOTIONAL"){
      return (
        <Form onSubmit={this.handleAddPromoEvent}>
          <Form.Field>
            <label>Event Name</label>
            <input
              placeholder="Write the name of the event"
              onChange={this.handleChangeEventName}
            />
          </Form.Field>
          <Form.Field>
            <label>Team Name</label>
            <Dropdown
              placeholder="Select one of your teams"
              selection
              onChange={this.handleChangeTeamID}
              options={teamOptions}
              value={teamID}
            />
          </Form.Field>
          <Form.Field>
            <label>Event Message</label>
            <input
              onChange={this.handleChangeEventMessage}
              placeholder="Your message to be sent out"
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      );
    }
    
  }
}

export default CreateEventForm;
