import React from 'react';
import { initCube, animate } from '../../utils/cubeFns.js';

const App = () => {
    initCube();
    animate();
    return (
        <div> <a href='https://threejs.org/'>Three.js</a> WebGL cube - using CSS3DObject</div>
    )
};

export default App;
