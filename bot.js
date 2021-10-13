const { Client, Intents, MessageEmbed } = require('discord.js');
const { token, targetChl, guildId } = require('./config.json');
const CronJob = require('cron').CronJob;

const client = new Client({
	intents: [Intents.FLAGS.GUILDS],
});


client.on('ready', () => {
	console.log(`Logged in: ${client.user.tag}`);
});


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
	const guild = client.guilds.cache.get(guildId);
	const memberCount = guild.memberCount;

	if (commandName == 'ping') {
		await interaction.reply('I\'m alive!');
	}
	else if (commandName == 'server') {
		await interaction.reply(`WTPC Current Member Count: ${memberCount}`);
	}
});


// '* * * * * *'
// sec(0-59), min(0-59), hour(0-23), day of month(1-31), month(1-12), day of week(0-6 starting with sunday)
const dayBeforeReminder = new CronJob('1 12 * * 4', function() {
	const dayBeforeMsg = new MessageEmbed()
		.setColor('#0080ff')
		.addFields(
			{ name: 'Meeting this Friday at 7pm',
				value: 'React with 👍 to RSVP' },
		)
		.setImage('https://www.waketech.edu/themes/custom/talon/assets/images/wake-tech-2017.png');

	client.channels.cache.get(targetChl).send({ embeds: [dayBeforeMsg] });
});


const meetingStart = new CronJob('58 18 * * 5', function() {
	const mtgStartMsg = new MessageEmbed()
		.setColor('#0080ff')
		.addFields(
			{ name: 'Meeting starting now',
				value: 'Join general chat' },
		)
		.setImage('https://www.waketech.edu/themes/custom/talon/assets/images/wake-tech-2017.png');

	client.channels.cache.get(targetChl).send({ embeds: [mtgStartMsg] });
});


dayBeforeReminder.start();
meetingStart.start();

client.login(token);