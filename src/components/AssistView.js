// 本文件是一个子视图

import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Slider } from 'antd';

function AssistView() {
    const [yearRange, setYearRange] = useState([2000, 2020]);

    const getOption = () => {
        const allYears = [1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
        const filteredYears = allYears.filter(year => year >= yearRange[0] && year <= yearRange[1]);

        const globalData = [8.86371, 9.98266, 9.94538, 8.96118, 17.34844, 6.55469, 26.05032, 25.45932, 26.07645, 28.40754, 28.37462, 29.08378, 27.33401, 30.72729, 32.67262, 34.15331, 32.10791, 33.89333, 28.85041, 31.06354, 31.98302, 33.47178];
        const filteredGlobalData = globalData.slice(allYears.indexOf(yearRange[0]), allYears.indexOf(yearRange[1]) + 1);

        return {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Global', 'Sudden heat']
            },
            xAxis: {
                type: 'category',
                data: filteredYears,
            },
            yAxis: {
                type: 'value',
                min: 5,
                max: 35,
            },
            series: [
                {
                    name: 'Global',
                    data: filteredGlobalData,
                    type: 'line',
                },
                {
                    name: 'Sudden heat',
                    type: 'line',
                    markLine: {
                        itemStyle: { 
                            normal: {
                                color: 'red',
                                label: {
                                    formatter: 'Sudden heat'
                                }
                            }
                        },
                        symbol: 'none',
                        data: [
                            [{coord: ['2001', 5]}, {coord: ['2001', 35]}],
                            [{coord: ['2009', 5]}, {coord: ['2009', 35]}],
                            [{coord: ['2014', 5]}, {coord: ['2014', 35]}],
                            [{coord: ['2015', 5]}, {coord: ['2015', 35]}],
                            [{coord: ['2019', 5]}, {coord: ['2019', 35]}]
                        ].filter(line => line[0].coord[0] >= yearRange[0] && line[0].coord[0] <= yearRange[1])
                    }
                }
            ]
        };
    };

    const onSliderChange = (value) => {
        setYearRange(value);
    };

    return (
        <div>
            <center>
                <h2>Algae Cover Percent</h2>
            </center>
            <Slider
                range
                min={1999}
                max={2020}
                defaultValue={[2000, 2020]}
                onChange={onSliderChange}
                tooltip={{ formatter: value => `${value}` }}
            />
            <ReactEcharts option={getOption()} />
        </div>
    );
}

export default AssistView;
