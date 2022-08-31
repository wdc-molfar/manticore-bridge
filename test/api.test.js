'use strict';

let { execute, getClient, stringify } = require( '../index' )

const urlToConnect = 'http://10.6.12.86:9308'

var json =  {
    "locations": [
        {
          "name": "location1",
          "lat": 23.000000,
          "long": 46.500000,
          "stock": 30
        },
        {
          "name": "location2",
          "lat": 24.000000,
          "long": 47.500000,
          "stock": 20
        },
        {
          "name": "location3",
          "lat": 24.500000,
          "long": 47.500000,
          "stock": 10
        }
      ],
      "color": [
        "blue",
        "black",
        "yellow"
      ],
      "price": 210.00,
      "cpu": {
        "model": "Kyro 345",
        "cores": 8,
        "chipset": "snapdragon 845"
      },
    "memory": 128,
    "service": {
     "scraper": {
      "message": {
       "text": "  Акции ДВМП (FESH) могут вырасти в 3 раза. Даже при ранее полученных оценках роста бизнеса на 30-40%, что очень консервативно для ДВМП, акция этой компании (по модели DCF источников РДВ) недооценена более чем в 2 раза.По мнению экспертов и источников, с которыми поговорили РДВ, в связи с текущей ситуацией в мире, бизнес вырастет на 100%, что в 2.5 раза выше консервативных оценок. В будущем для акций ДВМП это может означать кратный рост.  Справедливая цена акций ДВМП (FESH) 97 рублей, потенциал роста +180%.#FESH@AK47pfl",
       "html": "<div class=\"tgme_widget_message_text js-message_text\" dir=\"auto\"><i class=\"emoji\" style=\"background-image:url('//telegram.org/img/emoji/40/E29AA1.png')\"><b>⚡️</b></i> <b>Акции ДВМП (<a href=\"https://putinomics.ru/dashboard/FESH/MOEX\" target=\"_blank\" rel=\"noopener\" onclick=\"return confirm('Open this link?\\n\\n'+this.href);\">FESH</a>) могут вырасти в 3 раза.</b> Даже при ранее полученных оценках роста бизнеса на 30-40%, что очень консервативно для ДВМП, акция этой компании (по модели DCF источников РДВ) недооценена более чем в 2 раза.<br><br>По мнению экспертов и источников, с которыми поговорили РДВ, в связи с текущей ситуацией в мире, <b>бизнес вырастет на 100%</b>, что в 2.5 раза выше консервативных оценок. <b>В будущем для акций ДВМП это может означать кратный рост.</b><br><br><i class=\"emoji\" style=\"background-image:url('//telegram.org/img/emoji/40/F09F9189.png')\"><b>👉</b></i> <a href=\"https://putinomics.ru/dashboard/FESH/MOEX\" target=\"_blank\" rel=\"noopener\" onclick=\"return confirm('Open this link?\\n\\n'+this.href);\">Справедливая цена акций ДВМП (FESH) 97 рублей, потенциал роста +180%.</a><br><br><a href=\"?q=%23FESH\">#FESH</a><br><a href=\"https://t.me/AK47pfl\" target=\"_blank\">@AK47pfl</a></div>",
       "publishedAt": "2022-04-14 11:43:23",
       "index": 3,
       "md5": "b2e975d85ab64e16039c16506dfda01a"
      },
      "page": {
       "title": "РынкиДеньгиВласть | РДВ",
       "description": "<div class=\"tgme_channel_info_description\"><i class=\"emoji\" style=\"background-image:url('//telegram.org/img/emoji/40/F09F949D.png')\"><b>🔝</b></i> аналитика по российскому рынку ценных бумаг, которая ранее была доступна лишь финансовым элитам. Впереди брокеров и банков.<br><br>Стратегические вопросы: <a href=\"https://t.me/dragonwoo\" target=\"_blank\">@dragonwoo</a><br><br>Реклама - агент PR Fintech: <a href=\"https://t.me/arina_promo\" target=\"_blank\">@arina_promo</a><br><br>Сервис для инвесторов и трейдеров <a href=\"https://t.me/RDVPREMIUMbot\" target=\"_blank\">@RDVPREMIUMbot</a></div>",
       "image": "https://cdn4.telegram-cdn.org/file/X3RZTkJ6BTu6VcpAiW3OCGxjezSTNGTyuW6BsBFNFsakzKUZyPc1c-RWWWdUic7HIDYiT5ygx44S6tAjy7L2GeNw3egyZtvz0FKkCagmo2mf3B4VZKvJ1mUVaKDiiaPwcA1xTKbxCeRfRGjmzLSesiRxu-gVrLnzD7oZ62tXaKDqaqLcw_dazSi_6rFjUnQRKoIJ2LPdPwjlHiR8cqN7VnD4RbGlNEf6h39my38JIFcdO_F28pO4_c3uds5eJVfqv3fM6WaOFonRaR3QnopWKTnU8jJTa6Vc9NfGxp9-F9MnqXYhwES98VpwgFudCUS60MrcMQSXBxS_IQOfQh_eAg.jpg"
      }
     },
     "scheduler": {
      "task": {
       "params": {
        "type": "telegram",
        "channel": "AK47pfl"
       },
       "state": "processed",
       "processedAt": "2022-04-15 17:38:29"
      }
     }
    }
   }
var created_at = '2022-08-26T13:02:16+00:00'
var text = 'location2 test 123456789 тримають оборону'
json.service.scraper.message.html = json.service.scraper.message.html.replaceAll( /\"/ig, '&quot')
json.service.scraper.page.description = json.service.scraper.page.description.replaceAll( /\"/ig, '&quot')
const jsont_to_text = stringify(json)

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
            let data = `insert into molfar values(${max_id}, '${text}', ${new Date(created_at).getTime()}, ${jsont_to_text});`
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