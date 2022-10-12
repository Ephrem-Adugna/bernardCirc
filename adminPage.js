window.onload = getContestants;
let leaderboard = document.getElementById('table');

async function getContestants(){
        const response = await fetch('https://bernardcirc-default-rtdb.firebaseio.com/leaderboard.json');
    let jsonResponse = await response.json(); 
    jsonResponse = jsonResponse.sort((a, b) => {
        return b.points - a.points;
   });
    let i = 1;
    jsonResponse.forEach(contestant => {
        leaderboard.innerHTML += `  <tr>
            <th scope="row">${i}</th>
            <td><input class=${i} type="text" value=${contestant.name}></td>
            <td><input  class=${i} type="number" value=${contestant.year}></td>
            <td><input class=${i} type="number" value=${contestant.points}></td>
            <td><input class=${i} type="color" value=${contestant.color}></td>
        </tr>`;
        i++;
    });
    if (4 - jsonResponse.length > 0) {
        var b = 4 - jsonResponse.length;
        for (var x = 1; x <= b; x++) {
            leaderboard.innerHTML += `  <tr>
            <th scope="row">${x + jsonResponse.length}</th>
            <td><input  class=${x + jsonResponse.length} type="text"></td>
            <td><input class=${x + jsonResponse.length} type="number"></td>
            <td><input class=${x + jsonResponse.length} type="number" ></td>
            <td><input class=${x + jsonResponse.length} type="color" ></td>
        </tr>`;
        }
    }
}
async function save() {
    var final = [];
    for (var i = 1; i <= 4; i++){
        var items = document.getElementsByClassName(i);
        var props = [];
        Array.from(items).forEach(item => {
            if (item.value != "") {
                props.push(item.value);
            }

        });
        if (props.length == 4) {
            const obj = { name: props[0], year: props[1], points: props[2], color: props[3] }

            final.push(obj);
        }
    }
    // headers and content-type and body
    const response = await fetch('https://bernardcirc-default-rtdb.firebaseio.com/leaderboard.json', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(final)
    });

    // Awaiting response.json()
    const resData = await response.json();
    alert('Leaderboard Updated!')
}
