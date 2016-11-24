import read from './read-key';
import write from './write-key';
import load from './load';
import save from './save';
import tags from './tags';

export default { load, save, read,  write, ...tags }