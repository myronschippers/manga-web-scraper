const chalk= require('chalk');
// chalk color options
// - green
// - yellow
// - blue
// - magenta
// - cyan
// - white
// - gray
// - black

class Logger {
    constructor() {
        this._errorStyle = chalk.red.bold;
        this._msgStyle = chalk.cyan;
        this._log = console.log;
        this._divider = `\n==================== ** ====================\n`;
    }

    _dividerTop(text) {
        return `${this._divider} - ${text}`;
    }

    _dividerBottom(text) {
        return `${text} - ${this._divider}`;
    }

    _createHeader(text) {
        let textWithDividers = this._dividerTop(text);
        textWithDividers = this._dividerBottom(textWithDividers);
        return textWithDividers;
    }

    _createFooter(text) {
        return `\n>>>> ${text} <<<<<\n`;
    }

    label(title) {
        const titleHdg = this._createHeader(title);
        console.log(chalk.blue(titleHdg));
    }

    sample(heading, message) {
        const sampleHdg = this._createHeader(heading);
        const sampleFoot = this._createFooter('end');
        this._log(this._msgStyle(sampleHdg), message, this._msgStyle(sampleFoot));
    }

    edged(message) {
        const framedMsg = this._createHeader(message);
        this._log(chalk.green(framedMsg));
    }

    error(message) {
        const errHdg = this._createHeader('ERROR');
        const errFoot = this._createFooter('end error');
        this._log(this._errorStyle(errHdg), message, this._errorStyle(errFoot));
    }

    end(label) {
        const footerHdg = this._createFooter(`END!! ${label}`);
        console.log(chalk.blue(footerHdg));
    }

    message(...msgArgs) {
        const newMessages = msgArgs.map((logArg) => {
            return this._msgStyle(logArg);
        });
        console.log(...newMessages, this._msgStyle('\n'));
    }

    static createSingleton() {
        return new Logger();
    } 
}

module.exports = Logger.createSingleton();