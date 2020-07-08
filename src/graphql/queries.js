/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const phoneForm = /* GraphQL */ `
  query PhoneForm(
    $firstName: String!
    $lastName: String!
    $destinationNumber: String!
    $source: String!
  ) {
    phoneForm(
      firstName: $firstName
      lastName: $lastName
      destinationNumber: $destinationNumber
      source: $source
    )
  }
`;
export const messageEvent = /* GraphQL */ `
  query MessageEvent($destinationNumbers: [String]!, $message: String!) {
    messageEvent(destinationNumbers: $destinationNumbers, message: $message)
  }
`;
export const getEmployee = /* GraphQL */ `
  query GetEmployee($id: ID!) {
    getEmployee(id: $id) {
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
export const listEmployees = /* GraphQL */ `
  query ListEmployees(
    $filter: ModelEmployeeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmployees(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getTeamMember = /* GraphQL */ `
  query GetTeamMember($id: ID!) {
    getTeamMember(id: $id) {
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
export const listTeamMembers = /* GraphQL */ `
  query ListTeamMembers(
    $filter: ModelTeamMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeamMembers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        employeeID
        employee {
          id
          email
          phone
          firstName
          lastName
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTeam = /* GraphQL */ `
  query GetTeam($id: ID!) {
    getTeam(id: $id) {
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
export const listTeams = /* GraphQL */ `
  query ListTeams(
    $filter: ModelTeamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
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
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
    }
  }
`;
export const getResponse = /* GraphQL */ `
  query GetResponse($id: ID!) {
    getResponse(id: $id) {
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
export const listResponses = /* GraphQL */ `
  query ListResponses(
    $filter: ModelResponseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResponses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        message
        eventID
        employee {
          id
          email
          phone
          firstName
          lastName
          createdAt
          updatedAt
        }
        responseTime
        responseType
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const membersByTeam = /* GraphQL */ `
  query MembersByTeam(
    $teamID: ID
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTeamMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    membersByTeam(
      teamID: $teamID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        employeeID
        employee {
          id
          email
          phone
          firstName
          lastName
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const membersByEmployee = /* GraphQL */ `
  query MembersByEmployee(
    $employeeID: ID
    $teamID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTeamMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    membersByEmployee(
      employeeID: $employeeID
      teamID: $teamID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        employeeID
        employee {
          id
          email
          phone
          firstName
          lastName
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const teamByManager = /* GraphQL */ `
  query TeamByManager(
    $managerEmail: String
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTeamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    teamByManager(
      managerEmail: $managerEmail
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const eventsByTeam = /* GraphQL */ `
  query EventsByTeam(
    $teamID: ID
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eventsByTeam(
      teamID: $teamID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const eventByManager = /* GraphQL */ `
  query EventByManager(
    $managerEmail: String
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eventByManager(
      managerEmail: $managerEmail
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const responsesByEvent = /* GraphQL */ `
  query ResponsesByEvent(
    $eventID: ID
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelResponseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    responsesByEvent(
      eventID: $eventID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        message
        eventID
        employee {
          id
          email
          phone
          firstName
          lastName
          createdAt
          updatedAt
        }
        responseTime
        responseType
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
