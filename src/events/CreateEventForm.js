import React, { Component } from "react";
import { Button, Form, Dropdown, Checkbox } from "semantic-ui-react";
import { API, graphqlOperation } from "aws-amplify";
import { createEvent } from "../graphql/mutations";
import { teamByManager } from "../graphql/queries";
import { Auth } from "aws-amplify";
import Calendar from "react-calendar";
import * as AWS from 'aws-sdk'

function sendMessage() {
  var AWS = require('aws-sdk');
  // Set region
  AWS.config.update({region: 'us-east-1'});

  // Create publish parameters
  var params = {
    Message: 'TEXT_MESSAGE', /* required */
    PhoneNumber: '3605181458',
  };

  // Create promise and SNS service object
  var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

  // Handle promise's fulfilled/rejected states
  publishTextPromise.then(
    function(data) {
      console.log("MessageID is " + data.MessageId);
    }).catch(
      function(err) {
      console.error(err, err.stack);
    });
}

class CreateEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideForm: true,
      teams: [],
      eventEnd: new Date(),
      params: {},
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

  handleChangeManagerName = (event) =>
    this.setState({ managerName: event.target.value });

  handleChangeManagerEmail = (event) =>
    this.setState({ managerEmail: event.target.value });

  handleChangeManagerPhone = (event) =>
    this.setState({ managerPhone: event.target.value });

  handleChangeAlertManagerSetting = (event, { value }) =>
    this.setState({ alertManagerSetting: value });

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

  handleChangeEventStart = (event) =>
    this.setState({ eventStart: event.target.value });

  handleChangeEventEnd = (eventEnd) => this.setState({ eventEnd });

  handleChangeNoResponseResendTime = (event, { value }) =>
    this.setState({ noResponseResendTime: value });

  handleChangeTeamID = (event, { value }) => this.setState({ teamID: value });

  handleChangeLongCode = (event) =>
    this.setState({ longCode: event.target.value });

  handleTeamClick = (e, { value }) => this.setState({ value });

  handleAddEvent = async (event) => {
    const {
      managerEmail,
      managerName,
      managerPhone,
      alertManagerSetting,
      eventMessage,
      autoReplyPosMessage,
      autoReplyNegMessage,
      positiveResponse,
      negativeResponse,
      eventEnd,
      noResponseResendTime,
      eventStatus,
      eventName,
      teamID,
      longCode,
    } = this.state;
    const input = {
      managerName: Auth.user.attributes.name,
      managerEmail: Auth.user.attributes.email,
      managerPhone: Auth.user.attributes.phone_number,
      alertManagerSetting,
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
    await API.graphql(graphqlOperation(createEvent, { input }));
    sendMessage();
    this.props.eventHandler();
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
        <input value={teamID} />
        <Form.Field>
          <label>Alert Manager?</label>
        </Form.Field>
        <Form.Group>
          <Form.Field>
            <Checkbox
              radio
              label="Yes"
              name="checkboxRadioGroup"
              value="Yes"
              checked={this.state.alertManagerSetting === "Yes"}
              onChange={this.handleChangeAlertManagerSetting}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label="No"
              name="checkboxRadioGroup"
              value="No"
              checked={this.state.alertManagerSetting === "No"}
              onChange={this.handleChangeAlertManagerSetting}
            />
          </Form.Field>
        </Form.Group>
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
}

export default CreateEventForm;
