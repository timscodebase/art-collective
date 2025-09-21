
import type * as Party from "partykit/server";

export default class MyParty implements Party.Server {
  constructor(public room: Party.Room) {}

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    console.log(`Connected: id: ${conn.id} room: ${this.room.id} url: ${new URL(ctx.request.url).pathname}`);
    this.room.broadcast(`Someone connected to ${this.room.id}`);
  }

  onMessage(message: string, sender: Party.Connection) {
    console.log(`connection ${sender.id} sent message: ${message}`);
    this.room.broadcast(
      `${sender.id}: ${message}`,
      [sender.id]
    );
  }
}
