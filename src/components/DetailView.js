import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import Papa from 'papaparse';

const csvData = `year,oceanName,cover
2000,Arabian Gulf,60.16666666666666
2000,Atlantic,1.956704761904762
2000,Indian,3.27
2000,Pacific,52.8448275862069
2001,Arabian Gulf,
2001,Atlantic,0.8128593272171254
2001,Indian,27.718888888888888
2001,Pacific,27.270491803278688
2002,Arabian Gulf,75.0
2002,Atlantic,2.917007672634271
2002,Indian,27.48846153846154
2002,Pacific,26.479859649122808
2003,Arabian Gulf,0.9375
2003,Atlantic,2.557450980392157
2003,Indian,13.766355140186915
2003,Pacific,1.1895
2003,Red Sea,0.03125
2004,Arabian Gulf,1.8333333333333333
2004,Atlantic,6.844227642276423
2004,Indian,6.891
2004,Pacific,1.5823800383877158
2004,Red Sea,0.0333333333333333
2005,Atlantic,34.631884315117105
2005,Indian,7.31288256227758
2005,Pacific,1.4223284313725488
2005,Red Sea,0.0985915492957746
2006,Arabian Gulf,0.375
2006,Atlantic,18.94637614678899
2006,Indian,1.306315789473684
2006,Pacific,1.798636763412489
2006,Red Sea,0.4166666666666667
2007,Arabian Gulf,33.412
2007,Atlantic,7.471711999999999
2007,Indian,3.4209166666666664
2007,Pacific,4.146044386422976
2007,Red Sea,0.0
2008,Atlantic,4.641419558359622
2008,Indian,0.6938461538461539
2008,Pacific,3.4319172932330826
2008,Red Sea,0.4528260869565217
2009,Arabian Gulf,1.3502777777777777
2009,Atlantic,8.801771159874608
2009,Indian,3.490891089108911
2009,Pacific,4.086031128404669
2009,Red Sea,0.6623931623931624
2010,Arabian Gulf,2.032
2010,Atlantic,7.98693446088795
2010,Indian,25.716545454545457
2010,Pacific,7.679956474428727
2010,Red Sea,1.5416666666666667
2011,Arabian Gulf,5.9375
2011,Atlantic,9.159064885496184
2011,Indian,0.4439655172413793
2011,Pacific,1.320844155844156
2011,Red Sea,0.0
2012,Arabian Gulf,0.2083333333333333
2012,Atlantic,3.857421524663677
2012,Indian,0.4330985915492957
2012,Pacific,0.7279005524861878
2012,Red Sea,0.9242424242424242
2013,Arabian Gulf,0.5789473684210527
2013,Atlantic,3.674175084175084
2013,Indian,0.7044
2013,Pacific,4.223700934579439
2013,Red Sea,0.0
2014,Arabian Gulf,0.0
2014,Atlantic,21.44831978319783
2014,Indian,0.6524390243902439
2014,Pacific,3.338584474885845
2014,Red Sea,0.6764705882352942
2015,Arabian Gulf,0.0625
2015,Atlantic,19.14078260869565
2015,Indian,1.0726027397260274
2015,Pacific,2.612526539278132
2015,Red Sea,0.025
2016,Arabian Gulf,0.4705882352941176
2016,Atlantic,7.815648148148148
2016,Indian,47.93887550200804
2016,Pacific,10.86804384485666
2016,Red Sea,4.444444444444445
2017,Arabian Gulf,1.09375
2017,Atlantic,2.454439461883408
2017,Indian,1.1838235294117647
2017,Pacific,3.016156462585034
2017,Red Sea,0.0
2018,Atlantic,1.565868263473054
2018,Indian,1.9038461538461535
2018,Pacific,0.7085526315789474
2018,Red Sea,0.125
2019,Arabian Gulf,16.25
2019,Atlantic,0.5251351351351351
2019,Indian,5.382828947368421
2019,Pacific,3.874049773755656
2019,Red Sea,0.304054054054054
2020,Indian,9.0
2020,Pacific,3.702380952380953
2020,Red Sea,0.375
`;

