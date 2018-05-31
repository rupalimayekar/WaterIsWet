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
  
  renderSummaryTable(response);  
});


function renderSummaryTable(response) {
    for (var i=0; i<response.length; i++){
        var summaryRow = d3.select("#summary-table-body").append("tr");
        summaryRow.attr("data", response[i]);
        summaryRow.append("td").text(response[i].country);
        summaryRow.append("td").text(parseFloat(response[i].total_pop));
        summaryRow.append("td").text(response[i].urbanized);
        summaryRow.append("td").text(response[i].year_bucket);
        summaryRow.append("td").text(parseFloat(response[i].hdi));
        summaryRow.append("td").text(parseFloat(response[i].gdp));
        summaryRow.append("td").text(parseFloat(response[i].gii));
    }
};

