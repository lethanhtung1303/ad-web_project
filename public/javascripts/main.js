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

var count = 10;
var loadPage = document.getElementById('loadPage');
if (loadPage) {
    $(window).scroll(function () {
        if (
            $(window).scrollTop() >=
            $(document).height() - $(window).height()
        ) {
            loadPage.style.display = 'block';
            setTimeout(() => {
                loadPostTimeLine();
                loadPage.style.display = 'none';
            }, 1000);
        }
    });
}

function loadPostTimeLine() {
    fetch('/post', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((json) => {
            var postArea = document.getElementById('postArea');
            data = json.data.reverse();
            data.forEach((val, i) => {
                if (i >= count && i < count + 10) {
                    var div_postPosts = document.createElement('div');
                    var div_postsHeader = document.createElement('div');
                    var div_headerAvt = document.createElement('div');
                    var img_textAvt = document.createElement('img');
                    var div_headerNametime = document.createElement('div');
                    var a_headerName = document.createElement('a');
                    var div_headerTime = document.createElement('div');
                    var spanDropdown = document.createElement('span');
                    var div_postsContent = document.createElement('div');
                    var div_contentCmt = document.createElement('div');
                    var div_contentYourcmt = document.createElement('div');
                    var input_yourcmtInput = document.createElement('input');
                    var button_yourcmtIcon3 = document.createElement('button');
                    var i = document.createElement('i');

                    div_postPosts.setAttribute('id', val.idPost);
                    div_postPosts.setAttribute('class', 'homepage__post-posts');
                    div_postsHeader.setAttribute(
                        'class',
                        'homepage__post-posts--header',
                    );
                    div_headerAvt.setAttribute(
                        'class',
                        'homepage__post-posts--header-avt',
                    );
                    img_textAvt.setAttribute(
                        'class',
                        'rounded-circle homepage__upload-text--avt',
                    );
                    img_textAvt.setAttribute('src', val.picture);
                    div_headerNametime.setAttribute(
                        'class',
                        'homepage__post-posts--header-nametime',
                    );
                    a_headerName.setAttribute(
                        'class',
                        'homepage__post-posts--header-name',
                    );
                    a_headerName.setAttribute(
                        'href',
                        `/post/me?idUser=${val.idUser}`,
                    );
                    div_headerTime.setAttribute(
                        'class',
                        'homepage__post-posts--header-time',
                    );
                    spanDropdown.setAttribute('id', 'spanDropdown');
                    div_postsContent.setAttribute(
                        'class',
                        'homepage__post-posts--content',
                    );
                    div_contentCmt.setAttribute(
                        'class',
                        'homepage__post-posts--content--cmt',
                    );
                    div_contentCmt.setAttribute(
                        'id',
                        'commentArea' + val.idPost,
                    );
                    div_contentYourcmt.setAttribute(
                        'class',
                        'homepage__post-posts--content--yourcmt',
                    );
                    input_yourcmtInput.setAttribute(
                        'class',
                        'homepage__post-posts--content--yourcmtinput',
                    );
                    input_yourcmtInput.setAttribute('type', 'text');
                    input_yourcmtInput.setAttribute(
                        'id',
                        'Comment' + val.idPost,
                    );
                    input_yourcmtInput.setAttribute('placeholder', 'Bình luận');
                    button_yourcmtIcon3.setAttribute(
                        'class',
                        'btn homepage__post-posts--content--yourcmticon3',
                    );
                    button_yourcmtIcon3.setAttribute('data-id', val.idPost);
                    button_yourcmtIcon3.setAttribute('type', 'button');
                    button_yourcmtIcon3.setAttribute(
                        'onclick',
                        "cmt('" + val.idPost + "')",
                    );
                    i.setAttribute('class', 'fa fa-paper-plane');
                    i.setAttribute('aria-hidden', 'true');

                    a_headerName.innerHTML = val.name;
                    div_headerTime.innerHTML = val.dateTime;
                    spanDropdown.innerHTML =
                        `
                    <div id="dropdown">
                        <button
                            class="btn myNotify__btn__dropdown"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
                        </button>
                        <div
                            class="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                        >
                            <button
                                class="btn btn-light btnDeletePost dropdown-item"
                                onclick="deletePost('` +
                        val.idPost +
                        `')"
                            >
                                Xóa bài viết
                            </button>
                            <button
                                class="btn btn-light editPost dropdown-item"
                                type="button"
                                data-toggle="modal"
                                data-target="#modalEditPost"
                                onclick="showPost_MD('` +
                        val.idPost +
                        `','` +
                        val.content +
                        `','` +
                        val.link +
                        `')"
                            >
                                Chỉnh sửa bài viết
                            </button>
                        </div>
                    </div>
                    `;

                    if (val.link) {
                        var video_id = val.link.split('v=')[1];
                        var ampersandPosition = video_id.indexOf('&');
                        if (ampersandPosition != -1) {
                            video_id = video_id.substring(0, ampersandPosition);
                        }
                        var div = document.createElement('div');
                        div.innerHTML = val.content;

                        var embed = document.createElement('embed');
                        embed.setAttribute(
                            'src',
                            `https://www.youtube.com/embed/${video_id}`,
                        );
                        embed.setAttribute('height', '300px');
                        embed.setAttribute('width', '100%');
                        embed.setAttribute('class', 'text-center');

                        div_postsContent.appendChild(div);
                        div_postsContent.appendChild(embed);
                    } else {
                        div_postsContent.innerHTML = val.content;
                    }

                    div_headerAvt.append(img_textAvt);
                    div_headerNametime.appendChild(a_headerName);
                    div_headerNametime.appendChild(div_headerTime);

                    div_postsHeader.appendChild(div_headerAvt);
                    div_postsHeader.appendChild(div_headerNametime);
                    div_postsHeader.appendChild(spanDropdown);

                    button_yourcmtIcon3.appendChild(i);

                    div_contentYourcmt.appendChild(input_yourcmtInput);
                    div_contentYourcmt.appendChild(button_yourcmtIcon3);

                    div_postPosts.appendChild(div_postsHeader);
                    div_postPosts.appendChild(div_postsContent);
                    div_postPosts.appendChild(div_contentCmt);
                    div_postPosts.appendChild(div_contentYourcmt);

                    postArea.appendChild(div_postPosts);
                    loadCmnt(val.idPost);
                }
            });

            count += 10;
        })
        .catch((err) => console.log(err));
}

// LOGIN by Google
var btnLogin = document.getElementById('btn-login');
if (btnLogin) {
    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        var id_token = googleUser.getAuthResponse().id_token;
        document.getElementById('err').innerHTML = '';
        document.getElementById('mess').innerHTML = '';

        console.log(id_token);

        fetch('/login/google', {
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
}

// ADD Notify
var btnNotify = document.getElementById('btnNotify');
if (btnNotify) {
    btnNotify.addEventListener('click', () => {
        var contentNotify = document.getElementById('contentNotify').value;
        var auths = document.getElementById('auths').value;
        var tittle = document.getElementById('tittle').value;

        if (contentNotify && auths && tittle) {
            fetch('/notify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: contentNotify,
                    tittle: tittle,
                    auths: auths,
                }),
            })
                .then((res) => res.json())
                .then((json) => {
                    // console.log(json.data);
                    if (json.code === 0) {
                        document.getElementById('contentNotify').value = '';
                        document.getElementById('tittle').value = '';
                        // console.log(json.data);
                        loadListNotifysById(json.data.idNotify);
                        msg =
                            json.data.name +
                            ' vừa đăng thông báo ' +
                            "<a href='/notify/detail?idAnnounce=" +
                            json.data.idNotify +
                            "'>XEM</a>";
                        socket.emit('client_Send_Data', msg);
                    }
                })
                .catch((e) => console.log(e));
        }
    });
}

