# api-rest

# Arquitecturas Web
# Especialización en Ingeniería de Software
# Universidad Autónoma de Manizales

# Andres Fernando Jimenez / Andres Felipe Pinto


Construir un API REST con NodeJS y MongoDB que permita resolver los siguientes requerimientos.


-El sistema debe permitir la creación, edición, listado y remoción de agentes de tránsito.
-Los agentes de tránsito deben poder realizar la creación, edición, listado y remoción de vehículos.
-Los agentes de tránsito deben poder crear comparendos a un vehículo en particular.
-Los agentes de tránsito deben poder verificar el estado de un vehículo, listando los comparendos asignados a este en particular y determinando el estado de cada uno de ellos, si se encuentra "pago" o "pendiente de pago" (mostrar su valor).
-El sistema debe permitir el pago de los comparendos.
-De un agente de tránsito se conoce su cédula, nombres, apellidos, teléfono y correo electrónico.
-De un vehículo se conoce su placa, marca, modelo y color.
-De un comparendo se conoce el tipo de comparendo, el vehículo al cual fue aplicado, el agente que lo puso y la fecha/hora del momento en que fue puesto.
-Del pago del comparendo se conoce la fecha/hora en la que fue realizado.
-El valor del comparendo depende de su tipo, el cual se muestra en la tabla a continuación.


# Paso a instalación / Ejecución de la APi

Funcionamiento del Desarrollo API REST

1- Clonamos el repositorio del siguiente link: https://github.com/andres25-20/api-rest

2- Abrimos la carpeta del desarrollo y en el terminal ejecutamos los siguientes comandos en el mismo orden.

	-npm install express sqlite3
	-node app.js
