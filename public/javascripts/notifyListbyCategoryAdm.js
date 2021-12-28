loadListAnnounces(1);
var arr = [];
function loadListAnnounces(number) {
    //document.getElementById('allAnnou').innerHTML=''
    var url = new URL(window.location);
    var auths = url.searchParams.get('auths');
    var min = (number - 1) * 10;
    var max = number * 10;
    fetch('/getAnnounceByAuths?auths=' + auths)
        .then((res) => res.json())
        .then((json) => {
            var data = json.data.reverse();
            arr = data;
            var allAnnou = document.getElementById('notifyListbyCategory');
            data.forEach((val, i) => {
                if (i >= min && i < max) {
                    var a =
                        `<div class="myNotify" id="${val.idNotify}>
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
                        <a href="/notifyDetail?idAnnounce=${val.idNotify}" class="myNotify__detail__link"
                            >Xem chi tiết</a
                        >
                    </div>
                </div>
            </div>`;
                    allAnnou.innerHTML += a;
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
    document.getElementById('notifyListbyCategory').innerHTML = '';
    var min = (number - 1) * 10;
    var max = number * 10;
    var url = new URL(window.location);
    var auths = url.searchParams.get('auths');
    fetch('/getAnnounceByAuths?auths=' + auths)
        .then((res) => res.json())
        .then((json) => {
            var data = json.data.reverse();
            var allAnnou = document.getElementById('notifyListbyCategory');
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
                        <a href="/notifyDetail?idAnnounce=${val.idNotify}" class="myNotify__detail__link"
                            >Xem chi tiết</a
                        >
                    </div>
                </div>
            </div>`;
                    allAnnou.innerHTML += a;
                }
            });
        })
        .catch((e) => console.log(e));
}

function choosePage(number) {
    loadListAnnounces2(number);
}

function deleteAnnounce(idNotify) {
    fetch('/deleteNotify/deleteAnnounceAdm', {
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

btnEditAnnounce.addEventListener('click', () => {
    var idNotify = document.getElementById('idNotify').value;
    var page_MD = document.getElementById('page_MD').value;
    var tittle = document.getElementById('tittle_MD').value;
    var content = document.getElementById('contentPost_MD').value;

    if (idNotify && tittle && content) {
        fetch('/editNotify/editNotify', {
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
                    // msg = "Thông báo vừa được chỉnh sửa " + "<a href='/announceDetail?idNotify=" + idNotify + "'>XEM</a>"
                    // socket.emit("client_Send_Data", msg)
                } else alert(json.message);
            })
            .catch((err) => console.log(err));
    }
});
