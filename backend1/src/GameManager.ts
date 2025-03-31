import WebSocket from 'ws';
import { INIT_GAME, MOVE } from './constants';
import { Game } from './Game';

// User, Game

export class GameManager {
  private Games: Game[];
  private pendingUser: WebSocket | null = null;
  private users: WebSocket[];

  constructor() {
    this.Games = [];
    this.users = [];
  }

  addUser(socket: WebSocket) {
    this.users.push(socket);
    this.addHandler(socket);
  }

  removeUser(socket: WebSocket) {
    this.users = this.users.filter((user) => user !== socket);
    // Stop the game here because the user left
  }

  private addHandler(socket: WebSocket) {
    socket.on('message', (message: string) => {
      const data = JSON.parse(message);
      if (data.type === INIT_GAME) {
        this.initializeGame(socket);
      } else if (data.type === MOVE) {
        const game = this.Games.find(
          (game) => game.player1 === socket || game.player2 === socket
        );
        if (game) {
          game.makeMove(socket, data.move);
        }
      }
    });
  }

  private initializeGame(player1: WebSocket) {
    if (this.pendingUser) {
      const game = new Game(player1, this.pendingUser);
      this.Games.push(game);
      this.pendingUser = null;
    } else {
      this.pendingUser = player1;
    }
  }
}
