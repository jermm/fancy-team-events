import React, { Component } from 'react';
import config from '../../config';
import {getStopsFromGeo} from '../../services/getTransitStops';

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
      transitNames: []
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
    };

    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors
    this.autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('locationName'),
        options,
    );

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handlePlaceSelect() {

    // Extract City From Address Object
    let addressObject = this.autocomplete.getPlace();
    let lat = addressObject.geometry.location.lat();
    let lon = addressObject.geometry.location.lng();
    // console.log(`${lat},${lon}`);

    let that = this;

    getStopsFromGeo(lat,lon).then(function (result) {
      that.setState({transitNames: result})
    });


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
    let value = this.state.query;
    let transitNames = this.state.transitNames;
    let transitString = ""

    if (!value) {
      value = this.props.initialValues.locationName;
    }

    transitNames.forEach(function (name) {
      transitString = transitString + name + ", ";
    });

    return (
        <div className='autocomplete-container form-group'>
          <Script
              url={config.googleAutoCompleteURL}
              onLoad={this.handleScriptLoad}
          />
          <label htmlFor="locationName">Location</label>
          <p>Nearby Transit: {transitString} </p>
          <input type='text' id="locationName" placeholder="EnterSearchField" value={value} onChange={this.handlequeryChange} className='form-control'/>
        </div>
    );
  }
}

export default Search;