module.exports = {
    command: ["menu"],

    async run(sock, from) {
        await sock.sendMessage(from, {
            text: "🔥 SAT MD MENU 🔥\n\n.menu\n.coinflip\n.ai\n.play"
        });
    }
};