// ADD Post
var btnPost = document.getElementById('btnPost');
if (btnNotify) {
    btnPost.addEventListener('click', () => {
        var contentPost = document.getElementById('contentPost').value;
        var link = document.getElementById('link').value;

        if (contentPost) {
            fetch('/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: contentPost,
                    link: link,
                }),
            })
                .then((req) => req.json())
                .then((json) => {
                    if (json.code === 0) {
                        document.getElementById('contentPost').value = '';
                        document.getElementById('link').value = '';
                        // console.log(json.data);
                        loadPostById(json.data.idPost);
                    }
                })
                .catch((e) => console.log(e));
        }
    });
}

// POST
var url = new URL(window.location);
var idUser_url = url.searchParams.get('idUser');
var postArea = document.getElementById('postArea');

if (postArea) {
    if (!idUser_url) {
        load();
    } else {
        loadMyPost();
    }

    function load() {
        postArea.innerHTML = '';
        fetch('/post', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((json) => {
                var data = json.data.reverse();
                data.forEach((val, i) => {
                    if (i >= 10) {
                        return;
                    }
                    var div_postPosts = document.createElement('div');
                    var div_postsHeader = document.createElement('div');
                    var div_headerAvt = document.createElement('div');
                    var img_textAvt = document.createElement('img');
                    var div_headerNametime = document.createElement('div');
                    var a_headerName = document.createElement('a');
                    var div_headerTime = document.createElement('div');
                    var spanDropdown = document.createElement('span');
                    var div_postsContent = document.createElement('div');
                    var div_contentCmt = document.createElement('div');
                    var div_contentYourcmt = document.createElement('div');
                    var input_yourcmtInput = document.createElement('input');
                    var button_yourcmtIcon3 = document.createElement('button');
                    var i = document.createElement('i');

                    div_postPosts.setAttribute('id', val.idPost);
                    div_postPosts.setAttribute('class', 'homepage__post-posts');
                    div_postsHeader.setAttribute(
                        'class',
                        'homepage__post-posts--header',
                    );
                    div_headerAvt.setAttribute(
                        'class',
                        'homepage__post-posts--header-avt',
                    );
                    img_textAvt.setAttribute(
                        'class',
                        'rounded-circle homepage__upload-text--avt',
                    );
                    img_textAvt.setAttribute('src', val.picture);
                    div_headerNametime.setAttribute(
                        'class',
                        'homepage__post-posts--header-nametime',
                    );
                    a_headerName.setAttribute(
                        'class',
                        'homepage__post-posts--header-name',
                    );
                    a_headerName.setAttribute(
                        'href',
                        `/post/me?idUser=${val.idUser}`,
                    );
                    div_headerTime.setAttribute(
                        'class',
                        'homepage__post-posts--header-time',
                    );
                    spanDropdown.setAttribute('id', 'spanDropdown');
                    div_postsContent.setAttribute(
                        'class',
                        'homepage__post-posts--content',
                    );
                    div_contentCmt.setAttribute(
                        'class',
                        'homepage__post-posts--content--cmt',
                    );
                    div_contentCmt.setAttribute(
                        'id',
                        'commentArea' + val.idPost,
                    );
                    div_contentYourcmt.setAttribute(
                        'class',
                        'homepage__post-posts--content--yourcmt',
                    );
                    input_yourcmtInput.setAttribute(
                        'class',
                        'homepage__post-posts--content--yourcmtinput',
                    );
                    input_yourcmtInput.setAttribute('type', 'text');
                    input_yourcmtInput.setAttribute(
                        'id',
                        'Comment' + val.idPost,
                    );
                    input_yourcmtInput.setAttribute('placeholder', 'Bình luận');
                    button_yourcmtIcon3.setAttribute(
                        'class',
                        'btn homepage__post-posts--content--yourcmticon3',
                    );
                    button_yourcmtIcon3.setAttribute('data-id', val.idPost);
                    button_yourcmtIcon3.setAttribute('type', 'button');
                    button_yourcmtIcon3.setAttribute(
                        'onclick',
                        "cmt('" + val.idPost + "')",
                    );
                    i.setAttribute('class', 'fa fa-paper-plane');
                    i.setAttribute('aria-hidden', 'true');

                    a_headerName.innerHTML = val.name;
                    div_headerTime.innerHTML = val.dateTime;
                    spanDropdown.innerHTML =
                        `
                    <div id="dropdown">
                        <button
                            class="btn myNotify__btn__dropdown"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
                        </button>
                        <div
                            class="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                        >
                            <button
                                class="btn btn-light btnDeletePost dropdown-item"
                                onclick="deletePost('` +
                        val.idPost +
                        `')"
                            >
                                Xóa bài viết
                            </button>
                            <button
                                class="btn btn-light editPost dropdown-item"
                                type="button"
                                data-toggle="modal"
                                data-target="#modalEditPost"
                                onclick="showPost_MD('` +
                        val.idPost +
                        `','` +
                        val.content +
                        `','` +
                        val.link +
                        `')"
                            >
                                Chỉnh sửa bài viết
                            </button>
                        </div>
                    </div>
                    `;

                    if (val.link) {
                        var video_id = val.link.split('v=')[1];
                        var ampersandPosition = video_id.indexOf('&');
                        if (ampersandPosition != -1) {
                            video_id = video_id.substring(0, ampersandPosition);
                        }
                        var div = document.createElement('div');
                        div.innerHTML = val.content;

                        var embed = document.createElement('embed');
                        embed.setAttribute(
                            'src',
                            `https://www.youtube.com/embed/${video_id}`,
                        );
                        embed.setAttribute('height', '300px');
                        embed.setAttribute('width', '100%');
                        embed.setAttribute('class', 'text-center');

                        div_postsContent.appendChild(div);
                        div_postsContent.appendChild(embed);
                    } else {
                        div_postsContent.innerHTML = val.content;
                    }

                    div_headerAvt.append(img_textAvt);
                    div_headerNametime.appendChild(a_headerName);
                    div_headerNametime.appendChild(div_headerTime);

                    div_postsHeader.appendChild(div_headerAvt);
                    div_postsHeader.appendChild(div_headerNametime);
                    div_postsHeader.appendChild(spanDropdown);

                    button_yourcmtIcon3.appendChild(i);

                    div_contentYourcmt.appendChild(input_yourcmtInput);
                    div_contentYourcmt.appendChild(button_yourcmtIcon3);

                    div_postPosts.appendChild(div_postsHeader);
                    div_postPosts.appendChild(div_postsContent);
                    div_postPosts.appendChild(div_contentCmt);
                    div_postPosts.appendChild(div_contentYourcmt);

                    postArea.appendChild(div_postPosts);
                    loadCmnt(val.idPost);
                });
            })
            .catch((err) => console.log(err));
    }

    function loadMyPost() {
        postArea.innerHTML = '';
        fetch('/api/my-post?idUser=' + idUser_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((json) => {
                var data = json.data.reverse();
                data.forEach((val, i) => {
                    if (i >= 10) {
                        return;
                    }
                    var div_postPosts = document.createElement('div');
                    var div_postsHeader = document.createElement('div');
                    var div_headerAvt = document.createElement('div');
                    var img_textAvt = document.createElement('img');
                    var div_headerNametime = document.createElement('div');
                    var a_headerName = document.createElement('a');
                    var div_headerTime = document.createElement('div');
                    var spanDropdown = document.createElement('span');
                    var div_postsContent = document.createElement('div');
                    var div_contentCmt = document.createElement('div');
                    var div_contentYourcmt = document.createElement('div');
                    var input_yourcmtInput = document.createElement('input');
                    var button_yourcmtIcon3 = document.createElement('button');
                    var i = document.createElement('i');

                    div_postPosts.setAttribute('id', val.idPost);
                    div_postPosts.setAttribute('class', 'homepage__post-posts');
                    div_postsHeader.setAttribute(
                        'class',
                        'homepage__post-posts--header',
                    );
                    div_headerAvt.setAttribute(
                        'class',
                        'homepage__post-posts--header-avt',
                    );
                    img_textAvt.setAttribute(
                        'class',
                        'rounded-circle homepage__upload-text--avt',
                    );
                    img_textAvt.setAttribute('src', val.picture);
                    div_headerNametime.setAttribute(
                        'class',
                        'homepage__post-posts--header-nametime',
                    );
                    a_headerName.setAttribute(
                        'class',
                        'homepage__post-posts--header-name',
                    );
                    a_headerName.setAttribute(
                        'href',
                        `/post/me?idUser=${val.idUser}`,
                    );
                    div_headerTime.setAttribute(
                        'class',
                        'homepage__post-posts--header-time',
                    );
                    spanDropdown.setAttribute('id', 'spanDropdown');
                    div_postsContent.setAttribute(
                        'class',
                        'homepage__post-posts--content',
                    );
                    div_contentCmt.setAttribute(
                        'class',
                        'homepage__post-posts--content--cmt',
                    );
                    div_contentCmt.setAttribute(
                        'id',
                        'commentArea' + val.idPost,
                    );
                    div_contentYourcmt.setAttribute(
                        'class',
                        'homepage__post-posts--content--yourcmt',
                    );
                    input_yourcmtInput.setAttribute(
                        'class',
                        'homepage__post-posts--content--yourcmtinput',
                    );
                    input_yourcmtInput.setAttribute('type', 'text');
                    input_yourcmtInput.setAttribute(
                        'id',
                        'Comment' + val.idPost,
                    );
                    input_yourcmtInput.setAttribute('placeholder', 'Bình luận');
                    button_yourcmtIcon3.setAttribute(
                        'class',
                        'btn homepage__post-posts--content--yourcmticon3',
                    );
                    button_yourcmtIcon3.setAttribute('data-id', val.idPost);
                    button_yourcmtIcon3.setAttribute('type', 'button');
                    button_yourcmtIcon3.setAttribute(
                        'onclick',
                        "cmt('" + val.idPost + "')",
                    );
                    i.setAttribute('class', 'fa fa-paper-plane');
                    i.setAttribute('aria-hidden', 'true');

                    a_headerName.innerHTML = val.name;
                    div_headerTime.innerHTML = val.dateTime;
                    spanDropdown.innerHTML =
                        `
                    <div id="dropdown">
                        <button
                            class="btn myNotify__btn__dropdown"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
                        </button>
                        <div
                            class="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                        >
                            <button
                                class="btn btn-light btnDeletePost dropdown-item"
                                onclick="deletePost('` +
                        val.idPost +
                        `')"
                            >
                                Xóa bài viết
                            </button>
                            <button
                                class="btn btn-light editPost dropdown-item"
                                type="button"
                                data-toggle="modal"
                                data-target="#modalEditPost"
                                onclick="showPost_MD('` +
                        val.idPost +
                        `','` +
                        val.content +
                        `','` +
                        val.link +
                        `')"
                            >
                                Chỉnh sửa bài viết
                            </button>
                        </div>
                    </div>
                    `;

                    if (val.link) {
                        var video_id = val.link.split('v=')[1];
                        var ampersandPosition = video_id.indexOf('&');
                        if (ampersandPosition != -1) {
                            video_id = video_id.substring(0, ampersandPosition);
                        }
                        var div = document.createElement('div');
                        div.innerHTML = val.content;

                        var embed = document.createElement('embed');
                        embed.setAttribute(
                            'src',
                            `https://www.youtube.com/embed/${video_id}`,
                        );
                        embed.setAttribute('height', '300px');
                        embed.setAttribute('width', '100%');
                        embed.setAttribute('class', 'text-center');

                        div_postsContent.appendChild(div);
                        div_postsContent.appendChild(embed);
                    } else {
                        div_postsContent.innerHTML = val.content;
                    }

                    div_headerAvt.append(img_textAvt);
                    div_headerNametime.appendChild(a_headerName);
                    div_headerNametime.appendChild(div_headerTime);

                    div_postsHeader.appendChild(div_headerAvt);
                    div_postsHeader.appendChild(div_headerNametime);
                    div_postsHeader.appendChild(spanDropdown);

                    button_yourcmtIcon3.appendChild(i);

                    div_contentYourcmt.appendChild(input_yourcmtInput);
                    div_contentYourcmt.appendChild(button_yourcmtIcon3);

                    div_postPosts.appendChild(div_postsHeader);
                    div_postPosts.appendChild(div_postsContent);
                    div_postPosts.appendChild(div_contentCmt);
                    div_postPosts.appendChild(div_contentYourcmt);

                    postArea.appendChild(div_postPosts);
                    loadCmnt(val.idPost);
                });
            })
            .catch((err) => console.log(err));
    }

    function loadPostById(idPost) {
        setTimeout(() => {
            fetch('/post', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((json) => {
                    var data = json.data.reverse();
                    data.forEach((val) => {
                        if (val.idPost === idPost) {
                            var div_postPosts = document.createElement('div');
                            var div_postsHeader = document.createElement('div');
                            var div_headerAvt = document.createElement('div');
                            var img_textAvt = document.createElement('img');
                            var div_headerNametime =
                                document.createElement('div');
                            var a_headerName = document.createElement('a');
                            var div_headerTime = document.createElement('div');
                            var spanDropdown = document.createElement('span');
                            var div_postsContent =
                                document.createElement('div');
                            var div_contentCmt = document.createElement('div');
                            var div_contentYourcmt =
                                document.createElement('div');
                            var input_yourcmtInput =
                                document.createElement('input');
                            var button_yourcmtIcon3 =
                                document.createElement('button');
                            var i = document.createElement('i');

                            div_postPosts.setAttribute('id', val.idPost);
                            div_postPosts.setAttribute(
                                'class',
                                'homepage__post-posts',
                            );
                            div_postsHeader.setAttribute(
                                'class',
                                'homepage__post-posts--header',
                            );
                            div_headerAvt.setAttribute(
                                'class',
                                'homepage__post-posts--header-avt',
                            );
                            img_textAvt.setAttribute(
                                'class',
                                'rounded-circle homepage__upload-text--avt',
                            );
                            img_textAvt.setAttribute('src', val.picture);
                            div_headerNametime.setAttribute(
                                'class',
                                'homepage__post-posts--header-nametime',
                            );
                            a_headerName.setAttribute(
                                'class',
                                'homepage__post-posts--header-name',
                            );
                            a_headerName.setAttribute(
                                'href',
                                `/post/me?idUser=${val.idUser}`,
                            );
                            div_headerTime.setAttribute(
                                'class',
                                'homepage__post-posts--header-time',
                            );
                            spanDropdown.setAttribute('id', 'spanDropdown');
                            div_postsContent.setAttribute(
                                'class',
                                'homepage__post-posts--content',
                            );
                            div_contentCmt.setAttribute(
                                'class',
                                'homepage__post-posts--content--cmt',
                            );
                            div_contentCmt.setAttribute(
                                'id',
                                'commentArea' + val.idPost,
                            );
                            div_contentYourcmt.setAttribute(
                                'class',
                                'homepage__post-posts--content--yourcmt',
                            );
                            input_yourcmtInput.setAttribute(
                                'class',
                                'homepage__post-posts--content--yourcmtinput',
                            );
                            input_yourcmtInput.setAttribute('type', 'text');
                            input_yourcmtInput.setAttribute(
                                'id',
                                'Comment' + val.idPost,
                            );
                            input_yourcmtInput.setAttribute(
                                'placeholder',
                                'Bình luận',
                            );
                            button_yourcmtIcon3.setAttribute(
                                'class',
                                'btn homepage__post-posts--content--yourcmticon3',
                            );
                            button_yourcmtIcon3.setAttribute(
                                'data-id',
                                val.idPost,
                            );
                            button_yourcmtIcon3.setAttribute('type', 'button');
                            button_yourcmtIcon3.setAttribute(
                                'onclick',
                                "cmt('" + val.idPost + "')",
                            );
                            i.setAttribute('class', 'fa fa-paper-plane');
                            i.setAttribute('aria-hidden', 'true');

                            a_headerName.innerHTML = val.name;
                            div_headerTime.innerHTML = val.dateTime;
                            spanDropdown.innerHTML =
                                `
                    <div id="dropdown">
                        <button
                            class="btn myNotify__btn__dropdown"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
                        </button>
                        <div
                            class="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                        >
                            <button
                                class="btn btn-light btnDeletePost dropdown-item"
                                onclick="deletePost('` +
                                val.idPost +
                                `')"
                            >
                                Xóa bài viết
                            </button>
                            <button
                                class="btn btn-light editPost dropdown-item"
                                type="button"
                                data-toggle="modal"
                                data-target="#modalEditPost"
                                onclick="showPost_MD('` +
                                val.idPost +
                                `','` +
                                val.content +
                                `','` +
                                val.link +
                                `')"
                            >
                                Chỉnh sửa bài viết
                            </button>
                        </div>
                    </div>
                    `;

                            if (val.link) {
                                var video_id = val.link.split('v=')[1];
                                var ampersandPosition = video_id.indexOf('&');
                                if (ampersandPosition != -1) {
                                    video_id = video_id.substring(
                                        0,
                                        ampersandPosition,
                                    );
                                }
                                var div = document.createElement('div');
                                div.innerHTML = val.content;

                                var embed = document.createElement('embed');
                                embed.setAttribute(
                                    'src',
                                    `https://www.youtube.com/embed/${video_id}`,
                                );
                                embed.setAttribute('height', '300px');
                                embed.setAttribute('width', '100%');
                                embed.setAttribute('class', 'text-center');

                                div_postsContent.appendChild(div);
                                div_postsContent.appendChild(embed);
                            } else {
                                div_postsContent.innerHTML = val.content;
                            }

                            div_headerAvt.append(img_textAvt);
                            div_headerNametime.appendChild(a_headerName);
                            div_headerNametime.appendChild(div_headerTime);

                            div_postsHeader.appendChild(div_headerAvt);
                            div_postsHeader.appendChild(div_headerNametime);
                            div_postsHeader.appendChild(spanDropdown);

                            button_yourcmtIcon3.appendChild(i);

                            div_contentYourcmt.appendChild(input_yourcmtInput);
                            div_contentYourcmt.appendChild(button_yourcmtIcon3);

                            div_postPosts.appendChild(div_postsHeader);
                            div_postPosts.appendChild(div_postsContent);
                            div_postPosts.appendChild(div_contentCmt);
                            div_postPosts.appendChild(div_contentYourcmt);

                            postArea.prepend(div_postPosts);
                            loadCmnt(val.idPost);
                        }
                    });
                })
                .catch((err) => console.log(err));
        }, 1000);
    }

    function showPost_MD(idPost, content, link) {
        document.getElementById('idPost_MD').value = idPost;
        document.getElementById('contentPost_MD').value = content;
        document.getElementById('linkPost_MD').value = link;
    }

    function deletePost(idPost) {
        fetch('/post/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idPost: idPost,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.code === 0) {
                    var deletePost = document.getElementById(json.data.idPost);
                    deletePost.remove();
                    count -= 1;
                } else alert(json.message);
            });
    }

    var btnEditPost = document.getElementById('btnEditPost');
    if (btnEditPost) {
        btnEditPost.addEventListener('click', () => {
            var idPost_MD = document.getElementById('idPost_MD').value;
            var contentPost_MD =
                document.getElementById('contentPost_MD').value;
            var linkPost_MD = document.getElementById('linkPost_MD').value;

            fetch('/post/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idPost: idPost_MD,
                    content: contentPost_MD,
                    link: linkPost_MD,
                }),
            })
                .then((res) => res.json())
                .then((json) => {
                    if (json.code === 0) {
                        loadPostById(json.data.idPost);
                        var deletePost = document.getElementById(
                            json.data.idPost,
                        );
                        deletePost.remove();
                    } else alert(json.message);
                })
                .catch((err) => console.log(err));
        });
    }

    // cmt
    function cmt(id) {
        var idPost = id;
        var contentCmt = document.getElementById('Comment' + id).value;
        if (contentCmt) {
            fetch('/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idPost: idPost,
                    contentCmt: contentCmt,
                }),
            })
                .then((res) => res.json())
                .then((json) => {
                    if (json.code === 0) {
                        document.getElementById('Comment' + id).value = '';
                        loadCmntByIdCmt(idPost, json.data.idcmt);
                    }
                });
        }
    }

    function loadCmntByIdCmt(idPost, idcmt) {
        setTimeout(() => {
            fetch('/comment/' + idPost)
                .then((res) => res.json())
                .then((json) => {
                    var div_commentArea = document.getElementById(
                        'commentArea' + idPost,
                    );
                    json.data.forEach((dataComment) => {
                        if (dataComment.idcmt === idcmt) {
                            var a =
                                `<div class="homepage__post-posts--content--1cmt" id="${dataComment.idcmt}">
                    <div class="homepage__post-posts--content--1cmt-avt">
                        <img
                            src="${dataComment.picture}"
                            alt=""
                            class="
                                rounded-circle
                                homepage__post-posts--content--cmt-avt
                            "
                        />
                    </div>
                    <div class="homepage__post-posts--content--1cmt-namecontent">
                        <div class="homepage__post-posts--content--1cmt-name">
                            <a
                                class="homepage__post-posts--header-name"
                                href="/post/me?idUser=${dataComment.idUser}"
                                >${dataComment.name}</a
                            >
                            <div
                                class="homepage__post-posts--content--1cmt-ifauthor"
                            >
                                ${dataComment.dateTime}
                            </div>
                            <div id="dropdown">
                                    <button
                                        class="btn btn-sm myNotify__btn__dropdown"
                                        type="button" id="dropdownMenuButton"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
                                    </button>
                                    <div
                                        class="dropdown-menu"
                                         aria-labelledby="dropdownMenuButton"
                                    >
                                        <button
                                            class="btn btn-light btnDeletePost dropdown-item"
                                            onclick="deleteCmt('` +
                                dataComment.idcmt +
                                `', '` +
                                idPost +
                                `')"
                                        >
                                            Xóa bình luận
                                        </button>
                                        <button
                                            class="btn btn-light editPost dropdown-item"
                                            type="button"
                                            data-toggle="modal"
                                            data-target="#modalEditCmt"
                                            onclick="showCmt_MD('` +
                                dataComment.idcmt +
                                `', '` +
                                dataComment.contentCmt +
                                `', '` +
                                idPost +
                                `')"
                                        >
                                            Chỉnh sửa bình luận
                                        </button>
                                    </div>
                                </div>
                        </div>
                        <div class="homepage__post-posts--content--1cmt-content">
                            ${dataComment.contentCmt}
                        </div>
                    </div>
                </div>`;
                            div_commentArea.innerHTML += a;
                        }
                    });
                })
                .catch((err) => console.log(err));
        }, 500);
    }

    function loadCmnt(idPost) {
        document.getElementById('commentArea' + idPost).innerHTML = '';
        setTimeout(() => {
            fetch('/comment/' + idPost)
                .then((res) => res.json())
                .then((json) => {
                    var div_commentArea = document.getElementById(
                        'commentArea' + idPost,
                    );
                    json.data.forEach((dataComment) => {
                        var a =
                            `<div class="homepage__post-posts--content--1cmt" id="${dataComment.idcmt}">
                        <div class="homepage__post-posts--content--1cmt-avt">
                            <img
                                src="${dataComment.picture}"
                                alt=""
                                class="
                                    rounded-circle
                                    homepage__post-posts--content--cmt-avt
                                "
                            />
                        </div>
                        <div class="homepage__post-posts--content--1cmt-namecontent">
                            <div class="homepage__post-posts--content--1cmt-name">
                                <a
                                    id="SpecificUsersPosts"
                                    class="homepage__post-posts--header-name"
                                    href="/post/me?idUser=${dataComment.idUser}"
                                    >${dataComment.name}</a
                                >
                                <div
                                    class="homepage__post-posts--content--1cmt-ifauthor"
                                >
                                    ${dataComment.dateTime}
                                </div>
                                <div id="dropdown">
                                    <button
                                        class="btn btn-sm myNotify__btn__dropdown"
                                        type="button" id="dropdownMenuButton"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
                                    </button>
                                    <div
                                        class="dropdown-menu"
                                         aria-labelledby="dropdownMenuButton"
                                    >
                                        <button
                                            class="btn btn-light btnDeletePost dropdown-item"
                                            onclick="deleteCmt('` +
                            dataComment.idcmt +
                            `', '` +
                            idPost +
                            `')"
                                        >
                                            Xóa bình luận
                                        </button>
                                        <button
                                            class="btn btn-light editPost dropdown-item"
                                            type="button"
                                            data-toggle="modal"
                                            data-target="#modalEditCmt"
                                            onclick="showCmt_MD('` +
                            dataComment.idcmt +
                            `', '` +
                            dataComment.contentCmt +
                            `', '` +
                            idPost +
                            `')"
                                        >
                                            Chỉnh sửa bình luận
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="homepage__post-posts--content--1cmt-content">
                                ${dataComment.contentCmt}
                            </div>
                        </div>
                    </div>`;
                        div_commentArea.innerHTML += a;
                    });
                })
                .catch((err) => console.log(err));
        }, 500);
    }

    function showCmt_MD(idcmt, contentCmt, idPost) {
        document.getElementById('idcmt_MD').value = idcmt;
        document.getElementById('contentCmt_MD').value = contentCmt;
        document.getElementById('idPostCmt_MD').value = idPost;
    }

    var btnEditCmt = document.getElementById('btnEditCmt');
    if (btnEditCmt) {
        btnEditCmt.addEventListener('click', () => {
            var idcmt_MD = document.getElementById('idcmt_MD').value;
            var contentCmt_MD = document.getElementById('contentCmt_MD').value;
            var idPostCmt_MD = document.getElementById('idPostCmt_MD').value;
            fetch('/comment/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idcmt: idcmt_MD,
                    contentCmt: contentCmt_MD,
                    idPost: idPostCmt_MD,
                }),
            })
                .then((res) => res.json())
                .then((json) => {
                    if (json.code === 0) {
                        document.getElementById(idcmt_MD).remove();
                        loadCmntByIdCmt(idPostCmt_MD, idcmt_MD);
                    } else alert(json.message);
                })
                .catch((err) => console.log(err));
        });
    }

    function deleteCmt(idcmt, idPost) {
        fetch('/comment/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idcmt: idcmt,
                idPost: idPost,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                if (json.code === 0) document.getElementById(idcmt).remove();
                //loadCmnt(json.data.idPost)
                else alert(json.message);
            })
            .catch((err) => console.log(err));
    }
}

