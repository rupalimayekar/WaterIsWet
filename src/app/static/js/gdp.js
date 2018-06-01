/**
 * This javascript file contains the code to draw the scatter plots of gdp vs. % Urbanized
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
  
  // arrays of data points for the three years for the gii plot
  gdpDataPoints2000 = [];
  gdpDataPoints2010 = [];
  gdpDataPoints2015 = [];

    // Loop through the response and create the js objects for the plots for the 2000 year bucket
  for (var i=0; i<response.year2000.country.length; i++) {
    //GDP per Capita plot data
    gdpDataPoint = {
      x: response.year2000.urbanized[i], 
      y: response.year2000.gdp[i],
      name: response.year2000.country[i]
    }
    gdpDataPoints2000.push(gdpDataPoint);

  };

  // Loop through the response and create the js objects for the plots for the 2010 year bucket
  for (var i=0; i<response.year2010.country.length; i++) {    
    //GDP per Capita plot data
    gdpDataPoint = {
      x: response.year2010.urbanized[i], 
      y: response.year2010.gdp[i],
      name: response.year2010.country[i]
    }
    gdpDataPoints2010.push(gdpDataPoint);

  };

  // Loop through the response and create the js objects for the plots for the 2015 year bucket
  for (var i=0; i<response.year2015.country.length; i++) {
    //GDP per Capita plot data
    gdpDataPoint = {
      x: response.year2015.urbanized[i], 
      y: response.year2015.gdp[i],
      name: response.year2015.country[i]
    }
    gdpDataPoints2015.push(gdpDataPoint);
  };

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

  // Plot for GII vs. % urbanized
  Highcharts.chart('gdp-container', {
    chart: {
      type: 'scatter',
      zoomType: 'xy'
    },
    title: {
      text: 'GDP per Capita vs % Urban Population'
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

    series: gdpSeriesData

  });
  

});

d3.json('/gdp-water-data', function(error, response) {
  if (error) return console.warn(error);
  console.log("RESPONSE", response);
  
  // arrays of data points for the three years for the gii plot
  safeWaterDataPoints2000 = [];
  safeWaterDataPoints2010 = [];
  safeWaterDataPoints2015 = [];

  // arrays of data points for the three years for the gii plot
  dependencyRatioDataPoints2000 = [];
  dependencyRatioDataPoints2010 = [];
  dependencyRatioDataPoints2015 = [];

  // Loop through the response and create the js objects for the plots for the 2000 year bucket
  for (var i=0; i<response.year2000.country.length; i++) {
    //Safe Water plot data
    var gdpDataPoint = {
      x: response.year2000.safewater[i], 
      y: response.year2000.gdp[i],
      name: response.year2000.country[i]
    }
    safeWaterDataPoints2000.push(gdpDataPoint);

    //Water Stress plot data
    var dependencyRatioDataPoint = {
      x: response.year2000.dependencyratio[i], 
      y: response.year2000.gdp[i],
      name: response.year2000.country[i]
    }
    dependencyRatioDataPoints2000.push(dependencyRatioDataPoint);
  };

  // Loop through the response and create the js objects for the plots for the 2010 year bucket
  for (var i=0; i<response.year2010.country.length; i++) {    
    //GDP per Capita plot data
    var gdpDataPoint = {
      x: response.year2010.safewater[i], 
      y: response.year2010.gdp[i],
      name: response.year2010.country[i]
    }
    safeWaterDataPoints2010.push(gdpDataPoint);

    //Water Stress plot data
    var dependencyRatioDataPoint = {
      x: response.year2010.dependencyratio[i], 
      y: response.year2010.gdp[i],
      name: response.year2010.country[i]
    }
    dependencyRatioDataPoints2010.push(dependencyRatioDataPoint);
  };

  // Loop through the response and create the js objects for the plots for the 2015 year bucket
  for (var i=0; i<response.year2015.country.length; i++) {
    //GDP per Capita plot data
    var gdpDataPoint = {
      x: response.year2015.safewater[i], 
      y: response.year2015.gdp[i],
      name: response.year2015.country[i]
    }
    safeWaterDataPoints2015.push(gdpDataPoint);

    //Water Stress plot data
    var dependencyRatioDataPoint = {
      x: response.year2015.dependencyratio[i], 
      y: response.year2015.gdp[i],
      name: response.year2015.country[i]
    }
    dependencyRatioDataPoints2015.push(dependencyRatioDataPoint);
  };

  // Create the Data Series object for the safe water plot
  var safeWaterSeriesData = [
    {
      name: "1998-2002",
      color: 'rgba(223, 83, 83, 1)',
      data: safeWaterDataPoints2000
    },
    {
      name: "2008-2012",
      color: 'rgba(119, 152, 191, 1)',
      data: safeWaterDataPoints2010
    },
    {
      name: "2013-2017",
      color: 'rgba(20, 175, 160, 1)',
      data: safeWaterDataPoints2015
    }
  ];

  // Create the Data Series object for the water stress plot
  var dependencyRatioSeriesData = [
    {
      name: "1998-2002",
      color: 'rgba(223, 83, 83, 1)',
      data: dependencyRatioDataPoints2000
    },
    {
      name: "2008-2012",
      color: 'rgba(119, 152, 191, 1)',
      data: dependencyRatioDataPoints2010
    },
    {
      name: "2013-2017",
      color: 'rgba(20, 175, 160, 1)',
      data: dependencyRatioDataPoints2015
    }
  ];

  // Plot for GDP vs. % safe water
  Highcharts.chart('gdp-safe-water-container', {
    chart: {
      type: 'scatter',
      zoomType: 'xy'
    },
    title: {
      text: 'GDP per Capita vs % Population with access to Safe Water'
    },
    subtitle: {
      text: 'Source: Aquastat'
    },
    xAxis: {
      title: {
        enabled: true,
        text: '% Population with access to Safe Water'
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

    series: safeWaterSeriesData

  });
  
  // GDP vs water stress
  Highcharts.chart('gdp-dependency-ratio-container', {
    chart: {
      type: 'scatter',
      zoomType: 'xy'
    },
    title: {
      text: 'GDP per Capita vs Dependency Ratio'
    },
    subtitle: {
      text: 'Source: Aquastat'
    },
    xAxis: {
      title: {
        enabled: true,
        text: 'Dependency Ratio'
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

    series: dependencyRatioSeriesData

  });

});
