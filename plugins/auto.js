module.exports = async (sock, m, { from }) => {
    sock.sendPresenceUpdate("composing", from);
};
