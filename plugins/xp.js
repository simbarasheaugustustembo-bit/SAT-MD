const fs = require("fs");
let db = JSON.parse(fs.readFileSync("./database.json"));

module.exports = async (sock, m, { from }) => {
    if (!db[from]) db[from] = { xp: 0 };
    db[from].xp++;

    fs.writeFileSync("./database.json", JSON.stringify(db, null, 2));
};
