var styles = {
    transparentBg:{
        background: 'transparent'
    },
    greyBg:{
        background: '#ccc'
    },
    space:{
        marginTop: '25px'
    },
    container: {
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        fontSize: '20px'
    },
    content: {
        textAlign: 'center',
        position: 'relative',
        width: '100%',
        marginTop: '30px'
    },
    pragma: {
        height: '345px',
        overflow: 'auto'
    },
    cursor: {
        cursor: 'pointer'
    },
    svgContainer:{
        display: 'inline-block',
        position: 'relative',
        width: 'auto',
        paddingBottom: '10%', /* depends on svg ratio, for my zebra height/width = 1.2 so padding-bottom = 50% * 1.2 = 60% */
        verticalAlign: 'middle' /* top | middle | bottom ... do what you want */
    },
    svg:{
        display: 'block',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%' /* only required for <img /> */
    }
};

module.exports = styles;