import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { API, graphqlOperation } from "aws-amplify";
import { createEmployee } from "../graphql/mutations";
import { phoneForm } from "../graphql/queries";
import PhoneInput, {isPossiblePhoneNumber} from "react-phone-number-input";
import 'react-phone-number-input/style.css'

function AddEmployeeForm ({empHandler}) {

    const[employeeFirstName, setEmployeeFirstName] = useState()
    const[employeeLastName, setEmployeeLastName] = useState()
    const[employeeEmail, setEmployeeEmail] = useState()
    const[employeePhone, setEmployeePhone] = useState()

    const handleAddEmp = async (event) => {
        if (isPossiblePhoneNumber(employeePhone) === true) {
            await API.graphql(graphqlOperation(createEmployee, { input:{ firstName: employeeFirstName,
                lastName: employeeLastName,
                email: employeeEmail,
                phone: employeePhone} }));
            await API.graphql(
            graphqlOperation(phoneForm, {
                firstName: employeeFirstName,
                lastName: employeeLastName,
                destinationNumber: employeePhone,
                source: "registration",
            })
            )
            .then((result) => console.log(result.data.phoneForm))
            .catch((error) => console.log(error));
            empHandler();
        }
        else{
            alert("Phone number is not possible, retry 10 digit phone number.")
        }
        
  };

    return (
      <Form onSubmit={()=>handleAddEmp()}>
        <Form.Field>
          <label>Employee First Name</label>
          <input
            value={employeeFirstName}
            onChange={e => setEmployeeFirstName(e.target.value)}
            placeholder="e.g. My Team"
          />
        </Form.Field>
        <Form.Field>
          <label>Employee Last Name</label>
          <input
            value={employeeLastName}
            onChange={e => setEmployeeLastName(e.target.value)}
            placeholder="e.g. My Team"
          />
        </Form.Field>
        <Form.Field>
          <label>Employee Email</label>
          <input
            value={employeeEmail}
            onChange={e => setEmployeeEmail(e.target.value)}
            placeholder="e.g example@amazon.com"
          />
        </Form.Field>
        <Form.Field>
          <label>Employee Phone</label>
          <PhoneInput
            placeholder="Enter phone number"
            value={employeePhone}
            onChange={setEmployeePhone}
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    );
}

export default AddEmployeeForm;
