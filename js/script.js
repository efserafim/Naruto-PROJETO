const btnVillage = document.querySelectorAll('.village img')
let serchMore = 15
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

function displayCharacter(character) {
    document.querySelector(".card-title").innerHTML = character.name;
    document.querySelector(".card-img").src = character.image;
    document.querySelector(".card-text").innerHTML = character.text;
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

buttons.forEach( (button) => {
    button.addEventListener('click', () => {
        id = button.getAttribute('id');
        page = 1
        const ninjas = `{
            characters(filter: {village: "${id}"} page: ${page}) {
                info {
                    pages
                    next
                    prev
                }
                results {
                    name
                    avatarSrc
                    rank
                }
            }
        }`
        buttons.forEach ((button) => button.classList.remove('btn-active'));
        button.classList.add('btn-active');
        findNinjas(ninjas)
    })
})

const findNinjas  = async function (query) {
    fetch('https://narutoql.up.railway.app/graphql', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            query
        })
    }).then(response => {
        return response.json();
    }).then(data => {
        cards.innerHTML = ''
        data.data.characters.results.forEach(ninja => {
            const card = document.createElement('div.card')
            card.innerHTML = `
            <div class="card">
                <img src="${[ninja.avatarSrc]}">
                <div class="desc">
                    <h2>${[ninja.name]}</h2>
                    <span>
                        <strong>Rank: </strong>${[ninja.rank]}<br>
                    </span>
                </div>
            </div>
            ` 
            cards.appendChild(card)
        }
        );
        if(data.data.characters.info.prev !== null) {
            mainNav.appendChild(prev);
        } else if(data.data.characters.info.prev == null) {
            prev.remove();
        }
        if(data.data.characters.info.next !== null) {
            mainNav.appendChild(next);
        } else if(data.data.characters.info.next == null) {
            next.remove();
        }
    })
}