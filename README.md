# WhatsApp send message

Envío de mensaje automático por medio de WhatsApp. Cuenta con respuestas a la resepción de mensaje "Hola" y "Archivo"

## Librería
* ** whatsapp-web.js
  * Se utiliza la misma para realizar los eventos correspondientes
* ** Repositorio
  * https://github.com/pedroslopez/whatsapp-web.js/

## Desarrollo del sistema
* **Aplicación**
  * Node JS
  
## Instrucciones de uso
* 1.- Una vez instalado todas las dependencias, inicie el sistema por consola "node app.js".
* 2.- Escanne el código QR que se generará. 
* 3.- Una vez conectado ya podrá realizar los eventos de mensajería.
  * **En caso de que se desconecte, quedará almacenado la sesión en un archivo .json que se creará en tiempo de ejecución.
* 4.- Realice el envío de mensaje desde un mensajero distinto hacia el Movil que fue conectado para activar las respuesta automática 

## Aviso
* Las pruebas de la aplicación no arrojaron error alguno. Sin embargo, se recomienda informarse sobre los eventos del tipo Both sobre la misma, ya que no es una API oficial de WhatsApp y puede que quede expuesto a la baja de la cuenta en su Movil.
* El uso de la APP queda bajo responsabilidad del usuario.