const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  //destructure root and functions from config object
  root.innerHTML = `
        <label><b>Search</b></label>
        <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `;
  //instead of looking in document, look only in root element
  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  const onInput = async (event) => {
    const items = await fetchData(event.target.value);

    //if no results, close dropdown
    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    resultsWrapper.innerHTML = ""; //clear results for new search
    dropdown.classList.add("is-active");
    for (let item of items) {
      const option = document.createElement("a");

      option.classList.add("dropdown-item");
      //use backticks to form a multi-line string
      option.innerHTML = renderOption(item);

      //handle click on movie in autocomplete
      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        //input.value = movie.Title; --extracted this function to a helper function
        input.value = inputValue(item);
        onOptionSelect(item);
      });

      resultsWrapper.appendChild(option);
    }
  };

  input.addEventListener("input", debounce(onInput, 500));

  //handle closing the menu when clicking on the document
  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) {
      //if the root of our autocomplete doesn't contain the element that was clicked on
      //close the dropdown
      dropdown.classList.remove("is-active");
    }
  });
};
