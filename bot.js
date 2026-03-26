const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const fs = require("fs");

let plugins = [];

fs.readdirSync("./plugins").forEach(file => {
    let plugin = require(`./plugins/${file}`);
    plugins.push(plugin);
});

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("auth");

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        browser: ["SAT MD", "Chrome", "1.0"]
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("messages.upsert", async (msg) => {
        const m = msg.messages[0];
        if (!m.message) return;

        const from = m.key.remoteJid;
        const text = m.message.conversation || m.message.extendedTextMessage?.text;

        if (!text || !text.startsWith(".")) return;

        let cmd = text.split(" ")[0].slice(1).toLowerCase();

        for (let plugin of plugins) {
            if (plugin.command.includes(cmd)) {
                try {
                    await plugin.run(sock, from, text);
                } catch (e) {
                    console.log("Plugin error:", e);
                }
            }
        }
    });
}

startBot();
