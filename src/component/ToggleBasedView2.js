import React, { Component } from 'react';

class ToggleBasedView2 extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        	importedContent:''
        }
    }

    dynamicImport = () => {
  		import("./math").then(math => {
  			console.log(math.add(16, 26));
  			this.setState({importedContent:math.add(16, 26)});
		})
		.catch(error => {
			console.log('error');
		})
	}

    render() {
    		
    		let dynamicImport_ab = 'Hi', dynamicImport_getit = 'Getting it';

        return (
				    <div>
				    	Toggle View Two : 
				    	{dynamicImport_ab} : 
				    	{
				    		`${dynamicImport_ab}`==='Hi'? `${dynamicImport_getit}` : 'Imported...'
				    	}
				    	<div onClick={this.dynamicImport}>
				    		Dynamic load components:{this.state.importedContent}
				    	</div>
				    </div>
        );
    }
}

export default ToggleBasedView2;
