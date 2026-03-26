const fs = require("fs");
let db = JSON.parse(fs.readFileSync("./database.json"));

module.exports = async (sock, m, { from, command }) => {
    if (!db[from]) db[from] = { money: 100 };

    if (command === "balance") return sock.sendMessage(from, { text: `💰 Balance: ${db[from].money}` });

    if (command === "work") {
        let earn = Math.floor(Math.random() * 50) + 10;
        db[from].money += earn;
        fs.writeFileSync("./database.json", JSON.stringify(db, null, 2));
        return sock.sendMessage(from, { text: `💼 You earned ${earn} coins` });
    }
};
