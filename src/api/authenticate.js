import { get,post} from "@/plugins/request";

/**
 * 用户登陆
 * @param data 用户的账号密码
 * @returns {Promise<AxiosResponse<any>>}
 */
export const login = (data) => post(
    '/api/userInfo/login',
    data
)

/**
 * 用户登出，清除后台的用户登录信息
 * @returns {*}
 */
export const logout = () => get(
    '/api/userInfo/logout',
)

/**
 * 发送验证码
 * @param data 邮箱
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getVerify = (data) => post(
    '/api/userInfo/sendEmail',
    data
)

/**
 * 用户注册
 * @param data 账号 密码 验证码
 * @returns {Promise<AxiosResponse<any>>}
 */
export const  register = (data) =>post(
    "/api/userInfo/register",
    data
)

/**
 * 获取用户信息
 * @param data 用户账号
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getUserInfo = (data) => post(
    '/api/userInfo/getOneUserInfo',
    data
)

/**
 * 更新用户信息
 * @param data 要更新的信息
 * @returns {Promise<AxiosResponse<any>>}
 */
export const updateUserInfo = (data) => post(
    '/api/userInfo/updateUserInfo',
    data
)

/**
 * 忘记密码 ，找回密码时进行身份验证
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const authenticate = (data) => post(
    '/api/userInfo/authenticate',
    data
)

/**
 * 根据账号修改密码
 * @param data 密码
 * @returns {Promise<AxiosResponse<any>>}
 */
export const updatePasswordByUserAccount = (data) => post(
    '/api/userInfo/updatePasswordByUserAccount',
    data
)