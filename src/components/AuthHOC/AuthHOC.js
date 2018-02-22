import React from "react";
import PropTypes from "prop-types";
import { auth } from "../../firebase";

const authHOC = Component => {
  class AuthHOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null,
        authLoading: true
      };
    }

    getChildContext() {
      return {
        authUser: this.state.authUser,
        authLoading: this.state.authLoading
      };
    }

    componentDidMount() {
      // onAuthStateChanged fires on reloads if user is still
      // logged in
      this.authListener = auth.onAuthStateChanged(authUser => {
        if (authUser) {
          this.setState({ authUser, authLoading: false });
        } else {
          this.setState({ authUser: null, authLoading: false });
        }
      });
    }

    componentWillUnmount() {
      // Remove listener
      this.authListener();
    }

    render() {
      return <Component />;
    }
  }

  AuthHOC.childContextTypes = {
    authUser: PropTypes.object,
    authLoading: PropTypes.bool
  };

  return AuthHOC;
};

export default authHOC;
