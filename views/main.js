const socket = io();

socket.onclose('temperaturaa', function (data) {
    console.log(data);
    let temp = document.getElementById('temperaturaa');
    temp.innerHTML = `${data} °C`;
});