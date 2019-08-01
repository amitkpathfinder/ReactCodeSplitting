import React, { Component } from 'react';
import PropertyTypeComponent 			from "./PropertyTypeComponent";
import ToggleButtonOnOff 				from "./ToggleButtonOnOff";
import SearchSuggester 					from "./Suggester";
import SearchSuggesterDebounce 					from "./Suggester_debounce";
import ResultsPage from "./resultsPage";
import CarouselCustom from "./CarouselCustom";

/* Normal Imported Gallery */
// import PhotonGallery from "./photonGallery";
//<PhotonGallery/>

import InPageTabs from "./inPageTabs";
import InPageTabsApi from "./inPageTabsApi";
import InPageTabsApiScroll from './inPageTabsApiWithScroll';
import OnScrollLoad from "./onscrollload";


import Page from './page';

/****** */
import unitDetails from './unitdetails';

console.log(unitDetails.floorPlan.widgetDetails);

var udConst = Object.values(unitDetails.floorPlan.widgetDetails);

var ud = udConst.map((elem,index) => {
	return (
		elem.name + "-" + Object.values(elem.tuples).map((elems,indexs) => {
			return (
				elems.name + "-" + 
					Object.values(elems.tuples).map((elemss,indexss) => {
						return (
							elemss.name + "-" +
								Object.values(elemss.tuples).map((elemsss,indexsss) => {
									return (
										elemsss.floorPlanId
									)
								})
						)
					})
			)
		})
	)
})

console.log(ud);


var floorPlanTuples = Object.values(unitDetails.floorPlan.tuples);
var tuples = floorPlanTuples.map((elem,index) => {
				return (
					elem.name
				)
			 });

console.log(tuples);

/***** */

/* Photon Js */
import photonJs from "./photon";
console.log('.....',photonJs);
console.log('.....',photonJs.photonLayer.tabs);
console.log(Object.values(photonJs.photonLayer.tabs));
var a = Object.values(photonJs.photonLayer.tabs);
var b = a.map((elem, index) => {
		return (
			elem.tuples.map((elems, indexs) => {
				return (
					elems.type+"__"+elems.mappingId
				)
			})
		);
	})
var cc = [];
cc = b.join();
console.log(cc.split(','));
/* Photon Js */

const sendData = [
	{id: "1", name: "First"},
	{id: "2", name: "Second"},
	{id: "3", name: "Third"},
	{id: "4", name: "Fourth"}
 ];

class App extends Component {

	constructor(props) {
        super(props);
        this.state = {
        	PhotonGallery:null
        }
    }

	dynamicImportGallery = () => {
			import("./photonGallery").then(PhotonGallery => {
				this.setState({PhotonGallery: PhotonGallery.default});
				
		})
		.catch(error => {
			console.log('error');
		})
	}

    render() {

		let { PhotonGallery } = this.state;
		let useragent = this.props.useragent;

        return (<div>
        			<div>
        				Hello {this.props.name}
        			</div> 
					<CarouselCustom viewType={useragent} ctype={'txrend'} 
						url={'http://localhost/api/product/read.php'} 
							data={sendData} slideNumber={3} 
								slideWidth={110} />
        			My React App
        			<div>Widget One:</div>
					<InPageTabsApiScroll/>
					
					{/* Dynamicly Imported Gallery */}
					{PhotonGallery ? <PhotonGallery/> : null}
					<div className="GalleryPlaceHolder" onClick={this.dynamicImportGallery}>
						<img src="https://newprojects.99acres.com/projects/fusion_buildtech/fusion_homes/images/6dqwq2r7.jpg" />
					</div>
					{/* Dynamicly Imported Gallery */}

					<InPageTabs />
					<InPageTabsApi />
        			<SearchSuggester/>
        			<PropertyTypeComponent/>
        			<ToggleButtonOnOff/>
        			<SearchSuggester/>
        			<div>
    					<Page user={'User1'} permalink={'abcd'} avatarSize={'UserPicture'}/>
    				</div>
    				<SearchSuggesterDebounce/>
    				<ResultsPage/>
					<OnScrollLoad />
        		</div>)
    }
}

export default App;
