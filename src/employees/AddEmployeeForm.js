import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import {API, graphqlOperation} from 'aws-amplify'
import { createEmployee } from '../graphql/mutations'
import {phoneForm} from '../graphql/queries'




class CreateTeamForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            hideForm : true,
          };
    
        this.handleAddEmp = this.handleAddEmp.bind(this);
    
      }

      
      handleChangeEmpFirstName = event => this.setState({employeeFirstName: event.target.value})
      handleChangeEmpLastName = event => this.setState({employeeLastName: event.target.value})
      handleChangeEmpEmail = event => this.setState({employeeEmail: event.target.value})
      handleChangeEmpPhone = event => this.setState({employeePhone: event.target.value})

      handleAddEmp = async event => {
        const {employeeFirstName, employeeLastName, employeeEmail, employeePhone} = this.state;
        const input = {firstName : employeeFirstName, lastName : employeeLastName, email: employeeEmail, phone: employeePhone}
        await API.graphql(graphqlOperation(createEmployee, {input}))
        await API.graphql(graphqlOperation(phoneForm, {firstName: employeeFirstName, lastName: employeeLastName, destinationNumber: employeePhone, source: "registration"}))
            .then(result => console.log(result.data.phoneForm))
            .catch(error => console.log(error))
        this.props.empHandler();

      }
    
    render(){

        return(
            <Form onSubmit={this.handleAddEmp}>
                <Form.Field>
                    <label>Employee First Name</label>
                    <input onChange={this.handleChangeEmpFirstName} placeholder='e.g. My Team' />
                </Form.Field>
                <Form.Field>
                    <label>Employee Last Name</label>
                    <input onChange={this.handleChangeEmpLastName} placeholder='e.g. My Team' />
                </Form.Field>
                <Form.Field>
                    <label>Employee Email</label>
                    <input onChange={this.handleChangeEmpEmail} placeholder='e.g example@amazon.com'/>
                </Form.Field>
                <Form.Field>
                    <label>Employee Phone</label>
                    <input onChange={this.handleChangeEmpPhone} placeholder= 'Phone #'/>
                </Form.Field>
                <Button type='submit'>Submit</Button>
        </Form>
        )
    }
    
}

export default CreateTeamForm