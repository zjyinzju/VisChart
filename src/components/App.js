// 本文件是界面UI的根目录

// App.js -> index.js -> public/index.html(id 为 root的 div)
import React from 'react';

import AssistView from './AssistView';
import ControlPanel from './ControlPanel';
import Overview from './Overview';
import DetailView from './DetailView';
import DegreeView from './DegreeView';
import '../css/App.css'

// App组件
function App() {

    return <div className='root'>
      <div className='topRow'>
        <div className='controlPanel'>
          <ControlPanel/>
        </div>
        <div className='mainPanel'>
          <div className='overview'><Overview/></div>
        </div>
      </div>
      <div className='otherview'>
            <div className='assistView'><AssistView/></div>
            <div className='detailView'><DetailView/></div>
            <div className='degreeView'><DegreeView/></div>
      </div>
    </div>;
}

export default App;