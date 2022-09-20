window.addEventListener("DOMContentLoaded", () => {
  const tiles = document.querySelectorAll(".tile");

  let round = true;

  const player_X = "X";
  const player_O = "O";

  const positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  document.addEventListener("click", (e) => {
    if (e.target.matches(".tile")) {
      play(e.target.id);
    }
  });

  function play(id) {
    const tile = document.getElementById(id);
    check = round ? player_X : player_O;

    tile.textContent = check;
    tile.classList.add(check);
    checkWin(check);
  }

  function checkWin(check) {
    const win = positions.some((p) => {
      return p.every((index) => {
        return tiles[index].classList.contains(check);
      });
    });

    if (win) {
      endGame(check);
    } else if (checkEqual()) {
      endGame();
    } else {
      round = !round;
    }
  }

  function checkEqual(index) {
    let x = 0;
    let o = 0;

    for (index in tiles) {
      if (!isNaN(index)) {
        if (tiles[index].classList.contains(player_X)) {
          x++;
        }

        if (tiles[index].classList.contains(player_O)) {
          o++;
        }
      }
    }
    return x + o === 9 ? true : false;
  }

  function endGame(win = null) {
    if (win) {
      const pWin = document.createElement("p");
      pWin.innerHTML = `Player WIN ${win}`;
      document.body.appendChild(pWin);
    } else {
      const pEqual = document.createElement("p");
      console.log("Empate");
      pEqual.innerHTML = "Empate";
      document.body.appendChild(pEqual);
    }
  }

  const btnReset = document.getElementById("reset");
  
  function reset() {
   tiles.forEach((index) => {
    index.innerHTML = "";
   })
  }
  btnReset.addEventListener("click", reset);
});
