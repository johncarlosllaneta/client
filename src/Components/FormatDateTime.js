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

export { FormatDate, FormatDateAndTime };

// function formatDateAndTime(dateString) {
//     const options = { year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute: '2-digit', second: '2-digit' }
//     return new Date(dateString).toLocaleDateString(undefined, options)
// }

// function formatDate(dateString) {
//     const options = { year: "numeric", month: "long", day: "numeric" }
//     return new Date(dateString).toLocaleDateString(undefined, options)
// }
