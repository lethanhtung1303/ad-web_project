loadListAnnounces(1)
var arr = []
function loadListAnnounces(number){
    document.getElementById('allAnnou').innerHTML=''
    var min = (number - 1) * 10
    var max = number * 10
    fetch("/getAnnounce/getAnnounce")
    .then(res => res.json())
    .then(json => {
        var data = json.data.reverse()
        arr = data
        var allAnnou = document.getElementById('allAnnou')
        data.forEach((val, i) => {
            if (i >= min && i < max) {
                var notify = document.createElement("div")
                notify.innerHTML = `<div id="${val.idNotify}"  class="myNotify__container">
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
                                            <a class="dropdown-item" onclick="deleteAnnounce('`+val.idNotify+`')">Xóa thông báo</a>
                                            <a
                                                class="dropdown-item"
                                                data-toggle="modal"
                                                data-target="#modalEditPost"
                                                onclick="showEditAnnouMD('`+val.idNotify+`', '`+val.tittle+`', '`+val.content+`', `+number+`)"
                                                >Chỉnh sửa</a
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div class="myNotify__detail">
                                    <div class="col"></div>
                                    <a href="/notifyDetail" class="myNotify__detail__link"
                                        >Xem chi tiết</a
                                    >
                                </div>
                            </div>`
                
                allAnnou.appendChild(notify)

            }
        })
        setTimeout(() => {
        var count = 0
        var pagination = document.getElementById("pagination")
        for(var i in arr){
            if(i % 10 === 0){
                count ++
                var li = document.createElement("li")
                var button = document.createElement("button")
                
                li.setAttribute("class", "pagination-ele")
                button.setAttribute("class", "btnPagination")
                button.setAttribute("onclick", "choosePage(" + count + ")")
                button.innerHTML = count

                li.appendChild(button)
                pagination.appendChild(li)
            }
        }
    }, 10)
        
    })
    .catch(e => console.log(e))
}


function loadListAnnounces2(number){
    document.getElementById('allAnnou').innerHTML=''
    var min = (number - 1) * 10
    var max = number * 10
    fetch("/getAnnounce/getAnnounce")
    .then(res => res.json())
    .then(json => {
        var data = json.data.reverse()
        var allAnnou = document.getElementById('allAnnou')
        data.forEach((val, i) => {
            if (i >= min && i < max) {
                
                var annou = document.createElement("div")
                var annouTittle = document.createElement("div")
                var annouTime = document.createElement("div")
                var a = document.createElement("a")
                
                a.setAttribute('href', "announceDetail?idAnnounce="+val.idAnnounce)
                a.setAttribute("class", "click")
                annou.setAttribute("class", "annou")
                annou.setAttribute("id", val.idAnnounce)
                annouTime.setAttribute("class", "annou-time")
                annouTittle.setAttribute("class", "annou-tittle")

                a.innerHTML = "Xem chi tiet"
                annouTittle.innerHTML = val.tittle
                annouTime.innerHTML = val.dateTime+ `<span class="dropdown">
                                                        <button class="btnChoose" type="button" data-toggle="dropdown">
                                                            <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                        </button>
                                                        <div class="dropdown-menu listChoose">
                                                            <button class="btn btn-light" onclick="deleteAnnounce('`+val.idAnnounce+`')">Xóa thông báo</button>
                                                        </div>
                                                    </span>`

                annou.appendChild(annouTittle)
                annou.appendChild(annouTime)
                annou.appendChild(a)

                allAnnou.appendChild(annou)

            }
        })

        
    })
    .catch(e => console.log(e))
}



function choosePage(number){
    loadListAnnounces2(number)
}

function deleteAnnounce(idNotify){
    fetch('/deleteNotify/deleteAnnounce', {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            idNotify : idNotify
        })
    })
    .then(res => res.json())
    .then(json => {
        console.log(json)
        if(json.code === 0){
            document.getElementById(idNotify).remove()
            var ulAnnounces = document.getElementById("ul"+idNotify)
            if(ulAnnounces)
                ulAnnounces.remove()
        }
    })
    .catch(err => console.log(err))
}
