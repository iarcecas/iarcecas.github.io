function drawTable() {
    var rows = document.getElementById("rows").value;
    var columns = document.getElementById("columns").value;
    var table = document.getElementById("table");
    table.innerHTML = "";

    for (var i = 1; i <= rows; i++) {
      var row = table.insertRow();
      for (var j = 1; j <= columns; j++) {
        var cell = row.insertCell();            
        cell.innerHTML = (i * j);
      }
    }
  } 
  drawTable();