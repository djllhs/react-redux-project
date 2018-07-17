export function isEmptyObj(obj) {
  let name;
  for (name in obj) {
    return false;
  }
  return true;
}

// 清除缓存
export function deleteAllCookies() {
  let cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf("=");
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

/**
 * 是否为有效值，如空，0，等
 * @param {值} params
 */
export function isValidValue(value) {
  switch (typeof(value)) {
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
    pageSize: 10,
  }
  return Object.assign({},defaultPagination,pagination);
}

// 计算 table 的scrollY 高度
export function getTableScrollY(isShowPage = true) {
  const formHeight = document.getElementsByClassName("conditionForm")[0].offsetHeight,
    tableHeaderHeight = document.getElementsByClassName("ant-table-thead")[0].offsetHeight,
    headerHeight = document.getElementsByClassName("home_inner_header ")[0].offsetHeight,
    tablePaginationHeight = 64,
    padding = 20;
    console.log(formHeight,tableHeaderHeight,headerHeight,);
   return window.innerHeight - formHeight - tableHeaderHeight - tablePaginationHeight - headerHeight - padding;
}

// 计算size
export function getFileSize(size,unit = 1024, decimal = 2) {
  if (!size)
  return "--";
  if (size < unit)
    return size + "B";
  if (size < Math.pow(unit, 2))
    return (size / unit).toFixed(decimal) + "K"; //kb
  if (size < Math.pow(unit, 3))
    return (size / Math.pow(unit, 2)).toFixed(decimal) + "M"; //M
  if (size < Math.pow(unit, 4))
    return (size / Math.pow(unit, 3)).toFixed(decimal) + "G"; //G

  return (size / Math.pow(unit, 4)).toFixed(decimal) + "T"; //T

}

// 计算金额
export function getAmount(amount, decimal = 2) {
  if(amount == null){
    return '--';
  }
  if(amount === 0){
    return 0;
  }
  return (amount/100).toFixed(decimal)
}

export const myRouter = {
  // 设置菜单选中
  setMenuActive: (path, callback) => {
    const menuList = JSON.parse(localStorage.getItem("menuJson"));
    const pathName = "/" + path.split("/")[2];
    console.log('pathName :', pathName);
    if (menuList) {
      myRouter.cycleMenu(menuList, (menu) => {
        if (pathName === menu.url) {
          console.log('menu.id :', menu.id);
          callback(menu.id);
          return;
        }
      });
    }
  },
  // 循环menuData
  cycleMenu: (menuList, callback) => {
    menuList.map((menu) => {
      if (menu.childNodes && menu.childNodes.length > 0) {
        myRouter.cycleMenu(menu.childNodes, callback);
      } else {
        callback && callback(menu);
      }
    });
  },
}
