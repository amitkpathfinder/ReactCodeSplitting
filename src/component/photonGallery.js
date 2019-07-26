import React, { Component } from 'react';

class PhotonGallery extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        	propPhotos:{},
					slidePixels:'',
					slidePixelsHeight:'',
        	counter:0,
					movement: 0,
					fullpage:false
        }
        this.lastTouch = 0;
        this.delta = 0;
    }
	
	mylazyLoading = () => {
		// Get all of the images that are marked up to lazy load
		const images = document.querySelectorAll('.lazy');
	  			   	   images.forEach(this.lazyLoad);
	}

	lazyLoad = (target) => {
	  const obs = new IntersectionObserver((entries, observer) => {
	    entries.forEach(entry => {
	      if (entry.isIntersecting) {
	        const img = entry.target;
	        const src = img.getAttribute('data-original');
	        img.setAttribute('src', src);
	        observer.disconnect();
	      }
	    });
	  });
	  obs.observe(target);
	}


    fetchingPhotos = () => {
		fetch('http://localhost:8080/dist/pwagallery.json')
		.then(res => {
		  try {
		    if (res.ok) {
		      return res.json()
		    } else {
		      throw new Error(res)
		    }
		  }
		  catch (err) {
		    console.log('error here...',err.message)
		    return WHATEVER_YOU_WANT_TO_RETURN
		  }
		})
		.then (resJson => {
			this.setState({propPhotos:resJson.propPhotos}, () => {
				console.log('...............', this.state.propPhotos);
				console.log('...............', this.state.propPhotos.tagsIndex.PROPERTY.start);
			});
			this.mylazyLoading();
		})
		.catch(err => console.log(err))
    }

    componentDidMount = () => {
			let elem = document.querySelector('.PhotonGalleryStrem');
      this.fetchingPhotos();
			let curLeft=0;
	}

    handleTouchStart = (e) => {
  		this.lastTouch = e.nativeEvent.touches[0].clientX;
  		console.log('TouchStart',this.lastTouch);
	};

	handleTouchMove = (e) => {
		let calcSlidesPixels = 0;
    	this.delta = this.lastTouch - e.nativeEvent.touches[0].clientX;
    	console.log('delta',this.delta);

    	calcSlidesPixels = this.state.slidePixels * this.state.counter;
    	
    	this.setState({movement:calcSlidesPixels+this.delta}, 
    		() => {console.log('movement', this.state.movement)});
  	}

	handleTouchEnd = () => {
		console.log(this.delta);
		if(this.delta!==0){
			this.setState({movement:0}, () => {console.log('movement', this.state.movement)});
			(this.delta > 70) 
				? this.showNext() : 
					(this.delta < -70) ? this.showPrevious() : false;
    	}
  		this.lastTouch = 0;
  		this.delta=0;
	}

    showPrevious = () => {
    	console.log('Previous...');
    	this.setState({slidePixels:screen.width, slidePixelsHeight:screen.height}, 
    			() => {console.log(this.state.slidePixels+"|"+this.state.slidePixelsHeight)});
    	if(this.state.propPhotos.media.length >= 0 
    			&& this.state.counter > 0){
    				this.setState({counter:this.state.counter-1});
    			}
    }

    showNext = () => {
    	console.log('Next...');
    	this.setState({slidePixels:screen.width, slidePixelsHeight:screen.height}, 
    			() => {console.log(this.state.slidePixels+"|"+this.state.slidePixelsHeight)});
    	if(this.state.propPhotos.media.length >= 0 
    			&& this.state.counter < this.state.propPhotos.media.length-1){
    				this.setState({counter:this.state.counter+1});
    			}
    }

		launchFullPageGallery = () => {
			let docB = document.querySelector('body');
			this.setState({fullpage:true});
			docB.classList.add('photonPageScrollFix');
		}

		closeFullPageGallery = () => {
			let docB = document.querySelector('body');
			this.setState({fullpage:false});
			docB.classList.remove('photonPageScrollFix');
		}

    render() {
			let getScreenWidth = screen.width;
		//	let getScreenHeight = screen.height;
    	let imageItemsHtmlObject, 
    		galleryScrollSize;
    		let mediaArray = this.state.propPhotos.media;
    		let styles= null;
    		let readCount;
    	if(mediaArray){
    		galleryScrollSize = getScreenWidth * mediaArray.length;
    		readCount = this.state.movement > 0 ? 
    			this.state.movement : getScreenWidth * this.state.counter;
    		styles = { 
    			width:`${galleryScrollSize}px`,
        		//transform: `translateX(-${readCount}px)` 
        		transform: `translate3d(-${readCount}px, 0, 0)` // Fastest GPU Accelaration
    		};
    		imageItemsHtmlObject = mediaArray.map((elem, index) => {
		    return (
			        <div className="photonGalleryStremImgBox" key={index} style={{width:`${getScreenWidth}px`}}>
			            <img className="lazy" data-original={elem.mediaVariants.medium} />
			        </div>
		    	);
			})
		}
		let galleryView = this.state.fullpage ? 'PhotonGallery fullpage' : 'PhotonGallery';

        return (
            <div className={`${galleryView}`}>
							<div className="TopPanel">
								<div className="closeIcnCls" onClick={this.closeFullPageGallery}></div>
								<div className="photoNumberCount">
									<div>1 of 34</div>
									<div>Photos</div>
								</div>
								<div className="iconMenuPhoton">
								</div>
							</div>
							<div className="PhotoSlideContainer">
								<div className="PhotonStreamBox" 
									onTouchStart={this.handleTouchStart} 
										onTouchMove={this.handleTouchMove} 
											onTouchEnd={this.handleTouchEnd} 
												onClick={this.launchFullPageGallery}>
												<div className="PhotonGalleryStrem" style={styles}>
												{imageItemsHtmlObject}
												</div>
								</div>
								<div actiontype="Previous" onClick={this.showPrevious}>
								</div>
								<div actiontype="Next" onClick={this.showNext}>
								</div>
							</div>
            	<div className="PhotoCategory">
								{
									(this.state.propPhotos.tagsIndex) && 
										(this.state.propPhotos.tagsIndex.PROPERTY) &&
											<div>PROPERTY</div>
								}
								{
									(this.state.propPhotos.tagsIndex) && 
										(this.state.propPhotos.tagsIndex.LOCALITY) &&
											<div>LOCALITY</div>
								}
								{
												(this.state.propPhotos.tagsIndex) && 
													(this.state.propPhotos.tagsIndex.SOCIETY) &&
														<div>SOCIETY</div>
								}
								<div>Photos</div>
								<div>Construction Status</div>
								<div>Floor Plans</div>
								<div>Directions</div>
            	</div>
            </div>
        );
    }
}

export default PhotonGallery;
