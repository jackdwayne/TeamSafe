/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEmployee = /* GraphQL */ `
  subscription OnCreateEmployee {
    onCreateEmployee {
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
export const onUpdateEmployee = /* GraphQL */ `
  subscription OnUpdateEmployee {
    onUpdateEmployee {
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
export const onDeleteEmployee = /* GraphQL */ `
  subscription OnDeleteEmployee {
    onDeleteEmployee {
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
export const onCreateTeamMember = /* GraphQL */ `
  subscription OnCreateTeamMember {
    onCreateTeamMember {
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
export const onUpdateTeamMember = /* GraphQL */ `
  subscription OnUpdateTeamMember {
    onUpdateTeamMember {
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
export const onDeleteTeamMember = /* GraphQL */ `
  subscription OnDeleteTeamMember {
    onDeleteTeamMember {
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
export const onCreateTeam = /* GraphQL */ `
  subscription OnCreateTeam {
    onCreateTeam {
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
export const onUpdateTeam = /* GraphQL */ `
  subscription OnUpdateTeam {
    onUpdateTeam {
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
export const onDeleteTeam = /* GraphQL */ `
  subscription OnDeleteTeam {
    onDeleteTeam {
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
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
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
          eventID
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent {
    onUpdateEvent {
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
          eventID
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent {
    onDeleteEvent {
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
          eventID
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
export const onCreateResponse = /* GraphQL */ `
  subscription OnCreateResponse {
    onCreateResponse {
      id
      message
      eventID
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
      responseTime
      responseType
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateResponse = /* GraphQL */ `
  subscription OnUpdateResponse {
    onUpdateResponse {
      id
      message
      eventID
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
      responseTime
      responseType
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteResponse = /* GraphQL */ `
  subscription OnDeleteResponse {
    onDeleteResponse {
      id
      message
      eventID
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
      responseTime
      responseType
      createdAt
      updatedAt
    }
  }
`;
