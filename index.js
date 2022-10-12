function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}
function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();

    const email = profile.getEmail();

    if (email.split('@')[1] == 'stbernardhs.org') {
        window.location.href = './leaderboard.html';
        localStorage.setItem('email', 'eadugna2025');
    }
    else {
        document.getElementById('error').style.display = "block";
        signOut();
    }

}
document.getElementById('logout').addEventListener('click', () => {
    window.location.href = './index.html';

})