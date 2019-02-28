'use strict';
import promise from 'es6-promise';
promise.polyfill();
import axios from 'axios';
import { app } from '../main';
import store from '../store/AppStore';
import qs from 'qs';
import { toQueryString } from "../tools/utils";
import env from './env';
import { jsGetCookie } from '@/tools/utils';

let instance = axios.create({
    timeout: 20000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
    }
});

// 请求时的拦截器
instance.interceptors.request.use(config => {
    store.commit('loading');
    return config;
}, error => {
    store.commit('unloading');
    return Promise.reject(error);
});
instance.interceptors.response.use(res => {
    store.commit('unloading');
    return res
}, error => {
    store.commit('unloading');
    return Promise.resolve(error.res)
});

// return res返回的是一个对象
// 网络或者服务器的错误
function checkStatus(res) {
    // 这里可以加一些动作, 比如来个进度条结束动作
    // 如果http状态码正常，则直接返回数据
    if (res && (res.status === 200 || res.status === 304 || res.status === 400)) {
        return res;
        // 如果不需要除了data之外的数据，可以直接 return res.data
    }
    // 异常状态下，把错误信息返回去
    return {
        status: -404,
        message: '网络异常'
    };
}

// 程序端的错误
function checkCode(res, exceptionReturn) {
    // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
    if (res.status === -404) {
        app.$message.error({
            message: res.message
        });
        if (exceptionReturn) {
            res = {
                data: {
                    error: true,
                }
            }
            return res.data;
        }
        throw new Error(res.message);
    }

    // /*
    // 非正常code
    if (res.data && res.data.result !== 'SUCCESS') {
        app.$message.error({
            message: res.data.message
        });
        if (exceptionReturn) {
            res.data.error = true;
            return res.data;
        }
        throw new Error(res.data.message);
    }
    return res.data;
}

export default {
    /**
     * post请求
     * @param {*} url 请求地址
     * @param {*} data  参数
     * @param {*} exceptionReturn 异常时是否返回
     */
    post(url, data, exceptionReturn = false, timeout) {
        return instance.request({
            method: 'post',
            url,
            // data: qs.stringify(data),
            // data: toQueryString(data),
            data: data,
            headers: {
                'X-Access-Token': jsGetCookie('_TOKEN_'),
            }
        }).then(
            (res) => {
                return checkStatus(res)
            }
        ).then(
            (res) => {
                return checkCode(res, exceptionReturn)
            }
        )
    },
    /**
     * get请求
     * @param {*} url 请求地址
     * @param {*} data  参数
     * @param {*} exceptionReturn 异常时是否返回
     */
    get(url, params, exceptionReturn) {
        return instance.request({
            method: 'get',
            url,
            params, // get 请求时带的参数
            headers: {
                'X-Access-Token': jsGetCookie('_TOKEN_'),
            }
        }).then(
            (res) => {
                return checkStatus(res)
            }
        ).then(
            (res) => {
                return checkCode(res, exceptionReturn)
            }
        )
    },

    /**
     * put请求
     * @param {*} url 请求地址
     * @param {*} data  参数
     * @param {*} exceptionReturn 异常时是否返回
     */
    put(url, data, exceptionReturn) {
        return instance.request({
            method: 'put',
            url,
            data: data,
            headers: {
                'X-Access-Token': jsGetCookie('_TOKEN_'),
            }
        }).then(
            (res) => {
                return checkStatus(res)
            }
        ).then(
            (res) => {
                return checkCode(res, exceptionReturn)
            }
        )
    },

    /**
     * delete请求
     * @param {*} url 请求地址
     * @param {*} data  参数
     * @param {*} exceptionReturn 异常时是否返回
     */
    delete(url, data, exceptionReturn) {
        return instance.request({
            method: 'delete',
            url,
            data: data,
            headers: {
                'X-Access-Token': jsGetCookie('_TOKEN_'),
            }
        }).then(
            (res) => {
                return checkStatus(res)
            }
        ).then(
            (res) => {
                return checkCode(res, exceptionReturn)
            }
        )
    }
}