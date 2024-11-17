const TelegramBot = require('node-telegram-bot-api');

require('dotenv').config()
const TOKEN = process.env.TOKEN

const bot = new TelegramBot(TOKEN, {polling: true});
const fs = require('fs');


const express = require('express')
const app = express()

app.get('/', (req, res) =>{
    res.send("Bot is alive")
})
const port = 3000;
app.listen(port, () => {
    console.log(`server running https://localhost:${port}`);
})

// Kalit so'zlar
const keywords = ['chaqmoq taxi ofis','chaqmoq tezkor taxi','chilonzor', 'qorasuv', 'yunusobod', 'yunusobot', 'admin', 'pul yechib', 'admen', 'admn', 'yordam', 'aloo', 'tel nomer','tel nomir', 'tel raqam','pul yechish', 'pul chiqarish', 'qarz berib', 'qarz tashlab', 'limit', 'lokatsiya', 'lakatsiya', 'чақмоқ тахи офис', 'чақмоқ тезкор тахи', 'чилонзор', 'қорасув', 'юнусобод', 'юнусобот', 'адмен', 'админ', 'адмн', 'пул ечиш', 'пул чиқариш', 'лакация', 'локация', 'тел номер', 'тел номир','қарз бериб' ,'қарз ташлаб' ,'лимит' ,'локация' ,'лакация'];

