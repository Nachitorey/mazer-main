from flask import Flask, render_template, request, redirect, flash
from flask_see import sse
import psycopg2
from urllib.parse import urlparse

app = Flask(__name__)
app.secret_key = '06854511-502b-4cbd-ba87-b90ba443e5d2'

# Obtener la URL de conexión de ElephantSQL
elephant_url = "postgres://lhihtpgb:idcbC-MsU5moPRfu6wuig0ukPx2Flh52@rajje.db.elephantsql.com/lhihtpgb"  # Reemplaza con tu URL

# Parsear la URL de conexión
result = urlparse(elephant_url)
db_name = result.path[1:]
user = result.username
password = result.password
host = result.hostname
port = result.port

# Configurar la conexión a ElephantSQL
conn = psycopg2.connect(
    dbname=db_name,
    user=user,
    password=password,
    host=host,
    port=port
)

@app.route('/')
def index():
    return render_template('login.hbs')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        usuario = request.form['username']
        contrasena = request.form['password']

        # Realizar la verificación de credenciales con tus querys de base de datos
        # Aquí debes implementar tus querys para verificar las credenciales

        # Verificamos las credenciales en la base de datos
        cursor = conn.cursor()
        query = "SELECT * FROM clientes WHERE usuario = %s AND contraseña = %s"
        cursor.execute(query, (usuario, contrasena))
        user = cursor.fetchone()
        cursor.close()

        if user:
            return redirect('http://localhost:3000')  # Redirigir a la página principal
        else:
            error_message = 'Invalid username or password'
            flash(error_message)
            return redirect('/')
    else:
        return redirect('/')

if __name__ == '_main_':
    app.run(debug=True)