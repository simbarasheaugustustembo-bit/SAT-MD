module.exports = async (sock, m, { from, command }) => {
    if (command === "kick")
        sock.sendMessage(from,{ text:"Admin only feature" });
};
