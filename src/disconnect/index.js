
export default client => new Promise((resolve, reject) => {
  if (!client || client.closing) {
    return resolve();
  }
  
  client.quit(() => resolve());
});