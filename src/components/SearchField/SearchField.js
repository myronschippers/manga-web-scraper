import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material-UI Components
import {
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  IconButton,
} from '@material-ui/core';
import {
  Search,
} from '@material-ui/icons';

class SearchField extends Component {
  state = {
    searchTerm: '',
  };

  handleFieldChange = (fieldKey) => (event) => {
      this.setState({
          [fieldKey]: event.target.value,
      });
  }

  handleFieldPressEnter = (fieldSubmitHandler) => (event) => {
      if (event.key === 'Enter') {
          this[fieldSubmitHandler](event);
      }
  }

  clickSearch = (event) => {
    console.log({ term: this.state.searchTerm });
    // axios.post('/api/scraper/search', { term: this.state.searchTerm })
    //   .then((searchSuccess) => {
    //     console.log('searchSuccess:', searchSuccess);
    //     this.setState({
    //       results: searchSuccess.data,
    //     });
    //   })
    //   .catch((searchErr) => {
    //     console.log(searchErr);
    //   });
    this.props.dispatch({
      type: 'API_SEARCH_MANGA',
      payload: this.state.searchTerm,
    });
  }

  render() {
    return (
      <FormControl variant="outlined">
        <InputLabel
            htmlFor="outlined-adornment-password"
        >
          Search
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleFieldChange('searchTerm')}
          onKeyPress={this.handleFieldPressEnter('clickSearch')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="submit search"
                onClick={this.clickSearch}
                edge="end"
              >
                <Search />
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>
    );
  }
}

export default connect()(SearchField);
