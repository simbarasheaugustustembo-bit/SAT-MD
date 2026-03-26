module.exports = async (sock) => {
    sock.ev.on("messages.update", async (u) => {
        for (let x of u) {
            if (x.update.message === null)
                sock.sendMessage(x.key.remoteJid,{ text:"🛡 Deleted msg!" });
        }
    });
};
