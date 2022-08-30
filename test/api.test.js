'use strict';

let app = require( '../index' )

const client = app.api;
const urlToConnect = 'http://10.6.12.86:9308'
describe('Тести для роботи з manticoreSearch', () => {

    describe('Перевірка стану роботи контейнера', function() {
        //table molfar (id, text, data , created_at )
        //              uint, string, json, long
        test('Вставка данных', async () => {
            const response = await app.search(urlToConnect, "insert into molfar values(6, 'location2 test 1234', '2022-08-26T13:02:16+00:00', '{`locations`: [{`name`: `location2`,`lat`: 24.000000,`long`: 47.500000,`stock`: 20},{`name`: `location3`,`lat`: 24.500000,`long`: 47.500000,`stock`: 10}],`color`: [`blue`,`black`,`yellow`],`price`: 210.00,`cpu`: {`model`: `Kyro 345`,`cores`: 8,`chipset`: `snapdragon 845`},`memory`: 128}');");
            const count = response[0]['total']
            expect(count).toBeGreaterThan(0)
        });

        test('Полнотекстовий пошук по полю text', async () => {
            const response = await app.search(urlToConnect, "select * from molfar where MATCH('location2');");
            const count = response[0]['total']
            expect(count).toBeGreaterThan(0)
        });

        test('Пошук по полю data та структурі json', async () => {
            const response = await app.search(urlToConnect, "SELECT * FROM molfar WHERE data.cpu.model='Kyro 345';");
            const count = response[0]['total']
            expect(count).toBeGreaterThan(0)
        });
        // for example
        //SELECT * FROM molfar WHERE data.color IS NULL;
        test('Пошук по полю data та структурі json', async () => {
            const response = await app.search(urlToConnect, "SELECT * FROM molfar WHERE data.color IS NOT NULL;");
            const count = response[0]['total']
            expect(count).toBeGreaterThan(0)
        });

        //SELECT *,IN(data.color,'black','white') AS color_filter FROM molfar WHERE color_filter=1; це є, якщо 0 -= то немає
        test('Пошук по полю data та структурі json', async () => {
            const response = await app.search(urlToConnect, "SELECT *,IN(data.color,'black','white') AS color_filter FROM molfar WHERE color_filter=1;");
            const count = response[0]['total']
            expect(count).toBeGreaterThan(0)
        });

        // SELECT * from molfar ORDER BY INTEGER(data.video_rec[0]) DESC;
        test('Пошук по полю data та структурі json', async () => {
            const response = await app.search(urlToConnect, "SELECT * from molfar ORDER BY INTEGER(data.video_rec[0]) DESC;");
            const count = response[0]['total']
            expect(count).toBeGreaterThan(0)
        });

        test('Пошук по полю data та структурі json', async () => {
            const response = await app.search(urlToConnect, "SELECT data.video_rec[0] as g, count(*) from molfar GROUP BY g;");
            const count = response[0]['total']
            expect(count).toBeGreaterThan(0)
        });


        test('Кількість строк має бути більше 0', async () => {
            const response = await app.search(urlToConnect, 'select * from molfar');
            const count = response[0]['total']
            expect(count).toBeGreaterThan(0)
        });

        test('Перевірка на поле Data в запиті', async () => {
            const response = await app.search(urlToConnect, 'select * from molfar');
            expect(response[0]['data'][0]['text'].length).toBeGreaterThan(0)
        });

        test('Повнотекстовий пошук', async () => {
            const response = await app.search(urlToConnect, "select * from molfar where match('тримають оборону')");
            const count = response[0]['total']
            expect(count).toBeGreaterThan(0)
        });
        
        test('Удаление данных', async () => {
            const response = await app.search(urlToConnect, "delete from molfar where id = 6;");
            const count = response[0]['total']
            expect(count).toBeGreaterThan(0)
        });
    });
    describe('Перевірка стану роботи контейнера з client', function() {
        const apiSeach = client.getClient(urlToConnect)
        test('Кількість строк має бути більше 0', async () => {
            const response = await app.searchUseClient(apiSeach, 'select * from molfar');
            const count = response[0]['total']
            expect(count).toBeGreaterThan(0)
        });

        test('Перевірка на поле Data в запиті', async () => {
            const response = await app.searchUseClient(apiSeach, 'select * from molfar');
            expect(response[0]['data'][0]['text'].length).toBeGreaterThan(0)
        });
    });
});