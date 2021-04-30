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
	switch (day) {
		case 0: {
			return "Sun";
		}
		case 1: {
			return "Mon";
		}
		case 2: {
			return "Tue";
		}
		case 3: {
			return "Wed";
		}
		case 4: {
			return "Thu";
		}
		case 5: {
			return "Fri";
		}
		case 6: {
			return "Sat";
		}
	}
};

const formatMonth = (month) => {
	switch (month) {
		case 0: {
			return "January";
		}
		case 1: {
			return "February";
		}
		case 2: {
			return "March";
		}
		case 3: {
			return "April";
		}
		case 4: {
			return "May";
		}
		case 5: {
			return "June";
		}
		case 6: {
			return "July";
		}
		case 7: {
			return "August";
		}
		case 8: {
			return "September";
		}
		case 9: {
			return "October";
		}
		case 10: {
			return "November";
		}
		case 11: {
			return "December";
		}
	}
};

export default formatDate;
