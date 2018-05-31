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
  console.log("RESPONSE", response)

  // arrays of data points for the three years for the bubble plot
  giiBubbleDataPoints2000 = [];
  giiBubbleDataPoints2010 = [];
  giiBubbleDataPoints2015 = [];

  // arrays of data points for the three years for the bubble plot
  hdiBubbleDataPoints2000 = [];
  hdiBubbleDataPoints2010 = [];
  hdiBubbleDataPoints2015 = [];

  // Loop through the response and create the js objects for the plots for the 2000 year bucket
  for (var i = 0; i < response.year2000.country.length; i++) {
    // Bubble plot data
    giiBubbleDataPoint = {
      x: response.year2000.gdp[i], 
      y: response.year2000.gii[i],
      name: response.year2000.country[i]
    }
    giiBubbleDataPoints2000.push(giiBubbleDataPoint);

    hdiBubbleDataPoint = {
      x: response.year2000.gdp[i], 
      y: response.year2000.hdi[i],
      name: response.year2000.country[i]
    }
    hdiBubbleDataPoints2000.push(hdiBubbleDataPoint)
  };

  // Loop through the response and create the js objects for the plots for the 2010 year bucket
  for (var i = 0; i < response.year2010.country.length; i++) {
    // Bubble plot data
    giiBubbleDataPoint = {
      x: response.year2010.gdp[i], 
      y: response.year2010.gii[i],
      name: response.year2010.country[i]
    }
    giiBubbleDataPoints2010.push(giiBubbleDataPoint);

    hdiBubbleDataPoint = {
      x: response.year2010.gdp[i], 
      y: response.year2010.hdi[i],
      name: response.year2010.country[i]
    }
    hdiBubbleDataPoints2010.push(hdiBubbleDataPoint)
  };

  // Loop through the response and create the js objects for the plots for the 2015 year bucket
  for (var i = 0; i < response.year2015.country.length; i++) {
    // Bubble plot data
    giiBubbleDataPoint = {
      x: response.year2015.gdp[i], 
      y: response.year2015.gii[i],
      name: response.year2015.country[i]
    }
    giiBubbleDataPoints2015.push(giiBubbleDataPoint);

    hdiBubbleDataPoint = {
      x: response.year2015.gdp[i], 
      y: response.year2015.hdi[i],
      name: response.year2015.country[i]
    }
    hdiBubbleDataPoints2015.push(hdiBubbleDataPoint);

  };

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
  
  // Bubble plot comparing HDI, GII and GDP
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
      text: 'GDP VS HDI'
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
