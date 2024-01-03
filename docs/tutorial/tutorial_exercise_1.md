---
title: "Preparing base project"
layout: default
permalink: /tutorial/exercise1
nav_order: 1
parent: Tutorial
---

{% include base_path %}
{% include toc %}

# Preparando el proyecto base
## Prerrequisitos
Para poder desarrollar este tutorial, debemos tener instalados en nuestro ordenador los elementos que se detallan en la página de [prerrequisitos]({{ base_path }}/prerequisites/)
## ¿Qué es Ontimize Boot?
Ontimize Boot es un framework que permite simplificar la configuración de un proyecto hecho con Ontimize EE, de una forma rápida y eficiente, reduciendo la necesidad de
utilizar un Tomcat externo y centralizando toda la configuración de la aplicación en un solo fichero *.yml.
## Crea una aplicación a partir del arquetipo
* Para crear una aplicación a través el arquetipo, abrimos una terminal en nuestro equipo, en la ruta donde queramos ubicar el proyecto y ejecutamos el siguiente comando de Maven:
 
  ```bash
    mvn archetype:generate -DgroupId=com.ontimize -DartifactId=hr -Dversion=1.0.0-SNAPSHOT -Dpackage=com.ontimize.hr -DarchetypeGroupId=com.ontimize -DarchetypeArtifactId=ontimize-boot-backend-archetype -DarchetypeVersion=1.0.9 -DinteractiveMode=false
  ```

{: .note}
> Comprueba que la version del parámetro ```-DarchetypeVersion``` es la última versión disponible, en este caso, la versión: [![Ontimize Boot Archetype](https://img.shields.io/maven-central/v/com.ontimize/ontimize-boot-backend-archetype?label=)](https://maven-badges.herokuapp.com/maven-central/com.ontimize/ontimize-boot-backend-archetype)

 
## Importar como un proyecto Maven 
Abrimos nuestro IDE (en este caso, utilizaremos IntelliJ) y le damos a la opción de abrir un nuevo proyecto, seleccionamos la carpeta en la misma ruta donde hemos ejecutado
el comando de Maven, luego la carpeta hr (la carpeta del proyecto es la misma que el valor del atributo ```-DartifactId``` del comando Maven)

![tutorial_1.png]({{ base_path }}/assets/images/tutorial_1.png)

Una vez que la importación haya sido completada, el proyecto está listo para empezar a desarrollar la aplicación.

![tutorial_2.png]({{ base_path }}/assets/images/tutorial_2.png)

[Próximo tutorial]({{ base_path }}/tutorial/exercise2)