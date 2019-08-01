import React, { Component } from 'react'
import Modal from './Modal';

class ModalBox extends Component {
    constructor (props) {
      super(props)
      this.state = {
          show:false
      }
    }

    showModal = () => {
        this.setState({ show: true });
      };
    
    hideModal = () => {
        this.setState({ show: false });
      };

    render () {
        return (
            <div>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <p>{this.props.pushComp}</p>
                    <p>Data</p>
                </Modal>
                <button type="button" onClick={this.showModal}>
                    open
                </button>
            </div>
        )
    }
}

export default ModalBox