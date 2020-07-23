//Create public API singleton
const api = {};

//Declare public functions
api.truncatePost = function(body, length) {
  const continueReadingCharacterLimit = length || 200;
  const dots = "...";
  const dotsSpan = `<span class="post-body-dots">${dots}</span>`;

  return (!(body.length > continueReadingCharacterLimit)) ? body : `${body.substring(0, continueReadingCharacterLimit-1)}${dotsSpan}`;
};

api.formatDateString = function(dateString) {
  const date = new Date(dateString);
  const month = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };
  return `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
};

module.exports = api;
