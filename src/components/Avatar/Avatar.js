import React from "react";
import { Link } from "react-router-dom";
import autoBind from "react-autobind";
import { db, auth } from "../../firebase";
import "./index.css";

import cx from "classnames";

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      newDrawings: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const uid = nextProps.user ? nextProps.user.uid : false;
    if(uid) {
      db.ref(`users/${uid}/drawings`).orderByChild('viewed').equalTo(false).on('value', snapshot => {
        const newDrawings = snapshot.numChildren();
        this.setState({newDrawings})
      })
    }
  }

  render() {
    const avatarClass = cx({
      avatar: true,
      "--visible": this.props.isVisible
    });

    const notificationCount = this.state.newDrawings;

    const notificationClass = cx({
      "avatar__notification": true,
      "--visible": (notificationCount > 0)
    });

    const name = (this.props.user && this.props.user.displayName) || "?";

    return (
      <Link to="/all-drawings" className={avatarClass}>
        <span className={notificationClass}>{notificationCount}</span>
        {name.charAt(0)}
      </Link>
    )
  };
}

export default Avatar;
