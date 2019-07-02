import axios from 'axios'

export const URL = 'http://192.168.38.31:8088';
/**
 * 登录接口
 */
export const RequestLogin = (params) => axios.post(`${URL}/api/login`,params).then(res => res.data);

/**
 * 列表接口
 */
export const RequestList = () => axios.get(`${URL}/api/list`).then(res => res.data);
/**
 * 添加接口
 */
export const RequestAdd = (params) => axios.post(`${URL}/api/add`,params).then(res => res.data);
/**
 * 删除接口
 */
export const RequestDel = (params) => axios.get(`${URL}/api/delete?${params}`).then(res => res.data);
/**
 * 查询用户
 */
export const RequestUsersel = (params) => axios.get(`${URL}/api/find?${params}`).then(res => res.data)
/**
 * 修改用户
 */
export const RequestUserUpdate = (params) => axios.post(`${URL}/api/update`,params).then(res => res.data)
/**
 * 分页
 */
export const RequestUserListPage = (params) => axios.get(`${URL}/api/list_page?pageNo=${params}`).then(res => res.data);
/**
 * 批量删除
 */
export const RequestDeletBatch = (params) => axios.post(`${URL}/api/deletebatch`,params).then(res => res.data);
/**
 * 退出登录
 */
export const RequestLogout = () => axios.get(`${URL}/api/logout`).then(res=>res.data);
