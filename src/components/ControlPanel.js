import React, { useContext } from 'react';
import { Button } from 'antd';
import { store } from '../store';
import '../css/ControlPanel.css';

function ControlPanel() {
  const { state, dispatch } = useContext(store);

  const handleClick = (value) => {
    dispatch({
      type: 'SET_CATEGORY',  // 使用一个明确的动作类型
      payload: value
    });
  };

  return (
    <div className="control-panel">
      <p>选择数据</p>
      <div className="button-group">
        <Button 
          onClick={() => handleClick('seaSurface')} 
          type={state.category === 'seaSurface' ? "primary" : "default"} 
          block
        >
          Sea Surface 
        </Button>
        <Button 
          onClick={() => handleClick('land')} 
          type={state.category === 'land' ? "primary" : "default"} 
          block
        >
          Land
        </Button>
      </div>
    </div>
  );
}

export default ControlPanel;
