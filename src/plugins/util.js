import { Modal } from 'ant-design-vue'
import { parse } from 'query-string'
/**
 * 获取当前地址栏中querstring参数
 * @returns {Object} parameters
 */
export function getParametersFromURL() {
  return parse(window.location.search)
}
/**
 * 深度拷贝
 * @param {*} data
 * @returns 拷贝对象
 */
export function deepClone(data) {
  let _data
  // 复制非Object对象时直接返回该结果
  if (data && data.toString() === '[object Date]') {
    // 时间对象生成新的date
    _data = new Date(data.getTime())
  } else if (typeof data === 'object') {
    // 当复制对象或集合时调用
    _data = JSON.stringify(data)
    _data = JSON.parse(_data)
  } else {
    _data = data
  }
  return _data
}
/**
 * 触发 window.resize 事件
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

/**
 * 监听滚动事件
 * @param {*} callback 滚动回调方法
 * @param {number} delay 默认50,滚动回调方法的延迟时间,有助于提升性能
 */
export function handleScrollHeader(callback, delay = 50) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, delay)
    },
    false
  )
}

/**
 * 生成数据集合的树状结构对象
 * @param {object[]} list
 * @param {object} option
 * @param {string} option.parentKey 父级关系key
 * @param {string} option.childrenKey 子级关系key
 * @param {string} option.parentId 父级关系值(如id)
 * @returns {object[]|null} 树状结构对象或null
 */
export function getTreeList(list, option) {
  let result = []
  let map = {}
  for (let it of list) {
    map[it[option.idKey]] = it
  }

  option.childrenKey = option.childrenKey || 'children'
  for (let item of list) {
    if (option.parentId !== void 0 && item[option.parentKey] !== option.parentId) {
      continue
    }
    let parent = map[item[option.parentKey]]

    if (parent) {
      if (!parent[option.childrenKey]) {
        parent[option.childrenKey] = []
      }
      parent[option.childrenKey].push(item)
    } else {
      result.push(item)
    }
  }

  return result.length > 0 ? result : null
}

/**
 * 获取路由配置中面包屑配置数据
 * @param {*} route 即将前往的路由对象
 * @param {*} from 上一个路由对象
 * @returns {object[]} 面包屑路径集合[{ name, title }]
 */
export function getRouteBreadcrumb(route, from) {
  const breadcrumb = []
  if (Array.isArray(route.breadcrumb) && route.breadcrumb.length > 0) {
    for (let it of route.breadcrumb) {
      if (it.name === from.name) {
        breadcrumb.push({ name: it.name, title: it.title, path: from.fullPath })
      } else {
        breadcrumb.push({ name: it.name, title: it.title })
      }
    }
  }
  return breadcrumb
}

/**
 * 获取指定路由从祖父级到自身的组合title
 * @param {*} route 路由对象
 * @returns {sring|null} 路由组合标题
 */
export function getRouteTitle(route) {
  const titles = []
  if (Array.isArray(route.matched) && route.matched.length > 0) {
    for (let it of route.matched) {
      if (it.meta && it.meta.title) {
        titles.push(it.meta.title)
      }
    }
    return titles.length > 0 ? titles.join('') : null
  } else {
    return null
  }
}

/**
 * 获取指定路由的已配置title
 * @param {*} route 路由对象
 * @returns {stinrg|null} 路由标题
 */
export function getMenuTitle(route) {
  const hasMached = Array.isArray(route.matched) && route.matched.length > 0
  let routeMeta
  if (hasMached && route.matched[0].path === '/') {
    routeMeta = route.matched[1].meta
  } else if (hasMached && route.matched[0].path !== '/') {
    routeMeta = route.matched[0].meta
  }
  return (routeMeta && routeMeta.title) || void 0
}

/**
 * 未授权状态提示流程
 * @param {*} path 当前页面地址,登录后自动跳转该地址
 */
