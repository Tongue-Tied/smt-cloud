import Vue from 'vue';
import Vuex from 'vuex';
import * as config from '@/config/index';
import * as global from '@/mixins/global';
import apiLogin from '@/services/api.login.js';
import membershipCard from './modules/membershipCard';
Vue.use(Vuex);

export default new Vuex.Store({
    // !模块引用
    modules: {
        membershipCard
    },
    state: {
        // 使用 this.$store.state.config 或者 {{$state().config}} 来访问该对象
        config: config[process.env.VUE_APP_ENV || 'dev'],
        token: uni.getStorageSync('token'),
        uid: uni.getStorageSync('uid'),
        // !user定义 http://showdoc.mei1.info/web/#/85?page_id=5309
        user: null,
        info: {},
        isInit: false,
        isBack: false,
        // 全局常量
        global
    },
    mutations: {
        updateBackFlag(state, back) {
            state.isBack = back;
        },
        updateUser(state, user) {
            state.user = user;
        },
        updateToken(state, data) {
            state.token = data.token || '';
            state.uid = data.id || '';
            uni.setStorageSync('token', state.token);
            uni.setStorageSync('uid', state.uid);
        },
        updateInfo() {

        },
        signout(state) {
            uni.removeStorageSync('token');
            state.token = undefined;
            state.isInit = false;
            state.user = null;
        }
    },
    actions: {
        async loadUser(context) {
            if (context.state.token) {
                let res;
                try {
                    res = await apiLogin.getUserInfo();
                } catch (e) {
                    // TODO handle the exception
                }
                if (res.code === 1) {
                    context.commit('updateUser', res.retObj);
                    return new Promise(resolve => {
                        resolve(true);
                        // apiLogin.signout();
                        // context.commit('signout');
                        // resolve();
                    });
                }
                // .then(
                //     res => {
                //         console.log(res);
                //         resolve();
                //         context.commit('updateUser', res.retObj);
                //     },
                //     err => {
                //         context.commit('signout');
                //         reject(err);
                //     }
                // );
            }
        },
        signout(context) {
            return new Promise(resolve => {
                // apiLogin.signout();
                // context.commit('signout');
                // resolve();
            });
        }
    },
    getters: {
        isLogin(state) {
            return !!state.token && state.isInit;
        },
        user: state => state.user,
        isAdmin(state) {
            try {
                return state.user.merchantRole.code == 'merchantAdmin';
            } catch (e) {
                return false;
            }
        },
        isManager(state) {
            try {
                return state.user.merchantRole.code == 'storeAdmin';
            } catch (e) {
                return false;
            }
        },
        isEmployee(state) {
            try {
                return state.user.merchantRole.code == 'employee';
            } catch (e) {
                return false;
            }
        },
        isLookPhone(state) {
            try {
                return state.user.merchantRole.permissions.indexOf('member_phone_view_full') > -1;
            } catch (e) {
                return false;
            }
        }
    }
});
