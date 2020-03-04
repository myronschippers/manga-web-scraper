import React, { Component } from 'react';
import axios from 'axios';

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
        console.log(this.state.searchTerm);
    }

    render() {
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
