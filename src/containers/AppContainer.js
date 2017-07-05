import React from 'react';
import { initCube, animate } from '../../utils/cubeFns.js';

const App = () => {
    initCube();
    animate();
    return (<div> Action! </div>)
}

export default App;
