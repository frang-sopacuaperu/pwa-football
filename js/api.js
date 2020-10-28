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
          data.standings[0].table.forEach((standing) => {
            standingsHTML += `
            <div class="card">
            <table class="centered highlight responsive-table">
                <thead>
                  <tr>
                      <th>Team Logo</th>
                      <th>Name</th>
                      <th>Played</th>
                      <th>Form</th>
                      <th>Won</th>
                      <th>Draw</th>
                      <th>Lost</th>
                      <th>Points</th>
                      <th>Goals For</th>
                      <th>Goals Against</th>
                      <th>Goals Diff.</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>
                      <a href="./standing.html?id=${standing.team.id}">
                      <img src="${standing.team.crestUrl.replace(
                        /^http:\/\//i,
                        "https://"
                      )}" width="30px" alt="badge"></td> </a>
                      <td>${standing.team.name}</td>
                      <td>${standing.playedGames}</td>
                      <td>${standing.form}</td>
                      <td>${standing.won}</td>
                      <td>${standing.draw}</td>
                      <td>${standing.lost}</td>
                      <td>${standing.points}</td>
                      <td>${standing.goalsFor}</td>
                      <td>${standing.goalsAgainst}</td>
                      <td>${standing.goalDifference}</td>
                    </tr>
                </tbody>
            </table>
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
      data.standings[0].table.forEach((standing) => {
        standingsHTML += `
                <table class="centered highlight responsive-table">
                <thead>
                  <tr>
                      <th>Team Logo</th>
                      <th>Name</th>
                      <th>Played</th>
                      <th>Form</th>
                      <th>Won</th>
                      <th>Draw</th>
                      <th>Lost</th>
                      <th>Points</th>
                      <th>Goals For</th>
                      <th>Goals Against</th>
                      <th>Goals Diff.</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>
                      <a href="./standing.html?id=${standing.team.id}">
                      <img src="${standing.team.crestUrl.replace(
                        /^http:\/\//i,
                        "https://"
                      )}" width="30px" alt="badge"></td> </a>
                      <td>${standing.team.name}</td>
                      <td>${standing.playedGames}</td>
                      <td>${standing.form}</td>
                      <td>${standing.won}</td>
                      <td>${standing.draw}</td>
                      <td>${standing.lost}</td>
                      <td>${standing.points}</td>
                      <td>${standing.goalsFor}</td>
                      <td>${standing.goalsAgainst}</td>
                      <td>${standing.goalDifference}</td>
                    </tr>
                </tbody>
            `;
      });
      document.getElementById("standings").innerHTML = standingsHTML;
    })
    .catch(error);
}
