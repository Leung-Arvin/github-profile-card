let input = document.getElementById("input-username");
let submit = document.getElementById("username-submit");
let inputForm = document.querySelector(".input-container");
let card = document.querySelector(".card-container");

card.classList.toggle("hidden");

// function fetches the json data for the user
async function getUser(username) {
  try {
    let response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error("Could not fetch user");
    }

    let user = await response.json();

    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
  }
}

// function that makes the profile card
function createCard(profile) {
  
  inputForm.classList.toggle("hidden");
  card.classList.toggle("hidden");
  let profileImage = document.getElementById("profile-photo");
  profileImage.src = profile.avatar_url;

  let profileName = document.getElementById("name");
  profileName.innerHTML = profile.name === null ? profile.login : profile.name;

  let bio = document.getElementById("bio");
  bio.innerHTML = profile.bio === null ? "Github Developer" : profile.bio;

  let statsContainer = document.createElement("div");

  let followers = document.getElementById("followers");
  followers.innerHTML = profile.followers;

  let following = document.getElementById("following");
  following.innerHTML = profile.following;

  let projects = document.getElementById("projects");
  projects.innerHTML = profile.public_repos;

  let followButton = document.querySelector("#follow-link");
  console.log(profile.html_url);
  followButton.onclick = () => {
    window.open(profile.html_url, "github profile", "popup");
  };
  followButton.href = profile.html_url;
}



// event listener for submit button which creates the card upon submission
submit.addEventListener(
  "click",
  () => {
    getUser(input.value).then((result) => {
      if (result === undefined) {
        alert("Please check if username is typed in correctly");
      } else {
        createCard(result);
      }
    });
  }
);

// card eventlistner

card.addEventListener(
    "click", function (e) {
        if (e.target.tagName === "I") {
            card.classList.toggle("hidden");
            inputForm.classList.toggle("hidden");
        }
    }
  );