var div_announces = document.getElementById('announces');
if (div_announces) {
    loadListAnnounces();
    function loadListAnnounces() {
        div_announces.innerHTML = '';
        setTimeout(() => {
            fetch('/api/notify')
                .then((res) => res.json())
                .then((json) => {
                    var data = json.data.reverse();
                    a = data;
                    data.forEach((val, i) => {
                        if (i >= 10) return;

                        var notify = document.createElement('div');
                        notify.innerHTML = `<div class="myNotify">
                        <div class="mainNotify__container">
                            <div class="myNotify__container__header">
                                <div
                                    class="mainNotify__container__header__container"
                                >
                                    <div class="myNotify__title">${val.tittle}</div>
                                    <div class="myNotify__time">${val.dateTime}</div>
                                </div>
                            </div>
                            <div class="myNotify__detail">
                                <div class="col"></div>
                                <a
                                    href="/notify/detail?idAnnounce=${val.idNotify}"
                                    class="myNotify__detail__link"
                                    >Xem chi tiết</a
                                >
                            </div>
                        </div>
                    </div>`;

                        div_announces.appendChild(notify);
                    });
                })
                .catch((e) => console.log(e));
        }, 500);
    }

    function loadListNotifysById(idNotify) {
        setTimeout(() => {
            fetch('/api/notify')
                .then((res) => res.json())
                .then((json) => {
                    var data = json.data.reverse();
                    a = data;
                    data.forEach((val, i) => {
                        if (i >= 10) return;

                        if (val.idNotify === idNotify) {
                            var notify = document.createElement('div');
                            notify.innerHTML = `<div class="myNotify">
                            <div class="mainNotify__container">
                                <div class="myNotify__container__header">
                                    <div
                                        class="mainNotify__container__header__container"
                                    >
                                        <div class="myNotify__title">${val.tittle}</div>
                                        <div class="myNotify__time">${val.dateTime}</div>
                                    </div>
                                </div>
                                <div class="myNotify__detail">
                                    <div class="col"></div>
                                    <a
                                        href="/notify/detail?idAnnounce=${val.idNotify}"
                                        class="myNotify__detail__link"
                                        >Xem chi tiết</a
                                    >
                                </div>
                            </div>
                        </div>`;

                            div_announces.prepend(notify);
                        }
                    });
                })
                .catch((e) => console.log(e));
        }, 500);
    }
}

