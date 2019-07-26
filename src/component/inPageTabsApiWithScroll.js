import React, { Component } from 'react'
import Loader from "./loader";

class InPageTabsApiScroll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabsData:[],
            activeTab:null,
            loading:false
        }
    }

fetchingTabs = () => {
    fetch('https://api.github.com/users?since=20&per_page=20')
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
        this.setState({
                        tabsData:resJson, 
                        activeTab:resJson[0].id
                      }, () => {
                        console.log('...............', this.state.tabsData);
                      });
    })
    .catch(err => console.log(err))
}

componentDidMount = () => {
    this.fetchingTabs();
}

handleTabs = (event,elem) => {
    this.domOps4CenterPos(event);
    this.setState({loading:true});
    this.setState({activeTab:elem.id});
    setTimeout(() => {
        this.setState({loading:false});
    }, 400);
}

domOps4CenterPos = (event) => {
    let getDocObj = document.querySelector('.vScrollHideCls');
    let centerPosition = (screen.width/2) - (event.target.offsetWidth/2);
    getDocObj.scrollLeft = event.target.offsetLeft-centerPosition;
}

  render() {
        let placeHolder = !this.state.tabsData.length > 0 ? <div className="loading">Loading...</div> : '';
        let tabs =  <div className="tabsScrollOn">
                        <div className="vScrollHideCls">
                        {placeHolder}
                        { this.state.tabsData.map((elem, index) => {
                            return (
                                    <div key={index} id={elem.id} className={this.state.activeTab==elem.id ? 'active':''} 
                                        onClick={() => this.handleTabs(event, elem)}>
                                        <div>{elem.id}</div>
                                        <div>{elem.login}</div>
                                        <div>{elem.node_id}</div>
                                    </div> 
                                    )
                            })
                        }
                        </div>
                    </div>
 let tabsContent =  <div className="tabsContentFixHeight">
                        {placeHolder}
                        {   this.state.tabsData.map((elem, index) => {
                            return (
                                    <div key={index} className={this.state.activeTab==elem.id ? 'show':'hide'}>
                                        <div className="unitInfoContImg">
                                            {
                                                this.state.activeTab==elem.id && this.state.loading ? 
                                                <Loader/>
                                                : <div className="unitDetailImg">
                                                    <img src={this.state.activeTab==elem.id ? elem.avatar_url : '/dist/i0.gif'} />
                                                  </div>
                                            }
                                        </div>
                                        <div className="unitInfoCont">
                                            <div>SUPER BUILT-UP AREA : {elem.login}</div>
                                            <div>PLOT AREA : {elem.node_id}</div>
                                            <div>BUILT-UP AREA: {elem.type}</div>
                                            <div>RESALE PRICE: {elem.login}</div>
                                        </div>
                                        <div className="disclaimer">
                                            <b>Disclaimer:</b> 
                                            Liveable area is a 99acres defined area 
                                            based on internal calculations.
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

    return (
      <div className="unitDetails">
        {tabs}
        {tabsContent}
      </div>
    )
  }
}

export default InPageTabsApiScroll;
