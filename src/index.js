import middleware from 'redis';
import isFunction from 'lodash.isfunction';
import connect from './connect';
import disconnect from './disconnect';
import decorators from './decorators';

const DRIVER = 'redis';

export default ({ driver = DRIVER, ...settings } = {}) => (micro, name, pluginId) => {
  const plugin = { id: pluginId, name, middleware, client: null };
  const __decorators = {};
  
  micro
    .queue({
      case: 'wait',
      args: [],
      done: () => connect(micro, plugin, settings)
        .then(client => plugin.client = client)
        .then(applyDecorators(micro, __decorators))
    })
    .queue({
      case: 'close',
      args: [],
      done: () => disconnect(micro, plugin, plugin.client)
    });

  return new Proxy(plugin, {
    get(target, property) {
      if (property in target) {
        return target[ property ];
      }
      
      if (property in __decorators) {
        return __decorators[ property ];
      }
      
      if (isFunction(plugin.client[ property ])) {
        return (...rest) => new Promise((resolve, reject) =>
          plugin.client[ property ](...rest, (err, result) => err ? reject(err) : resolve(result)))
      }
    
      return plugin.client[ property ];
    }
  })
}

function applyDecorators(micro, __decorators) {
  return client => Object
    .keys(decorators)
    .forEach(key => {
      if (isFunction(decorators[ key ])) {
        __decorators[ key ] = decorators[ key ](micro, client, __decorators)
      } else {
        __decorators[ key ] = decorators[ key ];
      }
    })
}