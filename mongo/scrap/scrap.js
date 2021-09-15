const axios = require('axios');
const cheerio = require('cheerio');
const mongojs = require('mongojs');
const db = mongojs('mongodb://root:bootcamp2021@localhost:27017');
async function startScrape() {
    for (let i = 1; i < 8593; i++) {
        try {
            const result = await axios.get('https://metbuat.az/melumat/sirket/' + i + '/a.html');
            const $ = cheerio.load(result.data);
            const data = {};
            $('table.table-company-details tr').each(function(i, elem) {
                const key = $(elem).find('td:eq(0)').text().trim();
                const value = $(elem).find('td:eq(1)').text().trim();
                data[key] = value;
            });
            data.cid = i;
            data.coords = $('.forecasts iframe').attr('src');
            db.companies.insertOne(data, function(err, result) {
                if(err) {
                    console.error('https://metbuat.az/melumat/sirket/' + i + '/a.html');
                } else {
                    console.log('https://metbuat.az/melumat/sirket/' + i + '/a.html');
                }
            });
        } catch (err) {
        }
    }
}
startScrape();