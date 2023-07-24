import WAWebJS, {Client, LocalAuth} from "whatsapp-web.js";
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

const emoji = process.env.EMOJI || ""
const chatId = process.env.CHAT_ID || ""

client.on('qr', (qr: string) => {
    qrcode.generate(qr, {small: true})
});

client.on('ready', async () => {
    console.log('Client is ready!')
});

client.on('message', (message: WAWebJS.Message) => {
    if (message.from == chatId) {
        message.react(emoji)
            .then(() => {
                console.log(`reacted to message: "${message.body}" with emoji "${emoji}"`)
            })
    }
})


client.initialize();
