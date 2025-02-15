// hide text button
document.getElementById("hideText").addEventListener("click", function () {
  const tds = document.querySelectorAll("td");

  tds.forEach((td) => {
    const paragraphs = td.querySelectorAll("p");
    paragraphs.forEach((p) => {
      // console.log(p.textContent); // 각 p 요소의 텍스트를 출력

      if (p.hasAttribute("hidden")) {
        p.removeAttribute("hidden");
      } else {
        p.setAttribute("hidden", "");
      }
    });
  });
});

// clear table
document.getElementById("clearTable").addEventListener("click", function () {
  const initFile = "init.csv"; // 초기화할 CSV 파일 경로

  // fetch를 사용하여 init.csv 파일을 읽기
  fetch(initFile)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text(); // 파일 내용을 텍스트로 변환
    })
    .then((csvData) => {
      const parsedData = CSVToArray(csvData); // CSV 파싱
      generateTable(parsedData); // 테이블 생성 함수 호출
    })
    .catch((error) => {
      console.error("Error fetching the CSV file:", error);
    });
});

// 페이지가 로드될 때 sample.csv 파일을 자동으로 읽어오기
window.onload = function () {
  const initFile = "sample.csv"; // 초기화할 CSV 파일 경로

  // fetch를 사용하여 sample.csv 파일을 읽기
  fetch(initFile)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text(); // 파일 내용을 텍스트로 변환
    })
    .then((csvData) => {
      const parsedData = CSVToArray(csvData); // CSV 파싱
      const filteredData = removeEmptyLastRow(parsedData);
      generateTable(filteredData); // 테이블 생성 함수 호출
    })
    .catch((error) => {
      console.error("Error fetching the CSV file:", error);
    });
};

// open file
document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const fileInput = event.target;
    const files = fileInput.files;

    if (files.length > 0) {
      const file = files[0]; // 첫 번째 파일 선택
      const reader = new FileReader();

      // 파일이 성공적으로 읽히면 이 함수가 호출됩니다.
      reader.onload = function (e) {
        const csvData = e.target.result; // 파일 내용 가져오기
        const parsedData = CSVToArray(csvData); // CSV 파싱
        // generateTable(parsedData); // 테이블 생성 함수 호출
        const filteredData = removeEmptyLastRow(parsedData);
        generateTable(filteredData); // 테이블 생성 함수 호출
      };

      // 파일을 텍스트로 읽기
      reader.readAsText(file);
    } else {
      document.getElementById("fileInfo").innerText = "no file.";
    }
  });

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

// 2차원 배열을 HTML 테이블로 변환하는 함수
function generateTable(data) {
  const tableContainer = document.getElementById("tableContainer");
  tableContainer.innerHTML = ""; // 이전 테이블 내용 제거

  const table = document.createElement("table");
  table.id = "colorTable";

  // 최대 열 수 계산
  const maxColumns = Math.max(...data.map((row) => row.length));

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
      }

      tr.appendChild(td); // 행에 셀 추가
    });

    // 빈 셀 추가
    const emptyCellsCount = maxColumns - row.length;
    for (let i = 0; i < emptyCellsCount; i++) {
      const emptyTd = document.createElement("td"); // 빈 셀 생성
      emptyTd.classList.add("colorBox");
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

function addClickEventToCells() {
  // td clickable
  // 모든 td 요소 선택
  const cells = document.querySelectorAll(".colorBox");

  // 각 td 요소에 클릭 이벤트 리스너 추가
  cells.forEach((cell) => {
    cell.addEventListener("click", function () {
      console.log("click", this.id);
      // 현재 ID 값 저장
      const currentId = this.id.slice(1);

      // 입력 필드 생성
      const input = document.createElement("input");
      input.classList.add("inputColor");
      input.type = "text";
      input.value = currentId; // 현재 ID 값을 입력 필드에 설정
      input.style.width = "100%"; // 입력 필드 너비 100%

      // 셀의 내용을 비우고 입력 필드 추가
      this.innerHTML = "";
      this.appendChild(input);

      // 입력 필드에 포커스
      input.focus();
      input.select();

      // 입력 필드에서 포커스 아웃 시 ID 수정
      input.addEventListener("blur", () => {
        let newId = input.value.trim(); // 입력값 가져오기

        console.log("new id input: ", newId);
        // setColor(cell, newId);
        // 입력값이 유효한 경우 ID 수정
        if (newId) {
          if (newId.startsWith("#")) {
            newId = newId.slice(1);
          }
          if (newId) {
            // length check
            if (newId.length > 6) {
              newId = newId.slice(0, 6);
            } else if (newId.length === 6) {
              newId = newId;
            } else if (newId.length === 3) {
              newId = newId
                .split("")
                .map((char) => char.repeat(2))
                .join("");
            } else {
              newId = "xxxxxx";
            }

            // if it hex code?
            if (/^[0-9a-fA-F]+$/.test(newId)) {
              this.id = "z" + newId.toUpperCase();
              this.style.backgroundColor = "#" + newId;
              this.style.color = "#" + contrastingColor(newId);
              addInnerHTML(this, "#" + newId);
            } else {
              console.log("invalid color: ", newId);
              // remove
              this.innerHTML = "";
              this.id = "";
              this.removeAttribute("style");
            }
          } else {
            this.innerHTML = "#" + currentId; // 유효하지 않은 경우 원래 ID로 복원
          }
        } else {
          this.innerHTML = "";
          this.removeAttribute("id");
          this.removeAttribute("style");
        }
      }); // blur 이벤트 리스너 종료

      // Enter 키를 눌렀을 때도 ID 수정
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          input.blur(); // 포커스 아웃
        } else if (event.key === "Escape") {
          // Esc 키를 눌렀을 때 원래 ID로 복원
          this.innerHTML = "#" + currentId; // 원래 ID로 복원

          this.style.backgroundColor = "#" + currentId;
          this.style.color = contrastingColor(currentId);
          addInnerHTML(this, "#" + currentId);
        }
      });
    }); // 클릭 이벤트 리스너 종료
  }); // forEach 종료
}
