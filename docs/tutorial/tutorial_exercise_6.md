---
title: "Understanding the EntityResult"
layout: default
permalink: /tutorial/exercise6
nav_order: 6
parent: Tutorial
---

{% include base_path %}
{% include toc %}

# Entendiendo el EntityResult
## Introducción
En este ejercicio veremos la estructura con la que devuelve Ontimize Boot la respuesta de las peticiones que se le 
hagan, y como podemos nosotros trabajar con ella, además de los diferentes métodos que tiene para obtener y manejar 
la información.

## EntityResult
El EntityResult es una interfaz actualmente implementada por la clase EntityResultMapImpl que además implementa la 
interfaz [Map](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Map.html){:target="_blank"}, 
permitiendo almacenar el resultado de las consultas generadas contra la base de datos.

![tutorial_11.png]({{ base_path }}/assets/images/tutorial_11.png)

Según la imagen superior, podemos comprobar que esta representación es un mapa de claves-valores, siendo las claves las
columnas que ha consultado/obtenido de la BD y los valores una lista con los datos de todos los registros que ha 
obtenido en dicha consulta. La posición de los elementos dentro de la lista, indica los valores de los registros que 
se han obtenido. De esta manera, todos los elementos situados en la posición 0 de la lista corresponderán al primer 
registro que se ha devuelto desde la BD, los valores en la posición 1, los del registro número 2 y así sucesivamente.

## Métodos propios

Además de los métodos heredados de la clase Hashtable, la clase EntityResult cuenta también con sus propios métodos:

<table>
    <thead>
        <tr>
            <th>Método</th>
            <th>Descripción</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>int calculateRecordNumber()</td>
            <td>Devuelve el número de registros que contiene el EntityResult. Si el resultado es 0, significa que el EntityResult está vacío y no ha traído registros de la BD</td>
        </tr>
        <tr>
            <td>Map getRecordValues(int i)</td>
            <td>Devuelve un Hashmap con el registro en la posición i que se le ha pasado por parámetro. Como clave tendrá el nombre de la columna y como valor tendrá el valor de dicho registro para esa columna</td>
        </tr>
        <tr>
            <td>int getRecordIndex(Map kv)</td>
            <td>Devuelve el índice del registro que cumpla las condiciones establecidas por el HashMap pasado como parámetro</td>
        </tr>
        <tr>
            <td>addRecord(Map data)</td>
            <td rowspan="2">Añade el HashMap pasado como parámetro al EntityResult como último valor. En caso de querer insertarlo en una posición específica, se indicará la posición como segundo parámetro. Para que el EntityResult sea correcto, necesita que todos las listas que contengan sean del mismo tamaño, por lo que si queremos añadir una columna cuyo valor sea null al EntityResult, nuestro Hashmap tiene que contener como clave la columna que tendrá valor null y como valor una instancia del objeto NullValue. Esto es debido a que los Hashmap no pueden tener elementos null como valor.</td>
        </tr>
        <tr>
            <td>addRecord(Map data, int s)</td>
        </tr>
        <tr>
            <td>setCode(int operationCode)</td>
            <td>
{{"Establece el código de operación del EntityResult. Cuando un EntityResult llega al servidor, puede tener 3 códigos de operación:

* **OPERATION_SUCCESSFUL**: La operación ha sido realizada de manera correcta
* **OPERATION_SUCCESSFUL_SHOW_MESSAGE**: La operación ha sido realizada de manera correcta, y contiene un mensaje específico
* **OPERATION_WRONG**: La operación ha sido incorrecta y ha dado un error" | markdownify }}
</td>
        </tr>
        <tr>
            <td>int getCode()</td>
            <td>{{"Devuelve el código de la operación:

* **OPERATION_SUCCESSFUL**: 0
* **OPERATION_SUCCESSFUL_SHOW_MESSAGE**: 2
* **OPERATION_WRONG**: 1" | markdownify }}</td>
        </tr>
        <tr>
            <td>setMessage(String message)</td>
            <td>Añade un mensaje al EntityResult</td>
        </tr>
        <tr>
            <td>String getMessage()</td>
            <td>Recupera el mensaje que contenga el EntityResult</td>
        </tr>
    </tbody>
</table>

[← Tutorial anterior]({{ base_path }}/tutorial/exercise5)
[Próximo tutorial →]({{ base_path }}/tutorial/exercise7)