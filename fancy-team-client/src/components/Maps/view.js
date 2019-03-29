import React, { Component } from 'react';

// Import Search Bar Components
// import SearchBar from 'material-ui-search-bar';

// Import React Scrit Libraray to load Google object
import Script from 'react-load-script';

class Search extends Component {
  // Define Constructor
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      city: '',
      query: '',
    };

    // Bind Functions
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.handlequeryChange = this.handlequeryChange.bind(this);

  }

  handlequeryChange(e){
    this.setState({
      query:e.target.value,
    });
    this.temp = Object.assign({},e);
  }

  handleScriptLoad() {
    // Declare Options For Autocomplete
    var options = {
      types: ['(cities)'],
    };

    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors
    this.autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        options,
    );

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handlePlaceSelect() {

    // Extract City From Address Object
    let addressObject = this.autocomplete.getPlace();
    let address = addressObject.address_components;

    // Check if address is valid
    if (address) {
      // Set State
      this.setState(
          {
            city: address[0].long_name,
            query: addressObject.formatted_address,
          }
      );
      let abc = this.temp;
      abc.target.value = this.state.query;
      this.props.handleChange(abc);
    }
  }

  render() {
    return (
        <div className='autocomplete-container form-group'>
          <Script
              url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDNPwjXXOCcQGSDjfCj6r4ClDPORVwswr4&libraries=places"
              onLoad={this.handleScriptLoad}
          />
          <label htmlFor="autocomplete">Location</label>
          <input type='text' id="autocomplete" placeholder="EnterSearchField" value={this.state.query} onChange={this.handlequeryChange} className='form-control'/>
        </div>
    );
  }
}

export default Search;