/**
 * This javascript file contains the code to draw the scatter plots of hdi, gii and gdp vs. % Urbanized
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
  
  // arrays of data points for the three years for the gii plot
  giiDataPoints2000 = [];
  giiDataPoints2010 = [];
  giiDataPoints2015 = [];

  // arrays of data points for the three years for the gii plot
  gdpDataPoints2000 = [];
  gdpDataPoints2010 = [];
  gdpDataPoints2015 = [];

  // arrays of data points for the three years for the bubble plot
  bubbleDataPoints2000 = [];
  bubbleDataPoints2010 = [];
  bubbleDataPoints2015 = [];

  // Loop through the response and create the js objects for the plots for the 2000 year bucket
  for (var i = 0; i < response.year2000.country.length; i++) {
    // hdi plot data
    hdiDataPoint = {
      x: response.year2000.urbanized[i], 
      y: response.year2000.hdi[i],
      name: response.year2000.country[i]
    }
    hdiDataPoints2000.push(hdiDataPoint);

    //GII plot data
    giiDataPoint = {
      x: response.year2000.urbanized[i], 
      y: response.year2000.gii[i],
      name: response.year2000.country[i]
    }
    giiDataPoints2000.push(giiDataPoint);

    //GDP per Capita plot data
    gdpDataPoint = {
      x: response.year2000.urbanized[i], 
      y: response.year2000.gdp[i],
      name: response.year2000.country[i]
    }
    gdpDataPoints2000.push(gdpDataPoint);

    bubbleDataPoint = {
      x: response.year2000.gdp[i], 
      y: response.year2000.hdi[i],
      z: response.year2000.gii[i],
      name: response.year2000.country[i]
    }
    bubbleDataPoints2000.push(bubbleDataPoint);
  };

  // Loop through the response and create the js objects for the plots for the 2010 year bucket
  for (var i = 0; i < response.year2010.country.length; i++) {
    // dataPoint = [response.year2010.urbanized[i], response.year2010.hdi[i]];
    hdiDataPoint = {
      x: response.year2010.urbanized[i], 
      y: response.year2010.hdi[i],
      name: response.year2010.country[i]
    }
    hdiDataPoints2010.push(hdiDataPoint);

    //GII plot data
    giiDataPoint = {
      x: response.year2010.urbanized[i], 
      y: response.year2010.gii[i],
      name: response.year2010.country[i]
    }
    giiDataPoints2010.push(giiDataPoint);
    
    //GDP per Capita plot data
    gdpDataPoint = {
      x: response.year2010.urbanized[i], 
      y: response.year2010.gdp[i],
      name: response.year2010.country[i]
    }
    gdpDataPoints2010.push(gdpDataPoint);

    bubbleDataPoint = {
      x: response.year2010.gdp[i], 
      y: response.year2010.hdi[i],
      z: response.year2010.gii[i],
      name: response.year2010.country[i]
    }
    bubbleDataPoints2010.push(bubbleDataPoint);
    
  };

  // Loop through the response and create the js objects for the plots for the 2015 year bucket
  for (var i = 0; i < response.year2015.country.length; i++) {
    // dataPoint = [response.year2015.urbanized[i], response.year2015.hdi[i]];
    hdiDataPoint = {
      x: response.year2015.urbanized[i], 
      y: response.year2015.hdi[i],
      name: response.year2015.country[i]
    }
    hdiDataPoints2015.push(hdiDataPoint);
  
    //GII plot data
    giiDataPoint = {
      x: response.year2015.urbanized[i], 
      y: response.year2015.gii[i],
      name: response.year2015.country[i]
    }
    giiDataPoints2015.push(giiDataPoint);
 
    //GDP per Capita plot data
    gdpDataPoint = {
      x: response.year2015.urbanized[i], 
      y: response.year2015.gdp[i],
      name: response.year2015.country[i]
    }
    gdpDataPoints2015.push(gdpDataPoint);

    // Bubble plot data
    bubbleDataPoint = {
      x: response.year2015.gdp[i], 
      y: response.year2015.hdi[i],
      z: response.year2015.gii[i],
      name: response.year2015.country[i]
    }
    bubbleDataPoints2015.push(bubbleDataPoint);

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

  // Create the Data Series object for the hdi plot
  giiSeriesData = [
    {
      name: "1998-2002",
      color: 'rgba(223, 83, 83, 1)',
      data: giiDataPoints2000
    },
    {
      name: "2008-2012",
      color: 'rgba(119, 152, 191, 1)',
      data: giiDataPoints2010
    },
    {
      name: "2013-2017",
      color: 'rgba(20, 175, 160, 1)',
      data: giiDataPoints2015
    }
  ];

  // Create the Data Series object for the hdi plot
  gdpSeriesData = [
    {
      name: "1998-2002",
      color: 'rgba(223, 83, 83, 1)',
      data: gdpDataPoints2000
    },
    {
      name: "2008-2012",
      color: 'rgba(119, 152, 191, 1)',
      data: gdpDataPoints2010
    },
    {
      name: "2013-2017",
      color: 'rgba(20, 175, 160, 1)',
      data: gdpDataPoints2015
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

  // Plot for hdi vs % urbanized
  Highcharts.chart('hdi-container', {
    chart: {
      type: 'scatter',
      zoomType: 'xy'
    },
    title: {
      text: 'HDI vs % Urban for various time periods'
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


  // Plot for GII vs. % urbanized
  Highcharts.chart('gii-container', {
    chart: {
      type: 'scatter',
      zoomType: 'xy'
    },
    title: {
      text: 'GII vs % Urban for various time periods'
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
        text: 'Gender Inequality Index (GII)'
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'bottom',
      x: -10,
      y: -250,
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

    series: giiSeriesData

  });

  // Plot for GII vs. % urbanized
  Highcharts.chart('gdp-container', {
    chart: {
      type: 'scatter',
      zoomType: 'xy'
    },
    title: {
      text: 'GDP vs % Urban for various time periods'
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
        text: 'Gross Domestic Product (GDP) per Capita'
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'bottom',
      x: -10,
      y: -250,
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

    series: giiSeriesData

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
      text: 'HDI, GII vs GDP'
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
});
