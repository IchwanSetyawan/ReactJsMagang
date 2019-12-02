import React, { Component } from 'react';
import './App.css';

import { Link } from 'react-router-dom';
import { Table, TableRow, TableCell, Button, TableHead } from '@material-ui/core';

class Homepage extends Component {

    state = {
        title: '',
        name: '',
        salary: ''
    }

    onChange = (name) => e => this.setState({ [name]: e.target.value });

    render() {
        return (
            <div className="App">
                <h2>ReactJS Simple CRUD</h2>
                <form className="myForm" onSubmit={(e) => this.props.onBuat(e, this.state.name, this.state.salary)}>
                    <input type="text" placeholder="masukkan nama" value={this.state.name} onChange={this.onChange('name')} className="formField" />
                    <input type="text" placeholder="Rp.salary" value={this.state.salary} onChange={this.onChange('salary')} className="formField" />
                    <button type="submit" className="myButton">Submit</button>
                </form>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Employee Name</TableCell>
                        <TableCell>Employee Salary</TableCell>
                        <TableCell colSpan="2">Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    {this.props.data && this.props.data.map((data) =>
                        <TableRow key={data.id}>
                            <TableCell>
                                {data.id}
                            </TableCell>
                            <TableCell>
                                {data.employee_name}
                            </TableCell>
                            <TableCell>
                                {data.employee_salary}
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => this.props.onHapus(data.id)} variant="contained" color="secondary" >remove </Button>
                            </TableCell>
                            <TableCell>
                                <Link component={Button} to={`/edit/${data.id}`} variant="contained" className="myListButtonEdit"> edit </Link>
                            </TableCell>
                        </TableRow>
                    )}
                </Table>
            </div>
        )
    }
}

export default Homepage;
