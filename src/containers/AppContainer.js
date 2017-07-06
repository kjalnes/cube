import React from 'react';
import { initCube, animate } from '../../utils/cubeFns.js';

const App = () => {
    initCube();
    animate();
    return (
        <div>
            <span><a href='https://threejs.org/'>Three.js</a> WebGL cube - using CanvasRenderer
/ CSS3DObject / CSS3DRenderer</span> - <a href='github.com/kjalnes/cube'>GitHub repo</a><span className='pull-right'>Back to <a href='www.makelovenotvar.com'>makelovenotvar.com</a></span>
</div>
    )
};

export default App;
