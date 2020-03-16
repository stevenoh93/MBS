// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['table']});

document.addEventListener('keydown', onKeyPressed);

var rawIncomeData;
var tableVisual;

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(refreshIncomeData);

function refreshIncomeData() {
  getRequest('/getIncome', function(data) {
    rawIncomeData = JSON.parse(data).income;
    incomeData = convertToObjectList(rawIncomeData).sort(compareEntries);
    tableVisual = new google.visualization.Table(document.getElementById('table_div'));
    drawIncome();
    drawTableData();
    drawVisualization();
  })
}

function getTableData() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', '날짜');
  data.addColumn('string', '수입내역');
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
  tableVisual.draw(data, {showRowNumber: true, width: '100%', height: '100%', sortAscending: true, sortColumn: 0});
}

function drawVisualization() {
  var data = google.visualization.arrayToDataTable(formatToBarChartData(incomeData));
  var options = {
    title : '분류별 월 수입',
    vAxes: [{title: '수입'}, {title: '총 수입'}],
    hAxis: {title: '월'},
    seriesType: 'bars',
    series: {6: {type: 'line', targetAxisIndex: '1'}}
   };
   var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
   chart.draw(data, options);
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

function onNewIncomeInput(entry) {
  date = entry[0].split("=")[1];
  category = entry[1].split("=")[1]
  name = category + " 수입 합계";
  value = entry[2].split("=")[1];
  // save this data
  postRequest(
    '/newIncome',
    JSON.stringify(newFormattedEntry(date, name, value, category)),
    function (data) {}
  );
}

$(document).ready(function(){
	$("#income-input-form").submit(function(event){
    inputDataString = decodeURIComponent($('#income-input-form').serialize());
		onNewIncomeInput(inputDataString.split("&"));
		return true;
	});
});

$(function() {
  $( "#income-date-input" ).datepicker({
    dateFormat:'yy-mm-dd'
  });
});

function onKeyPressed(e) {
  if (e.key == "Delete") {
      onDeleteKeyPressed(e);
  }
}

/*
  Delete key event
*/
function onDeleteKeyPressed(e) {
  console.log("Hello");

  var selection = tableVisual.getSelection();
  console.log(selection);
  okay = confirm("선택된 줄을 지우시겠습니까?")
  if (okay) {
    // save this data
    postRequest(
      '/deleteIncome',
      JSON.stringify(formatDeletePayload(selection)),
      function (data) {refreshIncomeData();}
    );
  }
}
