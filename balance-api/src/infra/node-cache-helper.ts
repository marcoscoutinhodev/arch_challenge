import NodeCache from 'node-cache';

const myCache = new NodeCache({ stdTTL: 300, deleteOnExpire: true });

function getNodeCache(key: string): string | undefined {
  return myCache.get(key);
}

function setNodeCache(key: string, value: string): boolean {
  return myCache.set(key, value);
}

export default {
  getNodeCache,
  setNodeCache,
};
