async function requestApi(querry) {
  let response = await fetch (`https://narutoql.up.railway.app/graphql/?query=${querry}`)

  response = await response.json()
  return response.data
}

function main(vila) {
selectedVila = vila;
  const leaf = `{
      characters(filter: {village: "${vila}"})  {
       info{
         count
       }
       results {
         avatarSrc
         name
         age
         avatarSrc
         rank
         village
       }
     }
   }`
   
  requestApi(leaf).then(res => {
    totalPages = res.characters.info.count / 20
    showVilageMembers(res)
})
  requestApi(leaf).then(res => showVilageMembers(res))
}


function showVilageMembers(data) {
  const membersPlace = document.querySelector(".cards");
  membersPlace.innerHTML = "";

  const characters = data.characters.results;
  characters.forEach(character => {
    const name = character.name;
    const age = character.age;
    const avatarSrc = character.avatarSrc;
    const rank = character.rank;
    const village = character.village;

    membersPlace.innerHTML += `
    <div class="card">
    <img src="${avatarSrc}" />
      <h2>${name}</h2>
      <p>Age: ${age}</p>
      <p>Rank: ${rank}</p>
      <p>Village: ${village}</p>
    </div>
    `;
  });
}
