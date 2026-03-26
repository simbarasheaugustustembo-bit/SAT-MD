module.exports = async (sock, m, { from, text }) => {
    if (text.includes("chat.whatsapp.com"))
        sock.sendMessage(from,{ text:"🚫 Link blocked" });
};
