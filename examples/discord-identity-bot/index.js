// Copyright (c) 2021 MC-Market (Mick Capital Pty. Ltd.)
// MIT License (https://github.com/MC-Market-org/js-api-wrapper/blob/main/LICENSE)

const { Wrapper, Token, TokenType, Error } = require("mcm-js-api-wrapper");
const { Client, Intents } = require('discord.js');

const mcmToken = new Token(TokenType.PRIVATE, "Find @ https://www.mc-market.org/account/api");
const botToken = "Find @ https://discord.com/developers/applications";

const GUILD_ID = 0;
const ROLE_ID = 0;

let guild = undefined;
let role = undefined;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const wrapper = new Wrapper();

async function main() {
    await client.login(botToken);
    await wrapper.init(mcmToken);

    guild = await client.guilds.fetch(GUILD_ID);
    role = await guild.roles.fetch(ROLE_ID);

    client.on("guildMemberAdd", join);
}

async function join(user) {
    if (user.guild.id !== guild.id) return;

    let member;
    try {
        member = await wrapper.members().fetchByDiscord(Number(user.user.id));
    } catch (error) {
        if (error instanceof Error && error.code() === "MemberNotFound") return;
        throw error;
    }

    await user.roles.add(role);
}

main().catch(error => console.error("ERROR: " + error));