window.onload = getContestants;
async function getContestants(){
        const response = await fetch('https://bernardcirc-default-rtdb.firebaseio.com/leaderboard.json');
    let jsonResponse = await response.json(); 
    jsonResponse = jsonResponse.sort((a, b) => {
        return b.points - a.points;
   });
    let i = 1;
    let leaderboard = document.getElementById('leaderboard');
    jsonResponse.forEach(contestant => {
        leaderboard.innerHTML += ` <div class="contestant" style="background: linear-gradient(88.9deg, ${contestant.color} 20.19%, rgba(255, 255, 255, 0.57) 164.3%);">
                   <h1 class="rank">${i}</h1>
                   <h2 class="name">${contestant.name}</h2>
                   <h3 class="points">${contestant.points}</h3>
               </div>`;
        i++;
    });
    

}