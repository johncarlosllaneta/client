function FormatDate(props) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(props.datetime).toLocaleDateString(undefined, options);
}

function FormatDateAndTime(props) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return new Date(props.datetime).toLocaleDateString(undefined, options);
}

function dateConvertion(date) {
  var str = date.split("-");
  var year = str[0];
  var month;
  var day = str[2];

  if (str[1] === "01") {
    month = "January";
  } else if (str[1] === "02") {
    month = "February";
  } else if (str[1] === "03") {
    month = "March";
  } else if (str[1] === "04") {
    month = "April";
  } else if (str[1] === "05") {
    month = "May";
  } else if (str[1] === "06") {
    month = "June";
  } else if (str[1] === "07") {
    month = "July";
  } else if (str[1] === "08") {
    month = "August";
  } else if (str[1] === "09") {
    month = "September";
  } else if (str[1] === "10") {
    month = "October";
  } else if (str[1] === "11") {
    month = "November";
  } else if (str[1] === "12") {
    month = "December";
  }

  return month + " " + day + ", " + year;
}
export { FormatDate, FormatDateAndTime, dateConvertion };

// function formatDateAndTime(dateString) {
//     const options = { year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute: '2-digit', second: '2-digit' }
//     return new Date(dateString).toLocaleDateString(undefined, options)
// }

// function formatDate(dateString) {
//     const options = { year: "numeric", month: "long", day: "numeric" }
//     return new Date(dateString).toLocaleDateString(undefined, options)
// }
