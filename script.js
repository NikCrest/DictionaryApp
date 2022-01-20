const summary = document.querySelector(".summary");
const form = document.querySelector(".form");
const input = document.querySelector(".input");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const search = document.querySelector(".input").value;
  input.value = "";
  input.blur();
  dictionaryDetails(search);
});
function getSynonyms(synonyms) {
  let html = ``;
  synonyms.forEach((ele, i) => {
    html += `<button class="btn" onclick="dictionaryDetails('${ele}')">${ele}</button>${
      i === 4 ? "<br/><br/>" : ""
    }`;
  });
  console.log(typeof html);
  return html;
}
async function dictionaryDetails(search) {
  try {
    const word = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`
    );
    const response = await word.json();

    summary.innerHTML = "";

    const data1 = response[0].meanings;
    const name = response[0].word;
    data1.forEach(function (meaning) {
      let { partOfSpeech } = meaning;
      let { definitions } = meaning;
        const { definition } = definitions[0];
        const { example } = definitions[0];
        const { synonyms } = definitions[0];

        let syno = synonyms.slice(0 - 9);
        const synonym =
          synonyms.length !== 0 ? getSynonyms(syno) : "Synonyms not available";
        const html = `
    <div class="slider">
    <span class="output"><bold>Word : </bold> ${name}</span><br/><br/>
    <span class="output"><bold>Part of Speech : </bold> ${partOfSpeech}</span><br/><br/>
    <span class="output"><bold>Defination: </bold>${definition}</span><br/><br/>
    <span class="output"><bold>Example: </bold>${example}</span><br/><br/>
    <span class="synonyms"><bold>Synonyms:  </bold> ${synonym}</span><br/><br/>
    </div>`;
        summary.insertAdjacentHTML("beforeend", html);
      
    });
  } catch (err) {
    const html = `<br/><br/><h2><error>Please try again with another word!!</error>`;
    summary.insertAdjacentHTML("beforeend", html);
  }
}
