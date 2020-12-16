const fetch = require('node-fetch');
const readline = require('readline');
const chalk = require('chalk');
const houses = [
    {id: 1, name: 'Bravery', color: '#8E78D9'},
    {id: 2, name: 'Brilliance', color: '#F47B67'},
    {id: 3, name: 'Balance', color: '#45DDC0'},
    {id: 'random', name: 'Aléatoire', color: '#05fc09'},
];
const token = 'VOTRE_TOKEN';

const between = (min, max) => Math.floor(Math.random() * (max - min) + min)
const showTitle = () => console.log(chalk.red.bold('Bienvenue sur Discord-HypeSquad-Switcher !\n'));
const showCredits = () => {
    console.clear();
    showTitle();
    console.log(chalk.green('Auteur : HaXGamiG'));
    console.log(chalk.blue('Github : https://github.com/HaXGamiG'));
};

showTitle();
console.log('Liste des maisons :');
houses.forEach(h => console.log(chalk.hex(h.color)(`[${h.id}] ${h.name}`)));
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
    if ([1,2,3,4].includes(house)) throw new Error("La maison que vous avez choisi n'est pas valide !")

    const houseId = house === 'random' ? between(1, 4) : house;
    const res = await fetch('https://discord.com/api/v8/hypesquad/online', {
        method: 'POST',
        headers: {'authorization': token, 'content-type': 'application/json'},
        body: JSON.stringify({'house_id': houseId})
    });

    if (res.status === 204) {
        console.log(chalk.green(`\nVotre nouvelle maison est ${houses.find(h => h.id === houseId).name}`));
    } else {
        console.log(chalk.red("\nVotre token n'est pas valide !"));
    }

    rl.close();
});