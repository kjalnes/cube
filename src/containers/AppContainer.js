import React from 'react';
import { initCube, animate } from '../../utils/cubeFns.js';

const App = () => {
    initCube();
    animate();
    return (
        <div>
            <span><a href='//www.threejs.org/' target='_blank'>Three.js</a> WebGL cube - using CanvasRenderer
/ CSS3DObject / CSS3DRenderer</span> - <a href='//www.github.com/kjalnes/cube' target='_blank'>GitHub repo</a><span className='pull-right'>Back to <a href='//www.makelovenotvar.com'>makelovenotvar.com</a></span>
</div>
    )
};

export default App;
