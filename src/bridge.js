const Manticoresearch = require('manticoresearch')

const { isString, keys } = require("lodash")


// Object factory for Manticore clients identified by url  

let client = {}

const getClient = url => {
    if(client[url]) return client[url]
    
    apiClient = new Manticoresearch.ApiClient()
    apiClient.basePath = url
    apiClient.timeout = process.env.TIMEOUT ? process.env.TIMEOUT : 30000
    client[url] = apiClient

    return client[url]
}


/** Функція, що дозволяє обійти json структуру і замінити дані, щоб зберігати json в БД
 * @param {String}, {items} дані, що прийшли на аналіз
 */
const formatter = (items) => {
    if(items == undefined) return items;
    if(typeof(items) === 'number' ||  items instanceof Number){
        return items
    }
    if(typeof(items) === 'string' || items instanceof String){
        return items.replaceAll( /\"/ig, '&quot')
    }else if(items instanceof Object){
        const entries = Object.entries(items);
        for (const [keys, value] of entries) {
            items[keys] = formatter(value)
        }
    }
    return items
}
/** Повертає результат виконання запиту в manticoreSearch (update)
 * @param {String},{Object}    param для підключення manticoreSearch, може бути посилання на клієнт або url
 * @param {Object} query       SQL запит
 * @return {Promise}
 */
const update = async (query, param) =>{
    try{
        const client = (isString(param)) ? getClient(param) : param
        const indexApi = new Manticoresearch.IndexApi(client)
        res = await indexApi.update(query);
        const { ...content } = res
        return content
    } catch (e) { 
        throw e
    } 
}
/** Повертає результат виконання запиту в manticoreSearch (insert)
 * @param {String},{Object}    param для підключення manticoreSearch, може бути посилання на клієнт або url
 * @param {Object} query       SQL запит
 * @return {Promise}
 */
const insert = async (query, param) =>{
    try{
        const client = (isString(param)) ? getClient(param) : param
        const indexApi = new Manticoresearch.IndexApi(client)
        res = await indexApi.insert(query);
        const { ...content } = res
        return content
    } catch (e) { 
        throw e
    } 
}

/** Повертає результат виконання запиту в manticoreSearch 
 * @param {String},{Object}    param для підключення manticoreSearch, може бути посилання на клієнт або url
 * @param {String} query       SQL запит
 * @return {Promise}
 */

const execute = async (query, param) => {
    try{
        const client = (isString(param)) ? getClient(param) : param
        const utilsApi = new Manticoresearch.UtilsApi(client)
        const res = await utilsApi.sql(query)
        const { ...content } = res
        return content
    } catch (e) { 
        throw e
    }   
}

const stringify = object => {
    formatter(object)
    let result = JSON.stringify(object)
    result = result.replaceAll( /'/ig, "`")
    return result
}



module.exports = {
    getClient,
    execute,
    stringify,
    formatter,
    insert,
    update
  };