// Habardagi kalit so'zlarni aniqlash uchun funksiya
function findKeywords(message) {
    const foundKeywords = [];
    keywords.forEach(keyword => {
        if (message.toLowerCase().includes(keyword)) {
            foundKeywords.push(keyword);
        }
    });
    return foundKeywords;
} 

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text.toString().toLowerCase();
    const foundKeywords = findKeywords(messageText);
    
    const userId = msg.from.id;
    const username = msg.from.username;
    const text = msg.text;
    
    const messageData = {
        userId: userId,
        username: username,
        messageText: text,
    };
    
    let replay = {reply_to_message_id: msg.message_id};
    let htmlTeg = { parse_mode: 'HTML'}
    
    // JSON ma'lumotlarini faylga qo'shish
    // fs.appendFile('messages.json', JSON.stringify(messageData)  + '\n ', (err) => {
        //         if (err) {
    //         console.error('Xatolik yuz berdi:', err);
    //         return;
    //     }
    //     console.log('Ma\'lumotlar faylga saqlandi.');
    // });
    const locations = [
        {
            name: "CHILONZOR",
            name_link:'chilonzor',
            name_r:'чилонзор',
            work_time: "24/7",
            phone: "+998941659717",
            telegram: "@CHAQMOQ_TEZKOR_CHILONZOR",
            url: "https://yandex.uz/navi?whatshere%5Bpoint%5D=69.18485653426441%2C41.27323675472256&whatshere%5Bzoom%5D=17.466833&ll=69.18485653426438%2C41.2736915915476&z=17.466833&si=6gzu1bfxbbu537hxtubbjph5um",
        },
        {
            name: "QORASUV",
            name_link:'qorasuv',
            name_r:'қорасув',
            work_time: "(08:00 - 23:00) ",
            phone: "+998951339717",
            telegram: "@CHAQMOQ_TEZKOR_QORASUV",
            url: "https://yandex.uz/navi?whatshere%5Bpoint%5D=69.36808590276627%2C41.3337965128391&whatshere%5Bzoom%5D=17.466913&ll=69.36823839804416%2C41.33404797332733&z=17.466913&si=6gzu1bfxbbu537hxtubbjph5um",
        },
        {
            name: "YUNUSOBOD",
            name_link:'yunusobod',
            name_r:'юнусобод',
            work_time: "(08:00 - 00:00)",
            phone: "+998942269717",
            telegram: "@CHAQMOR_TEZKOR_YUNUSOBOD",
            url: "https://yandex.uz/navi?whatshere%5Bpoint%5D=69.2690017269279%2C41.36842014794523&whatshere%5Bzoom%5D=16.74843&ll=69.26923296759568%2C41.36923353990003&z=16.74843&si=6gzu1bfxbbu537hxtubbjph5um",
        }
    ];
    
    // Avtomatik javoblar
    if (messageText === '/start') {
        bot.sendMessage(chatId, ' ASSALOMU ALAYKUM CHAQMOQ TEZKOR TAXI YORDAMCHI BOTGA XUSH KELIBSIZ ');
    } 
    if (messageText === 'salom') {
        const messageText = 'Assalomu alaykum sizga qanday yordam bera olishim mumkin?'; 
        bot.sendMessage(chatId, messageText);
    };
    
    locations.forEach(location => {
        if (foundKeywords.length > 0 && foundKeywords[0] === `${location.name_link}` || foundKeywords[0] === `${location.name_r}` || messageText ===  `/${location.name_link}`) {
            const options = {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [
                        [{ text: ` Lokatsiya`, url: location.url }]
                    ]
                }
            };
            bot.sendMessage(chatId,
                `<b> ${location.name} </b> \n` +
                `💠 ISH VAQTI ${location.work_time} \n` +
                `☎️ ${location.phone} \n` +
                `📝 ${location.telegram} \n\n` + 
                
                `🔘 OFISNING IMKONYATLARI \n `+
                `🔴 Taximetrdagi muammolaringizni bartaraf etish \n ` +
                `🔴 Hisobingizni to'ldirganingizda +20% Bonus \n ` +
                `🔴 Hisobdan pul yechish 24/7 (T/g bot) \n ` +
                `🔴 Avto Sug'irta \n ` +
                `🔴 Litsenziya taxi \n ` +
                `🔴 Oynalar tusini o'zgartrish (ruxsatnoma) \n ` +
                'Lokatsiya uchun tugmani bosing: ', {...replay ,...htmlTeg, ...options});
            }
        })
        
        if (foundKeywords.length > 0 && foundKeywords[0] === "pul yechish" || foundKeywords[0] === "pul chiqarish" || foundKeywords[0] === "пул чиқариш" || foundKeywords[0] === "пул ечиш") {
            bot.sendMessage(chatId,
                ` ASSALOMU ALAYKUM  PUL YECHISH ''CHAQMOQ TEZKOR''NING MAXSUS BOTI ORQALI 24/7 YECHIB OLISHINGIZ MUMKIN \n` +
                ` https://t.me/CHAQMOQ_TEZKOR_BOT \n` + 
                `  \n\n`,
                {...replay ,...htmlTeg})
            } 
            else if (foundKeywords.length > 0 && foundKeywords[0] === 'admin' || foundKeywords[0] === 'admn' || foundKeywords[0] === 'admen' || foundKeywords[0] === 'aloo' || messageText === 'yordam' || messageText === 'pul yechib'  || foundKeywords[0] === 'админ' || foundKeywords[0] === 'адмен' || foundKeywords[0] === 'адмн' || foundKeywords[0] === 'qarz berib' || foundKeywords[0] === 'qarz tashlab' || foundKeywords[0] === 'қарз бериб' || foundKeywords[0] === 'қарз ташлаб' || foundKeywords[0] === 'limit' || foundKeywords[0] === 'лимит' || messageText === '?' || messageText === '.') {
                bot.sendMessage(chatId, 
                    `👋Assalomu alaykum \n`+
                    `🧐Sizga qanday yordam bera olaman ? \n`+
                    `🙋‍♂️ Iltimos operator javobini kuting \n`+
                    `✈️@CHAQMOQ_TEZKOR_CHILONZOR  \n `+
                    `✈️@CHAQMOQ_TEZKOR_QORASUV \n `+
                    `✈️@CHAQMOR_TEZKOR_YUNUSOBOD \n `+
                    `📱+998941659717 biz bilan bog'laning \n`,
                    {...replay ,...htmlTeg})
                }
                else if (foundKeywords.length > 0 && foundKeywords[0] === 'tel nomir' || foundKeywords[0] === 'tel nomer' || foundKeywords[0] === 'тел номер' || foundKeywords[0] === 'тел номир' || messageText === 'tel raqam' ) {
                    bot.sendMessage(chatId, 
                        `👋Assalomu alaykum \n`+
                        `🧐Sizga qanday yordam bera olaman ? \n`+
                        `+998941659717 CHILONZOR \n `+
                        `+998951339717 QORASUV \n `+
                        `+998942269717 YUNUSOBOD biz bilan bog'laning \n `,
                        {...replay ,...htmlTeg})
                    }
                    else if (foundKeywords.length > 0 && foundKeywords[0] === 'lakatsiya' || foundKeywords[0] === 'lokatsiya'|| foundKeywords[0] === 'локация' || foundKeywords[0] === 'лакация' ) {
                        
                        
                        // Har bir ofis uchun xabar va lokatsiya tugmalarini jo'natish
                        locations.forEach(location => {
                            const options = {
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: ` Lokatsiya`, url: location.url }]
                                    ]
                                }
                            };
                            
                            let message = `<b>${location.name}</b> \n` +
                            `💠 ISH VAQTI (${location.work_time}) \n` +
                            `☎️ ${location.phone} \n` +
                            `📝 ${location.telegram} \n\n`
                            // `Lokatsiya uchun tugmani bosing: `
                            bot.sendMessage(chatId, message, options);
                        });
                    }
                    
                    else if(foundKeywords.length > 0 && foundKeywords[0] === 'chaqmoq taxi ofis' || messageText === 'chaqmoq tezkor taxi' || messageText === '/malumot' || messageText === '/malumot@chaqmoqtezkoryordamchi_bot'){
                        const servicesMessage = `👨🏻‍💻  ASSALOMU ALAYKUM HAYDOVCHILAR SIZNI OFFICEMIZDA KUTIB QOLAMIZ VA TURLI XIL XIZMATLARIMIZNI TAKLIF QILAMIZ\n\n`
                        +
                        `❇️ LITSENZIYA \n`+
                        `❇️ ISHONCHNOMA (DAVERNOS) \n`+
                        `❇️ OYNALAR TUSINI O'ZGARTIRISH \n`+
                        `❇️ SUG'URTA \n`+
                        `❇️ HAYDOVCHILIK GUVOHNOMASINI ALMASHTIRISH \n`+
                        `❇️ BUNDAY IMKONIYAT FAQAT SULTAN TAXIDA \n\n`
                        + 
                        `1.🔔 CHILONZOR \n`+
                        `💠   ISH VAQTI 24/7 \n`+
                        `☎️   +998941659717 \n`+
                        `📝   @CHAQMOQ_TEZKOR_CHILONZOR \n\n`
                        +
                        `2.🔔 QORASUV \n `+
                        `💠  ISH VAQTI (08:00 - 23:00) \n `+
                        `☎️  +998951339717 \n `+
                        `📝  @CHAQMOQ_TEZKOR_QORASUV \n\n`
                        +
                        `3.🔔 YUNUSOBOD \n`+
                        `💠  ISH VAQTI (08:00 - 00:00) \n`+
                        `☎️  +998942269717 \n`+
                        `📝  @CHAQMOR_TEZKOR_YUNUSOBOD \n\n` 
                        +
                        
                        `<b> Оfisimiz orqali  taksometr balansini to'ldirsangiz +20% BONUSga ega bo'lasiz! </b> \n\n`+
                        `<b> Click va Payme orqali  taksometr balansini to'ldirsangiz +20% BONUSga ega bo'lasiz! </b> \n\n` +
                        `<b> Endi karta orqali qilingan to'lov va bonuslarni TELEGRAM BOT @CHAQMOQ_TEZKOR_BOT da foizsiz yechvolishingiz mumkin </b> \n\n` +
                        
                        `☎️ Ma'lumotlar:  \n `+
                        `☎️ +998941659717 \n `+
                        `⌨️ 24/7  \n `+
                        `📝 @ChaqmoqTezkorTashkent \n `
                        ;
                        bot.sendMessage(chatId, servicesMessage, {...replay, ...htmlTeg});
                    } else {
                        const data = ``
                        // bot.sendMessage(chatId, data);
                    }
                });