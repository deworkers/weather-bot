const daysOfWeekLabels = ["Воскресенье", "Понедельникн", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

const directions = [
	'северный',
	'северо-восточный',
	'восточный',
	'юго-восточный',
	'южный',
	'юго-западный',
	'западный',
	'северо-западный'
];

function formatNumber(number) {
	return number.toString().padStart(2, '0');
  }

export function convertWindDirection(degrees) {
	const index = Math.round(degrees / 45) % 8;
	return directions[index];
}

export function getTimeLabel(dataObg) {
	return `${formatNumber(dataObg.hours)}:${formatNumber(dataObg.minutes)}`
}

export function getDayLabel(dataObg) {
	return dataObg.daysDiff === 0 ? 'Сегодня' : dataObg.daysDiff === 1 ? 'Завтра' : `${dataObg.weekDay}`
}

export function timestampToDate(timestamp) {
	const date = new Date(timestamp * 1000);
	const currentDate = new Date();
	const daysDiff = date.getDate() - currentDate.getDate();
	
	const dataObg = {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDate(),
		hours: date.getHours(),
		minutes: date.getMinutes(),
		seconds: date.getSeconds(),
		weekDay: daysOfWeekLabels[date.getDay()],
		daysDiff: daysDiff,
	}

	return dataObg;
}