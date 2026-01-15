import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        console.log("🟢 User connected:", socket.id);

// user join own room 
socket.on("join", (userId) =>{
    socket.join(userId);
    console.log(`User joiined room : ${userId}`)
})

        socket.on("disconnect", () => {
            console.log("🔴 User disconnected:", socket.id);
        });
    });

    console.log("✅ Socket server initialized");
};

export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return io;
};
