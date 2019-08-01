import React, { Component } from 'react';
import CarouselCustomInput from './CarouselCustomInput';

class CarouselCustom extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        	carouselCards:[{id: "1", name: "First"},{id: "2", name: "Second"},{id: "3", name: "Third"},{id: "4", name: "Fourth"}],
        	rowStyle1:{},        
        	counter:0
        }
    }

    // componentDidMount = () => {
    componentWillMount = () => {
    	if(this.props.url!=undefined){
	    	const url = this.props.url;
			fetch(url)
	  				.then(response => response.json())
						  .then(data => {    
						    				this.setState({carouselCards: data.records});
						    				console.log('Fetch Reacords----->',this.state.carouselCards);
						  				});
		}
		else{
			this.setState({carouselCards: this.props.data});
		}
    }

    getImageContent = (event) => {
    	console.log("Get Image Content-------------> ", event.target.getAttribute('name'));
    }

    slideInfo = () => {

    	const slidesData = {
    				getCardListLength: this.state.carouselCards.length,
    				oneClickSlideValue:this.props.slideNumber,
    				oneSlideValue:this.props.slideWidth,
    				CounterLimit:Math.ceil(this.state.carouselCards.length/this.props.slideNumber)
    			}

    	return slidesData;
    }

    slideRightButton = () => {
    	const getInfo = this.slideInfo();
    	if(this.state.counter < getInfo.CounterLimit-1){
	    	this.setState({counter:this.state.counter+1}, () => {
		        console.log(this.state.counter);
		      	const counter = this.state.counter;
		    	console.log('Left-->',getInfo);
		    	const row = {
		    		'color':'red',
		    		'marginLeft':(getInfo.oneClickSlideValue*getInfo.oneSlideValue*(-counter))+'px'
		    	}
		    	this.setState({rowStyle1:row}, () => {
		        		console.log(this.state.rowStyle1)
		      	});
	      	});
    	}
    }

    slideLeftButton = () => {
    	if(this.state.counter >=1){
	    	this.setState({counter:this.state.counter-1}, () => {
		        console.log(this.state.counter);
		      	const counter = this.state.counter;
		      	console.log('ssssssssssssssss',counter);
		    	const getInfo = this.slideInfo();
		    	console.log('Right-->',getInfo);
		    	const row = {
		    		'color':'red',
		    		'marginLeft':(getInfo.oneClickSlideValue*getInfo.oneSlideValue*(-counter))+'px'
		    	}
		    	this.setState({rowStyle1:row}, () => {
		        		console.log(this.state.rowStyle1)
		      	});
	      	});
    	}
    }




    render() {
    	
    	const {carouselCards} = this.state;
    	console.log('props----------->',this.props.viewType);
    	const leftArrow = this.props.viewType==='desktop'? <div className="arrowContainerBox left">
        					<button className="leftArrow" onClick={this.slideLeftButton}></button>
        				  </div> : '';
       const rightArrow = this.props.viewType==='desktop'? <div className="arrowContainerBox right">
        					<button className="rightArrow" onClick={this.slideRightButton}></button>
        				  </div> : '';

        return (
        	<div className="CarouselContainer">
        		{leftArrow}
    			<div className="CarouselBox">
    				<div className="slidingBox" style={this.state.rowStyle1}>
    					<CarouselCustomInput ctype={this.props.ctype} carouselCards={carouselCards} />
    				</div>
    			</div>
        		{rightArrow}
        	</div>
        );
    }
}

export default CarouselCustom;
