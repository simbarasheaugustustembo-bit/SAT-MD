module.exports = async (sock, m, { from, command }) => {
    if (command === "coinflip") {
        sock.sendMessage(from, { text: Math.random()>0.5?"Heads":"Tails" });
    }
};
