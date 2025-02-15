document.getElementById("fileOutput").addEventListener("click", function () {
  // 테이블 요소 선택
  const table = document.getElementById("colorTable");

  if (!table) {
    console.log("no data exist");
    return; // 함수 종료
  }

  // 이중 배열 초기화
  const array2D = [];

  // 테이블의 각 행을 반복
  for (let i = 0; i < table.rows.length; i++) {
    const row = table.rows[i];
    const rowArray = []; // 각 행에 대한 배열 초기화

    // 각 행의 셀을 반복
    for (let j = 0; j < row.cells.length; j++) {
      const cell = row.cells[j];
      // 셀의 id를 사용하여 값을 배열에 추가
      let id = cell.id;
      if (id) {
        id = "#" + id.slice(1);
      } else {
        id = "";
      }
      rowArray.push(id);
    }

    // 행 배열을 이중 배열에 추가
    array2D.push(rowArray);
  }

  // 결과 출력
  //   console.log(array2D);

  const csvData = convert2CSV(array2D);
  //   console.log(csvData);

  downloadCSV(csvData);
});

function convert2CSV(arr) {
  let lines = [];
  for (let i = 0; i < arr.length; i++) {
    lines.push(arr[i].join(",").replace(/"/g, ""));
  }
  let line = lines.join("\n");

  return line;
}

function downloadCSV(data) {
  const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "Color_Collecting.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
