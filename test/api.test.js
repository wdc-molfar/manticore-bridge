'use strict';

let { execute, getClient, stringify } = require( '../index' )
let json =  require('./data.js')

const urlToConnect = 'http://10.6.12.86:9308'

var created_at = '2022-08-26T13:02:16+00:00'
var text       = 'location2 test 123456789 тримають оборону'

describe('Тести для роботи з manticoreSearch', () => {

    describe('Перевірка стану роботи контейнера', function() {
        //table molfar (id, text, data , created_at )
        //              uint, string, json, long
        let max_id = 1

        test('Max id в базі', async () => {
            const response = await execute(
                "select max(id) as max_id from molfar;",
                urlToConnect
            )
            if(response[0]['data'][0] != undefined && response[0]['data'][0]['max_id'] != undefined){
                max_id = response[0]['data'][0]['max_id'] + 1
            }
            expect(max_id).toBeGreaterThan(0)
        });
        
        test('Вставка данных', async () => {
            let data = `insert into molfar values(${max_id}, '${text}', ${new Date(created_at).getTime()}, '${stringify(json)}');`
            const response = await execute(
                data,
                urlToConnect
            )
            const count = response[0]['total']
            expect(count).toBeGreaterThan(0)
        });

        test('Кількість строк має бути більше 0', async () => {
            const response = await execute(
                `select * from molfar ${max_id}`,
                urlToConnect
            )
            console.log(response[0]['data'][0])
            const count = response[0]['total']
            expect(count).toBeGreaterThan(0)
        });
        
        test('Полнотекстовий пошук по полю text', async () => {
            const response = await execute(
                "select * from molfar where MATCH('location2');",
                urlToConnect
            )
            const count = response[0]['total']
            expect(count).toBeGreaterThan(0)
        });

        test('Пошук по полю data та структурі json', async () => {
            const response = await execute(
                "SELECT * FROM molfar WHERE data.cpu.model='Kyro 345';",
                urlToConnect
            )
            const count = response[0]['total']
            expect(count).toBeGreaterThan(0)
        });
        // for example
        //SELECT * FROM molfar WHERE data.color IS NULL;
        test('Пошук по полю data та структурі json', async () => {
            const response = await execute(
                "SELECT * FROM molfar WHERE data.color IS NOT NULL;",
                urlToConnect
            )
            const count = response[0]['total']
            expect(count).toBeGreaterThan(0)
        });

        //SELECT *,IN(data.color,'black','white') AS color_filter FROM molfar WHERE color_filter=1; це є, якщо 0 -= то немає
        test('Пошук по полю data та структурі json', async () => {
            const response = await execute(
                "SELECT *,IN(data.color,'black','white') AS color_filter FROM molfar WHERE color_filter=1;",
                urlToConnect
            )
            const count = response[0]['total']
            expect(count).toBeGreaterThan(0)
        });

        // SELECT * from molfar ORDER BY INTEGER(data.video_rec[0]) DESC;
        test('Пошук по полю data та структурі json', async () => {
            const response = await execute(
                "SELECT * from molfar ORDER BY INTEGER(data.video_rec[0]) DESC;",
                urlToConnect
            )
            const count = response[0]['total']
            expect(count).toBeGreaterThan(0)
        });

        test('Пошук по полю data та структурі json', async () => {
            const response = await execute(
                "SELECT data.video_rec[0] as g, count(*) from molfar GROUP BY g;",
                urlToConnect
            )
            const count = response[0]['total']
            expect(count).toBeGreaterThan(0)
        });


        test('Кількість строк має бути більше 0', async () => {
            const response = await execute(
                `select * from molfar ${max_id}`,
                urlToConnect
            )
            console.log(response[0]['data'][0])
            const count = response[0]['total']
            expect(count).toBeGreaterThan(0)
        });

        test('Перевірка на поле Data в запиті', async () => {
            const response = await execute(
                'select * from molfar',
                urlToConnect
            )
            expect(response[0]['data'][0]['text'].length).toBeGreaterThan(0)
        });

        test('Повнотекстовий пошук', async () => {
            const response = await execute(
                "select * from molfar where match('тримають оборону')",
                urlToConnect
            )
            const count = response[0]['total']
            expect(count).toBeGreaterThan(0)
        });
        
         test('Удаление данных', async () => {
             const response = await execute(
                 `delete from molfar where id = ${max_id};`,
                 urlToConnect
             )
             const count = response[0]['total']
             expect(count).toBeGreaterThan(0)
         });
    });
    
});