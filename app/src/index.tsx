import * as React from 'react';
import { render } from 'react-dom';
import Keplr from './Keplr';
import Keplr2 from './Keplr2';
import './style.css';

function App() {
  return (
    <div>
      <Keplr />
      <br />
      <Keplr2 />
    </div>
  );
}

render(<App />, document.getElementById('root'));
