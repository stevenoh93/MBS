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
  var data = google.visualization.arrayToDataTable([
          ['Month', '닭갈비', '부대찌개', '음주류', '사리류', '밥', '막국수'],
          ['2004/05',  165,      938,         522,             998,           450,      614.6],
          ['2005/06',  135,      1120,        599,             1268,          288,      682],
          ['2006/07',  157,      1167,        587,             807,           397,      623],
          ['2007/08',  139,      1110,        615,             968,           215,      609.4],
          ['2008/09',  136,      691,         629,             1026,          366,      569.6]
        ]);

  var options = {
    title : 'Monthly Coffee Production by Country',
    vAxis: {title: '수입'},
    hAxis: {title: '달'},
    seriesType: 'bars',
    series: {5: {type: 'line'}}
   };

  var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

function getMostRecentMonthData(data) {
  var i = data.length - 1;
  var lastMonth = data[i].date;
  var recentMonth = [['Task', 'Income per Category']];
  while (data[i].date == lastMonth) {
    recentMonth.push([data[i].category, data[i].value['v']]);
    i--;
  }
  return recentMonth;
}

function formatToBarChartData(data) {
  var out = [];
  for (var i = 0; i < data.length; i++) {
    var date = data[i][0];
    var monthData = [date];
    while (data[i][0] == date) {
      monthData.append()
    }
  }
}
