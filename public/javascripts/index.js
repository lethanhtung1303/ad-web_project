var btnAnnounce = document.getElementById('btnAnnounce')
btnAnnounce.addEventListener('click', () => {
    var contentAnnounce = document.getElementById('contentAnnounce').value
    var auths = document.getElementById('auths').value
    var tittle = document.getElementById('tittle').value

    if(contentAnnounce && auths && tittle){
        fetch('/addAnnounce', {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                content : contentAnnounce,
                tittle :tittle,
                auths : auths
            })
        })
        .then(res => res.json())
        .then(json => {
            if(json.code === 0){
                document.getElementById('contentAnnounce').value = ""
                document.getElementById('tittle').value = ""
                // loadListAnnouncesById(json.data.idAnnounce)
                // msg = json.data.name + " vừa đăng thông báo " + "<a href='/announceDetail?idAnnounce="+json.data.idAnnounce+"'>XEM</a>"
                // socket.emit("client_Send_Data", msg)
            }
        })
        .catch(e => console.log(e))
    }
})