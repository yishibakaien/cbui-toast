var { css, getSingle } = require('./utils.js');

function createDOM() {
    var div = document.createElement('div');
    div.className = '_blackTip_';
    div.innerHTML = '<div></div><p></p>';
    // css(div, {
    //     position: 'fixed',
    //     transition: '0.5s',
    //     margin: '0',
    //     padding: '0',
    //     left: '50%',
    //     marginLeft: '-3.8em',
    //     top: '180px',
    //     width: '7.6em',
    //     minHeight: '7.6em',
    //     lineHeight: '1.6',
    //     zIndex: '5000',
    //     background: 'rgba(17, 17, 17, 0.7)',
    //     textAlign: 'center',
    //     borderRadius: '5px',
    //     color: '#fff',
    //     wordBreak: 'break-all'
    // });
    // document.body.appendChild(div);
    return div;
}

var getDiv = getSingle(createDOM);

module.exports = getDiv;