//const { json } = require("express")
var allAnnou = document.getElementById('myNotifyList');
if (allAnnou) {
    loadListAnnounces(1);
    var arr = [];
    function loadListAnnounces(number) {
        document.getElementById('myNotifyList').innerHTML = '';
        var min = (number - 1) * 10;
        var max = number * 10;
        fetch('/api/list-my-notify')
            .then((res) => res.json())
            .then((json) => {
                var data = json.data.reverse();
                arr = data;
                var allAnnou = document.getElementById('myNotifyList');
                data.forEach((val, i) => {
                    if (i >= min && i < max) {
                        var annou =
                            `<div class="myNotify" id="${val.idNotify}">
                            <div class="myNotify__container">
                                <div class="myNotify__container__header">
                                    <div class="myNotify__container__header__container">
                                        <div class="myNotify__title">${val.tittle}</div>
                                        <div class="myNotify__time">${val.dateTime}</div>
                                    </div>
                                    <div class="dropdown">
                                        <button
                                            class="btn myNotify__btn__dropdown"
                                            type="button"
                                            id="dropdownMenuButton"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <i class="fas fa-ellipsis-v"></i>
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" onclick="deleteAnnounce('` +
                            val.idNotify +
                            `')">Xóa thông báo</a>
                                                        <a
                                                            class="dropdown-item"
                                                            data-toggle="modal"
                                                            data-target="#modalEditPost"
                                                            onclick="showEditAnnouMD('` +
                            val.idNotify +
                            `', '` +
                            val.tittle +
                            `', '` +
                            val.content +
                            `', ` +
                            number +
                            `)"
                                                            >Chỉnh sửa</a
                                                        >
                                        </div>
                                    </div>
                                </div>
                                <div class="myNotify__detail">
                                    <div class="col"></div>
                                    <a href="/notify/detail?idAnnounce=${val.idNotify}" class="myNotify__detail__link"
                                        >Xem chi tiết</a
                                    >
                                </div>
                            </div>
                        </div>
                        `;
                        allAnnou.innerHTML += annou;
                    }
                });
                setTimeout(() => {
                    var count = 0;
                    var pagination = document.getElementById('pagination');
                    for (var i in arr) {
                        if (i % 10 === 0) {
                            count++;
                            var li = document.createElement('li');
                            var button = document.createElement('button');

                            li.setAttribute('class', 'pagination-ele');
                            button.setAttribute('class', 'btnPagination');
                            button.setAttribute(
                                'onclick',
                                'choosePage(' + count + ')',
                            );
                            button.innerHTML = count;

                            li.appendChild(button);
                            pagination.appendChild(li);
                        }
                    }
                }, 10);
            })
            .catch((e) => console.log(e));
    }

    function loadListAnnounces2(number) {
        document.getElementById('myNotifyList').innerHTML = '';
        var min = (number - 1) * 10;
        var max = number * 10;
        fetch('/api/list-my-notify')
            .then((res) => res.json())
            .then((json) => {
                var data = json.data.reverse();
                var allAnnou = document.getElementById('myNotifyList');
                data.forEach((val, i) => {
                    if (i >= min && i < max) {
                        var annou =
                            `<div class="myNotify" id="${val.idNotify}">
                <div class="myNotify__container">
                    <div class="myNotify__container__header">
                        <div class="myNotify__container__header__container">
                            <div class="myNotify__title">${val.tittle}</div>
                            <div class="myNotify__time">${val.dateTime}</div>
                        </div>
                        <div class="dropdown">
                            <button
                                class="btn myNotify__btn__dropdown"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i class="fas fa-ellipsis-v"></i>
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" onclick="deleteAnnounce('` +
                            val.idNotify +
                            `')">Xóa thông báo</a>
                                <a
                                    class="dropdown-item"
                                    data-toggle="modal"
                                    data-target="#modalEditPost"
                                    onclick="showEditAnnouMD('` +
                            val.idNotify +
                            `', '` +
                            val.tittle +
                            `', '` +
                            val.content +
                            `', ` +
                            number +
                            `)"
                                    >Chỉnh sửa</a
                                >
                            </div>
                        </div>
                    </div>
                    <div class="myNotify__detail">
                        <div class="col"></div>
                        <a href="/notify/detail?idAnnounce=${val.idNotify}" class="myNotify__detail__link"
                            >Xem chi tiết</a
                        >
                    </div>
                </div>
            </div>
            `;
                        allAnnou.innerHTML += annou;
                    }
                });
            })
            .catch((e) => console.log(e));
    }

    function choosePage(number) {
        loadListAnnounces2(number);
    }

    function deleteAnnounce(idNotify) {
        fetch('/notify/deleteByAd', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idNotify: idNotify,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                if (json.code === 0) {
                    document.getElementById(idNotify).remove();
                    var ulAnnounces = document.getElementById('ul' + idNotify);
                    if (ulAnnounces) ulAnnounces.remove();
                }
            })
            .catch((err) => console.log(err));
    }

    var idNotify = '';
    var tittle = '';
    var content = '';

    function showEditAnnouMD(idNotify, tittle, content, number) {
        document.getElementById('idNotify').value = idNotify;
        document.getElementById('page_MD').value = number;
        document.getElementById('tittle_MD').value = tittle;
        document.getElementById('contentPost_MD').value = content;

        idNotify = idNotify;
        tittle = tittle;
        content = content;
    }

    var btnEditAnnounce = document.getElementById('btnEditPost');

    if (btnEditAnnounce) {
        btnEditAnnounce.addEventListener('click', () => {
            var idNotify = document.getElementById('idNotify').value;
            var page_MD = document.getElementById('page_MD').value;
            var tittle = document.getElementById('tittle_MD').value;
            var content = document.getElementById('contentPost_MD').value;

            if (idNotify && tittle && content) {
                fetch('/notify/edit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idNotify: idNotify,
                        tittle: tittle,
                        content: content,
                    }),
                })
                    .then((res) => res.json())
                    .then((json) => {
                        if (json.code === 0) {
                            choosePage(parseInt(page_MD));
                            msg =
                                'Thông báo vừa được chỉnh sửa ' +
                                "<a href='/notify/detail?idAnnounce=" +
                                idNotify +
                                "'>XEM</a>";
                            socket.emit('client_Send_Data', msg);
                        } else alert(json.message);
                    })
                    .catch((err) => console.log(err));
            }
        });
    }
}

