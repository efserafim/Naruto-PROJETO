const btnVillage = document.querySelectorAll('.village img')
let serchMore = 20
let zero = 0
let nameVila 
let membersPlace = document.querySelector("#card-personagem .card-content")

async function requestApi(querry) {
    let response = await fetch (`https://narutoql.up.railway.app/graphql/?query=${querry}`)

    response = await response.json()
    return response.data
}

function main(vila) {
    const leaf = `{
        characters(filter: {village: "${vila}"})  {
         info{
           count
         }
         results {
           name
           age
           avatarSrc
           rank
           village
         }
       }
     }`

    requestApi(leaf).then(res => showVilageMembers(res))
}

function showVilageMembers(data) {
  const membersPlace = document.querySelector("#card-personagem .card-content");
  membersPlace.innerHTML = "";

  const characters = data.characters.results;
  characters.forEach(character => {
      const name = character.name;
      const age = character.age;
      const avatarSrc = character.avatarSrc;
      const rank = character.rank;
      const village = character.village;

      membersPlace.innerHTML += `<h2>${name}</h2><p>Age: ${age}</p><img src="${avatarSrc}" /><p>Rank: ${rank}</p><p>Village: ${village}</p>`;
  });
}

