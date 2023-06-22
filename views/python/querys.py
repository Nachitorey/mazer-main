import psycopg2
import serial
import matplotlib.pyplot

def ejecutar_consulta(query, parametros = None):
    #Nos conectamos a la DataBase
    connection_url = "postgres://lhihtpgb:PSJl23IT43ky1vxBCZVWy-2guTzIaKd_@rajje.db.elephantsql.com/lhihtpgb"
    connection = psycopg2.connect(connection_url)
    #creamos un cursor para ejecutar consultas SQL
    cursor = connection.cursor()

    # Ejecutar la consulta con los parámetros especificados (si los hay)
    if parametros is None:
        cursor.execute(query)
    else:
        cursor.execute(query, parametros)
    
    # Obtener el resultado de la consulta
    resultado = cursor.fetchall()
    
    # Cerrar la conexión y el cursor
    cursor.close()
    connection.close()
    
    # Devolver el resultado de la consulta
    return resultado

def verificar_credenciales(usuario, contraseña):
    query = "SELECT FROM clientes WHERE usuario = %s AND contraseña = %s"
    parametros = (usuario, contraseña)
    resultado = ejecutar_consulta(query, parametros)

    if resultado:
        return True
    
    return False

usuario = input("Ingrese su usuario: ")
contrasena = input("Ingrese su contraseña: ")

if verificar_credenciales(usuario, contrasena):
    print("Credenciales válidas. Acceso permitido.")
else:
    print("Credenciales inválidas. Acceso denegado.")


