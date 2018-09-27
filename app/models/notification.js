import { trendList, trendDetail } from '../services/api';
import { trendList as individualTrendList } from '../services/individual/api';
import R from 'ramda';
import { paginate } from '../utils/pagination';

export default {
  namespace: 'notification',
  state: {
    list: [],
    insite_list: [],
    current: null,
    badgeVisible: false,
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      try {
        const { data } = yield call(individualTrendList, {
          type: 1,
          ...payload,
        });

        yield put({
          type: 'list',
          payload: data,
        });
      } catch (e) {
        console.log(e);
      }
    },
    *fetchInSite({ payload }, { call, put }) {
      try {
        const { data } = yield call(individualTrendList, {
          type: 4,
          ...payload,
        });

        yield put({
          type: 'insiteList',
          payload: data,
        });
      } catch (e) {
        console.log(e);
      }
    },
    *get({ payload }, { call, put }) {
      try {
        const { data } = yield call(trendDetail, payload);
        yield put({
          type: 'detail',
          payload: data,
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
  reducers: {
    list(state, action) {
      return {
        ...state,
        list: paginate(state.list, action.payload),
      };
    },
    insiteList(state, action) {
      return {
        ...state,
        insite_list: paginate(state.insite_list, action.payload),
      };
    },
    detail(state, action) {
      return {
        ...state,
        current: action.payload,
      };
    },
    clearCurrent(state) {
      return {
        ...state,
        current: null,
      };
    },
    showBadge(state) {
      return {
        ...state,
        badgeVisible: true,
      };
    },
    clearBadge(state) {
      return {
        ...state,
        badgeVisible: false,
      };
    },
  },
};
