
export default (micro, plugin, client) => new Promise((resolve, reject) => {
  if (!client || client.closing) {
    return resolve();
  }
  
  client.quit(() => {
    micro.logger.info(`Подключение к Redis разорвано`, {
      id: plugin.id
    });

    resolve();
  });
});