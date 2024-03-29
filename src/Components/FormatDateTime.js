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

function timeFormatter(time) {
  var timeCurrent = time.split(":");

  if (timeCurrent[0] == "00") {
    return "12:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
  } else if (timeCurrent[0] == "01") {
    return "1:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
  } else if (timeCurrent[0] == "02") {
    return "2:" + timeCurrent[1 + ":"] + timeCurrent[2] + "AM ";
  } else if (timeCurrent[0] == "03") {
    return "3:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
  } else if (timeCurrent[0] == "04") {
    return "4:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
  } else if (timeCurrent[0] == "05") {
    return "5:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
  } else if (timeCurrent[0] == "06") {
    return "6:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
  } else if (timeCurrent[0] == "07") {
    return "7:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
  } else if (timeCurrent[0] == "08") {
    return "8:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
  } else if (timeCurrent[0] == "09") {
    return "9:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
  } else if (timeCurrent[0] == "10") {
    return "10:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
  } else if (timeCurrent[0] == "11") {
    return "11:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
  } else if (timeCurrent[0] == "12") {
    return "12:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
  } else if (timeCurrent[0] == "13") {
    return "1:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
  } else if (timeCurrent[0] == "14") {
    return "2:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
  } else if (timeCurrent[0] == "15") {
    return "3:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
  } else if (timeCurrent[0] == "16") {
    return "4:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
  } else if (timeCurrent[0] == "17") {
    return "5:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
  } else if (timeCurrent[0] == "18") {
    return "6:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
  } else if (timeCurrent[0] == "19") {
    return "7:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
  } else if (timeCurrent[0] == "20") {
    return "8:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
  } else if (timeCurrent[0] == "21") {
    return "9:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
  } else if (timeCurrent[0] == "22") {
    return "10:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
  } else if (timeCurrent[0] == "23") {
    return "11:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
  }
}
export { FormatDate, FormatDateAndTime, dateConvertion, timeFormatter };

// function formatDateAndTime(dateString) {
//     const options = { year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute: '2-digit', second: '2-digit' }
//     return new Date(dateString).toLocaleDateString(undefined, options)
// }

// function formatDate(dateString) {
//     const options = { year: "numeric", month: "long", day: "numeric" }
//     return new Date(dateString).toLocaleDateString(undefined, options)
// }
