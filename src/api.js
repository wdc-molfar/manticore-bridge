const Manticoresearch = require('manticoresearch')


/** Повертає результат пошуку в manticoreSearch 
 * @param {String} url         URL для підключення manticoreSearch
 * @param {String} query       SQL запит
 * @return {Promise}
 */
const search = async (url, query) =>{
    // create client to connection whis mantcire search
    try{
        const client = new Manticoresearch.ApiClient()
        client.basePath =  url
        client.timeout  = process.env.TIMEOUT ? process.env.TIMEOUT : 30000
        const searchApi = new Manticoresearch.UtilsApi(client)
        const res = await searchApi.sql(query)
        const { ...content } = res
        return content
    } catch (e) { 
        console.log(e)
        return e.toString()
    }   
}

/** Повертає результат пошуку в manticoreSearch з використанняи клієнта
 * @param {Object} searchApi
 * @param {String} query       SQL запит
 * @return {Promise}
 */
const searchUseClient = async (searchApi, query) =>{
    // create client to connection whis mantcire search
    try{
        const res = await searchApi.sql(query)
        const { ...content } = res
        return content
    } catch (e) { 
        return e.toString()
    }   
}

module.exports = {
    search,
    searchUseClient
  };