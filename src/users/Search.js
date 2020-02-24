import React from 'react';
import PropTypes from 'prop-types'


  

class Search extends React.Component {
  state = {
    text:''
  };

  static propTypes ={
    searchUsers:PropTypes.func.isRequired,
    clearUser:PropTypes.func.isRequired,
    showClear:PropTypes.bool.isRequired,
    setAlert:PropTypes.func.isRequired
  }
  onChange = (e) => {
    this.setState({text:e.target.value});
  }
 onSubmit = (e) => {
  e.preventDefault();
  if(this.state.text === '' ){
    this.props.setAlert('please enter something','light')
  }else {
  this.props.SearchUser(this.state.text);
  this.setState({text:''})
  }
 }
render(){
  const {text} =this.state;
  return (
    <div>
      <form onSubmit={this.onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={text}
          onChange={this.onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
     
      {this.props.showClear &&  <button
          className='btn btn-light btn-block'
          onClick={this.props.clearUser}
        >
          Clear
        </button>}
  
    </div>
  );
};
}

export default Search;