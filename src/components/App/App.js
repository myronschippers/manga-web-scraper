import React, { Component } from 'react';

// Normalize all CSS
import 'normalize.css';
import './app.css';

class App2 extends Component {
    render() {
        return (
            <div className="site">
                <div className="site-hd">
                    <header>
                        <h1>Manga Scraper</h1>
                    </header>
                </div>
                <div className="site-bd">
                    
                    APPLICATION BODY

                </div>
                <div className="site-ft">
                    <footer>
                        &copy; Myron R Schippers Jr
                    </footer>
                </div>
            </div>
        );
    }
}

export default App2;