// Function to parse CSV
const parseCSV = (data) => {
  return new Promise((resolve, reject) => {
    Papa.parse(data, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (error) => reject(error),
    });
  });
};

const DetailView = () => {
  const [data, setData] = useState({});
  const chartRef = useRef(null);

  useEffect(() => {
    parseCSV(csvData)
      .then((parsedData) => {
        // Filter data for years between 2000 and 2020
        const filteredData = parsedData.filter(item => item.year >= 2000 && item.year <= 2020);

        const years = [...new Set(filteredData.map(item => item.year))];
        const oceanNames = [...new Set(filteredData.map(item => item.oceanName))];

        const series = oceanNames.map(ocean => ({
          name: ocean,
          type: 'scatter',
          data: years.map(year => {
            const entry = filteredData.find(d => d.year === year && d.oceanName === ocean);
            return entry ? [year, entry.cover] : [year, 0];
          }),
          symbolSize: 10,
        }));

        setData({
          tooltip: {
            trigger: 'item',
          },
          legend: {
            data: oceanNames,  // Legend items based on ocean names
            orient: 'horizontal',
            left: 'center',
          },
          xAxis: {
            type: 'value',
            name: 'Year',
            min: 2000,
            max: 2020,
          },
          yAxis: {
            type: 'value',
            name: 'Cover',
          },
          series: series,
        });
      })
      .catch((error) => {
        console.error('Error parsing CSV:', error);
      });
  }, []);

  useEffect(() => {
    if (chartRef.current && data.series) {
      const chartInstance = echarts.init(chartRef.current);
      chartInstance.setOption(data);
      return () => {
        chartInstance.dispose();
      };
    }
  }, [data]);

  return (
    <div>
      <div ref={chartRef} style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
};

export default DetailView;




/*import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import ReactEcharts from 'echarts-for-react';

const DetailView = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const filePath = `${process.env.PUBLIC_URL}/data/combined.csv`;
      const response = await fetch(filePath);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csvData = decoder.decode(result.value);

      const parsedData = Papa.parse(csvData, { header: true }).data;

      const allData = parsedData
        .filter(item => item.cover) // 移除cover为空的行
        .map(item => ({
          year: parseInt(item.year),
          oceanName: item.oceanName,
          cover: parseFloat(item.cover)
        }));

      setData(allData);
    };

    fetchData();
  }, []);

  const getOption = () => {
    if (data.length === 0) {
      return {}; // 如果没有数据，返回一个空对象
    }

    const years = Array.from(new Set(data.map(item => item.year))).sort((a, b) => a - b);
    const oceanNames = Array.from(new Set(data.map(item => item.oceanName)));

    const colorPalette = [
      '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae',
      '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570',
      '#c4ccd3'
    ];

    return {
      title: {
        text: 'Coral Reef Cover',
      },
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        axisPointer: {
          type: 'cross',
          lineStyle: {
            type: 'dashed',
            width: 1
          }
        },
        formatter: function (params) {
          return `Year: ${params.value[0]}<br/>Ocean: ${params.seriesName}<br/>Cover: ${params.value[1]}%`;
        },
        zlevel: 1
      },
      legend: {
        data: oceanNames,
        top: '5%',
        right: '5%'
      },
      xAxis: {
        type: 'category',
        name: 'Year',
        data: years,
        scale: true,
        axisLabel: {
          formatter: (value) => value.toString()
        }
      },
      yAxis: {
        type: 'value',
        name: 'Coral Reef Cover (%)',
        scale: true,
        axisLabel: {
          formatter: (value) => `${value}%`
        }
      },
      series: oceanNames.map((name, index) => ({
        name: name,
        type: 'scatter',
        data: data.filter(d => d.oceanName === name).map(d => [d.year, d.cover]),
        itemStyle: {
          color: colorPalette[index % colorPalette.length]
        }
      }))
    };
  };

  return (
    <div>
      <ReactEcharts option={getOption()} style={{ height: '400px', width: '100%' }} />
    </div>
  );
};

export default DetailView;*/