var isAdmin = document.getElementById('isAdmin');
if (isAdmin) {
    var allAnnou = document.getElementById('allAnnou');
    if (allAnnou) {
        loadListAnnounces(1);
        var arr = [];
        function loadListAnnounces(number) {
            document.getElementById('allAnnou').innerHTML = '';
            var min = (number - 1) * 10;
            var max = number * 10;
            fetch('/api/notify')
                .then((res) => res.json())
                .then((json) => {
                    var data = json.data.reverse();
                    arr = data;
                    var allAnnou = document.getElementById('allAnnou');
                    data.forEach((val, i) => {
                        if (i >= min && i < max) {
                            var notify = document.createElement('div');
                            notify.innerHTML =
                                `<div id="${val.idNotify}" class="myNotify__container">
                            <div class="myNotify__container__header">
                                <div class="myNotify__container__header__container">
                                    <div class="myNotify__title">${val.tittle}</div>
                                    <div class="myNotify__time">${val.dateTime}</div>
                                </div>
                                <div class="dropdown">
                                    <button
                                        class="btn myNotify__btn__dropdown"
                                        type="button"
                                        id="dropdownMenuButton"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <i class="fas fa-ellipsis-v"></i>
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" onclick="deleteAnnounce('` +
                                val.idNotify +
                                `')">Xóa thông báo</a>
                                        <a
                                            class="dropdown-item"
                                            data-toggle="modal"
                                            data-target="#modalEditPost"
                                            onclick="showEditAnnouMD('` +
                                val.idNotify +
                                `', '` +
                                val.tittle +
                                `', '` +
                                val.content +
                                `', ` +
                                number +
                                `)"
                                            >Chỉnh sửa</a
                                        >
                                    </div>
                                </div>
                            </div>
                            <div class="myNotify__detail">
                                <div class="col"></div>
                                <a href="/notify/detail?idAnnounce=${val.idNotify}" class="myNotify__detail__link"
                                    >Xem chi tiết</a
                                >
                            </div>
                        </div>`;

                            allAnnou.appendChild(notify);
                        }
                    });
                    setTimeout(() => {
                        var count = 0;
                        var pagination = document.getElementById('pagination');
                        for (var i in arr) {
                            if (i % 10 === 0) {
                                count++;
                                var li = document.createElement('li');
                                var button = document.createElement('button');
                                li.setAttribute('class', 'pagination-ele');
                                button.setAttribute('class', 'btnPagination');
                                button.setAttribute(
                                    'onclick',
                                    'choosePage(' + count + ')',
                                );
                                button.innerHTML = count;

                                li.appendChild(button);
                                pagination.appendChild(li);
                            }
                        }
                    }, 10);
                })
                .catch((e) => console.log(e));
        }

        function loadListAnnounces2(number) {
            document.getElementById('allAnnou').innerHTML = '';
            var min = (number - 1) * 10;
            var max = number * 10;
            fetch('/api/notify')
                .then((res) => res.json())
                .then((json) => {
                    var data = json.data.reverse();
                    var allAnnou = document.getElementById('allAnnou');
                    data.forEach((val, i) => {
                        if (i >= min && i < max) {
                            var notify = document.createElement('div');
                            notify.innerHTML =
                                `<div id="${val.idNotify}" class="myNotify__container">
                                <div class="myNotify__container__header">
                                    <div class="myNotify__container__header__container">
                                        <div class="myNotify__title">${val.tittle}</div>
                                        <div class="myNotify__time">${val.dateTime}</div>
                                    </div>
                                    <div class="dropdown">
                                        <button
                                            class="btn myNotify__btn__dropdown"
                                            type="button"
                                            id="dropdownMenuButton"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <i class="fas fa-ellipsis-v"></i>
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a class="dropdown-item" onclick="deleteAnnounce('` +
                                val.idNotify +
                                `')">Xóa thông báo</a>
                                            <a
                                                class="dropdown-item"
                                                data-toggle="modal"
                                                data-target="#modalEditPost"
                                                onclick="showEditAnnouMD('` +
                                val.idNotify +
                                `', '` +
                                val.tittle +
                                `', '` +
                                val.content +
                                `', ` +
                                number +
                                `)"
                                                >Chỉnh sửa</a
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div class="myNotify__detail">
                                    <div class="col"></div>
                                    <a href="/notify/detail?idAnnounce=${val.idNotify}" class="myNotify__detail__link"
                                        >Xem chi tiết</a
                                    >
                                </div>
                            </div>`;

                            allAnnou.appendChild(notify);
                        }
                    });
                })
                .catch((e) => console.log(e));
        }

        function choosePage(number) {
            loadListAnnounces2(number);
        }

        function deleteAnnounce(idNotify) {
            fetch('/notify/deleteByAd', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idNotify: idNotify,
                }),
            })
                .then((res) => res.json())
                .then((json) => {
                    console.log(json);
                    if (json.code === 0) {
                        document.getElementById(idNotify).remove();
                        var ulAnnounces = document.getElementById(
                            'ul' + idNotify,
                        );
                        if (ulAnnounces) ulAnnounces.remove();
                    }
                })
                .catch((err) => console.log(err));
        }
        function choosePage(number) {
            loadListAnnounces2(number);
        }

        var idNotify = '';
        var tittle = '';
        var content = '';

        function showEditAnnouMD(idNotify, tittle, content, number) {
            document.getElementById('idNotify').value = idNotify;
            document.getElementById('page_MD').value = number;
            document.getElementById('tittle_MD').value = tittle;
            document.getElementById('contentPost_MD').value = content;

            idNotify = idNotify;
            tittle = tittle;
            content = content;
        }

        var btnEditAnnounce = document.getElementById('btnEditPost');

        if (btnEditAnnounce) {
            btnEditAnnounce.addEventListener('click', () => {
                var idNotify = document.getElementById('idNotify').value;
                var page_MD = document.getElementById('page_MD').value;
                var tittle = document.getElementById('tittle_MD').value;
                var content = document.getElementById('contentPost_MD').value;

                if (idNotify && tittle && content) {
                    fetch('/notify/edit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            idNotify: idNotify,
                            tittle: tittle,
                            content: content,
                        }),
                    })
                        .then((res) => res.json())
                        .then((json) => {
                            if (json.code === 0) {
                                choosePage(parseInt(page_MD));
                                msg =
                                    'Thông báo vừa được chỉnh sửa ' +
                                    "<a href='/notify/detail?idAnnounce=" +
                                    idNotify +
                                    "'>XEM</a>";
                                socket.emit('client_Send_Data', msg);
                            } else alert(json.message);
                        })
                        .catch((err) => console.log(err));
                }
            });
        }
    }

    var notifyListbyCategory = document.getElementById('notifyListbyCategory');
    if (notifyListbyCategory) {
        loadListAnnounces(1);
        var arr = [];
        function loadListAnnounces(number) {
            //document.getElementById('allAnnou').innerHTML=''
            var url = new URL(window.location);
            var auths = url.searchParams.get('auths');
            var min = (number - 1) * 10;
            var max = number * 10;
            fetch('/api/notify-by-auths?auths=' + auths)
                .then((res) => res.json())
                .then((json) => {
                    var data = json.data.reverse();
                    arr = data;
                    data.forEach((val, i) => {
                        if (i >= min && i < max) {
                            var a =
                                `<div class="myNotify" id="${val.idNotify}">
                            <div class="myNotify__container">
                                <div class="myNotify__container__header">
                                    <div class="myNotify__container__header__container">
                                        <div class="myNotify__title">${val.tittle}</div>
                                        <div class="myNotify__time">${val.dateTime}</div>
                                    </div>
                                    <div class="dropdown">
                                        <button
                                            class="btn myNotify__btn__dropdown"
                                            type="button"
                                            id="dropdownMenuButton"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <i class="fas fa-ellipsis-v"></i>
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a class="dropdown-item" onclick="deleteAnnounce('` +
                                val.idNotify +
                                `')">Xóa thông báo</a>
                                            <a
                                                class="dropdown-item"
                                                data-toggle="modal"
                                                data-target="#modalEditPost"
                                                onclick="showEditAnnouMD('` +
                                val.idNotify +
                                `', '` +
                                val.tittle +
                                `', '` +
                                val.content +
                                `', ` +
                                number +
                                `)"
                                                >Chỉnh sửa</a
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div class="myNotify__detail">
                                    <div class="col"></div>
                                    <a href="/notify/detail?idAnnounce=${val.idNotify}" class="myNotify__detail__link"
                                        >Xem chi tiết</a
                                    >
                                </div>
                            </div>
                        </div>`;
                            notifyListbyCategory.innerHTML += a;
                        }
                    });

                    setTimeout(() => {
                        var count = 0;
                        var pagination = document.getElementById('pagination');
                        for (var i in arr) {
                            if (i % 10 === 0) {
                                count++;
                                var li = document.createElement('li');
                                var button = document.createElement('button');

                                li.setAttribute('class', 'pagination-ele');
                                button.setAttribute('class', 'btnPagination');
                                button.setAttribute(
                                    'onclick',
                                    'choosePage(' + count + ')',
                                );
                                button.innerHTML = count;

                                li.appendChild(button);
                                pagination.appendChild(li);
                            }
                        }
                    }, 10);
                })
                .catch((e) => console.log(e));
        }

        function loadListAnnounces2(number) {
            notifyListbyCategory.innerHTML = '';
            var min = (number - 1) * 10;
            var max = number * 10;
            var url = new URL(window.location);
            var auths = url.searchParams.get('auths');
            fetch('/api/notify-by-auths?auths=' + auths)
                .then((res) => res.json())
                .then((json) => {
                    var data = json.data.reverse();
                    data.forEach((val, i) => {
                        if (i >= min && i < max) {
                            var a =
                                `<div class="myNotify" id="${val.idNotify}">
                            <div class="myNotify__container">
                                <div class="myNotify__container__header">
                                    <div class="myNotify__container__header__container">
                                        <div class="myNotify__title">${val.tittle}</div>
                                        <div class="myNotify__time">${val.dateTime}</div>
                                    </div>
                                    <div class="dropdown">
                                        <button
                                            class="btn myNotify__btn__dropdown"
                                            type="button"
                                            id="dropdownMenuButton"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <i class="fas fa-ellipsis-v"></i>
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" onclick="deleteAnnounce('` +
                                val.idNotify +
                                `')">Xóa thông báo</a>
                                        <a
                                            class="dropdown-item"
                                            data-toggle="modal"
                                            data-target="#modalEditPost"
                                            onclick="showEditAnnouMD('` +
                                val.idNotify +
                                `', '` +
                                val.tittle +
                                `', '` +
                                val.content +
                                `', ` +
                                number +
                                `)"
                                            >Chỉnh sửa</a
                                        >
                                        </div>
                                    </div>
                                </div>
                                <div class="myNotify__detail">
                                    <div class="col"></div>
                                    <a href="/notify/detail?idAnnounce=${val.idNotify}" class="myNotify__detail__link"
                                        >Xem chi tiết</a
                                    >
                                </div>
                            </div>
                        </div>`;
                            notifyListbyCategory.innerHTML += a;
                        }
                    });
                })
                .catch((e) => console.log(e));
        }

        function choosePage(number) {
            loadListAnnounces2(number);
        }

        function deleteAnnounce(idNotify) {
            fetch('/notify/deleteByAd', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idNotify: idNotify,
                }),
            })
                .then((res) => res.json())
                .then((json) => {
                    console.log(json);
                    if (json.code === 0) {
                        document.getElementById(idNotify).remove();
                        var ulAnnounces = document.getElementById(
                            'ul' + idNotify,
                        );
                        if (ulAnnounces) ulAnnounces.remove();
                    }
                })
                .catch((err) => console.log(err));
        }

        var idNotify = '';
        var tittle = '';
        var content = '';

        function showEditAnnouMD(idNotify, tittle, content, number) {
            document.getElementById('idNotify').value = idNotify;
            document.getElementById('page_MD').value = number;
            document.getElementById('tittle_MD').value = tittle;
            document.getElementById('contentPost_MD').value = content;

            idNotify = idNotify;
            tittle = tittle;
            content = content;
        }

        var btnEditAnnounce = document.getElementById('btnEditPost');

        if (btnEditAnnounce) {
            btnEditAnnounce.addEventListener('click', () => {
                var idNotify = document.getElementById('idNotify').value;
                var page_MD = document.getElementById('page_MD').value;
                var tittle = document.getElementById('tittle_MD').value;
                var content = document.getElementById('contentPost_MD').value;

                if (idNotify && tittle && content) {
                    fetch('/notify/edit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            idNotify: idNotify,
                            tittle: tittle,
                            content: content,
                        }),
                    })
                        .then((res) => res.json())
                        .then((json) => {
                            if (json.code === 0) {
                                choosePage(parseInt(page_MD));
                                msg =
                                    'Thông báo vừa được chỉnh sửa ' +
                                    "<a href='/notify/detail?idAnnounce=" +
                                    idNotify +
                                    "'>XEM</a>";
                                socket.emit('client_Send_Data', msg);
                            } else alert(json.message);
                        })
                        .catch((err) => console.log(err));
                }
            });
        }
    }
} else {
    var allAnnou = document.getElementById('allAnnou');
    if (allAnnou) {
        loadListAnnounces(1);
        var arr = [];
        function loadListAnnounces(number) {
            allAnnou.innerHTML = '';
            var min = (number - 1) * 10;
            var max = number * 10;
            fetch('/api/notify')
                .then((res) => res.json())
                .then((json) => {
                    var data = json.data.reverse();
                    arr = data;
                    data.forEach((val, i) => {
                        if (i >= min && i < max) {
                            var notify = document.createElement('div');
                            notify.innerHTML = `<div id="${val.idNotify}"  class="myNotify__container">
                                <div class="myNotify__container__header">
                                    <div class="myNotify__container__header__container">
                                        <div class="myNotify__title">${val.tittle}</div>
                                        <div class="myNotify__time">${val.dateTime}</div>
                                    </div>
                                </div>
                                <div class="myNotify__detail">
                                    <div class="col"></div>
                                    <a href="/notify/detail?idAnnounce=${val.idNotify}" class="myNotify__detail__link"
                                        >Xem chi tiết</a
                                    >
                                </div>
                            </div>`;

                            allAnnou.appendChild(notify);
                        }
                    });
                    setTimeout(() => {
                        var count = 0;
                        var pagination = document.getElementById('pagination');
                        for (var i in arr) {
                            if (i % 10 === 0) {
                                count++;
                                var li = document.createElement('li');
                                var button = document.createElement('button');

                                li.setAttribute('class', 'pagination-ele');
                                button.setAttribute('class', 'btnPagination');
                                button.setAttribute(
                                    'onclick',
                                    'choosePage(' + count + ')',
                                );
                                button.innerHTML = count;

                                li.appendChild(button);
                                pagination.appendChild(li);
                            }
                        }
                    }, 10);
                })
                .catch((e) => console.log(e));
        }

        function loadListAnnounces2(number) {
            allAnnou.innerHTML = '';
            var min = (number - 1) * 10;
            var max = number * 10;
            fetch('/api/notify')
                .then((res) => res.json())
                .then((json) => {
                    var data = json.data.reverse();
                    data.forEach((val, i) => {
                        if (i >= min && i < max) {
                            var annou = document.createElement('div');
                            var annouTittle = document.createElement('div');
                            var annouTime = document.createElement('div');
                            var a = document.createElement('a');

                            a.setAttribute(
                                'href',
                                'announceDetail?idAnnounce=' + val.idAnnounce,
                            );
                            a.setAttribute('class', 'click');
                            annou.setAttribute('class', 'annou');
                            annou.setAttribute('id', val.idAnnounce);
                            annouTime.setAttribute('class', 'annou-time');
                            annouTittle.setAttribute('class', 'annou-tittle');

                            a.innerHTML = 'Xem chi tiet';
                            annouTittle.innerHTML = val.tittle;
                            annouTime.innerHTML =
                                val.dateTime +
                                `<span class="dropdown">
                                                        <button class="btnChoose" type="button" data-toggle="dropdown">
                                                            <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                        </button>
                                                        <div class="dropdown-menu listChoose">
                                                            <button class="btn btn-light" onclick="deleteAnnounce('` +
                                val.idAnnounce +
                                `')">Xóa thông báo</button>
                                                        </div>
                                                    </span>`;

                            annou.appendChild(annouTittle);
                            annou.appendChild(annouTime);
                            annou.appendChild(a);

                            allAnnou.appendChild(annou);
                        }
                    });
                })
                .catch((e) => console.log(e));
        }

        function choosePage(number) {
            loadListAnnounces2(number);
        }

        function deleteAnnounce(idNotify) {
            fetch('/notify/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idNotify: idNotify,
                }),
            })
                .then((res) => res.json())
                .then((json) => {
                    console.log(json);
                    if (json.code === 0) {
                        document.getElementById(idNotify).remove();
                        var ulAnnounces = document.getElementById(
                            'ul' + idNotify,
                        );
                        if (ulAnnounces) ulAnnounces.remove();
                    }
                })
                .catch((err) => console.log(err));
        }
    }

    var notifyListbyCategory = document.getElementById('notifyListbyCategory');
    if (notifyListbyCategory) {
        loadListAnnounces(1);
        var arr = [];
        function loadListAnnounces(number) {
            //document.getElementById('allAnnou').innerHTML=''
            var url = new URL(window.location);
            var auths = url.searchParams.get('auths');
            var min = (number - 1) * 10;
            var max = number * 10;
            fetch('/api/notify-by-auths?auths=' + auths)
                .then((res) => res.json())
                .then((json) => {
                    var data = json.data.reverse();
                    arr = data;
                    data.forEach((val, i) => {
                        if (i >= min && i < max) {
                            var a = `
                    <div class="myNotify" id="${val.idNotify}">
                        <div class="myNotify__container">
                            <div class="myNotify__container__header">
                                <div class="myNotify__container__header__container">
                                    <div class="myNotify__title">${val.tittle}</div>
                                    <div class="myNotify__time">${val.dateTime}</div>
                                </div>
                            </div>
                            <div class="myNotify__detail">
                                <div class="col"></div>
                                <a href="/notify/detail?idAnnounce=${val.idNotify}" class="myNotify__detail__link">
                                    Xem chi tiết
                                </a>
                            </div>
                        </div>
                    </div>`;
                            notifyListbyCategory.innerHTML += a;
                        }
                    });

                    setTimeout(() => {
                        var count = 0;
                        var pagination = document.getElementById('pagination');
                        for (var i in arr) {
                            if (i % 10 === 0) {
                                count++;
                                var li = document.createElement('li');
                                var button = document.createElement('button');

                                li.setAttribute('class', 'pagination-ele');
                                button.setAttribute('class', 'btnPagination');
                                button.setAttribute(
                                    'onclick',
                                    'choosePage(' + count + ')',
                                );
                                button.innerHTML = count;

                                li.appendChild(button);
                                pagination.appendChild(li);
                            }
                        }
                    }, 10);
                })
                .catch((e) => console.log(e));
        }

        function loadListAnnounces2(number) {
            notifyListbyCategory.innerHTML = '';
            var min = (number - 1) * 10;
            var max = number * 10;
            var url = new URL(window.location);
            var auths = url.searchParams.get('auths');
            fetch('/api/notify-by-auths?auths=' + auths)
                .then((res) => res.json())
                .then((json) => {
                    var data = json.data.reverse();
                    var notifyListbyCategory = document.getElementById(
                        'notifyListbyCategory',
                    );
                    data.forEach((val, i) => {
                        if (i >= min && i < max) {
                            var a = `<div class="myNotify" id="${val.idNotify}">
                        <div class="myNotify__container">
                            <div class="myNotify__container__header">
                                <div class="myNotify__container__header__container">
                                    <div class="myNotify__title">${val.tittle}</div>
                                    <div class="myNotify__time">${val.dateTime}</div>
                                </div>
                            </div>
                            <div class="myNotify__detail">
                                <div class="col"></div>
                                <a href="/notify/detail?idAnnounce=${val.idNotify}" class="myNotify__detail__link"
                                    >Xem chi tiết</a
                                >
                            </div>
                        </div>
                    </div>`;
                            notifyListbyCategory.innerHTML += a;
                        }
                    });
                })
                .catch((e) => console.log(e));
        }

        function choosePage(number) {
            loadListAnnounces2(number);
        }
    }
}

var alerAnnounce = document.getElementById('alert-Announce');
var contentRealtime = document.getElementById('content_realtime');

if (alerAnnounce) {
    var socket = io();
    socket.on('server_Return_Data', (data) => {
        alerAnnounce.style.display = 'block';
        document.getElementById('content_realtime').innerHTML = data;
    });
}
