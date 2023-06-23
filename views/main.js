const socket = io();

socket.onclose('temperatura', function (data) {
    console.log(data);
    let temp = document.getElementById('temperatura');
    temp.innerHTML = `${data} °C`;
});