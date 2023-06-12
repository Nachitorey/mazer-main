from flask import Flask, render_template, request, redirect, flash
import psycopg2
from urllib.parse import urlparse

app = Flask(__name__)
app.secret_key = 'your_secret_key'

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


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Obtener los datos del formulario de registro
        nombre = request.form['nombre']
        apellido = request.form['apellido']
        correo = request.form['correoelectronico']
        usuario = request.form['usuario']
        contrasena = request.form['contraseña']

        # Insertar los datos del usuario en la base de datos
        try:
            cursor = conn.cursor()
            query = "INSERT INTO clientes (nombre, apellido, correoelectronico, usuario, contraseña) VALUES (%s, %s, %s, %s, %s)"
            cursor.execute(query, (nombre, apellido, correo, usuario, contrasena))
            conn.commit()
            cursor.close()

            flash('Registro exitoso. Inicia sesión con tu nueva cuenta.')
            return redirect('/login')
        except Exception as e:
            error_message = 'Error occurred while registering user'
            flash(error_message)
            print(str(e))
            return redirect('/')
    else:
        return render_template('register.hbs')
    
if __name__ == '__main__':
    app.run()


