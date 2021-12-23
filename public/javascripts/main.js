$('.feat-btn').click(function () {
    $('nav ul .feat-show').toggleClass('show');
    $('nav ul .first').toggleClass('rotate');
});
$('.serv-btn').click(function () {
    $('nav ul .serv-show').toggleClass('show1');
    $('nav ul .second').toggleClass('rotate');
});
$('.user-btn').click(function () {
    $('nav ul .user-show').toggleClass('show2');
    $('nav ul .third').toggleClass('rotate');
});
$('nav ul li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
});
$('.homepage__post-posts--header-option').click(function () {
    $(this).toggleClass('show');
});

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    document.getElementById('err').innerHTML = '';
    document.getElementById('mess').innerHTML = '';

    console.log(id_token);

    fetch('/loginGG', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: id_token }),
    })
        .then((req) => req.json())
        .then((json) => {
            console.log(json);
            if (json.code === 0)
                document.getElementById('mess').innerHTML =
                    `<div class="alert alert-success alert-dismissible text-center">
                                                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                                                            <strong>` +
                    json.message +
                    `</strong>
                                                        </div>`;
            else
                document.getElementById('err').innerHTML =
                    `<div class="alert alert-danger alert-dismissible text-center">
                                                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                                                            <strong>` +
                    json.message +
                    `</strong>
                                                        </div>`;
            signOut();
        })
        .catch((e) => console.log(e));
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}
