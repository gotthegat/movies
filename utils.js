//debounce puts a wrapper around the passed in function to prevent is from being called more than once a second
//it returns a new function that can then be added to the event listener
const debounce = (func, delay = 1000) => {
  let timeoutID;
  return (...args) => {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(() => {
      func.apply(null, args); //apply calls function with args provided as an array
    }, delay);
  };
};
