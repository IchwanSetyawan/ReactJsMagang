import React from 'react';
import './App.css'
import axios from 'axios'
import { withRouter, Redirect } from 'react-router-dom'

class Edit extends React.Component {
    state = {
        employee_name: '',
        employee_salary: '',
        isRedirect: false,
    }
    componentDidMount() {
        console.log({ param: this.props.match });
        const { match: { params } } = this.props;
        axios.get('http://dummy.restapiexample.com/api/v1/employee/' + params.id)
            .then(res => this.setState({ employee_name: res.data.employee_name, employee_salary: res.data.employee_salary }))
            .catch(err => console.error(err));
    }

    onChange = (name) => e => this.setState({ [name]: e.target.value });
    render() {
        return !this.state.isRedirect ?
            <form className="myForm">
                <input type="text" value={this.state.employee_name} onChange={this.onChange('employee_name')} placeholder="masukkan nama" className="formField" />
                <input type="text" value={this.state.employee_salary} onChange={this.onChange('employee_salary')} placeholder="Rp.salary" className="formField" />
                <button onClick={(e) => {
                    this.props.onEdit(this.props.match.params.id, this.state.employee_name, this.state.employee_salary);
                    this.setState({ isRedirect: true });
                }} className="myButton">submit </button>
            </form>
            : <Redirect to="/" />
    }
}

export default withRouter(Edit);