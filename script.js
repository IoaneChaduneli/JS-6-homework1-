let currentPage = 1;
let totalpages;

function getInfo(page) {
  function render() {
    let response = this.responseText;
    let responseData = JSON.parse(response);

    const fragment = document.createDocumentFragment();

    responseData.data.forEach((element) => {
      let li = document.createElement("li");

      let p = document.createElement("p");
      p.textContent = `${element.first_name} ${element.last_name}`;

      let image = document.createElement("img");
      image.src = element.avatar;
      li.appendChild(image);
      li.appendChild(p);
      fragment.appendChild(li);
    });

    document.getElementById("list").innerHTML = " ";
    document.getElementById("list").appendChild(fragment);
    totalpages = responseData.total_pages;
  }

  function renderError() {
    let p = document.createElement("p");
    p.innerText = "Server error";
    p.style.color = "red";
    document.getElementById("block").appendChild(p);
  }

  let request = new XMLHttpRequest();
  request.addEventListener("load", render);
  request.addEventListener("error", renderError);
  request.open("GET", "https://reqres.in/api/users?page=" + page);
  request.send();
}

document.getElementById("prev-btn").addEventListener("click", function () {
  if (currentPage == 1) {
    return;
  }
  currentPage -= 1;
  getInfo(currentPage);
});

document.getElementById("next-btn").addEventListener("click", function () {
  if (currentPage == totalpages) {
    return;
  }
  currentPage += 1;
  getInfo(currentPage);
});
getInfo(currentPage);