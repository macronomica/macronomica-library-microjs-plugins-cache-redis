
export default function errorHandler(micro) {
  return error => {
    if (!!error) {
      micro.logger.error('The server refused the connection', {
        code   : `error.plugin-cache-redis/${ error.code }`,
        message: error.message.toString()
      });
    }
  };
}