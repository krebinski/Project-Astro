import { OAuth2Scopes, PermissionFlagsBits } from "discord-api-types/v10";


const permissions = [
    // prettier
    PermissionFlagsBits.ViewChannel,
    PermissionFlagsBits.ManageChannels,
    PermissionFlagsBits.ManageRoles,
    PermissionFlagsBits.ManageGuildExpressions,
    PermissionFlagsBits.ManageGuild,
    PermissionFlagsBits.ChangeNickname,
    PermissionFlagsBits.ManageNicknames,
    PermissionFlagsBits.CreateInstantInvite,
    PermissionFlagsBits.KickMembers,
    PermissionFlagsBits.BanMembers,
    PermissionFlagsBits.SendMessages,
    PermissionFlagsBits.SendMessagesInThreads,
    PermissionFlagsBits.ManageMessages,
    PermissionFlagsBits.EmbedLinks,
    PermissionFlagsBits.AttachFiles,
    PermissionFlagsBits.AddReactions,
    PermissionFlagsBits.UseExternalEmojis,
    PermissionFlagsBits.MentionEveryone,
];

const flagsBitsNumber = permissions.reduce((accumulator, currentValue) => accumulator | currentValue).toString();

export const globalPermissions = {
    permissions: flagsBitsNumber, // string. Permissões do discord definidas em array usando discord-api-types/v10
    scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands].join("%20"), // string. Discord scopes OAuth2. Olhar em https://discord.com/developers/docs/topics/oauth2#scopes#shared-resources-oauth2-scopes
};