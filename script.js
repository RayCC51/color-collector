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
        generateTable(parsedData); // 테이블 생성 함수 호출
      };

      // 파일을 텍스트로 읽기
      reader.readAsText(file);
    } else {
      document.getElementById("fileInfo").innerText = "no file.";
    }
  });

// 2차원 배열을 HTML 테이블로 변환하는 함수
function generateTable(data) {
  const tableContainer = document.getElementById("tableContainer");
  tableContainer.innerHTML = ""; // 이전 테이블 내용 제거

  const table = document.createElement("table");
  table.id = "colorTable";

  data.forEach((row) => {
    const tr = document.createElement("tr"); // 행 생성
    row.forEach((cell) => {
      const td = document.createElement("td"); // 셀 생성

      addInnerHTML(td, cell);
      td.classList.add("colorBox");

      if (cell.length > 0) {
        td.id = "z" + cell.slice(1).toUpperCase();
        td.style.backgroundColor = cell;
      }

      tr.appendChild(td); // 행에 셀 추가
    });
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
        }
      });
    }); // 클릭 이벤트 리스너 종료
  }); // forEach 종료
}
