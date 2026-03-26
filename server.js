const express = require("express");
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.post("/pair", async (req, res) => {
    let number = req.body.number;

    if (!number) return res.json({ status: false, msg: "Enter number" });

    // FIX NUMBER FORMAT
    number = number.replace(/[^0-9]/g, "");

    if (number.startsWith("0")) {
        number = "260" + number.slice(1);
    }

    const { state } = await useMultiFileAuthState("auth");

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        browser: ["SAT MD", "Chrome", "1.0"]
    });

    try {
        let code = await sock.requestPairingCode(number);

        console.log("PAIR CODE:", code);

        res.json({ status: true, code: code });

    } catch (e) {
        console.log("PAIR ERROR:", e);
        res.json({ status: false, msg: "Pairing failed" });
    }
});

app.listen(3000, () => console.log("🌐 Server running on port 3000"));
