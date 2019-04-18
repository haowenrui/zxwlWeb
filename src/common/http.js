'use strict';
import promise from 'es6-promise';
promise.polyfill();
import axios from 'axios';
import { Message } from 'element-ui';
import { app } from '../main';
import store from '../store/AppStore';
import qs from 'qs';
import {
	toQueryString
} from "../tools/utils";
import env from './env';
import {
	jsGetCookie
} from '@/tools/utils';

let instance = axios.create({
	timeout: 20000,
	headers: {
		'X-Requested-With': 'XMLHttpRequest',
		'Content-Type': 'application/json',
	}
});

// 请求前拦截
instance.interceptors.request.use(
	config => {
		return config
	},
	err => {
		Message.error({
			message: '请求超时!'
		})
		return Promise.resolve(err)
	}
)

// 返回后拦截
instance.interceptors.response.use(
	data => {
		if (!data.data.status) {
			return data.data
		} else {
			Message.error({
				message: data.data.message
			})
			return Promise.reject(data.data)
		}
	},
	err => {
		if (err.response.status === 504 || err.response.status === 404) {
			Message.error({
				message: '服务器被吃了⊙﹏⊙∥'
			})
		} else if (err.response.status === 403) {
			Message.error({
				message: '登录信息失效⊙﹏⊙∥'
            })
            app.$router.push({ path: '/login' })
		} else if (err.response.status === 500) {
			Message.error({
				message: '服务器开小差了⊙﹏⊙∥'
			})
        }
		return Promise.reject(err)
	}
)



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
		});
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
		});
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
		});
	},

	/**
	 * delete请求
	 * @param {*} url 请求地址
	 * @param {*} data  参数
	 * @param {*} exceptionReturn 异常时是否返回
	 */
	delete(url, data, exceptionReturn) {
		// let finalUrl = url + '?' + qs.stringify(data);
		// console.log(finalUrl)
		return instance.request({
			method: 'delete',
			url,
			data,
			headers: {
				'X-Access-Token': jsGetCookie('_TOKEN_'),
			}
		});
	}
}
