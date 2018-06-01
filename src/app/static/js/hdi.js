/**
 * This javascript file contains the code to draw the plots for Human Development Index (HDI)
 * It also draws the bubble plot of hdi, gii and gdp data.
 * 
 * @author Rupali Mayekar
 */

/**
 * get the data for HDI vs % urbanized scatter plot and plot it
 */
d3.json('/hdi-gdp-gii-data', function(error, response) {
  if (error) return console.warn(error);
  console.log("RESPONSE", response);
  
  // arrays of data points for the three years for the hdi plot
  hdiDataPoints2000 = [];
  hdiDataPoints2010 = [];
  hdiDataPoints2015 = [];
  
  // arrays of data points for the three years for the bubble plot
  bubbleDataPoints2000 = [];
  bubbleDataPoints2010 = [];
  bubbleDataPoints2015 = [];

  // arrays of data points for the three years for the bubble plot
  hdiBubbleDataPoints2000 = [];
  hdiBubbleDataPoints2010 = [];
  hdiBubbleDataPoints2015 = [];

// Loop through the response and create the js objects for the plots for the 2000 year bucket
  for (var i=0; i<response.year2000.country.length; i++) {
    // hdi plot data
    hdiDataPoint = {
      x: response.year2000.urbanized[i], 
      y: response.year2000.hdi[i],
      name: response.year2000.country[i]
    }
    hdiDataPoints2000.push(hdiDataPoint);

    bubbleDataPoint = {
      x: response.year2000.gdp[i], 
      y: response.year2000.hdi[i],
      z: response.year2000.gii[i],
      name: response.year2000.country[i]
    }
    bubbleDataPoints2000.push(bubbleDataPoint);

    hdiBubbleDataPoint = {
      x: response.year2000.gdp[i], 
      y: response.year2000.hdi[i],
      name: response.year2000.country[i]
    }
    hdiBubbleDataPoints2000.push(hdiBubbleDataPoint)
  };

  // Loop through the response and create the js objects for the plots for the 2010 year bucket
  for (var i=0; i<response.year2010.country.length; i++) {
    // dataPoint = [response.year2010.urbanized[i], response.year2010.hdi[i]];
    hdiDataPoint = {
      x: response.year2010.urbanized[i], 
      y: response.year2010.hdi[i],
      name: response.year2010.country[i]
    }
    hdiDataPoints2010.push(hdiDataPoint);

    bubbleDataPoint = {
      x: response.year2010.gdp[i], 
      y: response.year2010.hdi[i],
      z: response.year2010.gii[i],
      name: response.year2010.country[i]
    }
    bubbleDataPoints2010.push(bubbleDataPoint);
      
    hdiBubbleDataPoint = {
      x: response.year2010.gdp[i], 
      y: response.year2010.hdi[i],
      name: response.year2010.country[i]
    }
    hdiBubbleDataPoints2010.push(hdiBubbleDataPoint)
   };

  // Loop through the response and create the js objects for the plots for the 2015 year bucket
  for (var i=0; i<response.year2015.country.length; i++) {
    // dataPoint = [response.year2015.urbanized[i], response.year2015.hdi[i]];
    hdiDataPoint = {
      x: response.year2015.urbanized[i], 
      y: response.year2015.hdi[i],
      name: response.year2015.country[i]
    }
    hdiDataPoints2015.push(hdiDataPoint);
  
    // Bubble plot data
    bubbleDataPoint = {
      x: response.year2015.gdp[i], 
      y: response.year2015.hdi[i],
      z: response.year2015.gii[i],
      name: response.year2015.country[i]
    }
    bubbleDataPoints2015.push(bubbleDataPoint);

    hdiBubbleDataPoint = {
      x: response.year2015.gdp[i], 
      y: response.year2015.hdi[i],
      name: response.year2015.country[i]
    }
    hdiBubbleDataPoints2015.push(hdiBubbleDataPoint)
  };

  // Create the Data Series object for the hdi plot
  hdiSeriesData = [
    {
      name: "1998-2002",
      color: 'rgba(223, 83, 83, 1)',
      data: hdiDataPoints2000
    },
    {
      name: "2008-2012",
      color: 'rgba(119, 152, 191, 1)',
      data: hdiDataPoints2010
    },
    {
      name: "2013-2017",
      color: 'rgba(20, 175, 160, 1)',
      data: hdiDataPoints2015
    }
  ];

  // Create the data series object for the bubble plot
  bubbleSeriesData = [
    {
        name: "1998-2002",
        color: 'rgba(223, 83, 83, 1)',
        data: bubbleDataPoints2000
    },
    {
        name: "2008-2012",
        color: 'rgba(119, 152, 191, 1)',
        data: bubbleDataPoints2010
    },
    {
        name: "2013-2017",
        color: 'rgba(20, 175, 160, 1)',
        data: bubbleDataPoints2015
    }
  ];

  // Create the data series object for the bubble plot
  hdiBubbleSeriesData = [
    {
      name: "1998-2002",
      color: 'rgba(223, 83, 83, 1)',
      data: hdiBubbleDataPoints2000
    },
    {
      name: "2008-2012",
      color: 'rgba(119, 152, 191, 1)',
      data: hdiBubbleDataPoints2010
    },
    {
      name: "2013-2017",
      color: 'rgba(20, 175, 160, 1)',
      data: hdiBubbleDataPoints2015
    }
  ];

    
  // Plot for hdi vs % urbanized
  Highcharts.chart('hdi-container', {
    chart: {
      type: 'scatter',
      zoomType: 'xy'
    },
    title: {
      text: 'HDI vs % Urban Population'
    },
    subtitle: {
      text: 'Source: Aquastat'
    },
    xAxis: {
      title: {
        enabled: true,
        text: '% Urban (population)'
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

    series: hdiSeriesData

  });


  // Bubble plot comparing HDI, GII and GDP
  Highcharts.chart('bubble-container', {

    chart: {
      type: 'bubble',
      plotBorderWidth: 1,
      zoomType: 'xy'
    },
  
    legend: {
      enabled: false
    },
  
    title: {
      text: 'HDI, GII vs GDP per Capita'
    },
  
    subtitle: {
      text: 'Source: Aquastat'
    },
  
    xAxis: {
      gridLineWidth: 1,
      title: {
        text: 'Gross Domestic Product (GDP) per Capita'
      },
      labels: {
        format: '{value}'
      },
    },
  
    yAxis: {
      startOnTick: false,
      endOnTick: false,
      title: {
        text: 'Human Development Index (HDI)'
      },
      labels: {
        format: '{value}'
      },
      maxPadding: 0.2
    },
  
    tooltip: {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.name}: {point.x}, {point.y}, {point.z}'
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
      series: {
        dataLabels: {
          enabled: false,
          format: '{point.name}'
        }
      }
    },
  
    series: bubbleSeriesData
  
  }); 

  // Bubble plot comparing HDI, GII and GDP
  Highcharts.chart('gdp-hdi-container', {
    chart: {
      type: 'scatter',
      plotBorderWidth: 1,
      zoomType: 'xy'
    },
  
    legend: {
      enabled: false
    },
  
    title: {
      text: 'GDP per Capita VS HDI'
    },
  
    subtitle: {
      text: 'Source: Aquastat'
    },
  
    xAxis: {
      gridLineWidth: 1,
      title: {
        text: 'Gross Domestic Product (GDP) per Capita'
      },
      labels: {
        format: '{value}'
      },
    },
  
    yAxis: {
      startOnTick: false,
      endOnTick: false,
      title: {
        text: 'Human Development Index (HDI)'
      },
      labels: {
        format: '{value}'
      },
      maxPadding: 0.2
    },
  
    tooltip: {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.name}: {point.x}, {point.y}'
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
      series: {
        dataLabels: {
          enabled: false,
          format: '{point.name}'
        }
      }
    },
  
    series: hdiBubbleSeriesData
  
  }); 
});