import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import {API, graphqlOperation} from 'aws-amplify'
import { updateEmployee } from '../graphql/mutations'
import {phoneForm} from '../graphql/queries'




class UpdateEmployeeForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            hideForm : true,
            employeeFirstName: this.props.firstName,
            employeeLastName: this.props.lastName,
            employeePhone: this.props.phone,
            employeeEmail: this.props.email
          };
    
        this.handleUpdateEmp = this.handleUpdateEmp.bind(this);
    
      }

      
      handleChangeEmpFirstName = event => this.setState({employeeFirstName: event.target.value})
      handleChangeEmpLastName = event => this.setState({employeeLastName: event.target.value})
      handleChangeEmpEmail = event => this.setState({employeeEmail: event.target.value})
      handleChangeEmpPhone = event => this.setState({employeePhone: event.target.value})

      handleUpdateEmp = async event => {
        const {employeeFirstName, employeeLastName, employeeEmail, employeePhone} = this.state;
        const input = {id: this.props.id ,firstName : employeeFirstName, lastName : employeeLastName, email: employeeEmail, phone: employeePhone}
        await API.graphql(graphqlOperation(updateEmployee, {input}))
        this.props.updateHandler();

      }
    
    render(){

        return(
            <Form onSubmit={this.handleUpdateEmp}>
                <Form.Field>
                    <label>Employee First Name</label>
                    <input onChange={this.handleChangeEmpFirstName} placeholder={this.state.employeeFirstName} />
                </Form.Field>
                <Form.Field>
                    <label>Employee Last Name</label>
                    <input onChange={this.handleChangeEmpLastName} placeholder={this.state.employeeLastName} />
                </Form.Field>
                <Form.Field>
                    <label>Employee Email</label>
                    <input onChange={this.handleChangeEmpEmail} placeholder={this.state.employeeEmail}/>
                </Form.Field>
                <Form.Field>
                    <label>Employee Phone</label>
                    <input onChange={this.handleChangeEmpPhone} placeholder={this.state.employeePhone}/>
                </Form.Field>
                <Button type='submit'>Submit</Button>
        </Form>
        )
    }
    
}

export default UpdateEmployeeForm