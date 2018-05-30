/**
 * This javascript file contains the code to draw the scatter plots for GII
 * 
 * @author Rupali Mayekar
 */

/**
 * get the data for HDI vs % urbanized scatter plot and plot it
 */
d3.json('/hdi-gdp-gii-data', function(error, response) {
  if (error) return console.warn(error);
  console.log("RESPONSE", response);
  
  // arrays of data points for the three years for the gii plot
  giiDataPoints2000 = [];
  giiDataPoints2010 = [];
  giiDataPoints2015 = [];

  // arrays of data points for the three years for the bubble plot
  giiBubbleDataPoints2000 = [];
  giiBubbleDataPoints2010 = [];
  giiBubbleDataPoints2015 = [];

  // Loop through the response and create the js objects for the plots for the 2000 year bucket
  for (var i=0; i<response.year2000.country.length; i++) {

    //GII plot data
    giiDataPoint = {
      x: response.year2000.urbanized[i], 
      y: response.year2000.gii[i],
      name: response.year2000.country[i]
    }
    giiDataPoints2000.push(giiDataPoint);

    // Bubble plot data
    giiBubbleDataPoint = {
      x: response.year2000.gdp[i], 
      y: response.year2000.gii[i],
      name: response.year2000.country[i]
    }
    giiBubbleDataPoints2000.push(giiBubbleDataPoint);
  };

  // Loop through the response and create the js objects for the plots for the 2010 year bucket
  for (var i=0; i<response.year2010.country.length; i++) {

    //GII plot data
    giiDataPoint = {
      x: response.year2010.urbanized[i], 
      y: response.year2010.gii[i],
      name: response.year2010.country[i]
    }
    giiDataPoints2010.push(giiDataPoint);

    // Bubble plot data
    giiBubbleDataPoint = {
      x: response.year2010.gdp[i], 
      y: response.year2010.gii[i],
      name: response.year2010.country[i]
    }
    giiBubbleDataPoints2010.push(giiBubbleDataPoint);
  };

  // Loop through the response and create the js objects for the plots for the 2015 year bucket
  for (var i=0; i<response.year2015.country.length; i++) {

    //GII plot data
    giiDataPoint = {
      x: response.year2015.urbanized[i], 
      y: response.year2015.gii[i],
      name: response.year2015.country[i]
    }
    giiDataPoints2015.push(giiDataPoint);

    // Bubble plot data
    giiBubbleDataPoint = {
      x: response.year2015.gdp[i], 
      y: response.year2015.gii[i],
      name: response.year2015.country[i]
    }
    giiBubbleDataPoints2015.push(giiBubbleDataPoint);
  };

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

  // Create the data series object for the bubble plot
  giiBubbleSeriesData = [
    {
      name: "1998-2002",
      color: 'rgba(223, 83, 83, 1)',
      data: giiBubbleDataPoints2000
    },
    {
      name: "2008-2012",
      color: 'rgba(119, 152, 191, 1)',
      data: giiBubbleDataPoints2010
    },
    {
      name: "2013-2017",
      color: 'rgba(20, 175, 160, 1)',
      data: giiBubbleDataPoints2015
    }
  ];

  // Plot for GII vs. % urbanized
  Highcharts.chart('gii-container', {
    chart: {
      type: 'scatter',
      zoomType: 'xy'
    },
    title: {
      text: 'GII vs % Urban Population'
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

   // Scatter plot comparing GDP and GII
  Highcharts.chart('gdp-gii-container', {

    chart: {
      type: 'scatter',
      plotBorderWidth: 1,
      zoomType: 'xy'
    },
  
    legend: {
      enabled: false
    },
  
    title: {
      text: 'GDP VS GII'
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
        text: 'Gender Inequality Index (GII)'
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
  
    series: giiBubbleSeriesData
  
  });
});
