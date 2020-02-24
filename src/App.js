import React,{Component,Fragment} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Navbar from './components/Navbar';
import Users from './users/Users';
import Search from './users/Search';
import './App.css';
import Axios from'axios';
import Alert from './components/Alert';
class App extends Component  {
  state={
    users:[],
    loading:false,
    alert:null
  }
  async componentDidMount(){
     await Axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_DASHBOARD_CLIENT_ID}&client_secret=${process.env.REACT_APP_DASHBOARD_CLIENT_SECRET}`).then(res => {
      console.log(process.env.REACT_APP_DASHBOARD_CLIENT_SECRET);
      if(res && res.data.length >0){
        this.setState({users:res.data,loading:true})
      }
    })
  }  
  SearchUser = async text => {
    console.log(text);
    await Axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_DASHBOARD_CLIENT_ID}&client_secret=${process.env.REACT_APP_DASHBOARD_CLIENT_SECRET}`).then(res => {
      console.log(res.data.items);
      if(res && res.data.items.length >0){
        this.setState({users:res.data.items,loading:true})
      }
    })
    console.log(this.state.users)
  }
  clearUser = () => {
      this.setState({users:[],loading:false})
      console.log(this.state.users);
  }
  setAlert = (msg,type) => {
    this.setState({alert:{msg,type}});
    setTimeout(() => this.setState({alert:null}),5000)
  }
  render(){
    const {users, loading} = this.state;
  return (
    <Router>
       <div>
       <Navbar title='Github Finder' icon='fab fa-github'/>
      <div className="container">
      <Alert alert ={this.state.alert}/>
     <Switch>
     <Route exact path='/' render={props => 
       <Fragment>
       <Search 
       SearchUser={this.SearchUser} 
       clearUser={this.clearUser} 
       showClear={this.state.users.length > 0 ? true : false} 
       setAlert={this.setAlert}/>
     <Users users ={users} loading ={loading}/>
       </Fragment>
     }/>
     </Switch>
      
      </div>
       </div>
       </Router>
  );
}
}

export default App;
