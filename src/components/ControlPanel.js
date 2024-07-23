import React, { useContext } from 'react';
import { Button } from 'antd';  // 这里使用Ant Design的按钮组件

import { store } from '../store';
import '../css/ControlPanel.css';

function ControlPanel() {
  const { state, dispatch } = useContext(store);

  const handleClick = (value) => {
    console.log(value);
    dispatch({
      type: 'changeOption',
      payload: value
    });
  };

  return (
    <div className="control-panel">
      <p>选择数据</p>
      <div className="button-group">
        <Button onClick={() => handleClick('A')} type="primary" block>Dataset A</Button>
        <Button onClick={() => handleClick('B')} type="default" block>Dataset B</Button>
      </div>
      <br/>
      <p>选择图表类型</p>
        <div className="button-group">
            <Button onClick={() => handleClick('line')} type="primary" block>Line</Button>
            <Button onClick={() => handleClick('bar')} type="default" block>Bar</Button>
            <Button onClick={() => handleClick('pie')} type="default" block>Pie</Button>
            <Button onClick={() => handleClick('scatter')} type="default" block>Scatter</Button>
            <Button onClick={() => handleClick('heatmap')} type="default" block>heatmap</Button>
        </div>  
    </div>
  );
}

export default ControlPanel;

