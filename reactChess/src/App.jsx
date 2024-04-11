import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./app.css";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

function App() {
  var board = null;
  const [game, setGame] = useState(new Chess());
  const [firstMove, setFirstMove] = useState(0);
  const [selectedSquare, setSelectedSquare] = useState("a1");
  const [isRecording, setIsRecording] = useState(false);
  const [textoEscribir, setTextoEscribir] = useState(null);
  const [text, setText] = useState(null);
  const selectedSquareRef = useRef(selectedSquare);
  const [previousSelectedSquare, setPreviousSelectedSquare] = useState("a1");
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  const leerText = (texto) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = texto;
    speech.volume = 1;
    speech.rate = 1.3;
    speech.pitch = 1;
    speech.lang = "es-ES"; // Idioma
    window.speechSynthesis.speak(speech); // Inicia la síntesis de voz
    if (textoEscribir != null) {
      setTextoEscribir(null);
    }
    setTextoEscribir(texto);
  };
  const leerPosicion = (piece, position, beforePosition, afterPosition) => {
    switch (piece.type) {
      case "p":
        if (afterPosition == null) {
          if (piece.color == "w") {
            leerText(`Peon blanco ${position}`);
            return position;
          } else {
            leerText(`Peon negro ${position}`);
            return position;
          }
        } else {
          if (piece.color == "w") {
            leerText(
              `Peon blanco ${beforePosition} fue movido a ${afterPosition}`
            );
            return position;
          } else {
            leerText(
              `Peon negro ${beforePosition} fue movido a ${afterPosition}`
            );
            return position;
          }
        }

      case "r":
        if (afterPosition == null) {
          if (piece.color == "w") {
            leerText(`Torre blanca ${position}`);
            return position;
          } else {
            leerText(`Torre negra ${position}`);
            return position;
          }
        } else {
          if (piece.color == "w") {
            leerText(
              `Torre blanca ${beforePosition} fue movida a  ${afterPosition} `
            );
            return position;
          } else {
            leerText(
              `Torre negra ${beforePosition} fue movida a  ${afterPosition} `
            );
            return position;
          }
        }
      case "n":
        if (afterPosition == null) {
          if (piece.color == "w") {
            leerText(`Caballo blanco ${position}`);
            return position;
          } else {
            leerText(`Caballo negro ${position} `);
            return position;
          }
        } else {
          if (piece.color == "w") {
            leerText(
              `Caballo blanco ${beforePosition} fue movido a  ${afterPosition}`
            );
            return position;
          } else {
            leerText(
              `Caballo negro ${beforePosition} fue movido a  ${afterPosition}`
            );
            return position;
          }
        }
      case "b":
        if (afterPosition == null) {
          if (piece.color == "w") {
            leerText(`Alfil blanco ${position} `);
            return position;
          } else {
            leerText(`Alfil negro ${position}`);
            return position;
          }
        } else {
          if (piece.color == "w") {
            leerText(
              `Alfil blanco ${beforePosition} fue movido a  ${afterPosition}`
            );
            return position;
          } else {
            leerText(
              `Alfil negro ${beforePosition} fue movido a  ${afterPosition}`
            );
            return position;
          }
        }
      case "q":
        if (afterPosition == null) {
          if (piece.color == "w") {
            leerText(`Dama blanca ${position}`);
            return position;
          } else {
            leerText(`Dama negra ${position}`);
            return position;
          }
        } else {
          if (piece.color == "w") {
            leerText(
              `Dama blanca ${beforePosition}  fue movida a  ${afterPosition}`
            );
            return position;
          } else {
            leerText(
              `Dama negra ${beforePosition} fue movida a  ${afterPosition}`
            );
            return position;
          }
        }
      case "k":
        if (afterPosition == null) {
          if (piece.color == "w") {
            leerText(`Rey blanco ${position} `);
            return position;
          } else {
            leerText(`Rey blanco ${position}`);
            return position;
          }
        } else {
          if (piece.color == "w") {
            leerText(
              `Rey blanco ${beforePosition} fue movido a  ${afterPosition}`
            );
            return position;
          } else {
            leerText(
              `Rey blanco ${beforePosition} fue movido a  ${afterPosition}`
            );
            return position;
          }
        }

      default:
        break;
    }
  };
  const startRecording = () => {
    if (!isRecording) {
      recognition.lang = "es-ES"; // Configura el idioma a español
      recognition.interimResults = false; // Solo queremos los resultados finales
      recognition.maxAlternatives = 1; // Solo queremos la mejor alternativa

      recognition.onresult = (event) => {
        if (event.results.length > 0) {
          let transcript = event.results[0][0].transcript;
          if (transcript) {
            // Verifica que transcript no sea null o undefined
            transcript = transcript.replace(/[.,]/g, "").toLowerCase();
            // Utiliza una expresión regular más amplia para capturar todos los posibles espacios en blanco
            transcript = transcript.replace(/[\s\u00A0]+/g, "");

            setText(transcript); // Actualiza el estado de text con el transcript
            console.log("Texto de la nueva funcion reconocido:", transcript);
            if (transcript === "reglas") {
              // Llama a la función leerText() con el texto que deseas que se lea
              leerText(
                "Las reglas del movimiento de las piezas del ajedrez son las siguientes. El rey puede moverse una casilla en cualquier dirección.La reina puede moverse cualquier número de casillas en cualquier dirección, pero no puede moverse en forma de caballo. El alfil puede moverse en diagonal en cualquier dirección.La torre puede moverse cualquier número de casillas en línea recta, horizontal o verticalmente.El peón puede moverse una casilla hacia adelante, pero solo puede moverse dos casillas hacia adelante desde su posición inicial.El peón captura moviéndose hacia adelante y en diagonal .El enroque es un movimiento especial que permite al rey y a una torre intercambiar sus posiciones, siempre que el rey no haya sido movido y la torre no haya sido movida ni atacada."
              );
            }

            if (
              transcript == "activate" ||
              transcript == "activar" ||
              transcript == "actívate"
            ) {
              leerText(
                "El comando de voz ha sido activado. Soy el encargado de irte guiando en la partida de ajedrez "
              );
            }
            // Resto de tu lógica aquí...
          } else {
            console.log("No se ha reconocido ningún texto aún.");
          }
        }
      };

      recognition.onspeechend = () => {
        recognition.stop();
      };

      recognition.onerror = (event) => {
        console.error("Error en el reconocimiento de voz:", event.error);
        if (event.error === "no-speech" || event.error === "network") {
          // Detén el reconocimiento de voz antes de intentar reiniciarlo
          stopRecording();
          // Espera un breve momento antes de reiniciar
          setTextoEscribir("Please wait Loading....");
          setTimeout(() => {
            startRecording();
          }, 1000); // Ajusta el tiempo de espera según sea necesario
        }
      };

      recognition.start();
      setIsRecording(true);
    } else {
      stopRecording();
    }
  };

  const stopRecording = () => {
    recognition.stop();
    setIsRecording(false);
  };

  useEffect(() => {
    if (firstMove == 0) {
      setFirstMove(1);
    } else {
      makeRandomMovement();
    }
  }, []);

  // Movement with keyboard
  let move_str = "";
  let band = 0;
  let source = "";
  let target = "";
  const array = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
  ];
  useEffect(() => {
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
              source = "";
              target = "";
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
  }, []);

  useEffect(() => {
    if (text !== null) {
      if (isRecording) {
        try {
          if (!game.isGameOver()) {
            if (text.length == 2) {
              const moveResult = game.move({
                from: selectedSquare,
                to: text,
                promotion: "q", // Promoción a reina
              });
              makeRandomMovement();
              if (moveResult) {
                // Crea una nueva instancia de Chess con el estado FEN actualizado
                const newGame = new Chess(game.fen());
                // Actualiza el estado del juego con la nueva instancia
                setGame(newGame);
              } else {
                leerText("Movimiento inválido");
                console.log("Movimiento inválido");
              }

              leerPosicion(
                getPieceAtSquare(text),
                null,
                previousSelectedSquare,
                text
              );
            } else {
              leerText("Vuelva a repetir el destino de la pieza");
            }
          } else {
            leerText("Haz perdido");
            console.log("Haz perdido");
          }
        } catch (error) {
          leerText(`el movimiento de ${selectedSquare} a ${text} no es valido`);
          console.log("ocurrio un error: ", error);
        }
      }
      console.log(
        "el texto es del effect: ",
        text.replace(/[.,]/g, "").toLowerCase()
      );

      // Aquí va el resto de tu lógica que depende de text
    }
  }, [text]);
  function getPieceAtSquare(square) {
    // Usa la función get de chess.js para obtener la pieza en la casilla especificada
    const piece = game.get(square);
    return piece;
  }

  useEffect(() => {
    // Obtiene la pieza en la casilla "a1" al inicio del juego
    const nextSquarePiece = getPieceAtSquare(selectedSquare);
    if (nextSquarePiece == false) {
      leerText("La casilla está vacía");
    }
    console.log("Siguiente cuadro:", nextSquarePiece);
    leerPosicion(nextSquarePiece, selectedSquare); // Asume que quieres leer la posición de la torre blanca en "a1"

    console.log("selected: ", selectedSquare);
    setPreviousSelectedSquare(selectedSquare);
  }, [selectedSquare]);
  function handleKeyDown(event) {
    const currentSquare = selectedSquareRef.current;
    let nextSquare = currentSquare;

    switch (event.key) {
      case "ArrowUp":
        nextSquare = getNextSquare(currentSquare, "up");

        break;
      case "ArrowDown":
        nextSquare = getNextSquare(currentSquare, "down");
        break;
      case "ArrowLeft":
        nextSquare = getNextSquare(currentSquare, "left");
        break;
      case "ArrowRight":
        nextSquare = getNextSquare(currentSquare, "right");
        break;
      default:
        return; // Ignora otros eventos de teclado
    }
    console.log("previous:", previousSelectedSquare);

    setSelectedSquare(nextSquare);

    selectedSquareRef.current = nextSquare;
  }

  // Función para calcular la siguiente casilla en la dirección especificada
  function getNextSquare(currentSquare, direction = null) {
    let file = currentSquare.charCodeAt(0) - "a".charCodeAt(0);
    let rank = parseInt(currentSquare.slice(1), 10);

    switch (direction) {
      case "up":
        rank++;
        break;
      case "down":
        rank--;
        break;
      case "left":
        file--;
        break;
      case "right":
        file++;
        break;
    }

    // Asegúrate de manejar los límites del tablero
    if (file < 0 || file > 7 || rank < 1 || rank > 8) return currentSquare;

    return String.fromCharCode(file + "a".charCodeAt(0)) + rank;
  }

  // Agrega un efecto para escuchar los eventos de teclado
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // Limpiar el efecto
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedSquare]); // Dependencia para actualizar el efecto si cambia selectedSquare
  //movement of the computer
  function makeRandomMovement() {
    const possibleMoves = game.moves();
    console.log("posibles movimientos: ", possibleMoves.length);
    console.log("game over: ", game.isGameOver());
    if (game.isGameOver() || possibleMoves.length === 0) return; // No hay movimientos posibles, terminamos el juego

    const randomMove =
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    game.move(randomMove);

    setGame(new Chess(game.fen())); // Actualizamos el estado del juego con el nuevo FEN
  }

  // Verifying user movements
  function onDrop(source, target) {
    let move = null;
    // Intentamos mover la pieza del jugador
    try {
      if (game.isGameOver()) {
        console.log("el juego acabo hacke mate");
        return;
      } else {
        move = game.move({
          from: source,
          to: target,
          promotion: "q", // Promoción a reina
        });
        makeRandomMovement();
      }
    } catch (error) {
      console.error("Error al mover la pieza:", error);
      return false; // Movimiento inválido
    }

    if (move === null) return false; // Movimiento inválido

    // Después de un movimiento válido, hacemos un movimiento aleatorio para las piezas negras

    // Actualizamos el estado del juego con el nuevo FEN
    setGame(new Chess(game.fen()));

    console.log("Game state before move:", game.fen());
    console.log("Attempted move:", {
      from: source,
      to: target,
      promotion: "q",
    });
    return true;
  }

  return (
    <>
      <div className="container-chess">
        <Chessboard
          position={game.fen()}
          onPieceDrop={onDrop}
          customBoardStyle={{
            borderRadius: "5px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
          }}
          customDropSquareStyle={{
            boxShadow: "inset 0 0 1px 6px rgba(255,0,0,0.75)",
          }}
        />
        <button
          className="btn-recorde"
          onClick={isRecording ? stopRecording : startRecording}
          style={{ marginTop: "25px" }}
        >
          Record
        </button>
      </div>
    </>
  );
}

export default App;
