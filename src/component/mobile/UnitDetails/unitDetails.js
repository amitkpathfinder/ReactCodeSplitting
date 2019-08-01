import React, { Component } from 'react'
import Loader from "../Loader/loader";
import style from './component.css';

class UnitDetails extends Component {
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
    let getDocObj = document.querySelector(`.${style.vScrollHideCls}`);
    let centerPosition = (screen.width/2) - (event.target.offsetWidth/2);
    getDocObj.scrollLeft = event.target.offsetLeft-centerPosition;
}

  render() {
        let placeHolder = !this.state.tabsData.length > 0 ? <Loader/> : '';
        let tabs =  <div className={`${style.tabsScrollOn}`}>
                        <div className={`${style.vScrollHideCls}`}>
                        {placeHolder}
                        { this.state.tabsData.map((elem, index) => {
                            return (
                                    <div key={index} id={elem.id} className={this.state.activeTab==elem.id ? `${style.active}`:''} 
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
 let tabsContent =  <div className={`${style.tabsContentFixHeight}`}>
                        {   this.state.tabsData.map((elem, index) => {
                            return (
                                    <div key={index} className={this.state.activeTab==elem.id ? `${style.show}`:`${style.hide}`}>
                                        <div className={`${style.unitInfoContImg}`}>
                                            {
                                                this.state.activeTab==elem.id && this.state.loading ? 
                                                <Loader/>
                                                : <div className={`${style.unitDetailImg}`}>
                                                    <img src={this.state.activeTab==elem.id ? elem.avatar_url 
                                                        : 
                                                        'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='} />
                                                  </div>
                                            }
                                        </div>
                                        <div className={`${style.unitInfoCont}`}>
                                            <div>SUPER BUILT-UP AREA : {elem.login}</div>
                                            <div>PLOT AREA : {elem.node_id}</div>
                                            <div>BUILT-UP AREA: {elem.type}</div>
                                            <div>RESALE PRICE: {elem.login}</div>
                                        </div>
                                        <div className={`${style.disclaimer}`}>
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
      <div className={`${style.unitDetails}`}>
        {tabs}
        {tabsContent}
      </div>
    )
  }
}

export default UnitDetails;
