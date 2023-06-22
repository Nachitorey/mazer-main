// Obtén una referencia al elemento del gráfico
var canvas = document.getElementById('grafico');
var ctx = canvas.getContext('2d');

// Variables para almacenar los datos del gráfico
var labels = []; // Etiquetas de tiempo
var sensorValues = []; // Valores de los sensores

// Función para dibujar el gráfico
function dibujarGrafico() {
  // Limpiar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar el gráfico con los datos actuales
  // Aquí deberías utilizar la lógica específica de tu gráfico para representar los datos
  // Como ejemplo, se dibuja un gráfico de línea simple
  ctx.beginPath();
  ctx.moveTo(0, canvas.height - sensorValues[0]);

  for (var i = 1; i < sensorValues.length; i++) {
	ctx.lineTo(i, canvas.height - sensorValues[i]);
  }

  ctx.stroke();
}

// Función para actualizar los datos del gráfico
function actualizarDatos(data) {
  var time = new Date().toLocaleTimeString();
  var sensorValue = data.sensorValue;

  // Agregar nuevos datos a los arrays
  labels.push(time);
  sensorValues.push(sensorValue);

  // Limitar la cantidad de puntos en el gráfico
  var maxDataPoints = 20; // Ajusta la cantidad deseada de puntos en el gráfico
  if (labels.length > maxDataPoints) {
	labels.shift();
	sensorValues.shift();
  }

  // Dibujar el gráfico actualizado
  dibujarGrafico();
}

// Establecer la comunicación con el Arduino
var socket = new WebSocket('ws://tu_arduino_direccion_ip:puerto'); // Reemplaza con la dirección IP y puerto de tu Arduino WebSocket

socket.onmessage = function(event) {
  var data = JSON.parse(event.data);
  actualizarDatos(data);
};

// Aquí puedes agregar tu código existente para configurar y mostrar el gráfico inicialmente
// Asegúrate de adaptarlo a la estructura del gráfico que ya tienes en tu página web


var optionsProfileVisit = {
	annotations: {
		position: 'back'
	},
	dataLabels: {
		enabled:false
	},
	chart: {
		type: 'bar',
		height: 300
	},
	fill: {
		opacity:1
	},
	plotOptions: {
	},
	series: [{
		name: 'sales',
		data: [18,10,15,18]
	}],
	colors: '#435ebe',
	xaxis: {
		categories: ["Humedad","Temperatura","Luz", "Tanque"],
	},
}
let optionsVisitorsProfile  = {
	series: [70, 30],
	labels: ['Male', 'Female'],
	colors: ['#435ebe','#55c6e8'],
	chart: {
		type: 'donut',
		width: '100%',
		height:'350px'
	},
	legend: {
		position: 'bottom'
	},
	plotOptions: {
		pie: {
			donut: {
				size: '30%'
			}
		}
	}
}

var optionsEurope = {
	series: [{
		name: 'series1',
		data: [310, 800, 600, 430, 540, 340, 605, 805,430, 540, 340, 605]
	}],
	chart: {
		height: 80,
		type: 'area',
		toolbar: {
			show:false,
		},
	},
	colors: ['#5350e9'],
	stroke: {
		width: 2,
	},
	grid: {
		show:false,
	},
	dataLabels: {
		enabled: false
	},
	xaxis: {
		type: 'realtime',
		categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z","2018-09-19T07:30:00.000Z","2018-09-19T08:30:00.000Z","2018-09-19T09:30:00.000Z","2018-09-19T10:30:00.000Z","2018-09-19T11:30:00.000Z"],
		axisBorder: {
			show:false
		},
		axisTicks: {
			show:false
		},
		labels: {
			show:false,
		}
	},
	show:false,
	yaxis: {
		labels: {
			show:false,
		},
	},
	tooltip: {
		x: {
			format: 'dd/MM/yy HH:mm'
		},
	},
};

let optionsAmerica = {
	...optionsEurope,
	colors: ['#008b75'],
}
let optionsIndonesia = {
	...optionsEurope,
	colors: ['#dc3545'],
}





var chartProfileVisit = new ApexCharts(document.querySelector("#chart-profile-visit"), optionsProfileVisit);
var chartVisitorsProfile = new ApexCharts(document.getElementById('chart-visitors-profile'), optionsVisitorsProfile)
var chartEurope = new ApexCharts(document.querySelector("#chart-europe"), optionsEurope);
var chartAmerica = new ApexCharts(document.querySelector("#chart-america"), optionsAmerica);
var chartIndonesia = new ApexCharts(document.querySelector("#chart-indonesia"), optionsIndonesia);

chartIndonesia.render();
chartAmerica.render();
chartEurope.render();
chartProfileVisit.render();
chartVisitorsProfile.render()