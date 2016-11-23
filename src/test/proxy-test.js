import middleware from 'redis';

let client;

const proxy = new Proxy(Object.create(null), {
  get(target, property) {
    if (property === 'client') {
      return client;
    }
    
    return client[ property ];
  }
});

client = middleware
  .createClient()
  .on('ready', error => proxy.get('key', middleware.print));