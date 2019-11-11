// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['table']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawIncome);
google.charts.setOnLoadCallback(drawVisualization);
google.charts.setOnLoadCallback(drawTableData);

incomeData = convertToObjectList(rawIncomeData).sort(compareEntries);

function getTableData() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', '날짜');
  data.addColumn('string', '지출내역');
  data.addColumn('number', '금액');
  data.addColumn('string', '대분류');
  data.addRows(rawIncomeData);
  return data;
}

function drawIncome() {
  // Create the data table.
  var data = google.visualization.arrayToDataTable(getMostRecentMonthData(incomeData));
  // Set chart options
  var options = {'title':'월 수입'};
  // Instantiate and draw our chart, passing in some options.
  var chart2 = new google.visualization.PieChart(document.getElementById('income_div'));
  chart2.chartArea = {left:0,top:0,width:'100%', height:'100%'}
  chart2.draw(data, options);
}

function drawTableData() {
  var data = getTableData();
  var table = new google.visualization.Table(document.getElementById('table_div'));
  table.draw(data, {showRowNumber: true, width: '100%', height: '100%', sortAscending: true, sortColumn: 0});
}


function drawVisualization() {
  var data = google.visualization.arrayToDataTable(formatToBarChartData(incomeData));

  var options = {
    title : 'Monthly Coffee Production by Country',
    vAxes: [{title: '수입'}, {title: '총 수입'}],
    hAxis: {title: '월'},
    seriesType: 'bars',
    series: {6: {type: 'line', targetAxisIndex: '1'}}
   };

  var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
  chart.draw(data, options);
  google.visualization.events.addListener(chart, 'click', clickHandler);
}

function clickHandler(e) {
  // TODO: Hide the clicked bar
  // if (e.targetID.split("#")[0] == "legendentry") {
  //   console.log("Hello");
  //   console.log(e);
  //   var clickedSeries = e.targetID.split("#")[1]
  //   var data = google.visualization.arrayToDataTable(formatToBarChartData(incomeData));
  //   var options = {
  //     title : 'Monthly Coffee Production by Country',
  //     vAxes: [{title: '수입'}, {title: '총 수입'}],
  //     hAxis: {title: '달'},
  //     seriesType: 'bars',
  //     series: {6: {type: 'line', targetAxisIndex: '1'}}
  //    };
  //   var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
  //   var view = new google.visualization.DataView(data);
  //   view.setColumns([0, 1, 2]);
  //   chart.draw(view, options);
  // }
}

function formatToBarChartData(data) {
  var out = [['날짜', '닭갈비', '부대찌개', '음주류', '사리류', '밥', '막국수', '총합']];
  var list = buildBarChartTable(data);
  for (var i=list.length-6; i < list.length; i++) {
    out.push(list[i]);
  }
  return out;
}

function buildBarChartRow(entry) {
  let row = [];
  row.push(entry.date);
  let values = [
    entry['닭갈비'],
    entry['부대찌개'],
    entry['음주류'],
    entry['사리류'],
    entry['밥'],
    entry['막국수']
  ]
  for (let v of values) {
    row.push(v);
  }
  row.push(values.reduce((a,b) => a + b, 0));
  return row;
}
