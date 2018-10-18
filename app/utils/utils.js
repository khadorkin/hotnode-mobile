import moment from 'moment';
import * as R from 'ramda';

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export const convertRFC822 = date =>
  moment(date)
    .locale('en')
    .format('ddd, DD MMM YYYY HH:mm:ss ZZ');

export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(
        moment(
          `${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`,
        ).valueOf() - 1000,
      ),
    ];
  }

  if (type === 'year') {
    const year = now.getFullYear();

    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
  }
}

export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach(node => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

export function digitUppercase(n) {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
  let num = Math.abs(n);
  let s = '';
  fraction.forEach((item, index) => {
    s += (digit[Math.floor(num * 10 * 10 * index) % 10] + item).replace(
      /零./,
      '',
    );
  });
  s = s || '整';
  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = '';
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }

  return s
    .replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整');
}

function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  } else if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

function getRenderArr(routes) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    let isAdd = false;
    // 是否包含
    isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path,
  );
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(
      route => route !== item && getRelation(route, item) === 1,
    );
    return {
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
      exact,
    };
  });
  return renderRoutes;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
}

export function transformSorter(sorter = '') {
  const sorterList = sorter.split('_');
  if (R.contains('descend')(sorterList)) {
    return `-${sorter.split('_descend')[0]}`;
  } else if (R.contains('ascend')(sorterList)) {
    return `${sorter.split('_ascend')[0]}`;
  } else {
    return sorter;
  }
}

export function rangeValidator({ min = 0, max, label }) {
  return (rule, value, callback) => {
    const errors = [];
    try {
      const intValue = parseInt(value, 10);
      if (R.or(R.is(Number), R.is(String))(value) && Number.isNaN(intValue)) {
        errors.push(new Error(`${label}的格式有误`));
      }
      if (!R.isNil(min)) {
        if (intValue < min) {
          errors.push(new Error(`${label}不能小于 ${min}`));
        }
      }

      if (!R.isNil(max)) {
        if (intValue > max) {
          errors.push(new Error(`${label}不能大于 ${max}`));
        }
      }
    } catch (e) {
      errors.push(new Error(`${label}的格式有误`));
    }

    callback(errors);
  };
}

export function ossImgUrl(url) {
  if (!url) {
    return require('../asset/avatar_placeholder.png');
  }
  return `${url}?x-oss-process=style/avatar`;
}

export const currencyFormat = val => {
  return `${val}`.replace(/\b(\d+)((\.\d+)*)\b/g, (a, b, c) => {
    return (
      (b.charAt(0) > 0 && !(c || '.').lastIndexOf('.')
        ? b.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
        : b) + c
    );
  });
};

export const getUrlParameter = function (n) {
  let name = n;
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
  const results = regex.exec(location.search);
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export const fixedCurrency = (count, util) => {
  if (R.contains(util)(['CNY', 'USD'])) {
    return Number(count).toFixed(6);
  } else {
    return Number(count).toFixed(9);
  }
};

export const handleSelection = (params, { key, value }) => {
  let data = R.path([key])(params);
  if (data) {
    let array = R.split(',')(data);
    if (R.contains(`${value}`)(array)) {
      array = R.filter(i => i !== `${value}`)(array);
    } else {
      array = R.append(value)(array);
    }
    data = array;
  } else {
    data = [value];
  }

  data = R.join(',')(data);
  return data;
};

export const nullOrEmpty = value => R.isNil(value) || R.isEmpty(value);

export const deepCheckEmptyOrNull = array => {
  return R.reduce((acc, value) => {
    const isEmptyOrNull = R.pipe(
      R.keys,
      R.reduce((accm, v) => {
        const item = value[v];
        return accm && nullOrEmpty(item);
      }, true),
    )(value);
    return nullOrEmpty(value) ? acc && true : acc && isEmptyOrNull;
  }, true)(array);
};
