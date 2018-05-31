/**
 * This javascript file contains the code to render the summary table on the summary page
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

    d3.select("#year-list").selectAll("li").on("click", function(){
        renderSummaryTable(response, d3.select(this).select("a").text())
    });
});


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
                $summaryRow.append("td").text(yearData[j].country);
                $summaryRow.append("td").text(yearData[j].pop_density);
                $summaryRow.append("td").text(yearData[j].urbanized);
                $summaryRow.append("td").text(yearData[j].hdi);
                $summaryRow.append("td").text(yearData[j].gdp);
                $summaryRow.append("td").text(yearData[j].gii);            
                $summaryRow.append("td").text(yearData[j].water_stress);            
                $summaryRow.append("td").text(yearData[j].perc_cultivated);            
                $summaryRow.append("td").text(yearData[j].perc_safe_water);            
                $summaryRow.append("td").text(yearData[j].perc_undernourish);        
            }
        }

    }
    // for (var i=0; i<response.length; i++){
    //     var summaryRow = d3.select("#summary-table-body").append("tr");
    //     summaryRow.attr("data", response[i]);
    //     summaryRow.append("td").text(response[i].country);
    //     summaryRow.append("td").text(response[i].total_pop);
    //     summaryRow.append("td").text(response[i].urbanized);
    //     summaryRow.append("td").text(response[i].year_bucket);
    //     summaryRow.append("td").text(response[i].hdi);
    //     summaryRow.append("td").text(response[i].gdp);
    //     summaryRow.append("td").text(response[i].gii);
    // }
};

// rowdict = {
//     "country": result[0],
//     "pop_density": result[1],
//     "urbanized": result[2],
//     "gdp": result[3],
//     "hdi": result[4],
//     "gii": result[5],
//     "water_stress": result[6],
//     "perc_cultivated": result[7],
//     "perc_safe_water": result[8],
//     "perc_undernourish": result[9]
//   }
//   year_summary_data.append(rowdict)
