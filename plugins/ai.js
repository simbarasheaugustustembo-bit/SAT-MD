const axios = require("axios");

module.exports = async (sock, m, { from, args, command }) => {
    if (command === "ai") {
        let q = args.join(" ");
        let r = await axios.get(`https://api.popcat.xyz/chatbot?msg=${q}`);
        sock.sendMessage(from, { text: r.data.response });
    }
};
