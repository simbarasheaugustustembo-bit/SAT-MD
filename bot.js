const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const fs = require("fs");

async function startBot() {
    const { state } = await useMultiFileAuthState("auth");

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    const plugins = fs.readdirSync("./plugins");

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const m = messages[0];
        if (!m.message) return;

        const from = m.key.remoteJid;
        const text = m.message.conversation || "";
        if (!text.startsWith(".")) return;

        const args = text.slice(1).split(" ");
        const command = args.shift().toLowerCase();

        for (let file of plugins) {
            require(`./plugins/${file}`)(sock, m, { from, command, args, text });
        }
    });

    console.log("🔥 SAT MD BOT RUNNING");
}

startBot();
