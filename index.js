// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js')

//dotenv
const dotenv = require('dotenv')
dotenv.config()
const {TOKEN, CLIENT_ID, GUILD_ID} = process.env



//command import
const fs = require("node:fs")
const path = require("node:path")
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.commands = new Collection()

for(const file of commandFiles){
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)
  if("data" in command && "execute" in command){
    client.commands.set(command.data.name, command)
  }else{
    console.log(`Esse comando em ${filePath} está com "data" ou "execute" ausentes`)
  }
}


//Login BOT
client.once(Events.ClientReady, c => {
	console.log(`Pronto! Login realizado como ${c.user.tag}`)
})
client.login(TOKEN)

//Listener bot interaction
client.on(Events.InteractionCreate, async interaction =>{
  if (interaction.isStringSelectMenu()){
    const selected = interaction.values[0]
    if (selected == "javascript"){
        await interaction.reply("Documentação do Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript")
    } else if (selected == "react"){
        await interaction.reply("Documentação do React: https://pt-br.reactjs.org/docs/getting-started.html")
    } else if (selected == "csharp"){
        await interaction.reply("Documentação do C#: https://learn.microsoft.com/en-us/dotnet/csharp/")
    } else if (selected == "discordjs"){
        await interaction.reply("Documentação do Discord.js: https://discordjs.guide/#before-you-begin")
    }
  }
  if(!interaction.isChatInputCommand()) return 
    const command = interaction.client.commands.get(interaction.commandName)
    if(!command) {
      console.log("Comando não encontrado")
      return
    }
    try{
      await command.execute(interaction)
    }
    catch{
      console.error(error)
      await interaction.reply("Hove um erro ao executar esse comando")
    }
})