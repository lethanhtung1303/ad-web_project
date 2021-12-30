var socket = io()

socket.on("server_Return_Data", data => {
     document.getElementById("alert-Announce").style.display = "block"
     document.getElementById("content_realtime").innerHTML = data
     
     loadListAnnounces();

     setInterval(function () { document.getElementById("alert-Announce").style.display = "none" }, 7000);
     
})

