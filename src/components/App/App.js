import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Material-UI Components
import {
    Grid,
    Button,
    LinearProgress,
} from '@material-ui/core';
import {
    ThemeProvider,
    createMuiTheme,
} from '@material-ui/core/styles';

// Normalize all CSS
import 'normalize.css';
import './app.css';

// Custom Components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Panel from '../Panel/Panel';
import SearchField from '../SearchField/SearchField';

// #22223b - DRK Blue [BG]
// #425dd0 - Electric Blue
// #c4d0d7 - LT Grey (with a little blue)
// #efe1e1 - Lt Creme

// #e63d78 - highlight magenta-ish

// #50536a - Grey Blue Mid/Drk

// #cbdaee - lt/mid grey

// SETUP MUI THEME
const theme = createMuiTheme({
    palette: {
        type: 'dark',

        // primary: {
            // light: will be calculated from palette.primary.main,
            // main: '#425dd0',
            // dark: '#425dd0',// will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        // },

        // secondary: {
            // light: '#0066ff',
            // main: '#0044ff',
            // dark: will be calculated from palette.secondary.main,
            // contrastText: '#ffcc00',
        // },

        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        // contrastThreshold: 3,

        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        // tonalOffset: 0.2,
    }
});

class App extends Component {
    state = {
        searchTerm: '',
        results: [],
    };

    render() {
        const resultsElements = this.props.store.results.map((item, index) => {
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
        const loadingSearchResults = <Grid item xs={12}><LinearProgress color="secondary" /></Grid>;

        return (
            <ThemeProvider theme={theme}>
                <div className="site">
                    <div className="site-hd">
                        <Header primeHdg={'Manga Scraper'} />
                    </div>
                    <div className="site-bd">
                        <div className="container">
                            <Panel>
                                <div>
                                    <SearchField />
                                </div>
                                APPLICATION BODY
                                <h2>RESULTS:</h2>

                                <Grid container spacing={3}>
                                    {this.props.store.searchLoading ?
                                        loadingSearchResults :
                                        resultsElements
                                    }
                                </Grid>
                            </Panel>

                        </div>
                    </div>
                    <div className="site-ft">
                        <Footer />
                    </div>
                </div>
            </ThemeProvider>
        );
    }
}

export default connect(mapStoreToProps)(App);
