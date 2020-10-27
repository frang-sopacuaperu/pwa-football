const base_url = "https://api.football-data.org/v2/";
const api_key = "0de80ef3755341acac677c5e06d57609";

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

function getStandings() {
  if ("caches" in window) {
    caches.match(`${base_url}competitions/2021/standings`).then((response) => {
      if (response) {
        response.json().then((data) => {
          var standingsHTML = "";
          data.result.forEach((team) => {
            standingsHTML += `
                <div class="card">
                  <a href="./standing.html?id=${team.team.id}">
                      <div class="card-image waves-effect waves-block waves-light">
                          <img src="${team.team.crestUrl}" />
                      </div>
                  </a>
                  <div class="card-content">
                      <span class="card-title truncate">${team.team.name}</span>
                      <p>${team.playedGames}</p>
                  </div>
                </div>
            `;
          });
          document.getElementById("standings").innerHTML = standingsHTML;
        });
      }
    });
  }

  fetch(`${base_url}competitions/2021/standings`, {
    headers: {
      "X-Auth-Token": api_key,
    },
  })
    .then(status)
    .then(json)
    .then((data) => {
      var standingsHTML = "";
      data.result.forEach((team) => {
        standingsHTML += `
                <div class="card">
                  <a href="./standing.html?id=${team.team.id}">
                      <div class="card-image waves-effect waves-block waves-light">
                          <img src="${team.team.crestUrl}" />
                      </div>
                  </a>
                  <div class="card-content">
                      <span class="card-title truncate">${team.team.name}</span>
                      <p>${team.playedGames}</p>
                  </div>
                </div>
            `;
      });
      document.getElementById("standings").innerHTML = standingsHTML;
    })
    .catch(error);
}

function getTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  fetch(`${base_url}standing/${idParam}`)
    .then(status)
    .then(json)
    .then((data) => {
      console.log(data);
      var teamHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
            <img src="${team.crestUrl}" />
            </div>
            <div class="card-content">
              <span class="card-title">${data.result.name}</span>
              ${snarkdown(data.result.playedGames)}
            </div>
          </div>
        `;
      document.getElementById("body-content").innerHTML = teamHTML;
    });
}
