import { GoogleGenerativeAI } from "@google/generative-ai";
let btn = document.querySelector("button");
let inputBox = document.querySelector("input");
let ul = document.querySelector("ul");
let greeting = document.querySelector(".greeting");

btn.addEventListener("click", (e) => {
  main();
  inputBox.value = "";
});
inputBox.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    main();
    inputBox.value = "";
  }
});

function main() {
  console.log("Btn was Clicked");
  /*  for your prompt */
  let requestLi = document.createElement("li");
  ul.appendChild(requestLi);
  requestLi.classList.add("request");
  /*  for response */
  let newLi = document.createElement("li");
  newLi.innerHTML = "<hr />";
  newLi.classList.add("loader");
  newLi.classList.add("result");
  ul.appendChild(newLi);
  /* append in UL */
  myRequest(requestLi);
  getResponse(newLi);
  removeGreeting();
}

async function getResponse(newLi) {
  let inputBox = document.querySelector("input");
  let value = inputBox.value;
  const APIkey = new GoogleGenerativeAI(
    "AIzaSyAbnkoRrf07wGUjaM5xQvVmz36JESvZ13Y"
  );
  const model = APIkey.getGenerativeModel({
    model: "gemini-1.5-pro",
  });
  try {
    const result = await model.generateContent(value);
    console.log(result);
    let responseText = await result.response.text();
    responseText = responseText.replace(/\*/g, "");
    console.log(result.response.text());

    let promptText = "";
    newLi.innerHTML = promptText;
    newLi.scrollIntoView({ behavior: "smooth", block: "end" });
    let index = 0;
    function typeCharacter() {
      if (index < responseText.length) {
        newLi.innerHTML += responseText.charAt(index);
        newLi.scrollIntoView({ behavior: "smooth", block: "end" });
        index++;
        setTimeout(typeCharacter, 1); // Adjust delay here (in milliseconds)
      }
    }
    typeCharacter();
  } catch (error) {
    console.error("Error generating content:", error);
    newLi.innerText = "Error generating content. Please try again.";
  }
}

function myRequest(requestLi) {
  let inputBox = document.querySelector("input");
  let value = inputBox.value;
  try {
    requestLi.innerText = value;
    requestLi.scrollIntoView({ behavior: "smooth", block: "end" });
  } catch (error) {
    console.error("Error generating content:", error);
    newLi.innerText = "Error generating content. Please try again.";
  }
}

function removeGreeting() {
  if (greeting) {
    greeting.remove();
  }
}
