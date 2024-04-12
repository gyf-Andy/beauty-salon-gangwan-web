import { post,get } from "@/plugins/request";

/**
 * word文档转pdf文档，并把转换后的pdf文档上传到远程文件服务器
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const wordToPdf = (data) => post(
    '/api/fileInfo/wordToPdf',
    data
)

/**
 * 上传文件到远程服务器
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const upLoadToFileServer = (data) => post(
    '/api/fileInfo/upLoadToFileServer',
    data
)

/**
 * pdf文档转word文档，并把转换后的word文档上传到远程文件服务器
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const pdfToWord = (data) => post(
    '/api/fileInfo/pdfToWord',
    data
)

/**
 * 下载文件 （没有使用）
 * @returns {Promise<AxiosResponse<any>>}
 */
export const downloadFile = () => get(
    '/api/fileInfo/pdfToWord2',
)

/**
 * 传递一个图片文件数组，添加文字logo
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const imgAddTextLogo = (data) => post(
    '/api/fileInfo/imgAddTextLogo',
    data
)

/**
 * 传递一个图片文件数组，添加图片logo
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const imgAddImgLogo = (data) => post(
    '/api/fileInfo/imgAddImgLogo',
    data
)

export const getHtmlText = () => post(
    '/api/fileInfo/getHtmlText'
)

/**
 * 压缩图片像素
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const compressImg = (data) => post(
    '/api/fileInfo/compressImg',
    data
)

/**
 * 等比压缩图片2
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const compressImgByRatio = (data) => post(
    '/api/fileInfo/compressImgByRatio',
    data
)

/**
 * 图片合并成pdf
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const imgToPdf = (data) => post(
    '/api/fileInfo/imgToPdf',
    data
)

/**
 * word转html
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const wordToHtml = (data) => post(
    '/api/fileInfo/wordToHtml',
    data
)

/**
 * pdf转ppt
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const pdfToPptx = (data) => post(
    '/api/fileInfo/pdfToPptx',
    data
)

/**
 * 获取本用户的上传文件
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getAllFileInfo = () => get(
    '/api/fileInfo/getAllFileInfo',
)

/**
 * 根据id删除文件信息
 * @param fileId 文件信息id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteOneFileInfo = (fileId) => get(
    `/api/fileInfo/deleteOneFileInfo/${fileId}`
)

/**
 * 批量上传文件
 * @param data 文件
 * @returns {Promise<AxiosResponse<any>>}
 */
export const upLoadFiles = (data) => post(
    '/api/fileInfo/upLoadFiles',
    data
)
