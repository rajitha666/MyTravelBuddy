const form = document.querySelector("form");
const resultsText = document.querySelector("#results-text");

const handleSubmit = async (event) => {
  event.preventDefault();

  const travelerType = document.querySelector("#traveler-type").value;
  const city = document.querySelector("#city").value;
  const data = new FormData(form);
  const promptText = `I am a ${travelerType} traveler, planning a trip to ${city}. ${data.get(
    "prompt"
  )} give me 5 options to explore around and 5 food options to try`;

  data.set("prompt", promptText);

  resultsText.innerHTML = "Loading...";

  // Send data to server
  // Replace http://localhost:5000 with the URL of your server
  const response = await fetch("https://mytravelbuddy.onrender.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: data.get("prompt"),
    }),
  });

  if (response.ok) {
    const data = await response.json();
    resultsText.innerHTML = data.bot;
  } else {
    const error = await response.text();
    resultsText.innerHTML = `Oops... something went wrong. ${error}`;
  }
};

form.addEventListener("submit", handleSubmit);