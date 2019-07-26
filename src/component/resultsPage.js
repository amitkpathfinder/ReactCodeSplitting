import React from 'react';

const ResultsPage = (props) => {
  return (
    <div className="ResultsPage">
    	<div className="Property">
    		<div className="PropertyImage">
    			<img src="https://mediacdn.99acres.com/media2/8710/12/174212273T-1558544036221.jpeg" />
    		</div>
    		<div className="PropertyContent">
    			<div>
    				<a href="https://flaviocopes.com/react-server-side-rendering/">
    					react-server-side-rendering
    				</a>
    				<a href="https://dev.to/marvelouswololo/how-to-server-side-render-react-hydrate-it-on-the-client-and-combine-client-and-server-routes-1a3p">
    					how-to-server-side-render
    				</a>
    				<a href="https://react-ssr-dlbqrekqrn.now.sh/with-react-router/topics">
    					with-react-router
    				</a>
    				<a href="https://www.freecodecamp.org/news/server-side-rendering-your-react-app-in-three-simple-steps-7a82b95db82e/">
    					server-side-rendering
    				</a>
    			</div>
    			<div className="Price">
    				<span>&#x20b9;</span>
    				1 Crore
    			</div>
    			<div className="Location">
    				Sector-108 Noida
    			</div>
    			<div className="Size">
    				112 Sq. Meter
    			</div>
    			<div className="DealerInfo">
    				Dealer : Buniyad Retail
    			</div>
    			<div className="MoreInfo">
    				One time lease rent paid complition done 12 mtr wide road 
    				<span>More</span>
    			</div>
    		</div>
    	</div>
    </div>
  )
}

export default ResultsPage;