# BRIXE — Landing page inmobiliaria

Primera versión de una página estática para captar compradores, arrendatarios y propietarios en Monterrey y San Pedro Garza García.

## Archivos

- `index.html`: página principal y formularios.
- `assets/styles.css`: diseño visual y adaptación móvil.
- `assets/app.js`: apertura de formularios y pasos.
- `aviso-de-privacidad.html`: plantilla inicial de privacidad.
- `gracias.html`: confirmación después de enviar.
- `netlify.toml`: configuración básica para Netlify.

## Datos que debes reemplazar antes de publicar

Busca dentro de `index.html`:

- `+52 81 0000 0000`
- `528100000000`
- `contacto@brixe.mx`
- Los enlaces `href="#"` de Instagram, Facebook y TikTok.

Dentro de `aviso-de-privacidad.html` reemplaza:

- `[NOMBRE COMPLETO DEL RESPONSABLE]`
- `[CORREO DE PRIVACIDAD]`

## Formularios en Netlify

Los formularios ya incluyen:

- `data-netlify="true"`
- Campo oculto `form-name`
- Honeypot antispam
- Redirección a `gracias.html`

Después de publicar el sitio en Netlify:

1. Entra al panel del sitio.
2. Abre **Forms**.
3. Confirma que aparecen:
   - `solicitud-comprador`
   - `solicitud-propietario`
4. Configura notificaciones por correo en Netlify.

## Google Sheets y WhatsApp

Netlify puede guardar y enviar alertas por correo directamente.

Para copiar automáticamente cada prospecto a Google Sheets o enviar una alerta de WhatsApp se necesita una automatización adicional mediante Make, n8n, Zapier o una función propia. No coloques credenciales privadas dentro de `app.js`.

## Publicación mediante GitHub

1. Crea un repositorio privado.
2. Sube todos los archivos conservando la estructura.
3. En Netlify selecciona **Add new site → Import an existing project**.
4. Conecta GitHub y selecciona el repositorio.
5. No necesitas comando de build.
6. El directorio de publicación es `.`

## Imagen principal

Las imágenes actuales se cargan desde Unsplash y funcionan como referencia visual. Conviene sustituirlas por fotografías o videos propios comprimidos antes del lanzamiento final.

## Prueba local

Puedes abrir `index.html` directamente. Para probar rutas y formularios localmente, utiliza una extensión como Live Server en Visual Studio Code.
