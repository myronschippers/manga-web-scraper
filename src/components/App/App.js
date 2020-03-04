import React, { Component } from 'react';

// Normalize all CSS
import 'normalize.css';
import './app.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class App2 extends Component {
    render() {
        return (
            <div className="site">
                <div className="site-hd">
                    <Header primeHdg={'Manga Scraper'} />
                </div>
                <div className="site-bd">
                    <div className="container">
                        APPLICATION BODY
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
