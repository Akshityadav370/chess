import WebSocket from 'ws';

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  private board: string;
  private moves: string[];
  private startTime: Date;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = '';
    this.moves = [];
    this.startTime = new Date();
  }

  public makeMove(player: WebSocket, move: string): void {
    // 1. Validation
    // Is it this users move
    // Is the move valid

    // Update the board
    // Push the move
    // Check if the game is over
    // Send the updated board to both players
    if (player !== this.player1 || player !== this.player2) {
      throw new Error('Invalid player');
    }
    const otherPlayer = this.player1 === player ? this.player2 : this.player1;
    this.moves.push(move);
  }
}
