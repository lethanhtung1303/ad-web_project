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

// add notify
var btnNotify = document.getElementById('btnNotify');
btnNotify.addEventListener('click', () => {
    var contentNotify = document.getElementById('contentNotify').value;
    var auths = document.getElementById('auths').value;
    var tittle = document.getElementById('tittle').value;

    if (contentNotify && auths && tittle) {
        fetch('/addNotify', {
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
                if (json.code === 0) {
                    document.getElementById('contentNotify').value = '';
                    document.getElementById('tittle').value = '';
                    // loadListNotifysById(json.data.idNotify)
                    // msg = json.data.name + " vừa đăng thông báo " + "<a href='/NotifyDetail?idNotify="+json.data.idNotify+"'>XEM</a>"
                    // socket.emit("client_Send_Data", msg)
                }
            })
            .catch((e) => console.log(e));
    }
});

load();

// add post
var btnPost = document.getElementById('btnPost');
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
                    console.log(json.data);
                    loadPostById(json.data.idPost);
                }
            })
            .catch((e) => console.log(e));
    }
});

function load() {
    document.getElementById('postArea').innerHTML = '';
    fetch('/post', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((json) => {
            var data = json.data.reverse();
            var postArea = document.getElementById('postArea');
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
                a_headerName.setAttribute('href', '/profile');
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
                div_contentYourcmt.setAttribute(
                    'class',
                    'homepage__post-posts--content--yourcmt',
                );
                input_yourcmtInput.setAttribute(
                    'class',
                    'homepage__post-posts--content--yourcmtinput',
                );
                input_yourcmtInput.setAttribute('type', 'text');
                input_yourcmtInput.setAttribute('id', 'Comment' + val.idPost);
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
                    var div = document.createElement('div');
                    div.innerHTML = val.content;

                    var embed = document.createElement('embed');
                    embed.setAttribute('src', val.link);
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
                var postArea = document.getElementById('postArea');
                data.forEach((val) => {
                    if (val.idPost === idPost) {
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
                        a_headerName.setAttribute('href', '/profile');
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
                            var div = document.createElement('div');
                            div.innerHTML = val.content;

                            var embed = document.createElement('embed');
                            embed.setAttribute('src', val.link);
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
            } else alert(json.message);
        });
}

var btnEditPost = document.getElementById('btnEditPost');
btnEditPost.addEventListener('click', () => {
    var idPost_MD = document.getElementById('idPost_MD').value;
    var contentPost_MD = document.getElementById('contentPost_MD').value;
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
                var deletePost = document.getElementById(json.data.idPost);
                deletePost.remove();
            } else alert(json.message);
        })
        .catch((err) => console.log(err));
});
