import JPush from 'jpush-react-native';
import { NavigationActions as routerRedux } from '../utils';
import { login, setPassword } from '../services/api';
import request from '../utils/request';
import { NavigationActions } from 'react-navigation';
import { clearKeychain } from '../utils/keychain';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put, take }) {
      try {
        const { data } = yield call(login, payload);
        yield put({
          type: 'changeLoginStatus',
          payload: data,
        });
        if (data.password_reset_token) {
          yield put(
            routerRedux.navigate({
              routeName: 'SetPassword',
              params: {
                resetToken: data.password_reset_token,
              },
            }),
          );
        } else {
          yield put({
            type: 'loginSuccess',
            payload: {
              token: data.access_token,
              companies: data.companies,
            },
          });

          yield put.resolve({
            type: 'global/bootstrap',
          });

          yield put(
            routerRedux.navigate({
              routeName: 'Fund',
            }),
          );
        }
      } catch (e) {
        yield put({
          type: 'loginFailure',
          payload: {
            error: e.status,
          },
        });
      }
    },
    *setPassword({ payload }, { call, put }) {
      try {
        const { data } = yield call(setPassword, payload);
        yield put({
          type: 'loginSuccess',
          payload: {
            token: data.access_token,
            companies: data.companies,
          },
        });

        yield put.resolve({
          type: 'global/bootstrap',
        });

        yield put(
          routerRedux.navigate({
            routeName: 'Fund',
          }),
        );
      } catch (e) {
        yield put({
          type: 'loginFailure',
          payload: {
            error: e.status,
          },
        });
      }
    },
    *logout(_, { put }) {
      try {
        request.defaults.headers.common.Authorization = null;
        request.defaults.headers.common['X-Company-ID'] = null;
        clearKeychain();

        // sensor logout
        global.s().logout();

        // jpush remove corresponding info
        JPush.deleteAlias(() => null);
        JPush.cleanTags(() => null);
        JPush.stopPush();
      } finally {
        yield put({
          type: 'logoutSuccess',
        });
        yield put(
          NavigationActions.navigate({
            routeName: 'Auth',
          }),
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
    loginSuccess(state, { payload }) {
      return {
        ...state,
        token: payload.token,
        companies: payload.companies,
      };
    },
    logoutSuccess(state) {
      return {
        ...state,
        token: null,
        companies: null,
      };
    },
    loginFailure(state, { payload }) {
      return {
        ...state,
        status: payload.error,
      };
    },
  },
};
