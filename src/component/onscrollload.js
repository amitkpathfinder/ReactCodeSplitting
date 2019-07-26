import React, { Component } from 'react';

class OnScrollLoad extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
				media:[],
				scrollCounter:0,
				loading:false
      }
    }

    componentDidMount = () => {
				this.onScrollLoad();
    }

    onScrollLoad = () => {
		const onScrollLoad = document.querySelector('.onScrollLoad');
	  			this.lazyLoadOnScroll(onScrollLoad);
	}

	lazyLoadOnScroll = (target) => {
	  const obs = new IntersectionObserver((entries, observer) => {
	    const firstEntry = entries[0];
	      if (firstEntry.isIntersecting) {
					this.fetchOnScroll(this.state.scrollCounter);
	       // observer.disconnect(); //For infinite scroll commenting it
	      }
	  });
	  obs.observe(target);
	}

    fetchOnScroll = (scrollCounter) => {
			console.log(this.state.scrollCounter);
			this.setState({loading:true});
			let page = scrollCounter;

		fetch(`https://api.github.com/users?since=${page}&per_page=10`)
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
			this.setState({ media: [...this.state.media, ...resJson] }, 
				() => {
									console.log('...............', this.state.media);
									//Incementing State Counter in Callback
									this.setState({scrollCounter:this.state.scrollCounter+1});
									this.setState({loading:false});
							});
		})
		.catch(err => console.log(err))
    }

    render () {

				let loadingCls = this.state.loading ? 'show' : 'hide';

        return (
            <div>
                { (this.state.media) && 
                    this.state.media.map((elem, index) => (
											<div key={index}>{elem.login}</div>
										))
								}
								<div className="onScrollLoad ${loadingCls}">Loading...</div>
            </div>
        )
    }
}

export default OnScrollLoad;