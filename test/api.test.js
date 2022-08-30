'use strict';

let { execute, getClient } = require( '../index' )

const urlToConnect = 'http://10.6.12.86:9308'

describe('Тести для роботи з manticoreSearch', () => {

    describe('Перевірка стану роботи контейнера', function() {


        test('Вставка данных', async () => {
            const response = await execute(
                "insert into molfar values(6,'test', '2022-08-26T13:02:16+00:00', '{`locations`: [{`name`: `location2`,`lat`: 24.000000,`long`: 47.500000,`stock`: 20},{`name`: `location3`,`lat`: 24.500000,`long`: 47.500000,`stock`: 10}],`color`: [`blue`,`black`,`yellow`],`price`: 210.00,`cpu`: {`model`: `Kyro 345`,`cores`: 8,`chipset`: `snapdragon 845`},`memory`: 128}');",
                urlToConnect
            );
            const count = response[0]['total']
            expect(count).toBeGreaterThan(0)
        });


        // test('Кількість строк має бути більше 0', async () => {
        //     const response = await execute('select * from molfar',urlToConnect);
        //     const count = response[0]['total']
        //     expect(count).toBeGreaterThan(0)
        // });

        // test('Перевірка на поле Data в запиті', async () => {
        //     const response = await execute('select * from molfar', urlToConnect);
        //     expect(response[0]['data'][0]['text'].length).toBeGreaterThan(0)
        // });

        // test('Повнотекстовий пошук', async () => {
        //     const response = await execute("select * from molfar where match('тримають оборону')", urlToConnect);
        //     const count = response[0]['total']
        //     expect(count).toBeGreaterThan(0)
        // });
        
        // test('Удаление данных', async () => {
        //     const response = await execute("delete from molfar where id = 6;", urlToConnect);
        //     const count = response[0]['total']
        //     expect(count).toBeGreaterThan(0)
        // });
    });

    // describe('Перевірка стану роботи контейнера з client', function() {
    //     const client = getClient(urlToConnect)
        
    //     test('Кількість строк має бути більше 0', async () => {
    //         const response = await execute('select * from molfar', client);
    //         const count = response[0]['total']
    //         expect(count).toBeGreaterThan(0)
    //     });

    //     test('Перевірка на поле Data в запиті', async () => {
    //         const response = await execute('select * from molfar', client);
    //         expect(response[0]['data'][0]['text'].length).toBeGreaterThan(0)
    //     });

    // });
    
});