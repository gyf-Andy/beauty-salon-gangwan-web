const defaultVal = void 0
function deserialize(strVal) {
  if (!strVal) {
    return defaultVal
  }
  // It is possible that a raw string value has been previously stored
  // in a storage without using store.js, meaning it will be a raw
  // string value instead of a JSON serialized string. By defaulting
  // to the raw string value in case of a JSON parse error, we allow
  // for past stored values to be forwards-compatible with store.js
  var val = ''
  try {
    val = JSON.parse(strVal)
  } catch (e) {
    val = strVal
  }

  return val !== undefined ? val : defaultVal
}
/**
 * 通过构造函数构建session或local对应的storage封装对象
 */
class Storage {
  /**
   * @property {sessionStorage|localStorage} storage session或local对应的storage封装对象
   */
  storage

  constructor(store = window.sessionStorage) {
    this.storage = store
  }

  /**
   * @desc 获取storage数据
   * @param {string} key 唯一的key值
   * @returns {*} 返回storage中key对应的value内容
   */
  get(key) {
    return deserialize(this.storage.getItem(key))
  }

  /**
   * @desc 存储storage数据
   * @param {string} key 唯一的key值
   * @param {*} data 被存储的数据
   */
  set(key, data) {
    this.storage.setItem(key, JSON.stringify(data))
  }

  /**
   * 遍历storage中所有内容
   * @param {Function} callback (value,key)=>{}
   */
  each(callback) {
    for (let i = this.storage.length - 1; i >= 0; i--) {
      let key = this.storage.key(i)
      callback(this.get(key), key)
    }
  }

  /**
   * 移除storage中某项数据
   * @param {string} key 唯一的key值
   */
  remove(key) {
    this.storage.removeItem(key)
  }

  /**
   * 清除storage中所有数据
   * @returns
   */
  clear() {
    this.storage.clear()
  }
}
let _sessionStorage, _localStorage

/**
 * 获取sessionStorage封装对象
 * @returns {Storage} 返回Storage<sessionStorage>
 */
export function useSessionStorage() {
  if (!_sessionStorage) {
    _sessionStorage = new Storage(window.sessionStorage)
  }
  return _sessionStorage
}

/**
 * 获取localStorage封装对象
 * @returns {Storage} 返回Storage<localStorage>
 */
export function useLocalStorage() {
  if (!_localStorage) {
    _localStorage = new Storage(window.localStorage)
  }
  return _localStorage
}
