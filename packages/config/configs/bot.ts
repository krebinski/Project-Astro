// Translate all this code to pt-br

import { ActivityType, PresenceUpdateStatus } from "discord-api-types/v10";

const config = {
 presence: {
  status: PresenceUpdateStatus.Online, // Status de presença. Pode ser: "Online", "Ocupado", "Não perturbe", "Invisível" ou "Offline" (Invisível e Offline são iguais)
  activity: {
   // name: "?", // string. Nome da atividade [não obrigatório quando usando tipo personalizado (4)]
   state: "🔥 Type /help to get started!", // string. Estado da atividade [obrigatório quando usando tipo personalizado (4)]
   type: ActivityType.Custom, // Tipo de atividade. Pode ser: "Jogando", "Transmitindo", "Ouvindo", "Assistindo", "Personalizado"

   /* Exemplo: Usando tipo 3 (Assistindo) com nome personalizado
   name: "o mundo queima", // Nota: Nome é obrigatório quando não usando tipo personalizado (4)!
   tipo: ActivityType.Watching,
  */
  },
 },

 /*
  links de doação
 */
 donate: {
  enabled: true, // boolean. Exibe o link de doação
  links: [
   {
    name: "Github Sponsors",
    url: "https://github.com/sponsors/krebinkkj",
    icon: "🔗",
   },
  ] satisfies { name: string; url: string; icon: string }[],
 },

 /*
  Emojis do bot
 */
 emojis: {
  // Categorias de emoji
  categories: [
   {
    name: "general",
    emoji: "🧱",
   },
   {
    name: "moderation",
    emoji: "🛠️",
   },
   {
    name: "fun",
    emoji: "😆",
   },
   {
    name: "utility",
    emoji: "🔧",
   },
   {
    name: "levels",
    emoji: "📈",
   },
   {
    name: "reputation",
    emoji: "👍",
   },
   {
    name: "image",
    emoji: "🖼️",
   },
   {
    name: "giveaway",
    emoji: "🎉",
   },
   {
    name: "ticket",
    emoji: "🎫",
   },
   {
    name: "reaction",
    emoji: "🎭",
   },
  ] satisfies { name: string; emoji: string }[],

  // Log types
  logs: [
   {
    type: "profanity",
    emoji: "🤬",
   },

   {
    type: "embed_color",
    emoji: "🎨",
   },
   {
    type: "command_change",
    emoji: "<:slash_commands:963333541565968384>",
   },
   {
    type: "category_change",
    emoji: "📂",
   },
   {
    type: "public_dashboard",
    emoji: "🔗",
   },
   {
    type: "vanity",
    emoji: "🔗",
   },
  ] satisfies { type: string; emoji: string }[],

  // Utility emojis
  picture_frame: "🖼️",
  anger: "💢",
  like: "👍",
  dislike: "👎",
  grin: "😁",
  pleading_face: "🥺",
  angry: "😡",
  rage: "🤬",
  drooling_face: "🤤",
  smirk: "😏",
  game_dice: "🎲",
  coin: "🪙",
  sparkles: "✨",
  earth: "🌎",
  clock: "⏰",
  search_glass: "🔍",
  chan: "🍀",
  edit: "📝",
  chat: "💬",
  sadness: "😢",
  flag_gb: ":flag_gb:",
  flag_jp: ":flag_jp:",
  book: "📚",
  counting: "🔢",
  star2: "🌟",
  calendar_spillar: "🗓️",
  star: "⭐",
  barchart: "📊",
  link: "🔗",
  tada: "🎉",
  brain: "🧠",
  magic_ball: "🔮",
  reverse_motherfucker: "↕️",
  reverse_nr_2_motherfucker: "🔀",
  light_bulb: "💡",
  broken_heart: "💔",
  heart: "❤️",
  flushed: "😳",
  facepalm: "🤦",
  sneeze: "🤧",
  input: "📥",
  output: "📤",
  bird: "🐦",
  cat: "🐱",
  koala: "🐨",
  panda: "🐼",
  wink: "😉",
  wastebasket: "🗑️",
  page: "📄",
  ping: "🏓",
  uptime: "⏳",
  package: "📦",
  optical_disk: "💿",
  muscule: "💪",
  stopwatch: "⏱️",
  octo: "🐙",
  rocket: "🚀",
  thinking: "🤔",
  question: "❔",
  tools: "🧰",
  money: "💰",
  music: "🎶",
  rofl: "😆",
  hammer: "🔨",
  bricks: "🧱",
  screw_that: "🔩",
  sign: "🪧",
  lyrics: "📑",
  pause: "⏸️",
  play: "▶",
  skip: "⏭️",
  volume: "🔉",
  pen: "🖊️",
  capital: "🏛️",
  location: "📍",
  currency: "💱",
  globe: "🌐",
  tongue: "👅",
  clap: "👏",
  lock: "🔐",
  game_controller: "🎮",
  weather: "🌤️",
  temperature: "🌡️",
  hot: "🥵",
  tornado: "🌪️",
  humidity: "💦",
  ruler: "📏",
  email: "📧",
  paper_clip: "📎",
  paper_clips: "🖇️",
  flower: "💮",
  arrows_clockwise: "🔃",
  jigsaw: "🧩",
  wave: "👋",
  color: "🎨",
 },
};

export const botConfig = config;
