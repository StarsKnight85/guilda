// setup for guildo
setup = {
    name: "Guilda",
    token: process.env.TOKEN,
    activity:  'a Monster Hunter: World',
    Guilds: {
        Salon_MH: {
            name: "Salon MH",
            id: '514146282986799140',
            Channels: {
                admin_command_bot: {
                    name: "👾🔐admin-command-bot",
                    id: "514146282986799140",
                    admin: true
                },
                command_bot: {
                    name: "👾command-bot",
                    id: '639181256671887389',
                    admin: false 
                }
            }
        },
        Bot_Arena: {
            name : "Bot Arena",
            id : '590176875750621204',
            Channels : {
                admin_command_bot: {
                    name: "admin_command_bot",
                    id: '643054631152517134',
                    admin: true
                },
                general: {
                    name: "général",
                    id: '590176875750621208',
                    admin: false
                }
            }
        },
        Bot_Arena_2: {
            name: "Bot Arena 2",
            id: '643190727383187456',
            Channels: {
                admin_command_bot: {
                    name: "admin-command-bot",
                    id: '643190727383187456',
                    admin: true
                },
                general: {
                    name: "général",
                    id: '643190727811268632',
                    admin: false
                }
            }
        }
    },
    setGuilds: function(guilda){
        for(guildSelector in this.Guilds){
            listOfChannels = []
            for(channelSelector in this.Guilds[guildSelector].Channels){
                listOfChannels.push([this.Guilds[guildSelector].Channels[channelSelector].name, this.Guilds[guildSelector].Channels[channelSelector].id, this.Guilds[guildSelector].Channels[channelSelector].admin])
            }
            guilda.channelList.addChannelCollection([this.Guilds[guildSelector].name, this.Guilds[guildSelector].id], listOfChannels)
        }
    }
}
module.exports = setup