document.getElementById("fileOutput").addEventListener("click", function () {
  // 테이블 요소 선택
  const table = document.getElementById("colorTable");

  if (!table) {
    console.log("no data exist");
    return; // 함수 종료
  }

  // 이중 배열 초기화
  let array2D = [];

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

  // remove empty last row column
  array2D = removeEmptyLastColumn(array2D);
  array2D = removeEmptyLastRow(array2D);

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

function removeEmptyLastRow(data) {
  // 마지막 행이 빈 문자열로만 이루어져 있는지 확인
  const lastRowIndex = data.length - 1; // 마지막 행의 인덱스
  if (
    lastRowIndex >= 0 &&
    data[lastRowIndex].every((cell) => cell.trim() === "")
  ) {
    return data.slice(0, lastRowIndex); // 마지막 행을 제외한 새로운 배열 반환
  }
  return data; // 마지막 행이 비어있지 않으면 원본 데이터 반환
}

function removeEmptyLastColumn(data) {
  // 마지막 열이 빈 문자열로만 이루어진 경우 해당 열을 삭제
  const lastColumnIndex = data[0].length - 1; // 마지막 열의 인덱스
  const isLastColumnEmpty = data.every(
    (row) => row[lastColumnIndex].trim() === ""
  ); // 모든 행의 마지막 열이 빈 문자열인지 확인

  if (isLastColumnEmpty) {
    return data.map((row) => row.slice(0, lastColumnIndex)); // 마지막 열을 제외한 새로운 배열 반환
  }

  return data; // 마지막 열이 비어있지 않으면 원본 데이터 반환
}
