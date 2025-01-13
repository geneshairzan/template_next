import prisma from "./dbClient.js";

let users = []; // Store connected users

export default function onConnection(socket, io) {
  socket.join(socket.uid);
  socket.emit("session", {
    uid: socket.uid,
    _session: socket._session,
  });

  // Listen for chat messages
  socket.on("pm:sent", (msg) => {
    let payload = {
      ...msg,
      from: socket.uid,
      created_at: new Date(),
    };

    // db connect here
    prisma.Msg.create({
      data: {
        from_id: payload.from,
        to_id: payload.to,
        msg: payload.data,
      },
    }).catch((err) => {
      console.error("Failed to create message:", err);
    });
    io.to(payload.to).to(socket.uid).emit("pm:incoming", payload);
  });

  // When a user disconnects
  socket.on("disconnect", (e) => {
    console.log("A user disconnected", socket.id);
    users = users.filter((user) => user !== socket.id);
    io.emit("users", users); // Emit the updated user list
  });
}
