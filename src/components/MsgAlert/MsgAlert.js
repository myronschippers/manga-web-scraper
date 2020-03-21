import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Swal from 'sweetalert2';

class MsgAlert extends Component {
  render() {
    if (this.props.store.msgAlert.show) {
      Swal.fire({
        title: this.props.store.msgAlert.title,
        text: this.props.store.msgAlert.text,
        icon: 'error',
        confirmButtonText: 'CLOSE'
      }).then(() => {
        this.props.dispatch({
          type: 'CLOSE_ALERT',
        })
      });
    }
    return (
      <span>
      </span>
    );
  }
}

export default connect(mapStoreToProps('msgAlert'))(MsgAlert);
