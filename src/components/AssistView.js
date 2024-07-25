// 本文件是一个子视图

import React from 'react';
import ReactEcharts from 'echarts-for-react';

import {store} from '../store';
import { reducer } from '@uiw/react-baidu-map';

function AssistView() {
    //const {state, dispatch} = useContext(store);

    
    
    const getOption = () => {
        return {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['aglae']
            },
            xAxis: {
                type: 'category',
                data: [1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020],
            },
            yAxis: {
                type: 'value',
                min: 5,
                max: 35,
            },
            series: [
                {
                    name: 'Global',
                    data: [8.86371,9.98266,9.94538,8.96118,17.34844,6.55469,26.05032,25.45932,26.07645,28.40754,28.37462,29.08378,27.33401,30.72729,32.67262,34.15331,32.10791,33.89333,28.85041,31.06354,31.98302,33.47178],
                    type: 'line',
                },
                {
                    name: 'Sudden heat',
                    type: 'line',
                    markLine: {
                        itemStyle: { 
                            normal: {
                                color: 'red',
                                label:{
                                    formatter: 'Sudden heat'
                                }
                            }
                        },
                        //name: '预警时间',
                        //yAxisIndex: 0,
                        symbol:'none',//去掉箭头
                        data: [[
                            {coord: ['2001', 5] },
                            {coord: ['2001', 35] }
                        ],[
                            {coord: ['2009', 5] },
                            {coord: ['2009', 35] }
                        ],[
                            {coord: ['2014', 5] },
                            {coord: ['2014', 35] }
                        ],[
                            {coord: ['2015', 5] },
                            {coord: ['2015', 35] }
                        ],[
                            {coord: ['2019', 5] },
                            {coord: ['2019', 35] }
                        ]
                        ]
                    }
                }
            ]
        };
    };

    return <div>
        <center>
        <h2>Algae Cover Percent</h2>
        </center>
        <ReactEcharts option={getOption()} />
    </div>
}



export default AssistView;
