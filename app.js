const { Client, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const fs = require("fs");

const chalk = require("chalk");
const ora = require("ora");

const SESSION_FILE_PATH = './session.json';

let client;
let sessionData;

const withSession = () => {

    const spinner = ora(`Cargando ${chalk.yellow('Validando sesión de Whatsapp...')}`);
    sessionData = require(SESSION_FILE_PATH);
    spinner.start();

    client = new Client({
        session: sessionData
    });

    client.on('ready', () => {
        console.log('¡Client se encuentra listo!');
        spinner.stop();

        connectionReady();

    });

    client.on('auth_failure', () => {
        spinner.stop();       
        deleteFilePath('session.json', 0);
    })

    client.initialize();

};

const withOutSession = () => {

    console.log("No se encuentra almacenada ninguna sesión");
    client = new Client();
   
    client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
    });
    
    client.on('ready', () => {
        console.log('¡Client se encuentra listo!');
        
        connectionReady();

    });
    
    client.on('auth_failure', () => {
        deleteFilePath('session.json', 1);
    })
    
    client.on('authenticated', (session) => {

        console.log(session)

        sessionData = session;
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
            if (err) {
                console.log("Error al almacenar la session - " + err);
            }
        });

    });

    client.initialize();

};

const connectionReady = () => {
    listenMessage();
}

const listenMessage = () => {

    client.on('message', (msg) => {
        const { from, to, body } = msg;

        switch (body) {
            case "Hola":
                sendMessage(from, "¿Como estás?")
                break;

            case "Archivo":
                sendMessage(from, "Envío de archivo")
                sendMedia(from, 'imagen.jpg');
                break;
        }

    })

};

const deleteFilePath = (path, reload) => {
    try {
        fs.unlinkSync(path)
        if(reload == 1){
             withOutSession();
        }       
    } catch (err) {
        console.error(err)
    }
}

const sendMedia = (number, fileName) => {
    const media = MessageMedia.fromFilePath(`./mediaSend/${fileName}`);
    client.sendMessage(number, media);
}

const sendMessage = (to, message) => {
    client.sendMessage(to, message);
}


(fs.existsSync(SESSION_FILE_PATH)) ? withSession() : withOutSession();