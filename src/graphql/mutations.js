/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEmployee = /* GraphQL */ `
  mutation CreateEmployee(
    $input: CreateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    createEmployee(input: $input, condition: $condition) {
      id
      email
      phone
      firstName
      lastName
      memberOfTeam {
        items {
          id
          employeeID
          teamID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateEmployee = /* GraphQL */ `
  mutation UpdateEmployee(
    $input: UpdateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    updateEmployee(input: $input, condition: $condition) {
      id
      email
      phone
      firstName
      lastName
      memberOfTeam {
        items {
          id
          employeeID
          teamID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteEmployee = /* GraphQL */ `
  mutation DeleteEmployee(
    $input: DeleteEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    deleteEmployee(input: $input, condition: $condition) {
      id
      email
      phone
      firstName
      lastName
      memberOfTeam {
        items {
          id
          employeeID
          teamID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createTeamMember = /* GraphQL */ `
  mutation CreateTeamMember(
    $input: CreateTeamMemberInput!
    $condition: ModelTeamMemberConditionInput
  ) {
    createTeamMember(input: $input, condition: $condition) {
      id
      employeeID
      employee {
        id
        email
        phone
        firstName
        lastName
        memberOfTeam {
          nextToken
        }
        createdAt
        updatedAt
      }
      teamID
      team {
        id
        managerName
        managerEmail
        managerPhone
        teamName
        teamMembers {
          nextToken
        }
        events {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateTeamMember = /* GraphQL */ `
  mutation UpdateTeamMember(
    $input: UpdateTeamMemberInput!
    $condition: ModelTeamMemberConditionInput
  ) {
    updateTeamMember(input: $input, condition: $condition) {
      id
      employeeID
      employee {
        id
        email
        phone
        firstName
        lastName
        memberOfTeam {
          nextToken
        }
        createdAt
        updatedAt
      }
      teamID
      team {
        id
        managerName
        managerEmail
        managerPhone
        teamName
        teamMembers {
          nextToken
        }
        events {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteTeamMember = /* GraphQL */ `
  mutation DeleteTeamMember(
    $input: DeleteTeamMemberInput!
    $condition: ModelTeamMemberConditionInput
  ) {
    deleteTeamMember(input: $input, condition: $condition) {
      id
      employeeID
      employee {
        id
        email
        phone
        firstName
        lastName
        memberOfTeam {
          nextToken
        }
        createdAt
        updatedAt
      }
      teamID
      team {
        id
        managerName
        managerEmail
        managerPhone
        teamName
        teamMembers {
          nextToken
        }
        events {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createTeam = /* GraphQL */ `
  mutation CreateTeam(
    $input: CreateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    createTeam(input: $input, condition: $condition) {
      id
      managerName
      managerEmail
      managerPhone
      teamName
      teamMembers {
        items {
          id
          employeeID
          teamID
          createdAt
          updatedAt
        }
        nextToken
      }
      events {
        items {
          id
          managerName
          managerEmail
          managerPhone
          alertManagerSetting
          eventMessage
          autoReplyPosMessage
          autoReplyNegMessage
          positiveResponse
          negativeResponse
          eventStart
          eventEnd
          noResponseResendTime
          eventStatus
          eventName
          teamID
          longCode
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateTeam = /* GraphQL */ `
  mutation UpdateTeam(
    $input: UpdateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    updateTeam(input: $input, condition: $condition) {
      id
      managerName
      managerEmail
      managerPhone
      teamName
      teamMembers {
        items {
          id
          employeeID
          teamID
          createdAt
          updatedAt
        }
        nextToken
      }
      events {
        items {
          id
          managerName
          managerEmail
          managerPhone
          alertManagerSetting
          eventMessage
          autoReplyPosMessage
          autoReplyNegMessage
          positiveResponse
          negativeResponse
          eventStart
          eventEnd
          noResponseResendTime
          eventStatus
          eventName
          teamID
          longCode
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteTeam = /* GraphQL */ `
  mutation DeleteTeam(
    $input: DeleteTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    deleteTeam(input: $input, condition: $condition) {
      id
      managerName
      managerEmail
      managerPhone
      teamName
      teamMembers {
        items {
          id
          employeeID
          teamID
          createdAt
          updatedAt
        }
        nextToken
      }
      events {
        items {
          id
          managerName
          managerEmail
          managerPhone
          alertManagerSetting
          eventMessage
          autoReplyPosMessage
          autoReplyNegMessage
          positiveResponse
          negativeResponse
          eventStart
          eventEnd
          noResponseResendTime
          eventStatus
          eventName
          teamID
          longCode
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
      id
      managerName
      managerEmail
      managerPhone
      alertManagerSetting
      eventMessage
      autoReplyPosMessage
      autoReplyNegMessage
      positiveResponse
      negativeResponse
      eventStart
      eventEnd
      noResponseResendTime
      eventStatus
      eventName
      teamID
      team {
        id
        managerName
        managerEmail
        managerPhone
        teamName
        teamMembers {
          nextToken
        }
        events {
          nextToken
        }
        createdAt
        updatedAt
      }
      longCode
      responses {
        items {
          id
          message
          phone
          eventID
          employeeID
          responseTime
          responseType
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
      id
      managerName
      managerEmail
      managerPhone
      alertManagerSetting
      eventMessage
      autoReplyPosMessage
      autoReplyNegMessage
      positiveResponse
      negativeResponse
      eventStart
      eventEnd
      noResponseResendTime
      eventStatus
      eventName
      teamID
      team {
        id
        managerName
        managerEmail
        managerPhone
        teamName
        teamMembers {
          nextToken
        }
        events {
          nextToken
        }
        createdAt
        updatedAt
      }
      longCode
      responses {
        items {
          id
          message
          phone
          eventID
          employeeID
          responseTime
          responseType
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
      id
      managerName
      managerEmail
      managerPhone
      alertManagerSetting
      eventMessage
      autoReplyPosMessage
      autoReplyNegMessage
      positiveResponse
      negativeResponse
      eventStart
      eventEnd
      noResponseResendTime
      eventStatus
      eventName
      teamID
      team {
        id
        managerName
        managerEmail
        managerPhone
        teamName
        teamMembers {
          nextToken
        }
        events {
          nextToken
        }
        createdAt
        updatedAt
      }
      longCode
      responses {
        items {
          id
          message
          phone
          eventID
          employeeID
          responseTime
          responseType
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createResponse = /* GraphQL */ `
  mutation CreateResponse(
    $input: CreateResponseInput!
    $condition: ModelResponseConditionInput
  ) {
    createResponse(input: $input, condition: $condition) {
      id
      message
      phone
      eventID
      event {
        id
        managerName
        managerEmail
        managerPhone
        alertManagerSetting
        eventMessage
        autoReplyPosMessage
        autoReplyNegMessage
        positiveResponse
        negativeResponse
        eventStart
        eventEnd
        noResponseResendTime
        eventStatus
        eventName
        teamID
        team {
          id
          managerName
          managerEmail
          managerPhone
          teamName
          createdAt
          updatedAt
        }
        longCode
        responses {
          nextToken
        }
        createdAt
        updatedAt
      }
      employee {
        id
        email
        phone
        firstName
        lastName
        memberOfTeam {
          nextToken
        }
        createdAt
        updatedAt
      }
      employeeID
      responseTime
      responseType
      createdAt
      updatedAt
    }
  }
`;
export const updateResponse = /* GraphQL */ `
  mutation UpdateResponse(
    $input: UpdateResponseInput!
    $condition: ModelResponseConditionInput
  ) {
    updateResponse(input: $input, condition: $condition) {
      id
      message
      phone
      eventID
      event {
        id
        managerName
        managerEmail
        managerPhone
        alertManagerSetting
        eventMessage
        autoReplyPosMessage
        autoReplyNegMessage
        positiveResponse
        negativeResponse
        eventStart
        eventEnd
        noResponseResendTime
        eventStatus
        eventName
        teamID
        team {
          id
          managerName
          managerEmail
          managerPhone
          teamName
          createdAt
          updatedAt
        }
        longCode
        responses {
          nextToken
        }
        createdAt
        updatedAt
      }
      employee {
        id
        email
        phone
        firstName
        lastName
        memberOfTeam {
          nextToken
        }
        createdAt
        updatedAt
      }
      employeeID
      responseTime
      responseType
      createdAt
      updatedAt
    }
  }
`;
export const deleteResponse = /* GraphQL */ `
  mutation DeleteResponse(
    $input: DeleteResponseInput!
    $condition: ModelResponseConditionInput
  ) {
    deleteResponse(input: $input, condition: $condition) {
      id
      message
      phone
      eventID
      event {
        id
        managerName
        managerEmail
        managerPhone
        alertManagerSetting
        eventMessage
        autoReplyPosMessage
        autoReplyNegMessage
        positiveResponse
        negativeResponse
        eventStart
        eventEnd
        noResponseResendTime
        eventStatus
        eventName
        teamID
        team {
          id
          managerName
          managerEmail
          managerPhone
          teamName
          createdAt
          updatedAt
        }
        longCode
        responses {
          nextToken
        }
        createdAt
        updatedAt
      }
      employee {
        id
        email
        phone
        firstName
        lastName
        memberOfTeam {
          nextToken
        }
        createdAt
        updatedAt
      }
      employeeID
      responseTime
      responseType
      createdAt
      updatedAt
    }
  }
`;
