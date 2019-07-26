import React, { Component } from 'react'

const myObj = [
                {"index":0, "Label":"Tab 1","Content":"Content 1"},
                {"index":1, "Label":"Tab 2","Content":"Content 2"},
                {"index":2, "Label":"Tab 3","Content":"Content 3"}
              ]


class InPageTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab:0
        }
    }

handleTabs = (elem) => {
    console.log(elem);
    this.setState({activeTab:elem.index});
}

  render() {
      let tabs =  <div className="tabs">
                        { myObj.map((elem, index) => {
                            return (
                                    <div key={index} className={this.state.activeTab==index ? 'active':''} 
                                        onClick={() => this.handleTabs(elem)}>
                                        {elem.Label}
                                    </div> 
                                    )
                            })
                        }
                  </div>
let tabsContent = <div className="tabsContent">
                        {   myObj.map((elem, index) => {
                            return (
                                    <div key={index} className={this.state.activeTab==index ? 'show':'hide'}>
                                        {elem.Content}
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

export default InPageTabs
