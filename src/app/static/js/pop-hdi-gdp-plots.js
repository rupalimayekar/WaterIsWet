
/**
 * get the data for HDI vs % urbanized scatter plot and plot it
 */
d3.json('/hdi-gdp-gii-data', function(error, response) {
  if (error) return console.warn(error);
  console.log("RESPONSE", response);
  
  // data points for the tree years
  dataPoints2000 = [];
  dataPoints2010 = [];
  dataPoints2015 = [];

  for (var i=0; i<response.year2000.country.length; i++) {
    //dataPoint = [response.year2000.urbanized[i], response.year2000.hdi[i]];
    dataPoint = {
      x: response.year2000.urbanized[i], 
      y: response.year2000.hdi[i],
      name: response.year2000.country[i]
    }
    dataPoints2000.push(dataPoint);
  };

  for (var i=0; i<response.year2010.country.length; i++) {
    // dataPoint = [response.year2010.urbanized[i], response.year2010.hdi[i]];
    dataPoint = {
      x: response.year2010.urbanized[i], 
      y: response.year2010.hdi[i],
      name: response.year2010.country[i]
    }
    dataPoints2010.push(dataPoint);
  };

  for (var i=0; i<response.year2015.country.length; i++) {
    // dataPoint = [response.year2015.urbanized[i], response.year2015.hdi[i]];
    dataPoint = {
      x: response.year2015.urbanized[i], 
      y: response.year2015.hdi[i],
      name: response.year2015.country[i]
    }
    dataPoints2015.push(dataPoint);
  };

  seriesData = [
    {
      name: "1998-2002",
      color: 'rgba(223, 83, 83, .5)',
      data: dataPoints2000
    },
    {
      name: "2008-2012",
      color: 'rgba(119, 152, 191, .5)',
      data: dataPoints2010
    },
    {
      name: "2013-2017",
      color: 'rgba(130, 120, 10, .5)',
      data: dataPoints2015
    }
  ];


  Highcharts.chart('scatter-container', {
    chart: {
      type: 'scatter',
      zoomType: 'xy'
    },
    title: {
      text: 'HDI vs % urbanized for various time periods'
    },
    subtitle: {
      text: 'Source: Aquastat'
    },
    xAxis: {
      title: {
        enabled: true,
        text: '% urbanized (population)'
      },
      startOnTick: true,
      endOnTick: true,
      showLastLabel: true
    },
    yAxis: {
      title: {
        text: 'Human Development Index (HDI)'
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'bottom',
      x: -10,
      y: -60,
      floating: true,
      backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
      borderWidth: 1
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 5,
          states: {
            hover: {
              enabled: true,
              lineColor: 'rgb(100,100,100)'
            }
          }
        },
        states: {
          hover: {
            marker: {
              enabled: false
            }
          }
        },
        tooltip: {
          headerFormat: '<b>{series.name}</b><br>',
          pointFormat: '{point.name}: {point.x} %, {point.y}'
        }
      }
    },

    series: seriesData

  });

});


