import {message} from 'antd';
export const PAGESIZE = 10;
export function isEmptyObj(obj) {
  let name;
  for (name in obj)
    return false;

  return true;
}

// 清除缓存
export function deleteAllCookies() {
  let cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let eqPos = cookie.indexOf('=');
    let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

/**
 * 是否为有效值，如空，0，等
 * @param {值} params
 */
export function isValidValue(value) {
  switch (typeof (value)) {
    case 'string':
      return value === '' ? '--' : value;
    case 'number':
      return value;
    case 'undefined':
      return '--';
    case 'object':
      return value === null ? '--' : value;
    default:
      return value;
  }
}

/**
 *
 * @param {*分页} pagination
 */
export function getPagination(pagination) {
  const defaultPagination = {
    total: 0,
    showQuickJumper: true,
    // showSizeChanger: true,
    current: 1,
    pageSize: PAGESIZE
  };
  return Object.assign({}, defaultPagination, pagination);
}

// 计算 table 的scrollY 高度
export function getTableScrollY(isShowPage = true) {
  const formNode = document.getElementsByClassName('conditionForm'),
    tableHeadNode = document.getElementsByClassName('ant-table-thead'),
    headerNode = document.getElementsByClassName('home_inner_header'),
    breadcrumbNode = document.getElementsByClassName('breadcrumb');

  const formHeight = formNode && formNode.length >= 1 ?  formNode[0].offsetHeight : 0,
    tableHeaderHeight = tableHeadNode && tableHeadNode.length >= 1 ?  tableHeadNode[0].offsetHeight : 0,
    headerHeight = headerNode && headerNode.length >= 1 ?  headerNode[0].offsetHeight : 0,
    breadcrumbHeight = breadcrumbNode && breadcrumbNode.length >= 1 ?  breadcrumbNode[0].offsetHeight : 0,
    tablePaginationHeight = 64,
    padding = 20;
  const scrollY = window.innerHeight - formHeight - tableHeaderHeight - tablePaginationHeight - headerHeight - padding - breadcrumbHeight;
  console.log(formHeight, tableHeaderHeight, headerHeight);
  return scrollY;
}

// 计算size
export function getFileSize(size, unit = 1024, decimal = 2) {
  if (!size)
    return '--';
  if (size < unit)
    return size + 'B';
  if (size < Math.pow(unit, 2))
    return (size / unit).toFixed(decimal) + 'K';  // 字节
  if (size < Math.pow(unit, 3))
    return (size / Math.pow(unit, 2)).toFixed(decimal) + 'M'; // M
  if (size < Math.pow(unit, 4))
    return (size / Math.pow(unit, 3)).toFixed(decimal) + 'G'; // G

  return (size / Math.pow(unit, 4)).toFixed(decimal) + 'T'; // T

}

// 计算金额
export function getAmount(amount, decimal = 2) {
  if (amount === 0)
    return 0;
  if (!amount)
    return '--';


  return (amount / 100).toFixed(decimal);
}

export const myRouter = {
  // 设置菜单选中
  setMenuActive: (path, callback) => {
    const menuList = JSON.parse(localStorage.getItem('menuJson'));
    const pathName = '/' + path.split('/')[2];
    console.log('pathName :', pathName);
    if (menuList) {
      myRouter.cycleMenu(menuList, (menu) => {
        if (pathName === menu.url) {
          console.log('menu.id :', menu.id);
          callback(menu.id);
          return false;
        }
      });
    }
  },
  // 循环menuData
  cycleMenu: (menuList, callback) => {
    menuList.map((menu) => {
      if (menu.childNodes && menu.childNodes.length > 0)
        myRouter.cycleMenu(menu.childNodes, callback);
      else
        callback && callback(menu);

    });
  }
};

// 获取当前页。当操作为删除的时候
export function getCurrentPage(current, page) {
  if (page.total >= page.pageSize && page.total % page.pageSize === 1)
    return current - 1;
  return current;
}

// 增加 富文本的内容的最外层标签
export function replaceEditorContentTag(html) {
  let start = '<div id="content" style="word-wrap:break-word; word-break:break-all;">',
    wrapDiv = '<div id="content" style="word-wrap:break-word; word-break:break-all;"></div>';
  !html.startsWith(start) ? html = wrapDiv.replace('</div>', html + '</div>') : html;
  return html;
}

export const YMDHMS = 'YYYY-MM-DD HH:mm:ss';

// 通过值 获取属性
export function getKeyByValue(obj, value) {
  for (let key in obj)
    if (obj[key] === value) return key.toString();
}

export function uploadFile(info) {
  if (info.file.status === 'done') {
    if (info.file.response.success)
      message.success(`${info.file.name} 上传成功。`);
    else {
      message.error(info.file.response.msg);
      return;
    }
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} 上传失败。`);
    return;
  }
}

// 数组去重
export const arrayToHeavy = (array) =>  {
  const set = new Set(array);
  array = Array.from(set);
  return array;
};
