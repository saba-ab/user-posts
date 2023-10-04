const userUrl = "https://jsonplaceholder.typicode.com/users";
const postUrl = "https://jsonplaceholder.typicode.com/posts";

const usersDiv = document.querySelector(".users");
const postsDiv = document.querySelector(".posts");
const userList = document.getElementById("users");
const showAll = document.getElementById("showAll");

showAll.addEventListener("click", () => {
  fetchData(userUrl, postUrl, true);
});

function createPostList(arr, parent, userId) {
  const filteredPosts = userId
    ? arr.filter((post) => post.userId === userId)
    : arr;
  filteredPosts.forEach((post) => {
    const div = document.createElement("div");
    div.classList.add("post");
    div.innerHTML = post.title;
    parent.appendChild(div);
  });
}
// function isSelected(user) {
//   user.style.fontWeight === 800 ? true : false;
// }
let selected = null;

function createUserList(arr, parent, allPosts) {
  arr.forEach((user) => {
    const userLi = document.createElement("li");
    userLi.innerText = user.name;
    userLi.id = user.id;
    userLi.addEventListener("click", () => {
      postsDiv.innerHTML = "";
      if (selected) {
        selected.style.fontWeight = "normal";
      }
      userLi.style.fontWeight = "800";

      selected = userLi;
      createPostList(allPosts, postsDiv, user.id);
    });
    parent.appendChild(userLi);
  });
}

const fetchData = async (url1, url2, showAll = false) => {
  try {
    const userResponse = await fetch(url1);
    const postResponse = await fetch(url2);

    const userData = await userResponse.json();
    const postData = await postResponse.json();

    if (showAll) {
      createPostList(postData, postsDiv);
    } else {
      createUserList(userData, userList, postData);
    }
  } catch (err) {
    console.error("Error = >", err);
  } finally {
    console.log("fetching completed");
  }
};

fetchData(userUrl, postUrl);
