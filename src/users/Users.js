import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserItem from './UserItem';
const Spinner = React.lazy(() => import('../components/Spinner'))
 class Users extends Component {
 
  render() {
    const {users} = this.props;
    console.log(users);
    return (
      <React.Suspense fallback ={<Spinner/>}>
      <div style={userStyle}>
        {users.map((user,i) => 
           <UserItem key={user.id} user ={user}/> 
         )}
        
      </div>
      </React.Suspense>
    );
  }
}
const userStyle = {
  display:'grid',
  gridTemplateColumns:'repeat(3,1fr)',
  gridGap:'1rem'
}
Users.propTypes = {
  users:PropTypes.array.isRequired
}
export default Users;
