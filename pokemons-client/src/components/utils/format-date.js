const formatDate = (createdAt) => {
	const date = new Date(createdAt);

	const parsedWeekDay = date.getDay();
	const parsedMonth = date.getMonth();
	const parsedHours = date.getHours();
	const parsedMinutes = date.getMinutes();

	const weekDay = formatDay(parsedWeekDay);
	const month = formatMonth(parsedMonth);
	const day = date.getDate();
	const year = date.getFullYear();

	const hours = formatTime(parsedHours);
	const minutes = formatTime(parsedMinutes);

	const fullDate = `${weekDay}, ${day} ${month} ${year}`;
	const time = `${hours}:${minutes}`;

	return [fullDate, time];
};

const formatTime = (time) => {
	if (time < 10) {
		return `0${time}`;
	}
	return time;
};

const formatDay = (day) => {
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	return days[day];
};

const formatMonth = (month) => {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	return months[month];
};

export default formatDate;
