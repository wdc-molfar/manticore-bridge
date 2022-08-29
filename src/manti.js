const Manticoresearch = require('manticoresearch')


const ClientManti = class {
	constructor () {
        this.client = new Manticoresearch.ApiClient()
	}

	getClient(url){
        if(this.searchApi){
            return this.searchApi
        }
        this.client.basePath =  url
        this.client.timeout  = process.env.TIMEOUT ? process.env.TIMEOUT : 30000
        this.searchApi  = new Manticoresearch.UtilsApi(this.client)
		return this.searchApi
	}

}

module.exports =  api =>  (new ClientManti())