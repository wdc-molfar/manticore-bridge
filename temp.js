const { getClient, execute } = require("./index.js")

let client = getClient("http://10.6.12.86:9308")

const run = async () => {
let response = await execute(
                "select * from molfar",
                client
            );
console.log(response[0].data[0])	
response = await execute(
                "select * from molfar",
                "http://10.6.12.86:9308"
            );
console.log(response[0].data[1])	


}
run()