function insertRow() {
  //   const table = document.getElementById("colorTable");
  //   const rowIndex = parseInt(document.getElementById("rowIndex").value);
  //   const newRow = table.insertRow(rowIndex);

  //   // 새로운 행에 셀 추가
  //   for (let i = 0; i < table.rows[0].cells.length; i++) {
  //     const newCell = newRow.insertCell();
  //     newCell.innerHTML = "새 데이터"; // 새 데이터 추가
  //     console.log("add new row at: ", rowIndex);
  //   }

  // Find a <table> element with id="myTable":
  const table = document.getElementById("colorTable");
  const rowIndex = parseInt(document.getElementById("rowIndex").value);

  // Create an empty <tr> element and add it to the 1st position of the table:
  const row = table.insertRow(rowIndex);

  console.log(table.rows[rowIndex].cells.length);
  // FIXME: always 0: <table> need has width, height attribute

  for (let i = 0; i < table.rows[rowIndex].cells.length; i++) {
    const newCell = newRow.insertCell();
    newCell.innerHTML = "새 데이터"; // 새 데이터 추가
    console.log("add new row at: ", rowIndex);
  }
}

function insertColumn() {
  const table = document.getElementById("colorTable");
  const colIndex = parseInt(document.getElementById("colIndex").value);

  // 모든 행에 새로운 셀 추가
  for (let i = 0; i < table.rows.length; i++) {
    const newCell = table.rows[i].insertCell(colIndex);
    newCell.innerHTML = "새 데이터"; // 새 데이터 추가
    console.log("add new column at ", colIndex);
  }
}
