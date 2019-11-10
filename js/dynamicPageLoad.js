console.log("hello");
document.getElementById("logo").addEventListener("click", function() {
  document.getElementById("main").src = "pages\/home.html";
});
document.getElementById("homeTab").addEventListener("click", function() {
  document.getElementById("main").src = "pages\/home.html";
});
document.getElementById("incomeTab").addEventListener("click", function() {
  document.getElementById("main").src = "pages\/income.html";
});
document.getElementById("expenseTab").addEventListener("click", function() {
  document.getElementById("main").src = "pages\/expenses.html";
});
document.getElementById("detailsTab").addEventListener("click", function() {
  document.getElementById("main").src = "pages\/details.html";
});
