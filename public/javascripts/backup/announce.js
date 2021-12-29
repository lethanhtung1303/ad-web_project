loadListAnnounces();
function loadListAnnounces() {
    document.getElementById('announces').innerHTML = '';
    setTimeout(() => {
        fetch('/api/notify')
            .then((res) => res.json())
            .then((json) => {
                var data = json.data.reverse();
                a = data;
                var div = document.getElementById('announces');
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
                                            href="/api/notify"
                                            class="myNotify__detail__link"
                                            >Xem chi tiết</a
                                        >
                                    </div>
                                </div>
                            </div>`;

                    div.appendChild(notify);
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
                var div = document.getElementById('announces');
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
                                                href="/api/notify"
                                                class="myNotify__detail__link"
                                                >Xem chi tiết</a
                                            >
                                        </div>
                                    </div>
                                </div>`;

                        div.prepend(notify);
                    }
                });
            })
            .catch((e) => console.log(e));
    }, 500);
}
