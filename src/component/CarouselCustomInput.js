import React, { Component } from 'react';
import {CarouselCard1, CarouselCard2, CarouselCard3} from './CarouselCard';

class CarouselCustomInput extends Component {
    
    constructor(props) {
        super(props);
        }

    render() {

        const cardType = this.props.ctype;
    	const {carouselCards} = this.props;
    	console.log('State---->',{carouselCards});
        let abcd='';
        let getCarousel='';

        switch (cardType) {
            case 'vsp':
                getCarousel = carouselCards.map((elem,index) => {
                //return abcd = elem.name!='' ? <div key={index} name={elem.name}>{elem.name}</div> :'';
                              return abcd = <div key={index} name={elem.name}>
                                        {elem.name}
                                        <CarouselCard1 cardInfo={elem.name} />
                                    </div>;
                              });
                break;
            case 'sps':
                getCarousel = carouselCards.map((elem,index) => {
                              return abcd = <div key={index} name={elem.name}>
                                        {elem.name}
                                        <CarouselCard2 cardInfo={elem.name} />
                                    </div>;
                              });   
                break;
            case 'trend':
                getCarousel = carouselCards.map((elem,index) => {
                              return abcd = <div key={index} name={elem.name}>
                                        {elem.name}
                                        <CarouselCard3 cardInfo={elem.name} />
                                    </div>;
                              });   
                break;
            default:
                getCarousel = carouselCards.map((elem,index) => {
                              return abcd = <div key={index} name={elem.name}>
                                        {elem.name}
                                        <CarouselCard1 cardInfo={elem.name} />
                                    </div>;
                              });   
                break;
        }

    	console.log('------->',{getCarousel});

        return (
        	<React.Fragment>
        	   {getCarousel}
        	</React.Fragment>
        );
    }
}

export default CarouselCustomInput;
