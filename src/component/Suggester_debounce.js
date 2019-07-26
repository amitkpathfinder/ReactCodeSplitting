import React, { Component } from 'react';

class SearchSuggesterDebounce extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            currentKeywordInput:'',
            currentKeyword:'',
            keywordStack:[],
            suggestionsListViewStatus:false,
            suggestionsList:[],
            users:[],
            names:[],
            errorClass:false
        }
        this.timer = null;
        this.WAIT_INTERVAL = 500;
        this.ENTER_KEY = 13;
    }

    fetchUsers = (eTarget) => {
        
        let inputKeyword = eTarget;
        let url = `http://localhost/api/product/read.php`;
        // let url = `https://sanity10.infoedge.com/autocomplete/suggest.php?term=${inputKeyword}&PREFERENCE=S&RESCOM=R&SEARCH_TYPE=&CITY=`;

        fetch(url)
          .then(response => {console.log(response);return response.json();})
          .then(data => {
            console.log(data);
            this.setState({
                            /*suggestionsList:['Mumbai','Noida','Delhi','Haridwar','Gurgaon','Greater Noida', 'Noida Expressway'],*/
                            users: data.records,
                            names: data.records.map(function(elem,index) {
                                                          return elem['name'];
                                                      }),
                            suggestionsList: data.records.map(function(elem,index) {
                                                          return elem['name'];
                                                      })
                          }, () => {
                                    console.log('users',this.state.users);
                                    console.log('names',this.state.names)

                                   }
            )
        })
        .catch(err => {
          // Do something for an error here
          console.log("Error Reading data " + err);
        });
    }

  handleChange = (event) => {
    clearTimeout(this.timer)

    this.setState({ currentKeywordInput: event.target.value })

    this.timer = setTimeout(() => {
        this.callSuggetions(event)}, this.WAIT_INTERVAL)
  }

  handleKeyDown = (event) => {
    if (event.keyCode === this.ENTER_KEY) {
      clearTimeout(this.timer)
      this.setState({ currentKeywordInput: event.target.value });
      this.callSuggetions(event);
    }
  }


    callSuggetions = (event) => {

        this.fetchUsers(event.target.value);
        
        this.setState({
                        currentKeywordInput:event.target.value
                      }, () => this.callapi(event));
    };

    addToSearch = (elem) => {
        let localarr = [];
        this.setState({currentKeyword:elem}, () => {
            console.log(this.state.currentKeyword)
            this.setState({ keywordStack:[...this.state.keywordStack, this.state.currentKeyword]}, () => {
                            console.log(this.state.keywordStack)});
            });
        this.setState({currentKeywordInput:''});
        this.setState({errorClass:false});
        this.getToFocus();
        this.setState({suggestionsListViewStatus:false});
    };

    removeFromSearch = (elem) => {
        var array = [...this.state.keywordStack]; // makeing a separate copy of the array
          var index = array.indexOf(elem)
          if (index !== -1) {
            array.splice(index, 1);
            this.setState({keywordStack: array});
          }
    }

    callapi = (event) => {
        console.log(this.state.suggestionsList, 'suggestionsList');
        let a = this.state.suggestionsList;
        console.log('Called-------->',a.length);
        a.length >= 0 ? this.setState({suggestionsListViewStatus:true}) : this.setState({suggestionsListViewStatus:false});
       // console.log('Called-------->',event.target.value);
    }
    
    doneClick = () => {
        let checkKeyWord;
        console.log(this.state.currentKeywordInput);
        if(this.state.currentKeywordInput!==''){
            checkKeyWord = this.state.suggestionsList.some(item => this.state.currentKeywordInput === item);
            console.log(checkKeyWord);
            checkKeyWord===true ? this.addToSearch(this.state.currentKeywordInput) : this.setError();
        }
        else{
            return false
        }
    }

    setError = () => {
        console.log('Set Error Page Here...');
        this.setState({errorClass:true});
        this.getToFocus();
    }

    getToFocus = () => {
        this.textInput.focus();
        this.textInput.select();
    }

    render() {

        let suggestList = this.state.suggestionsList;
       let keywordStack = this.state.keywordStack;
let suggestListShowHide = this.state.suggestionsListViewStatus?'show':'hide';
         let errorClass = this.state.errorClass ? 'red_error' :'';
            let doneCls = this.state.currentKeywordInput!=='' ? 'done' : 'done hide';

    let suggestionsList = <ul className={`suggestionsList ${suggestListShowHide}`}>
                          {
                            suggestList.map((elem,index) => {
                                return <li key={index} onClick={() => this.addToSearch(elem)} >{elem}</li>;
                            })
                          }
                          </ul>;
       let keywordBoxes = keywordStack.map((elem,index) => {
           return <div className="keywordPicked" key={index}>
                    <span>{elem}</span>
                    <span className="crossBox" onClick={() => this.removeFromSearch(elem)}></span>
                  </div>;
       });

        return (
            <div className="SearchSuggester">
                {keywordBoxes}
            	{/*<div className="keywordPicked">
                    <span>Suggester</span>
                    <span className="crossBox"></span>
            	</div>
                <div className="keywordPicked">
                    <span>Suggester</span>
                    <span className="crossBox"></span>
                </div>*/}
                <div className={`keywordBox ${errorClass}`}>
                    <input type="text" ref={(input) => { this.textInput = input }} onChange={() => this.handleChange(event)} onKeyDown={this.handleKeyDown} value={this.state.currentKeywordInput} placeholder="Enter Locality..." />
                </div>
                {suggestionsList}
                <button className={`${doneCls}`} onClick={() => this.doneClick()} id="keywordDone">Done</button>
            </div>
        );
    }
}

export default SearchSuggesterDebounce;
