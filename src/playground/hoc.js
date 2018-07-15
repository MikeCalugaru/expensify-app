// Higher Order Component (HOC) - A component () that renders another component
// Reuse code
// Render hijacking
// Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      { props.isAdmin && <p>This is private info. Please don't share!</p>}
      <WrappedComponent {...props}/> 
    </div>
  );
};

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated ?
        (<WrappedComponent {...props} />) :
        (<form>
          <p>Please log-in</p>
          <input type='text' placeholder='Username' />
          <input type='password' placeholder='Password' />
        </form>)
      }
    </div>
  );  
};

const AdminInfo = withAdminWarning(Info);

const AuthInfo = requireAuthentication(Info);

//ReactDOM.render(<AdminInfo isAdmin={true} info='These are the details' />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} isAdmin={true} info='These are the details' />, document.getElementById('app'));