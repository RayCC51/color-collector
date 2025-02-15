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
