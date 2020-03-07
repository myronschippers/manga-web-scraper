import React, { Component } from 'react';
import axios from 'axios';

// Material-UI Components
import {
    FormControl,
    InputLabel,
    InputAdornment,
    OutlinedInput,
    IconButton,
    Grid,
    Button,
} from '@material-ui/core';
import {
    Search,
} from '@material-ui/icons';

// Normalize all CSS
import 'normalize.css';
import './app.css';

// Custom Components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Panel from '../Panel/Panel';

class App2 extends Component {
    state = {
        searchTerm: '',
        results: [],
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
        axios.post('/api/scraper/search', { term: this.state.searchTerm })
            .then((searchSuccess) => {
                console.log('searchSuccess:', searchSuccess);
                this.setState({
                    results: searchSuccess.data,
                });
            })
            .catch((searchErr) => {
                console.log(searchErr);
            });
        // this.props.dispatch({
        //     type: 'SEARCH_MANGA',
        //     payload: this.state.searchTerm,
        // });
    }

    render() {
        const resultsElements = this.state.results.map((item, index) => {
            return (
                <Grid item xs={4} key={index}>
                    <Grid container spacing={3}>
                        <Grid item xs={7}>
                            <img src={item.thumbnail} alt={`${item.title} thumbnail`} />
                        </Grid>
                        <Grid item xs={5}>
                            <h3>{item.title}</h3>
                            <a href={item.path}>Go To Series</a>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained">Save Series</Button>
                        </Grid>
                    </Grid>
                    
                </Grid>
            );
        });

        return (
            <div className="site">
                <div className="site-hd">
                    <Header primeHdg={'Manga Scraper'} />
                </div>
                <div className="site-bd">
                    <div className="container">
                        <Panel>
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
                            APPLICATION BODY
                            <h2>RESULTS:</h2>

                            <Grid container spacing={3}>
                                {resultsElements}
                            </Grid>
                        </Panel>

                    </div>
                </div>
                <div className="site-ft">
                    <Footer />
                </div>
            </div>
        );
    }
}

export default App2;
