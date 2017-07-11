var css = require('./css.js');
var getSingle = require('./getSingle.js');

function createDOM() {
    var div = document.createElement('div');
    css(div, {
        position: 'fixed',
        margin: '0',
        padding: '0',
        left: '50%',
        marginLeft: '-3.8em',
        top: '180px',
        width: '7.6em',
        minHeight: '7.6em',
        lineHeight: '1.6',
        zIndex: '5000',
        background: 'rgba(17, 17, 17, 0.7)',
        textAlign: 'center',
        borderRadius: '5px',
        color: '#fff',
        wordBreak: 'break-all'
    });
    // document.body.appendChild(div);
    return div;
}

var getDiv = getSingle(createDOM);

module.exports = getDiv;
