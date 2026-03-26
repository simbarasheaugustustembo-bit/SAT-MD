const yts = require("yt-search");

module.exports = async (sock, m, { from, args, command }) => {
    if (command === "play") {
        let q = args.join(" ");
        let r = await yts(q);
        let v = r.videos[0];

        sock.sendMessage(from, { text: `🎧 ${v.title}\n${v.url}` });
    }
};
