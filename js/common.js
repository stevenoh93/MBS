// Data format
// class Entry {
//   string date // 'YYYY/MM/DD'
//   string name
//   map value // {v: 12345, f: '$12,345' }
//   string category
// }

var CATEGORY_ORDER = {
  '닭갈비': 1,
  '부대찌개': 2,
  '음주류': 3,
  '사리류': 4,
  '밥': 5,
  '맘국수': 6
};

const formatter = new Intl.NumberFormat('ja-JP', {
  style: 'currency',
  currency: 'KRW',
  minimumFractionDigits: 0
});

function formatDeletePayload(selection) {
  var payload = {startIndex: selection[0].row, lastIndex: selection[0].row};
  return payload;
}

function newFormattedEntry(date, name, value, category) {
  return [date.replace(/-/g, "/"), name, {v: parseInt(value), f: String(formatter.format(value))}, category];
}

function addRawIncome(date, name, value, category) {
  entry = [date, name, {v: parseInt(value), f: String(formatter.format(value))}, category];
  rawIncomeData.push(entry);
}

function compareEntries(e1, e2) {
  let ret = 0;
  if (e1.date == e2.date) {
    e1Val = CATEGORY_ORDER[e1.category];
    e2Val = CATEGORY_ORDER[e2.category];
    if(e1Val < e2Val) return ret = -1;
    if(e2Val < e1Val) return ret = 1;
  } else {
    if (e1.date < e2.date) return ret = -1;
    else return ret = 1;
  }
  return ret;
}

function convertToObjectList(list) {
  let out = [];
  for (let item of list) {
    out.push({
      date: item[0],
      name: item[1],
      value: item[2],
      category: item[3]
    });
  }
  return out;
}

// Gets the last month's data as a list, given list is sorted in ascending date
function getMostRecentMonthData(data) {
  var i = data.length - 1;
  var lastMonth = data[i].date;
  var recentMonth = [['Task', 'Category']];
  while (data[i].date == lastMonth) {
    recentMonth.push([data[i].category, data[i].value['v']]);
    i--;
  }
  return recentMonth;
}

// Aggergate multiple rows of monthly data to single row
function buildBarChartTable(data) {
  var out = [];
  for (var i=0; i < data.length; i++) {
    var date = data[i].date;
    var monthEntry = {date: date};
    while (i < data.length && data[i].date == date) {
      monthEntry[data[i].category] = data[i].value['v'];
      i++;
    }
    out.push(buildBarChartRow(monthEntry));
    i--;
  }
  return out;
}

function postRequest(url, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type","application/json");
  xhr.onreadystatechange = function() {
    callback(xhr.responseText);
  };
  console.log("data= " + data);
  xhr.send(data);
}

function getRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-type","application/json");
  xhr.onreadystatechange = function() {
    callback(xhr.responseText);
  };
  xhr.send();
}
