import { Telegraf, Markup, session } from 'telegraf';
import 'dotenv/config';

import {getGeo, defaultGeo} from './weather/geo.js'
import {getWeatherNow, getWeatherList} from './weather/weather.js'

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(session({ defaultSession: () => ({ geo: defaultGeo }) }));

bot.start(async (ctx) => {
  ctx.reply('Выберите действие:', Markup.keyboard([
    ["🌤 Погода сейчас", "🌤 Прогно за сутки","🗺 Изменить гео",],
  ]).resize());
});

bot.hears("🌤 Погода сейчас", async (ctx) => {
  const weather = await getWeatherNow(ctx.session.geo);
  await ctx.replyWithHTML(weather);
});

bot.hears("🌤 Прогно за сутки", async (ctx) => {
  const weather = await getWeatherList(ctx.session.geo);
  await ctx.replyWithHTML(weather);
});

bot.hears("🗺 Изменить гео", async (ctx) => {
  await ctx.reply('Введите название города:');

  bot.on("text", async ctx => {
    ctx.session.geo = await getGeo(ctx.message.text);
    await ctx.sendMessage(`Город изменен на ${ctx.session.geo.name}`);
  });
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));