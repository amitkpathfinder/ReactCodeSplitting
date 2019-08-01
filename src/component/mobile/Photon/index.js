import React, { Component } from 'react';
import style from './component.css';

class Photon extends Component {
    
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

        return (
            <div>
            	{/* Dynamicly Imported Gallery */}
					{PhotonGallery ? <PhotonGallery/> : null}
					<div id="GalleryPlaceHolder" className={`${style.GalleryPlaceHolder}`} onClick={this.dynamicImportGallery}>
						<img src="https://newprojects.99acres.com/projects/fusion_buildtech/fusion_homes/images/6dqwq2r7.jpg" />
					</div>
					{/* Dynamicly Imported Gallery */}
            </div>
        );
    }
}

export default Photon;
