let form = document.querySelector(".find-comment");
let input = form.elements["find-id"];
let wrapper = document.querySelector(".wrapper");

form.addEventListener("submit", function (e) {
  e.preventDefault();
    if (validate()) {
        wrapper.innerHTML = "";
        fetchPlaceHolder(parseInt(input.value));
    }
});

function fetchPlaceHolder(id) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => response.json())
    .then((json) => {
        if(id > 100 || id < 1){
            throw new ReferenceError(`ID with number ${id} don't have `)
        }
        printPost(json.title, json.body)
      console.log(json);
    })
    .then(() => {
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
        .then((res) => res.json())
        .then((json) => {
          json.forEach((item) => {
            printComment(item.email, item.body);
          });
          console.log(json);
        });
    })
    .catch((error) => {
      console.log(error);
      wrapper.innerHTML = "server error";
    });
}

function printComment(email, comment) {
  wrapper.insertAdjacentHTML(
     "beforeend",
    `<h5>Comment</h5>
    <div class="card">
        <div class="card-body">
          <h5 class="card-title">${email}</h5>
          <p class="card-text">${comment}</p>
        </div>
    </div>`
  );
}
function printPost(title, post) {
  wrapper.insertAdjacentHTML(
    "beforeend",
    `<h5>Post</h5>
    <div class="card mb-2">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${post}</p>
            </div>
         </div>`
  );
}

function validate() {
  let validate = false;
  let errorNumber = document.querySelector(".errorNumber");
  let inputValue = input.value;
  console.log(errorNumber);
  if (
    parseInt(inputValue) < 1 ||
    parseInt(inputValue) > 100 ||
    !inputValue.trim()
  ) {
    errorNumber.classList.remove("hidden");
    validate = false;
  } else {
    errorNumber.classList.add("hidden");
    validate = true;
  }
  return validate;
}
