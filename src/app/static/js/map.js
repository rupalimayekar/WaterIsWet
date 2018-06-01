// Managing Slider - Refer to Slider for Bootstrap (bootstrap-slider.js)
    var $slider = new Slider("#yearRange", {
        ticks:[2000,2005,2010,2015],
        ticks_labels:["2000","2005","2010","2015"],
        ticks_snap_bounds:2        
        });

    $slider.on("slideStop",function(sliderValue){
        document.getElementById("sliderValue").textContent = sliderValue;
        var updateYear = "year"+sliderValue;
        console.log("UpdateYear:"+updateYear)
        drawMap(updateYear);
        defaultYear=updateYear;
        console.log("Default Update To:"+defaultYear);
    });  
    
    
// Set Default Topic, Default Year and Title Dictionary
    var defaultYear = "year2015";
    var defaultTopic = "gii";
    var title_dict = {"gii":"Gender Inequality Index","hdi":"Human Development Index","pop_density":"Population Density (inhab/km2)","gdp_per_cap":"GDP Per Capita ($USD/inhab)","perc_safe_water":"Access to Safe Drinking Water (% of Population)"};
    var scaleType_dict = {"gii":"scalar","hdi":"scalar","perc_safe_water":"logarithmic","pop_density":"logarithmic","gdp_per_cap":"scalar"};

// Draw Map Function
    function drawMap(defaultYear) {

        query_url = '/summarymap/'+defaultTopic;
        console.log(query_url);
        d3.json(query_url,function(error,response){
            if (error) console.log("Error Accessing URL");
            console.log(response);
            var code =[];
            var value =[];
            var code = response[defaultYear]['country_code'];
            var value = response[defaultYear]['value'];
            var min_value = Math.min.apply(Math,value);
            var max_value = Math.max.apply(Math,value);
            console.log("Max is:" + max_value);
            console.log("Min is:"+ min_value);
            var data =[];
            for (i=0;i<code.length;i++) {data.push({"code":code[i],"value":value[i]});}            

            console.log(data);

            var topicMap = Highcharts.mapChart('summary_map',{
                chart:{map:'custom/world',borderWidth:1},
                title:{text:title_dict[defaultTopic]},            
                exporting:{sourceWidth:600,sourceHeight:500},
                legend: {
                    layout: 'horizontal',
                    borderWidth: 0,
                    backgroundColor: 'rgba(255,255,255,0.85)',
                    floating: true,
                    verticalAlign: 'bottom',
                    align: 'left',
                    y: 0,
                    x: 25

                },
                mapNavigation: {
                    enabled: true
                },
                colorAxis: {
                    min: min_value,
                    max: max_value,
                    type: scaleType_dict[defaultTopic]
        
                    
                },
                series: [{
                    animation: {
                        duration: 1000
                    },
                    data: data,
                    joinBy: ['iso-a2', 'code'],
                    dataLabels: {
                        enabled: true,
                        color: '#FFFFFF',
                        format: '{point.code}'
                    },
                    name: defaultTopic,
                    tooltip: {pointFormat: '{point.code}: {point.value}'}
                }]
        })
        })
        }

    drawMap(defaultYear);

// Update Map when Population Density is Clicked
    var $popdensity=document.getElementById("pop");
    $popdensity.addEventListener("click",function () {
        defaultTopic="pop_density";
        drawMap(defaultYear);
        console.log("Default Topic Updated to:"+ defaultTopic);
    })

// Update Map when HDI is Clicked
    var $hdi = document.getElementById("hdi");
    $hdi.addEventListener("click",function() {
        defaultTopic="hdi";
        drawMap(defaultYear);
        console.log("Default Topic Updated to:"+defaultTopic);
    })

// Update Map when GDP is Clicked
    var $gdp = document.getElementById("gdp");
    $gdp.addEventListener("click",function() {
        defaultTopic="gdp_per_cap";
        drawMap(defaultYear);
        console.log("Default Topic Updated to:"+defaultTopic);
    })

// Update Map when GII is Clicked
    var $gii = document.getElementById("gii");
    $gii.addEventListener("click",function() {
        defaultTopic="gii";
        drawMap(defaultYear);
        console.log("Default Topic Updated to:"+defaultTopic);
    })
// Update Map when Water is Clicked
    var $safewater = document.getElementById("safewater");
    $safewater.addEventListener("click",function() {
        defaultTopic="perc_safe_water";
        drawMap(defaultYear);
        console.log("Default Topic Updated to:"+defaultTopic);
    })