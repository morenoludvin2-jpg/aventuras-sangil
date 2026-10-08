- Mi predicción:
  Creo que las tres direcciones van a mostrar "Hola desde el servidor",
  porque el servidor todavía no diferencia entre rutas.

- Lo que pasó:
  Las tres direcciones mostraron "Hola desde el servidor".
  En la terminal aparecieron las peticiones GET de cada dirección.
  También apareció /favicon.ico porque el navegador lo solicita automáticamente.

- Por qué pasó:
  Porque el servidor todavía no tiene condiciones para diferenciar las rutas.
  Todas las peticiones llegan al mismo código y ejecutan res.end()
  con el mismo mensaje.

  ## P2

- Mi predicción:
  Creo que aparecerá 1 petición.

- Lo que pasó:
  Aparecieron 2 peticiones: GET / y GET /favicon.ico.

- Por qué pasó:
  La primera petición corresponde a la página que abrí.
  La segunda la hizo automáticamente el navegador para buscar el ícono
  favicon.ico de la página.

  ## P3

- Mi predicción:
  /actividades/ con slash al final va a dar 404.
  /ACTIVIDADES también va a dar 404.

- Lo que pasó:
  Las dos rutas dieron 404 y mostraron "Ruta no encontrada".

- Por qué pasó:
  Porque las rutas deben coincidir exactamente.
  /actividades/ tiene un slash adicional y /ACTIVIDADES está escrita
  en mayúsculas. El servidor solamente reconoce /actividades.


## P4

Mi predicción:
Creo que Express va a responder con un error 404 porque no existe una ruta para /no-existe.
Lo que pasó:
Express mostró el mensaje "Cannot GET /no-existe" y en Network apareció el código de estado 404.
Por qué pasó:
Porque no creamos una ruta para esa dirección. Express devuelve un 404 cuando no encuentra una ruta que coincida con la petición.


## P5

Mi predicción:
Creo que si quito next(), el navegador se quedará cargando porque la petición no llegará a la ruta.
Lo que pasó:
El navegador se quedó cargando y la terminal mostró la petición recibida.
Por qué pasó:
Porque next() permite que la petición continúe hacia la ruta correspondiente. Al quitarlo, el middleware no deja avanzar la petición y tampoco envía una respuesta.

## P6
Mi predicción: Creo que al buscar una actividad por su ID aparecerá la información de esa actividad.
Lo que pasó: Al principio no aparecía nada porque el ID recibido por la ruta era texto y el ID de la lista era un número. Lo corregí usando Number(req.params.id) y la actividad apareció correctamente.
Por qué pasó: Los parámetros de la URL se reciben como texto. Para compararlos con los ID numéricos de la lista, tuve que convertirlos a números.

## P7
Mi predicción: Creo que al buscar un ID que no existe, el servidor mostrará un mensaje de error.
Lo que pasó: Al buscar la actividad con ID 99, apareció un mensaje indicando que no existía.
Por qué pasó: Se utilizó una condición if para comprobar si la actividad no se encontraba y se respondió con el código 404. También se agregó return para evitar enviar dos respuestas.

## P8
Mi predicción: Creo que al buscar actividades por tipo, aparecerán solamente las que coincidan con el tipo indicado.
Lo que pasó: Al buscar actividades de tipo agua aparecieron el rafting y el torrentismo. Al buscar actividades de tipo aire apareció el parapente.
Por qué pasó: Se utilizó req.query para recibir el tipo desde la URL y filter() para seleccionar las actividades que coincidían.

## P9
Mi predicción: Creo que el servidor podrá recibir los datos de una actividad nueva y devolverlos en una respuesta.
Lo que pasó: Envié una petición POST con el nombre, el tipo y el precio de una actividad. El servidor recibió los datos y respondió correctamente.
Por qué pasó: Se utilizó app.use(express.json()) para interpretar el contenido JSON y app.post() para recibir la nueva actividad. La respuesta utilizó el código 201.

## P10
Mi predicción: Creo que la actividad creada seguirá apareciendo después de reiniciar el servidor.
Lo que pasó: Después de reiniciar el servidor, la actividad creada desapareció y volvieron a aparecer las cuatro actividades iniciales.
Por qué pasó: Las actividades se guardan en un arreglo en la memoria del servidor. Al reiniciarlo, el arreglo se crea nuevamente y se pierden los datos agregados durante la ejecución.

## P11
Mi predicción: Creo que si coloco el middleware 404 antes de las rutas, las peticiones no llegarán a las rutas correctas.
Lo que pasó: Al mover el bloque 404 al principio, la ruta de actividades también mostró el mensaje de ruta inexistente. Al devolverlo al final, las rutas volvieron a funcionar.
Por qué pasó: Express revisa las rutas y los middleware en el orden en que aparecen. El middleware 404 debe ir después de las rutas para responder solamente cuando ninguna coincide.

## P12

Mi predicción: Creo que al crear una ruta para mostrar las actividades gratuitas, aparecerán solamente las actividades cuyo precio sea cero.
Lo que pasó: Se agregó la ruta /actividades/gratis antes de /actividades/:id para mostrar las actividades gratuitas.
Por qué pasó: Se utilizó filter() para seleccionar las actividades con precio igual a cero. La ruta específica debe ir antes de la ruta que recibe un ID, para que Express no interprete la palabra gratis como un identificador.