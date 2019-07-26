import React, { Component } from 'react'

class InPageTabsApi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabsData:[],
            activeTab:0
        }
    }

fetchingTabs = () => {
    fetch('http://localhost/api/product/read.php')
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
        this.setState({tabsData:resJson.records}, () => {
            console.log('...............', this.state.tabsData);
        });
    })
    .catch(err => console.log(err))
}

componentDidMount = () => {
    this.fetchingTabs();
}

handleTabs = (elem) => {
    console.log(elem);
    this.setState({activeTab:elem.id});
}

  render() {
      let tabs =  <div className="tabs">
                        { this.state.tabsData.map((elem, index) => {
                            return (
                                    <div key={index} className={this.state.activeTab==elem.id ? 'active':''} 
                                        onClick={() => this.handleTabs(elem)}>
                                        {elem.name}
                                    </div> 
                                    )
                            })
                        }
                  </div>
    let tabsContent = <div className="tabsContent">
                        {   this.state.tabsData.map((elem, index) => {
                            return (
                                    <div key={index} className={this.state.activeTab==elem.id ? 'show':'hide'}>
                                        {elem.description}
                                    </div>
                                )
                            })
                        }
        </div>

    return (
      <div className="InPageTabs">
        {tabs}
        {tabsContent}
      </div>
    )
  }
}

export default InPageTabsApi
