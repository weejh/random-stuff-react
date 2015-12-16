import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import SearchBox from './components/SearchBox';
import ProductResult from './components/ProductResult'

export default class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      searchingFor: '',
      searchResult: [],
    };
  }

  render () {
    return (
      <div className='appWrapper'>
        <h2>Grocery Infinite Scroll</h2>
        <SearchBox whenUserTypes={::this.whenUserTypes} />
        {this.getSearchingForDOM()}
        <ProductResult productResult={this.state.searchResult} />
      </div>
    );
  }

  whenUserTypes (e) {
    const query = e.target.value;
    var that = this;

    this.setState({
      searchingFor: query
    });

    fetch('https://api.redmart.com/v1.5.6/catalog/search?q='+query+'&pageSize=18&sort=1')
      .then(function (response) {
        return response.json();
      }).then(function (data) {
        that.setState({
          searchingFor: '',
          searchResult: data.products
        });
      })

  }

  getSearchingForDOM () {
    const { searchingFor } = this.state;

    if (searchingFor) {
      return <div>Searching for ... {searchingFor}</div>;
    }

    return null;
  }
}

  // Mounting App
  ReactDOM.render(
      <App />, document.querySelector('#app')
  );
