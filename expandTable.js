function insertRow() {
  // Find a <table> element with id="colorTable":
  const table = document.getElementById("colorTable");
  const row = document.getElementById("rowIndex");
  const rowIndex = parseInt(row.value);

  // Create an empty <tr> element and add it to the specified position of the table:
  const newRow = table.insertRow(rowIndex);

  const columnCount = table.getAttribute("column");
  let rowCount = table.getAttribute("row");

  for (let i = 0; i < columnCount; i++) {
    const newCell = newRow.insertCell();
    newCell.innerHTML = "*"; // 새 데이터 추가
    newCell.classList.add("colorBox");
  }

  rowCount++;
  table.setAttribute("row", rowCount);
  row.setAttribute("max", rowCount);

  console.log("add new row at: ", rowIndex);

  addClickEventToCells();
}

function insertColumn() {
  const table = document.getElementById("colorTable");
  const col = document.getElementById("colIndex");
  const colIndex = parseInt(col.value);

  const rowCount = table.getAttribute("row");
  let columnCount = table.getAttribute("column");

  // 모든 행에 새로운 셀 추가
  for (let i = 0; i < table.rows.length; i++) {
    const newCell = table.rows[i].insertCell(colIndex);
    newCell.innerHTML = "*"; // 새 데이터 추가
    newCell.classList.add("colorBox");
  }

  columnCount++;
  table.setAttribute("column", columnCount);
  col.setAttribute("max", columnCount);

  console.log("add new column at ", colIndex);

  addClickEventToCells();
}

function delRow() {
  const table = document.getElementById("colorTable");
  const row = document.getElementById("rowIndex");
  const rowIndex = parseInt(row.value);

  let rowCount = table.getAttribute("row");

  table.deleteRow(rowIndex - 1);

  rowCount--;
  table.setAttribute("row", rowCount);
  row.setAttribute("max", rowCount);

  console.log("delete row");
}

function delCol() {
  const table = document.getElementById("colorTable");
  const col = document.getElementById("colIndex");
  const colIndex = parseInt(col.value);

  const rowCount = table.getAttribute("row");
  let columnCount = table.getAttribute("column");

  for (let i = 0; i < rowCount; i++) {
    table.rows[i].deleteCell(colIndex - 1);
  }

  columnCount--;
  table.setAttribute("column", columnCount);
  col.setAttribute("max", columnCount);

  console.log("delete column");
}
