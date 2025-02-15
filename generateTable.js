// 2차원 배열을 HTML 테이블로 변환하는 함수
function generateTable(data) {
  const tableContainer = document.getElementById("tableContainer");
  tableContainer.innerHTML = ""; // 이전 테이블 내용 제거

  const table = document.createElement("table");
  table.id = "colorTable";

  // 최대 열 수 계산
  const maxColumns = Math.max(...data.map((row) => row.length));
  // max row
  const rowCount = data.length;

  table.setAttribute("row", rowCount);
  table.setAttribute("column", maxColumns);

  const rowIndexInput = document.getElementById("rowIndex");
  const colIndexInput = document.getElementById("colIndex");
  rowIndexInput.setAttribute("max", rowCount);
  rowIndexInput.setAttribute("value", rowCount);
  colIndexInput.setAttribute("max", maxColumns);
  colIndexInput.setAttribute("value", maxColumns);

  data.forEach((row) => {
    const tr = document.createElement("tr"); // 행 생성
    row.forEach((cell) => {
      const td = document.createElement("td"); // 셀 생성

      addInnerHTML(td, cell);
      td.classList.add("colorBox");

      if (cell.length > 0) {
        td.id = "z" + cell.slice(1).toUpperCase();
        td.style.backgroundColor = cell;
        td.style.color = "#" + contrastingColor(cell.slice(1));
      } else {
        td.innerHTML = "<p>*</p>";
      }

      tr.appendChild(td); // 행에 셀 추가
    });

    // 빈 셀 추가
    const emptyCellsCount = maxColumns - row.length;
    for (let i = 0; i < emptyCellsCount; i++) {
      const emptyTd = document.createElement("td"); // 빈 셀 생성
      emptyTd.classList.add("colorBox");
      emptyTd.innerHTML = "<p>*</p>";
      tr.appendChild(emptyTd); // 행에 빈 셀 추가
    }

    table.appendChild(tr); // 테이블에 행 추가
  });

  tableContainer.appendChild(table); // 테이블을 컨테이너에 추가

  addClickEventToCells();
}

function addInnerHTML(obj, code) {
  if (code) {
    obj.innerHTML = `<p class="colorName">${
      ntc.name(code)[1]
    }</p><p class="colorCode">${code.toUpperCase()}</p>`;
  }
}
