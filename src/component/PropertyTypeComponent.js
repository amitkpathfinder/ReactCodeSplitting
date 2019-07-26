import React, { Component } from 'react';
import './style.css';

class PropertyTypeComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
                        activeDiv:''
                     }
    }

    handleClick = (myDiv) => {
       this.setState({
          activeDiv: myDiv
       }, function() {
           console.log(this.state.activeDiv, 'is Active');
       });
    }

    render() {

        let items = ['Apartment/Flat',
                    'House / Villa',
                    'Plot / Land',
                    'Builder Floor',
                    'Farm House',
                    'Serviced Apartment',
                    'Studio Apartment'
                    ];

      let putHTML = <div className="pTypes">
                             {items.map((a,index)=>{
                                 return (
                                      <div key={index} onClick={() => this.handleClick(a)} 
                                      className= { this.state.activeDiv === a ? "active" : ""}>
                                      {a}
                                      </div>
                                 );
                              })}
                    </div>


        return (
            <>
                <div className="PTCPnt">
                	<div className="heading">Property Type</div>
                	<div className="pTypes">
                        <div onClick={() => this.handleClick('Flat')} className= { this.state.activeDiv === 'Flat' ? "positive active" : "positive"}>Flat</div>
                        <div onClick={() => this.handleClick('Land')} className= { this.state.activeDiv === 'Land' ? "neutral active" : "neutral"}>Land</div>
                        <div onClick={() => this.handleClick('Builder Floor')} className= { this.state.activeDiv === 'Builder Floor' ? "negative active" : "negative"}>Builder Floor</div>
                        <div onClick={() => this.handleClick('Studio')} className= { this.state.activeDiv === 'Studio' ? "negative active" : "negative"}>Studio</div>
                    </div>
                    {putHTML}
                </div>
            </>
        );
    }
}

export default PropertyTypeComponent;
