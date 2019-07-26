import React, { Component } from 'react';
import ToggleBasedView1 from './ToggleBasedView1';
import ToggleBasedView2 from './ToggleBasedView2';
import './style.css';

class PropertyTypeComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
                        toggleSwitch:false
                     }
    }

    handleClick() {
       this.setState({
          toggleSwitch: !this.state.toggleSwitch
       }, function() {
           console.log('State is',this.state.toggleSwitch);
       });
    }

    render() {

        return (
            <>
                <div onClick={() => this.handleClick()} 
                        className= { this.state.toggleSwitch ? "ToggleButton on" : "ToggleButton" }>
                            <span>Commercial</span>
                            <span></span>
                </div>
                { this.state.toggleSwitch ? <ToggleBasedView1/> : <ToggleBasedView2/>}
            </>
        );
    }
}

export default PropertyTypeComponent;
