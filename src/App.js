import React, { Component } from 'react';
import './App.css';
import axios from 'axios';



class App extends Component {

  constructor(props){
    super(props);
    this.state={
      title: 'ReactJS Simple CRUD',
      act: 0,
      index: '',
      datas: [],
      id: '',
      employee_name: '',
      employee_salary:''      
    }
  } 

  componentDidMount(){
    // this.refs.name.focus();
    axios.get('http://dummy.restapiexample.com/api/v1/employees')
    .then(res => {
      this.setState({datas: res.data})           
    })
    
  }

  //funtion button submit
  fSubmit = (e) =>{
    e.preventDefault();
    console.log('berhasil submit!');

    let datas = this.state.datas;
    let employee_salary = this.refs.salary.value;
    let employee_name = this.refs.name.value;

    const idx = this.state.index;

    if(this.state.act === 0){   //new
              
        axios.post('http://dummy.restapiexample.com/api/v1/create', {
          id: '', name: employee_name, salary:employee_salary, age: ''
        })
        .then(result =>{
          if(!result){
            console.log('gagal menambah data')
          }else{
            console.log('berhasil menambah data' + idx)      
            window.location.reload();     
          }
        })
      
      
    }else{
      
                           //update
      axios.put('http://dummy.restapiexample.com/api/v1/update/'+idx, {
        id:idx, name:employee_name, salary:employee_salary
      })
      .then(result =>{
        if(!result){
          console.log('gagal memperbarui data')
        }else{
          console.log('berhasil memperbarui data' + idx)
          window.location.reload()      
        }
      })
    }    

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  }


  //function button remove
  fRemove = (idx) => {
    axios.delete('http://dummy.restapiexample.com/api/v1/delete/' + idx)
    .then(function (result){
      if(!result){
        console.log('gagal menghapus data')
      }else{
        console.log('berhasil menghapus data' + idx)
        window.location.reload()      
      }
      
    })

  }




  //function button edit
  fEdit = (idx) => {
    axios.get('http://dummy.restapiexample.com/api/v1/employee/'+idx)
    .then(res => {
      this.setState({
        id: res.data.id,        
        employee_name: res.data.employee_name,
        employee_salary: res.data.employee_salary                
      })
      this.refs.name.value = this.state.employee_name;
      this.refs.salary.value = this.state.employee_salary;
      this.setState({
        act: 1,
        index: idx
      });
      console.log(res.data.id)
      console.log('Edit data '+idx)
    })
  }  

  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder="masukkan nama" className="formField" />
          <input type="text" ref="salary" placeholder="Rp.salary" className="formField" />
          <button onClick={(e)=>this.fSubmit(e)} className="myButton">submit </button>
        </form>
        <pre>   

          {datas.map((data) =>
            <li key={data.id} className="myList">
              {data.id}, {data.employee_name}, {data.employee_salary}
              <button onClick={()=>this.fRemove(data.id)} className="myListButtonRemove">remove </button>
              <button onClick={()=>this.fEdit(data.id)} className="myListButtonEdit">edit </button>
            </li>
          )}
        </pre>
      </div>
    );
  }
}

export default App;
