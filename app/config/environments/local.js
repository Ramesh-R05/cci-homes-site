var accountId = '761709621001';
var playerId = 'VkuyApojl';

export default {
    server: {
        port: 8080
    },
    site: {
        host: 'http://localhost:8080'
    },
    brightcove: {
        accountId: accountId,
        playerId: playerId,
        script: `//players.brightcove.net/${accountId}/${playerId}_default/index.min.js`
    }
};
