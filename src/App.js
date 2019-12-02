import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';

import Homepage from './pages/Homepage';
import Edit from './pages/Edit';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      act: 0,
      index: '',
      datas: [],
      id: '',
    }
  }

  componentDidMount() {
    // this.refs.name.focus();
    axios.get('http://dummy.restapiexample.com/api/v1/employees')
      .then(res => {
        this.setState({ datas: res.data })
      })

  }

  //funtion button submit
  fSubmit = (e, employee_name, employee_salary) => {
    e.preventDefault();
    console.log(e);

    let datas = this.state.datas;

    const idx = this.state.index;

    axios.post('http://dummy.restapiexample.com/api/v1/create', {
      id: '', name: employee_name, salary: employee_salary, age: ''
    })
      .then(result => {
        if (!result) {
          console.log('gagal menambah data')
        } else {
          console.log('berhasil menambah data' + idx)
          window.location.reload();
        }
      })

    this.setState({
      datas: datas,
    });

  }


  //function button remove
  fRemove = (idx) => {
    axios.delete('http://dummy.restapiexample.com/api/v1/delete/' + idx)
      .then(function (result) {
        if (!result) {
          console.log('gagal menghapus data')
        } else {
          console.log('berhasil menghapus data' + idx)
          window.location.reload()
        }

      })
  }

  //function button edit
  fEdit = (idx, employee_name, employee_salary) => {
    axios.put('http://dummy.restapiexample.com/api/v1/update/' + idx, {
      id: idx, name: employee_name, salary: employee_salary
    })
      .then(result => {
        if (!result) {
          console.log('gagal memperbarui data')
        } else {
          console.log('berhasil memperbarui data' + idx)
          window.location.reload()
        }
      });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage onBuat={this.fSubmit} data={this.state.datas} onHapus={this.fRemove} />
          </Route>
          <Route exact path="/edit/:id" >
            <Edit onEdit={this.fEdit} />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