export function unsuccessToken(path) {
  const appLodadingElement = document.getElementById('app-loading')
  if (appLodadingElement && appLodadingElement.parentNode) {
    appLodadingElement.parentNode.removeChild(appLodadingElement)
  }
  Modal.error({
    content: `您的登录授权已失效!`,
    okText: '重新登录',
    onOk() {
      window.location.href = `${process.env.VUE_APP_PUBLIC_PATH}login?redirect=${path}`
      return Promise.resolve()
    }
  })
}

/**
 * 用于快速建立下拉框搜索功能
 * 使用示例:
 * 引入工具函数
 * import { codeDictFilter } from '@/plugins/util'
 * 配合a-select组件实现搜索框
 * <a-select showSearch :filter-option="(input,option)=>includesFilter(input, option.state, ['userName', 'userCode'])">
 *     <a-select-option v-for="user in dataList" :state="user"
 * @param {*} input 关键字输入项
 * @param {*} source 被匹配对象
 * @param {*} keys 被匹配值的key(source[keys])
 * @returns
 */
export function includesFilter(input, source, keys) {
  if (!input && input !== 0) {
    return true
  } else if (!keys || !source) {
    return false
  } else if (Array.isArray(keys)) {
    for (let key of keys) {
      if (keywordComparae(input, source, key)) {
        return true
      }
    }
  } else if (keywordComparae(input, source, keys)) {
    return true
  }
  return false
}

/**
 * 用于码表字典数据格式的下拉框搜索
 * 使用示例:
 * 引入工具函数
 * import { codeDictFilter } from '@/plugins/util'
 * 配合a-select组件实现搜索框
 * <a-select showSearch :filter-option="codeDictFilter">
 *     <a-select-option v-for="code in dataList" :dict="code"
 * @param {*} input 关键字输入项
 * @param {*} source 被匹配对象
 * @param {*} keys 被匹配值的key(source[keys])
 * @returns
 */
export function codeDictFilter(input, option) {
  return includesFilter(input, option.dict, ['codeName', 'inputCode'])
}
function keywordComparae(input, source, key) {
  if (!key && key !== 0) {
    throw new TypeError('includesFilter [keys] 参数内容不能指定为空!')
  } else if (key && !Object.prototype.hasOwnProperty.call(source, key)) {
    return false
  } else if (
    typeof source[key] === 'string' &&
    typeof key === 'string' &&
    source[key].toUpperCase().includes(input.toUpperCase())
  ) {
    return true
  } else if (source[key].includes(input)) {
    return true
  } else {
    return false
  }
}

/**
 * 获取凤凰HIS系统体系中,模板工作站的授权列表数据
 * @param {string} appRole
 * @returns {object[]} 授权数据集合 {name,value,key(临时id,无实际意义)}
 */
export function getAppRoleList(appRole) {
  const result = []
  if (!appRole) {
    return result
  }
  appRole.split('|').forEach(it => {
    const role = it.split(':')
    result.push({ key: Math.random(), name: role[1] || role[0], value: role[0] })
  })
  return result
}

/*
 * 参数说明：
 * number：要格式化的数字
 * decimals：保留几位小数
 * */
export function money_format(number, decimals) {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  var n = !isFinite(+number) ? 0 : +number,
    prec = decimals | 2,
    sep = ',',
    dec = '.',
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec)
      return '' + Math.ceil(n * k) / k
    }

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  var re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}


/**
 * 计算文件大小
 * @param bytes 文件的字节大小
 * @param decimalPoint 保留小数点几位
 * @returns {string}
 */
export function formatFileSize(bytes,decimalPoint) {
  if(bytes == 0) return '0 Bytes';
  var k = 1024,
  dm = decimalPoint || 2,
  sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
  i = Math.floor(Math.log(bytes)/Math.log(k));
  return parseFloat((bytes/Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * 文件转换所需要的大概时间
 * @param bytes 文件的字节大小
 * @param faultTolerant 容错时间
 * @returns {*}
 */
export function conversionTime(bytes,faultTolerant){
  var k=(bytes/36195)*0.155+faultTolerant
  return k.toFixed(1)+" s"
}