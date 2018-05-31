/**
 * This javascript file contains the code to render the data table on the data page
 * 
 * @author Rupali Mayekar
 */

/**
 * get the data for the summary table
 */
d3.json('/summary-table-data', function(error, response) {
    if (error) return console.warn(error);
    console.log("RESPONSE", response);
  
    renderSummaryTable(response, "2013-2017");  

    // click handler for the dropdown items
    d3.select("#year-list").selectAll("li").on("click", function(){
        renderSummaryTable(response, d3.select(this).select("a").text())
    });
});

/**
 * 
 * @param {*} response - the response containing the data
 * @param {*} yearSelection - the year range for which the data is shown 
 */
function renderSummaryTable(response, yearSelection) {
    d3.select("#year-text").html("Showing data for the year range: " + yearSelection);

    for (var i=0; i<response.length; i++) {
        var yearBucket = response[i].year_bucket;
        var yearData = response[i].data;

        if (yearBucket == yearSelection) {

            // clear existing rows
            var $tbody = d3.select("#summary-table-body");
            $tbody.html("");
            
            // loop through the data and add it to the table
            for (var j=0; j<yearData.length; j++) {
                var $summaryRow = $tbody.append("tr");

                $summaryRow.attr("data", response[i]);

                // add the cells such that numeric values have 2 decimal places
                $summaryRow.append("td").text(yearData[j].country);
                $summaryRow.append("td").text((yearData[j].pop_density) ? yearData[j].pop_density.toFixed(2) : null);
                $summaryRow.append("td").text((yearData[j].urbanized) ? yearData[j].urbanized.toFixed(2) : null);
                $summaryRow.append("td").text((yearData[j].hdi) ? yearData[j].hdi.toFixed(2) : null);
                $summaryRow.append("td").text((yearData[j].gdp) ? yearData[j].gdp.toFixed(2) : null);
                $summaryRow.append("td").text((yearData[j].gii) ? yearData[j].gii.toFixed(2) : null);            
                $summaryRow.append("td").text((yearData[j].water_stress) ? yearData[j].water_stress.toFixed(2) : null);            
                $summaryRow.append("td").text((yearData[j].perc_cultivated) ? yearData[j].perc_cultivated.toFixed(2) : null);            
                $summaryRow.append("td").text((yearData[j].perc_safe_water) ? yearData[j].perc_safe_water.toFixed(2) : null);            
                $summaryRow.append("td").text((yearData[j].perc_undernourish) ? yearData[j].perc_undernourish.toFixed(2) : null);        
            };
        };
    };
};