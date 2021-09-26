//this section cancels any timeouts when another key is pressed
//it won't search until a half second passes with no key presses
//called "debouncing an input"
let timeoutID;
const onInput = (event) => {
  if (timeoutID) {
    clearTimeout(timeoutID);
  }
  timeoutID = setTimeout(() => {
    fetchData(event.target.value);
  }, 500);
};
