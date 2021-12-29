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
            var allAnnou = document.getElementById('notifyListbyCategory');
            data.forEach((val, i) => {
                if (i >= min && i < max) {
                    var a = `<div class="myNotify" id="${val.idNotify}>
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
    fetch('/api/notify-by-auths?auths=' + auths)
        .then((res) => res.json())
        .then((json) => {
            var data = json.data.reverse();
            var allAnnou = document.getElementById('notifyListbyCategory');
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
                    allAnnou.innerHTML += a;
                }
            });
        })
        .catch((e) => console.log(e));
}

function choosePage(number) {
    loadListAnnounces2(number);
}
