// 本文件是一个子视图

import React from 'react';
import ReactEcharts from 'echarts-for-react';

import {store} from '../store';

// class AssistView extends React.Component {
//     static contextType = store;

//     render() {
//         // 使用StateProvider提供的数据环境
//         const { state, dispatch } = this.context;

//         /* 返回一个数字和一个按钮
//          * 按钮点击事件onClick中需要填写一个函数，将加一请求发送出去
//          * 注意：千万不要写成这样！！！
//          * const func = () => dispatch({type: 'increment'})
//          * <button onClick={func()}></button>
//          * 下面才是对的！！！
//          * const func = () => dispatch({type: 'increment'})
//          * <button onClick={func}></button>
//          * 前者会在渲染时就调用函数，后者会在点击时调用，请仔细体会两者区别！！！
//          */
//         return <div>
//             <p>Assist View</p>
//             <p>{state.count}</p>
//             <button onClick={() => dispatch({ type: 'increment' })}>add</button>
//         </div>
//     }
// }

function AssistView() {
    //const {state, dispatch} = useContext(store);

    const getOption = () => {
        return {
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: [1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020],
            },
            yAxis: {
                type: 'value',
                min: 8,
                max: 35,
            },
            series: [
                {
                    name: 'Global',
                    data: [8.86371,9.98266,9.94538,8.96118,17.34844,6.55469,26.05032,25.45932,26.07645,28.40754,28.37462,29.08378,27.33401,30.72729,32.67262,34.15331,32.10791,33.89333,28.85041,31.06354,31.98302,33.47178],
                    type: 'line',
                },
            ]
        };
    };

    return <div>
        <p>hard coral cover percent</p>
        <ReactEcharts option={getOption()} />
    </div>
}



export default AssistView;
