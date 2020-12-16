const fetch = require('node-fetch');
const readline = require('readline');
const chalk = require('chalk');
const token = 'VOTRE_TOKEN';
if (token === 'VOTRE_TOKEN') throw new Error('Merci de mettre le token de votre compte.');

const showTitle = () => console.log(chalk.red.bold('Bienvenue sur Discord-HypeSquad-Switcher !\n'));
const showCredits = () => {
    console.clear();
    showTitle();
    console.log(chalk.green('Auteur : HaXGamiG'));
    console.log(chalk.blue('Github : https://github.com/HaXGamiG'));
};

showTitle();
console.log('Liste des maisons :');
console.log(chalk.hex('#8E78D9')('[1] Bravery'));
console.log(chalk.hex('#F47B67')('[2] Brilliance'));
console.log(chalk.hex('#45DDC0')('[3] Balance'));
console.log(chalk.gray.italic("\nTapez 'credits' pour avoir les informations sur l'auteur de ce script !"));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('\nNuméro de ta maison > ', async house => {
    if (house === 'credits') {
        showCredits();
        return rl.close();
    }
    if ([1,2,3].includes(house)) throw new Error("La maison que vous avez choisi n'est pas valide !")

    const res = await fetch('https://discord.com/api/v8/hypesquad/online', {
        method: 'POST',
        headers: {'authorization': token, 'content-type': 'application/json'},
        body: JSON.stringify({'house_id': house})
    });

    if (res.status === 204) {
        console.log(chalk.green('\nVotre maison a bien été changée !'));
    } else {
        console.log(chalk.red("\nVotre token n'est pas valide !"));
    }

    rl.close();
});