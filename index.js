const input = document.getElementById("input-username");
const submit = document.getElementById("username-submit");
const inputForm = document.querySelector(".input-container");
const card = document.querySelector(".card-container");

//hide the card container until username submission
card.classList.add("hidden");

// function fetches the json data for the user
async function getUser(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error("Could not fetch user");
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

// function that makes the profile card
function createCard(profile) {
  
  inputForm.classList.add("hidden");

  card.classList.remove("hidden");

  const profileImage = document.getElementById("profile-photo");
  profileImage.src = profile.avatar_url;

  const profileName = document.getElementById("name");
  profileName.textContent = profile.name === null ? profile.login : profile.name;

  const bio = document.getElementById("bio");
  bio.textContent = profile.bio === null ? "Github Developer" : profile.bio;

  const statsContainer = document.createElement("div");

  const followers = document.getElementById("followers");
  followers.textContent = profile.followers;

  const following = document.getElementById("following");
  following.textContent = profile.following;

  const projects = document.getElementById("projects");
  projects.textContent = profile.public_repos;

  const followButton = document.querySelector("#follow-link");
  console.log(profile.html_url);
  
  followButton.onclick = () => {
    window.open(profile.html_url, "github profile", "popup");
  };

  followButton.href = profile.html_url;
}



// event listener for submit button which creates the card upon submission
submit.addEventListener(
  "click",
  async () => {

    const username = input.value.trim();

    if (username) {
      try {
        let profile = await getUser(username);
        if (profile) {
          createCard(profile);
        } else {
          alert("User was not found or there was an internal error. Please try again.")
        }
      } catch (error) {
        console.error("An error occured while fetching user data:". error);
      alert
      }
      
    } else {
      alert("Please enter a username.")
    }
    
  }
);


// back 'button' eventlistener which toggles the hidden class
const backButton = document.querySelector("#back");
back.addEventListener(
    "click", function (e) {
        if (e.target.tagName === "I" || e.target.tagName === "P") {
            card.classList.add("hidden");
            inputForm.classList.remove("hidden");
        }
    }
  );