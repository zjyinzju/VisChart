import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import Papa from 'papaparse';

const csvData = `year,oceanName,averageBleaching
1990,Red Sea,0.75
1990,Pacific,11.10714286
1990,Indian,9
1991,Red Sea,2.25
1991,Pacific,11.6485034
1991,Indian,6.933813559
1991,Atlantic,1.943
1991,Arabian Gulf,32.5
1992,Red Sea,1.25
1992,Pacific,4.251315789
1992,Indian,4.95
1992,Atlantic,3.735714286
1993,Pacific,8.098173516
1993,Indian,4.472222222
1993,Atlantic,6.84175
1993,Arabian Gulf,4.375
1994,Red Sea,10
1994,Pacific,22.07106164
1994,Indian,50.79480851
1994,Atlantic,10.96220779
1994,Arabian Gulf,2.666666667
1995,Red Sea,0.75
1995,Pacific,7.217008798
1995,Indian,3.404347826
1995,Atlantic,26.12688427
1995,Arabian Gulf,0.25
1996,Red Sea,3.833333333
1996,Pacific,7.861827957
1996,Indian,1.783333333
1996,Atlantic,29.86577358
1997,Pacific,10.06538976
1997,Indian,1.354615385
1997,Atlantic,6.613515152
1997,Arabian Gulf,1.222222222
1998,Red Sea,7.625
1998,Pacific,3.764285714
1998,Indian,1.708333333
1998,Atlantic,6.278868613
1998,Arabian Gulf,1.25
1999,Pacific,5.650277778
1999,Indian,0.919642857
1999,Atlantic,14.58768997
1999,Arabian Gulf,14.25
2000,Red Sea,46.25
2000,Pacific,18.67164021
2000,Indian,37.22131579
2000,Atlantic,10.35019178
2000,Arabian Gulf,3.232727273
2001,Red Sea,9.6875
2001,Pacific,13.37719745
2001,Indian,13.05851852
2001,Atlantic,12.36900881
2001,Arabian Gulf,4.226956522
2002,Red Sea,2.314444444
2002,Pacific,10.37375
2002,Indian,3.006666667
2002,Atlantic,7.683185379
2003,Pacific,10.95127586
2003,Indian,8.2102
2003,Atlantic,11.11861905
2003,Arabian Gulf,33.412
2004,Red Sea,0.892857143
2004,Pacific,5.979678363
2004,Indian,6.205
2004,Atlantic,22.08721925
2004,Arabian Gulf,0.375
2005,Red Sea,0.7
2005,Pacific,4.413003802
2005,Indian,14.17186207
2005,Atlantic,35.7089828
2006,Red Sea,0.375
2006,Pacific,5.441716172
2006,Indian,16.21411765
2006,Atlantic,12.56477612
2006,Arabian Gulf,1.833333333
2007,Red Sea,0.25
2007,Pacific,4.828663366
2007,Indian,23.38095238
2007,Atlantic,5.277514451
2007,Arabian Gulf,0.9375
2008,Pacific,32.4591828
2008,Indian,27.48846154
2008,Atlantic,4.732572614
2008,Arabian Gulf,75
2009,Pacific,29.18421053
2009,Indian,27.71888889
2009,Atlantic,2.109563492
2010,Pacific,54.08823529
2010,Indian,3.27
2010,Atlantic,3.412857143
2010,Arabian Gulf,60.16666667
2011,Pacific,25.40909091
2011,Indian,16.35714286
2011,Atlantic,9.400247678
2012,Red Sea,48.3
2012,Pacific,44.55332765
2012,Indian,50.69449612
2012,Atlantic,32.09815951
2012,Arabian Gulf,54.61111111
2013,Pacific,35
2013,Indian,46.125
2013,Atlantic,57.2
2014,Pacific,49.17928571
2014,Arabian Gulf,78.53846154
2015,Indian,75
2015,Atlantic,31.66666667
2016,Pacific,31.792
2016,Atlantic,23.5
2017,Pacific,54.375
2017,Atlantic,11
2018,Pacific,41.83333333
2018,Atlantic,11
2019,Pacific,66.9
2019,Indian,75
2019,Atlantic,7.75
2020,Indian,75
2020,Atlantic,5.5
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
        // Filter data for years between 1990 and 2020
        const filteredData = parsedData.filter(item => item.year >= 1990 && item.year <= 2020);

        const years = [...new Set(filteredData.map(item => item.year))];
        const oceanNames = [...new Set(filteredData.map(item => item.oceanName))];

        const series = oceanNames.map(ocean => ({
          name: ocean,
          type: 'scatter',
          data: years.map(year => {
            const entry = filteredData.find(d => d.year === year && d.oceanName === ocean);
            return entry ? [year, entry.averageBleaching] : [year, 0];
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
            min: 1990,
            max: 2020,
          },
          yAxis: {
            type: 'value',
            name: 'Average Bleaching',
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
      <center><h2>Coral Bleaching Percent</h2></center>
      <div ref={chartRef} style={{ width: '100%', height: '440px' }}></div>
    </div>
  );
};

export default DetailView;





