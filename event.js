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
      this.innerHTML = "#";
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
              this.innerHTML = "*";
              this.id = "";
              this.removeAttribute("style");
            }
          } else {
            this.innerHTML = "#" + currentId; // 유효하지 않은 경우 원래 ID로 복원
          }
        } else {
          this.innerHTML = "*";
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
