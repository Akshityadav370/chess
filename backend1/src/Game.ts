import { Chess } from 'chess.js';
import WebSocket from 'ws';
import { GAME_OVER, INIT_GAME, MOVE } from './constants';

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  private board: Chess;
  private moves: string[];
  private startTime: Date;
  private moveCount = 0;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.moves = [];
    this.startTime = new Date();
    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: 'white',
        },
      })
    );
    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: 'black',
        },
      })
    );
  }

  public makeMove(player: WebSocket, move: { from: string; to: string }): void {
    // if (player !== this.player1 || player !== this.player2) {
    //   throw new Error('Invalid player');
    // }
    // 1. Validate the type of move using zod
    if (this.moveCount % 2 === 0 && player !== this.player1) {
      throw new Error('Not your turn');
    } else if (this.moveCount === 1 && player !== this.player2) {
      throw new Error('Not your turn');
    }
    // Is it this users move
    // Is the move valid

    try {
      this.board.move(move);

      // Check if the game is over
      if (this.board.isGameOver()) {
        // Send the updated board to both players
        this.player1.send(
          JSON.stringify({
            type: GAME_OVER,
            payload: {
              winner: this.board.turn() === 'w' ? 'black' : 'white',
            },
          })
        );
        this.player2.send(
          JSON.stringify({
            type: GAME_OVER,
            payload: {
              winner: this.board.turn() === 'w' ? 'black' : 'white',
            },
          })
        );
      }

      //   If the game is not over, inform opponent player of the move
      if (this.board.moves.length % 2 === 0) {
        this.player2.send(
          JSON.stringify({
            type: MOVE,
            payload: move,
          })
        );
      } else {
        this.player1.send(
          JSON.stringify({
            type: MOVE,
            payload: move,
          })
        );
      }
    } catch (error) {
      console.error('Error making move:', error);
      return;
    } finally {
      this.moveCount += 1;
    }
  }
}
