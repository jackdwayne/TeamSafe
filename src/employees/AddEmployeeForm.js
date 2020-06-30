import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import {API, graphqlOperation} from 'aws-amplify'
import { createEmployee } from '../graphql/mutations'

class CreateTeamForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            hideForm : true,
          };
    
        this.handleAddEmp = this.handleAddEmp.bind(this);
    
      }

      
      handleChangeEmpName = event => this.setState({employeeName: event.target.value})
      handleChangeEmpEmail = event => this.setState({employeeEmail: event.target.value})
      handleChangeEmpPhone = event => this.setState({employeePhone: event.target.value})

      handleAddEmp = async event => {
        const {employeeName, employeeEmail, employeePhone} = this.state;
        const input = {name : employeeName, email: employeeEmail, phone: employeePhone}
        API.graphql(graphqlOperation(createEmployee, {input}))
        this.props.empHandler();

      }
    
    render(){

        return(
            <Form onSubmit={this.handleAddEmp}>
                <Form.Field>
                    <label>Employee Name</label>
                    <input onChange={this.handleChangeEmpName} placeholder='e.g. My Team' />
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