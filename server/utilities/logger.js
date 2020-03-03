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
        this._sampleStyle = chalk.cyan;
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
        this._log(this._sampleStyle(sampleHdg), message, this._sampleStyle(sampleFoot));
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

    static createSingleton() {
        return new Logger();
    } 
}

module.exports = Logger.createSingleton();