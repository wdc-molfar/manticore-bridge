const Manticoresearch = require('manticoresearch')

const { isString, keys } = require("lodash")


// Object factory for Manticore clients identified by url  

let client = {}


const getClient = url => {
    if(client[url]) return client[url]
    
    apiClient = new Manticoresearch.ApiClient()
    apiClient.basePath = url
    apiClient.timeout = process.env.TIMEOUT ? process.env.TIMEOUT : 30000
    
    client[url] = new Manticoresearch.UtilsApi(apiClient)

    return client[url]
}



/** Повертає результат виконання запиту в manticoreSearch 
 * @param {String},{Object}    param для підключення manticoreSearch, може бути посилання на клієнт або url
 * @param {String} query       SQL запит
 * @return {Promise}
 */

const execute = async (query, param) => {
    try{
        const client = (isString(param)) ? getClient(param) : param
        const res = await client.sql(query)
        const { ...content } = res
        return content
    } catch (e) { 
        throw e
    }   
}

const stringify = object => {
    let result = JSON.stringify(object)
    result.replace(/\"/g, "`")
    return result
}



module.exports = {
    getClient,
    execute,
    stringify
  };