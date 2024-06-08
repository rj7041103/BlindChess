/* useEffect(() => {
    const handleKeyDown = (event) => {
      // Aquí capturarás la entrada del teclado
      const keyValue = isNaN(event.key) ? event.key : parseInt(event.key, 10);
      if (!array.includes(keyValue)) {
        return;
      }

      move_str += event.key;
      console.log(move_str);
      if (move_str.length % 2 == 0) {
        console.log("la cadena se completo");
        if (band == 0) {
          source += move_str;
          band = 1;
          leerPosicion(getPieceAtSquare(source), source);
          move_str = "";
        } else {
          target += move_str;
          band = 0;
          move_str = "";
        }
        console.log("source:", source);
        console.log("target:", target);
        if (source.length == 2 && target.length == 2) {
          if (!game.isGameOver()) {
            try {
              const moveResult = game.move({
                from: source,
                to: target,
                promotion: "q", // Promoción a reina
              });
              makeRandomMovement();
              if (moveResult) {
                // Crea una nueva instancia de Chess con el estado FEN actualizado
                const newGame = new Chess(game.fen());
                // Actualiza el estado del juego con la nueva instancia
                setGame(newGame);
                source = "";
                target = "";
              } else {
                leerText("Movimiento inválido");
                console.log("Movimiento inválido");
              }
              leerText(`su pieza se ha movido`);
            } catch (error) {
              leerText(`El movimiento ${source} a ${target} no es valido`);
            }
          } else {
            leerText("Haz perdido");
            console.log("Haz perdido");
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); */
