import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Material-UI Components
import {
    ThemeProvider,
    createMuiTheme,
} from '@material-ui/core/styles';

// Normalize all CSS
import 'normalize.css';
import './app.css';

import mainNavConfig from '../../constants/mainNav.config';

// Page Components
import Home from '../pages/Home/Home';

// Custom Components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Panel from '../Panel/Panel';
import SearchField from '../SearchField/SearchField';
import SearchResultsList from '../SearchResultsList/SearchResultsList';
import SavedSeries from '../SavedSeries/SavedSeries';

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
  render() {

    return (
      <ThemeProvider theme={theme}>
        <Router>
          <div className="site">
            <div className="site-hd">
              <Header primeHdg={'Manga Scraper'} />
            </div>
            <div className="site-bd">
              {/* RENDER PAGE ROUTES BASED ON NAV CONFIG */}
              {mainNavConfig.map((navItem, index) => (
                <Route
                  exact
                  path={navItem.path}
                  component={navItem.component}
                />
              ))}

              <div className="container">
                <Panel>
                  <div>
                      <SearchField />
                  </div>
                  APPLICATION BODY

                  <SearchResultsList />
                </Panel>

              </div>
            </div>
            <div className="site-ft">
                <Footer />
            </div>
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
