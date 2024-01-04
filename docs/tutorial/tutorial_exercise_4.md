---
title: "Creating DAO, Service and Controller"
layout: default
permalink: /tutorial/exercise4
nav_order: 4
parent: Tutorial
---

{% include base_path %}
{% include toc %}

# Crear el DAO, Servicio y Controlador
## Introducción
En este tutorial vamos a crear un backend para una aplicación de recursos humanos desde cero, incluyendo la base de 
datos. La interfaz no se realizará en este tutorial. Al final de este curso, como repaso, se recomienda crear una 
interfaz adecuada para esta aplicación con Ontimize Web, utilizando el tutorial de Ontimize Web de esta wiki. Este 
ejercicio está centrado en la creación desde cero de una tabla de base de datos, DAO, servicio y controlador para que
puedan ser consumidos a través de una petición REST.

## Lanzar la base de datos
Para lanzar la base de datos, es necesario hacer un "**Maven Install**" en el proyecto, para que cree un fichero \*._jar_
con el contenido del módulo hr-model y el lanzador de la base de datos pueda ser ejecutado por un lanzador Maven. Para
hacer esto, clic derecho sobre el icono de Maven <sup>1</sup>, clic en "_Execute Maven goal_" <sup>2</sup> y escribimos el
comando ```mvn install``` <sup>3</sup>. El recuadro rojo tiene que indicar ***Project***, lo que indica que este comando
se ejecutará a nivel del proyecto base y sobre cada uno de los módulos.

![tutorial_3.png]({{ base_path }}/assets/images/tutorial_3.png)

La salida de la consola de comandos debe mostrar un **BUILD SUCCESS**.

![tutorial_4.png]({{ base_path }}/assets/images/tutorial_4.png)

Una vez completada la instalación de Maven del proyecto padre, podremos crear un lanzador Maven para la base de datos. 
Clic derecho sobre el desplegable de los lanzadores <sup>1</sup> (en este caso, sobre el icono ▾) y selecionamos 
*Edit Configurations...*. En esta ventana, clic en *Add New Configuration* <sup>2</sup>, seleccionamos configuración de
*Maven* y rellenamos los datos como aparecen a continuación:
* **Name**: Run database (el nombre del lanzador)
* **Run**: exec:java (la instrucción Maven que se ejecutará)
* **Working directory**: hr-model (el módulo que ejecutará la instrucción)
* **Profiles**: run_database (el perfil que se añadirá a la ejecución de la instrucción)

![tutorial_5.png]({{ base_path }}/assets/images/tutorial_5.png)

Una vez terminado podemos darle a **OK** para guardar el lanzador y ya lo tendremos disponible de forma rápida en la 
parte de los lanzadores. Haciendo clic en el nombre del lanzador, podremos ejecutar la base de datos. En el futuro, 
cuando tengamos más lanzadores, podremos utilizar el menú desplegable para elegir que queremos ejecutar. Por el momento,
lanzaremos la base de datos, dándole al botón de inicio <sup>1</sup>.

![tutorial_6.png]({{ base_path }}/assets/images/tutorial_6.png)

La base de datos que se lanza tiene los siguientes parámetros de conexión:

{: .note-title}
> Parámetros de conexión
> 
> **Host**: localhost<br/>
> **Port**: 9013<br/>
> **Database**: templateDB<br/>
> **User**: SA<br/>
> **Password**: \<vacía\><br/>
> **JDBC URL**: jdbc:hsqldb:hsql://localhost:9013/templateDB

{: .note-title}
> Método de lanzamiento alternativo
>
> Se puede lanzar también si abrimos la ventana de "_Execute Maven goal_", especificamos el módulo sobre el que tenemos
> que ejecutar el comando Maven (en este caso, _hr-model_) y ejecutamos: 
> 
> ```mvn exec:java -Prun_database```
> 
> ![tutorial_7.png]({{ base_path }}/assets/images/tutorial_7.png)

## Crear una tabla de candidatos
Creamos la tabla de candidatos para nuestra aplicación de recursos humanos. Esta tabla contendrá múltiples columnas que
serán clave foránea de otras tablas, como puedan ser las columnas de _STATUS_ u _ORIGIN_.

Este es el código SQL para la creación de la tabla.

**Código SQL**
{% highlight sql %}
CREATE TABLE CANDIDATE (
    ID INTEGER IDENTITY PRIMARY KEY,
    PHOTO VARBINARY(16777216) NULL,
    NAME NVARCHAR(255) NULL,
    SURNAME NVARCHAR(255) NULL,
    BIRTHDAY DATE NULL,
    DNI NVARCHAR(255) NULL,
    PHONE NVARCHAR(255) NULL,
    EMAIL NVARCHAR(255) NULL,
    EDUCATION INTEGER NULL,
    SPECIALTIES NVARCHAR(255) NULL,
    STATUS INTEGER NULL,
    ORIGIN INTEGER NULL,
    WAGE_LEVEL NUMERIC NULL,
    EXPERIENCE_LEVEL INTEGER NULL,
    PROFILE INTEGER NULL,
    COMMENT NVARCHAR(255) NULL,
    LINKEDIN NVARCHAR(255) NULL
);
{% endhighlight %}

Insertaremos datos de prueba sólo en aquellas columnas que sean de tipo alfanumérico (recordemos que los elementos 
numéricos estarán enlazados como claves de otras tablas). Para realizar esta tarea podemos utilizar una herramienta de 
administración de bases de datos como por ejemplo [DBeaver](https://dbeaver.io/){:target="_blank"}.

**Código SQL**
{% highlight sql %}
INSERT INTO CANDIDATE (PHOTO,NAME,SURNAME,BIRTHDAY,DNI,PHONE,EMAIL,EDUCATION,SPECIALTIES,STATUS,ORIGIN,WAGE_LEVEL,EXPERIENCE_LEVEL,PROFILE,COMMENT,LINKEDIN) VALUES (
NULL, 'Nonnah', 'Baden', '1994-12-24', '71958681F', '591-646-5605', 'nbaden0@plala.or.jp', NULL, 'Erlang', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO CANDIDATE (PHOTO,NAME,SURNAME,BIRTHDAY,DNI,PHONE,EMAIL,EDUCATION,SPECIALTIES,STATUS,ORIGIN,WAGE_LEVEL,EXPERIENCE_LEVEL,PROFILE,COMMENT,LINKEDIN) VALUES (
NULL, 'Claiborn', 'Shawell', '1989-08-01', '28224678K', '909-780-3858', 'cshawell1@chron.com', NULL, 'JavaFX', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO CANDIDATE (PHOTO,NAME,SURNAME,BIRTHDAY,DNI,PHONE,EMAIL,EDUCATION,SPECIALTIES,STATUS,ORIGIN,WAGE_LEVEL,EXPERIENCE_LEVEL,PROFILE,COMMENT,LINKEDIN) VALUES (
NULL, 'Anne-marie', 'Frampton', '1985-12-17', '48230973L', '466-225-8193', 'aframpton2@addtoany.com', NULL, 'Matlab', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO CANDIDATE (PHOTO,NAME,SURNAME,BIRTHDAY,DNI,PHONE,EMAIL,EDUCATION,SPECIALTIES,STATUS,ORIGIN,WAGE_LEVEL,EXPERIENCE_LEVEL,PROFILE,COMMENT,LINKEDIN) VALUES (
NULL, 'Aron', 'Wiseman', '1981-09-08', '75760366E', '969-405-2922', 'awiseman3@google.com.br', NULL, 'Compliance', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO CANDIDATE (PHOTO,NAME,SURNAME,BIRTHDAY,DNI,PHONE,EMAIL,EDUCATION,SPECIALTIES,STATUS,ORIGIN,WAGE_LEVEL,EXPERIENCE_LEVEL,PROFILE,COMMENT,LINKEDIN) VALUES (
NULL, 'Hyatt', 'Faircley', '1977-05-25', '14709704P', '375-972-2164', 'hfaircley4@sbwire.com', NULL, 'Haskell', NULL, NULL, '45000', NULL, NULL, 'nulla pede ullamcorper augue a suscipit nulla elit ac nulla', NULL);
INSERT INTO CANDIDATE (PHOTO,NAME,SURNAME,BIRTHDAY,DNI,PHONE,EMAIL,EDUCATION,SPECIALTIES,STATUS,ORIGIN,WAGE_LEVEL,EXPERIENCE_LEVEL,PROFILE,COMMENT,LINKEDIN) VALUES (
NULL, 'Daune', 'Woolham', '1978-06-21', '50472212T', '675-891-2878', 'dwoolham5@stanford.edu', NULL, 'React', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO CANDIDATE (PHOTO,NAME,SURNAME,BIRTHDAY,DNI,PHONE,EMAIL,EDUCATION,SPECIALTIES,STATUS,ORIGIN,WAGE_LEVEL,EXPERIENCE_LEVEL,PROFILE,COMMENT,LINKEDIN) VALUES (
NULL, 'Kaila', 'Earwicker', '1988-04-26', '90445706T', '642-759-7346', 'kearwicker6@sogou.com', NULL, 'HTML5', NULL, NULL, '23000', NULL, NULL, 'ut ultrices vel augue vestibulum ante ipsum primis in faucibus', NULL);
INSERT INTO CANDIDATE (PHOTO,NAME,SURNAME,BIRTHDAY,DNI,PHONE,EMAIL,EDUCATION,SPECIALTIES,STATUS,ORIGIN,WAGE_LEVEL,EXPERIENCE_LEVEL,PROFILE,COMMENT,LINKEDIN) VALUES (
NULL, 'Felisha', 'Rahl', '1990-05-28', '76140170G', '712-914-9094', 'frahl7@ox.ac.uk', NULL, 'Docker', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO CANDIDATE (PHOTO,NAME,SURNAME,BIRTHDAY,DNI,PHONE,EMAIL,EDUCATION,SPECIALTIES,STATUS,ORIGIN,WAGE_LEVEL,EXPERIENCE_LEVEL,PROFILE,COMMENT,LINKEDIN) VALUES (
NULL, 'Charla', 'Note', '1981-11-27', '41685146S', '284-789-0755', 'cnote8@cafepress.com', NULL, 'MS Office', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO CANDIDATE (PHOTO,NAME,SURNAME,BIRTHDAY,DNI,PHONE,EMAIL,EDUCATION,SPECIALTIES,STATUS,ORIGIN,WAGE_LEVEL,EXPERIENCE_LEVEL,PROFILE,COMMENT,LINKEDIN) VALUES (
NULL, 'Candie', 'Ibert', '1978-09-24', '00273718H', '299-578-6249', 'cibert9@apple.com', NULL, 'Taxation', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO CANDIDATE (PHOTO,NAME,SURNAME,BIRTHDAY,DNI,PHONE,EMAIL,EDUCATION,SPECIALTIES,STATUS,ORIGIN,WAGE_LEVEL,EXPERIENCE_LEVEL,PROFILE,COMMENT,LINKEDIN) VALUES (
NULL, 'Kelcy', 'Lathleiffure', '1991-04-19', '73696168M', '890-133-5541', 'klathleiffurea@miibeian.gov.cn', NULL, 'Ruby', NULL, NULL, '33500', NULL, NULL, 'nulla sed accumsan felis ut at dolor quis odio consequat', NULL);
INSERT INTO CANDIDATE (PHOTO,NAME,SURNAME,BIRTHDAY,DNI,PHONE,EMAIL,EDUCATION,SPECIALTIES,STATUS,ORIGIN,WAGE_LEVEL,EXPERIENCE_LEVEL,PROFILE,COMMENT,LINKEDIN) VALUES (
NULL, 'Kaleena', 'Jonk', '1994-09-28', '76619635B', '956-957-8235', 'kjonkb@e-recht24.de', NULL, 'Design', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO CANDIDATE (PHOTO,NAME,SURNAME,BIRTHDAY,DNI,PHONE,EMAIL,EDUCATION,SPECIALTIES,STATUS,ORIGIN,WAGE_LEVEL,EXPERIENCE_LEVEL,PROFILE,COMMENT,LINKEDIN) VALUES (
NULL, 'Tami', 'Scorton', '1977-09-25', '12571372D', '599-466-8570', 'tscortonc@photobucket.com', NULL, 'Compliance', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO CANDIDATE (PHOTO,NAME,SURNAME,BIRTHDAY,DNI,PHONE,EMAIL,EDUCATION,SPECIALTIES,STATUS,ORIGIN,WAGE_LEVEL,EXPERIENCE_LEVEL,PROFILE,COMMENT,LINKEDIN) VALUES (
NULL, 'Davin', 'Frowde', '1984-03-06', '96529753H', '396-303-0612', 'dfrowded@webs.com', NULL, 'React', NULL, NULL, '22000', NULL, NULL, 'porta volutpat erat quisque erat eros viverra eget congue eget semper', NULL);
INSERT INTO CANDIDATE (PHOTO,NAME,SURNAME,BIRTHDAY,DNI,PHONE,EMAIL,EDUCATION,SPECIALTIES,STATUS,ORIGIN,WAGE_LEVEL,EXPERIENCE_LEVEL,PROFILE,COMMENT,LINKEDIN) VALUES (
NULL, 'Kial', 'Titlow', '1980-05-06', '27680562Q', '591-499-8814', 'ktitlowe@telegraph.co.uk', NULL, 'HTML5', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
{% endhighlight %}

## Creación de los ficheros DAO

Ahora que tenemos una tabla con datos de prueba en la base de datos, vamos a crear un DAO (Data Access Object) en el 
módulo de _hr-model_ para que sirva como modelo de esta tabla de la base de datos. Los DAO están compuestos por 2 
ficheros: un fichero con extensión *._xml_ y un fichero *._java_.

<div class="multicolumn">
    <button class="unstyle toggle-tree-btn">
        <div class="btn">Alternar árbol</div>
    </button>
    <div class="multicolumncontent">
        <div class="multicolumnleft">
            {{"En nuestro fichero *.xml indicaremos la tabla de la base de datos, desde donde recogemos la información, 
para la cual hacemos el DAO y el esquema al que pertenece la tabla." | markdownify }}
            {{"**CandidateDao.xml**" | markdownify }}
            {% highlight java %}
<?xml version="1.0" encoding="UTF-8"?>
<JdbcEntitySetup
        xmlns="http://www.ontimize.com/schema/jdbc"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.ontimize.com/schema/jdbc http://www.ontimize.com/schema/jdbc/ontimize-jdbc-dao.xsd"
        catalog="" schema="${mainschema}" table="CANDIDATE"
        datasource="mainDataSource" sqlhandler="dbSQLStatementHandler">
    <DeleteKeys>
        <Column>ID</Column>
    </DeleteKeys>
    <UpdateKeys>
        <Column>ID</Column>
    </UpdateKeys>
    <GeneratedKey>ID</GeneratedKey>
</JdbcEntitySetup>
{% endhighlight %}

{{"En el fichero *._java_ indicamos que se trata de un repositorio cuyo nombre será CandidateDao, mediante la anotación 
```@Repository```. Con la anotación ```@Lazy```, indicaremos que la carga se retrase hasta que sea completamente 
necesaria (mejorando de esa manera el rendimiento), y la anotación ```@ConfigurationFile``` nos permite configurar 
este DAO usando el fichero *._xml_ y un fichero adicional donde pueden almacenarse algunas características comunes a 
varios DAO, como el esquema al que pertenecen." | markdownify }}

{{"**CandidateDao.java**" | markdownify }}

{% highlight java %}
package com.ontimize.hr.model.core.dao;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;

@Repository("CandidateDao")
@Lazy
@ConfigurationFile(configurationFile = "dao/CandidateDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class CandidateDao extends OntimizeJdbcDaoSupport {

    public static final String ATTR_ID = "ID";
    public static final String ATTR_PHOTO = "PHOTO";
    public static final String ATTR_NAME = "NAME";
    public static final String ATTR_SURNAME = "SURNAME";
    public static final String ATTR_BIRTHDAY = "BIRTHDAY";
    public static final String ATTR_DNI = "DNI";
    public static final String ATTR_PHONE = "PHONE";
    public static final String ATTR_EMAIL = "EMAIL";
    public static final String ATTR_EDUCATION = "EDUCATION";
    public static final String ATTR_SPECIALTIES = "SPECIALTIES";
    public static final String ATTR_STATUS = "STATUS";
    public static final String ATTR_ORIGIN = "ORIGIN";
    public static final String ATTR_WAGE_LEVEL = "WAGE_LEVEL";
    public static final String ATTR_EXPERIENCE_LEVEL = "EXPERIENCE_LEVEL";
    public static final String ATTR_PROFILE = "PROFILE";
    public static final String ATTR_COMMENT = "COMMENT";
    public static final String ATTR_LINKEDIN = "LINKEDIN";
}
{% endhighlight %}
        </div>
        <div class="multicolumnright jstreeloader collapsed">
            <ul>
              <li data-jstree='{"opened":true, "icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
              hr
              <ul>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                hr-api
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                  src
                  <ul>
                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                    main
                    <ul>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                      java
                      <ul>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                        com
                        <ul>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                          ontimize
                          <ul>
                            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                            hr
                            <ul>
                              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                              api
                              <ul>
                                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                                core
                                <ul>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                                  service
                                  <ul>
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>IUserService.java</li>
                                  </ul>
                                  </li>
                                </ul>
                                </li>
                              </ul>
                              </li>
                            </ul>
                            </li>
                          </ul>
                          </li>
                        </ul>
                        </li>
                      </ul>
                      </li>
                    </ul>
                    </li>
                  </ul>
                  </li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                hr-boot
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                  src
                  <ul>
                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                    main
                    <ul>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                      java
                      <ul>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                        com
                        <ul>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                          ontimize
                          <ul>
                            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                            hr
                            <ul>
                              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ServerApplication.java</li>
                            </ul>
                            </li>
                          </ul>
                          </li>
                        </ul>
                        </li>
                      </ul>
                      </li>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                      resources
                      <ul>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>application.yml</li>
                      </ul>
                      </li>
                    </ul>
                    </li>
                  </ul>
                  </li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                hr-model
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                  src
                  <ul>
                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                    main
                    <ul>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                      db
                      <ul>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>templateDB.script</li>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>templateDB.txt</li>
                      </ul>
                      </li>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                      java
                      <ul>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                        com
                        <ul>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                          ontimize
                          <ul>
                            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                            hr
                            <ul>
                              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                              model
                              <ul>
                                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                                core
                                <ul>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                                  dao
                                  <ul>
                                    <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>CandidateDao.java</li>
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserDao.java</li>
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserRoleDao.java</li>
                                  </ul>
                                  </li>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                                  service
                                  <ul>
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserService.java</li>
                                  </ul>
                                  </li>
                                </ul>
                                </li>
                              </ul>
                              </li>
                            </ul>
                            </li>
                          </ul>
                          </li>
                        </ul>
                        </li>
                      </ul>
                      </li>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                      resources
                      <ul>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                        dao
                        <ul>
                          <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>CandidateDao.xml</li>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>placeholders.properties</li>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>RoleDao.xml</li>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>RoleServerPermissionDao.xml</li>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ServerPermissionDao.xml</li>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserDao.xml</li>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserRoleDao.xml</li>
                        </ul>
                        </li>
                      </ul>
                      </li>
                    </ul>
                    </li>
                  </ul>
                  </li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                hr-ws
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                  src
                  <ul>
                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                    main
                    <ul>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                      java
                      <ul>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                        com
                        <ul>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                          ontimize
                          <ul>
                            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                            hr
                            <ul>
                              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                              ws
                              <ul>
                                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                                core
                                <ul>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                                  rest
                                  <ul>
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MainRestController.java</li>
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>TestRestController.java</li>
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserRestController.java</li>
                                  </ul>
                                  </li>
                                </ul>
                                </li>
                              </ul>
                              </li>
                            </ul>
                            </li>
                          </ul>
                          </li>
                        </ul>
                        </li>
                      </ul>
                      </li>
                    </ul>
                    </li>
                  </ul>
                  </li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>.gitignore</li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Archetype_ontimize_boot.postman_collection.json</li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>README.md</li>
              </ul>
              </li>
            </ul>
        </div>
    </div>
</div>

## Creación de la interfaz del servicio

Con el DAO preparado, es necesario crear una interfaz pública para que sea implementada por un servicio. Esta interfaz
estará en el módulo hr-api, la cual tendrá, de momento, los métodos **CRUD** (**C**reate, **R**ead, **U**pdate, 
**D**elete) básicos para el DAO que se ha creado. Estos métodos tendrán una raíz común que decidiremos según el DAO al
que pertenezcan (en este caso, candidate) y un sufijo que dependerá de la acción que se vaya a realizar (**Query**, 
**Insert**, **Update**, **Delete**).

<div class="multicolumn">
    <button class="unstyle toggle-tree-btn">
        <div class="btn">Alternar árbol</div>
    </button>
    <div class="multicolumncontent">
        <div class="multicolumnleft">
{{"**ICandidateService.java**" | markdownify }}
{% highlight java %}
package com.ontimize.hr.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface ICandidateService {

    // CANDIDATE
    EntityResult candidateQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;

    EntityResult candidateInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;

    EntityResult candidateUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    EntityResult candidateDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
}
{% endhighlight %}
        </div>
        <div class="multicolumnright jstreeloader collapsed">
          <ul>
            <li data-jstree='{"opened":true, "icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
            hr
            <ul>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
              hr-api
              <ul>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                src
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                  main
                  <ul>
                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                    java
                    <ul>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                      com
                      <ul>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                        ontimize
                        <ul>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                          hr
                          <ul>
                            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                            api
                            <ul>
                              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                              core
                              <ul>
                                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                                service
                                <ul>
                                  <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ICandidateService.java</li>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>IUserService.java</li>
                                </ul>
                                </li>
                              </ul>
                              </li>
                            </ul>
                            </li>
                          </ul>
                          </li>
                        </ul>
                        </li>
                      </ul>
                      </li>
                    </ul>
                    </li>
                  </ul>
                  </li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
              </ul>
              </li>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
              hr-boot
              <ul>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                src
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                  main
                  <ul>
                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                    java
                    <ul>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                      com
                      <ul>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                        ontimize
                        <ul>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                          hr
                          <ul>
                            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ServerApplication.java</li>
                          </ul>
                          </li>
                        </ul>
                        </li>
                      </ul>
                      </li>
                    </ul>
                    </li>
                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                    resources
                    <ul>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>application.yml</li>
                    </ul>
                    </li>
                  </ul>
                  </li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
              </ul>
              </li>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
              hr-model
              <ul>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                src
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                  main
                  <ul>
                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                    db
                    <ul>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>templateDB.script</li>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>templateDB.txt</li>
                    </ul>
                    </li>
                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                    java
                    <ul>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                      com
                      <ul>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                        ontimize
                        <ul>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                          hr
                          <ul>
                            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                            model
                            <ul>
                              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                              core
                              <ul>
                                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                                dao
                                <ul>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>CandidateDao.java</li>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserDao.java</li>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserRoleDao.java</li>
                                </ul>
                                </li>
                                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                                service
                                <ul>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserService.java</li>
                                </ul>
                                </li>
                              </ul>
                              </li>
                            </ul>
                            </li>
                          </ul>
                          </li>
                        </ul>
                        </li>
                      </ul>
                      </li>
                    </ul>
                    </li>
                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                    resources
                    <ul>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                      dao
                      <ul>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>CandidateDao.xml</li>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>placeholders.properties</li>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>RoleDao.xml</li>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>RoleServerPermissionDao.xml</li>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ServerPermissionDao.xml</li>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserDao.xml</li>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserRoleDao.xml</li>
                      </ul>
                      </li>
                    </ul>
                    </li>
                  </ul>
                  </li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
              </ul>
              </li>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
              hr-ws
              <ul>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                src
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                  main
                  <ul>
                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                    java
                    <ul>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                      com
                      <ul>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                        ontimize
                        <ul>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                          hr
                          <ul>
                            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                            ws
                            <ul>
                              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                              core
                              <ul>
                                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                                rest
                                <ul>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MainRestController.java</li>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>TestRestController.java</li>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserRestController.java</li>
                                </ul>
                                </li>
                              </ul>
                              </li>
                            </ul>
                            </li>
                          </ul>
                          </li>
                        </ul>
                        </li>
                      </ul>
                      </li>
                    </ul>
                    </li>
                  </ul>
                  </li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
              </ul>
              </li>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>.gitignore</li>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Archetype_ontimize_boot.postman_collection.json</li>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>README.md</li>
            </ul>
            </li>
          </ul>
        </div>
    </div>
</div>

## Creación del servicio

A continuación, debemos crear un servicio que implemente la interfaz que hemos creado. En este caso, estará ubicada 
en _hr-model_, dentro del paquete _service_. Esta clase tendrá la anotación ```@Service``` con el valor _Candidate_, 
para indicar que se trata del servicio de candidatos, y la anotación ```@Lazy```, que permite que los servicios se 
inicien cuando son requeridos y no durante el arranque. Para el empleo de los DAO, deberán llevar la anotación 
```@Autowired```, que permite que los DAO se enlacen correctamente a las variables donde las hemos definido, evitando 
el uso de métodos _getter_ y _setter_.

<div class="multicolumn">
    <button class="unstyle toggle-tree-btn">
        <div class="btn">Alternar árbol</div>
    </button>
    <div class="multicolumncontent">
        <div class="multicolumnleft">
{{"**CandidateService.java**" | markdownify }}
{% highlight java %}
package com.ontimize.hr.model.core.service;

import com.ontimize.hr.api.core.service.ICandidateService;
import com.ontimize.hr.model.core.dao.CandidateDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("CandidateService")
@Lazy
public class CandidateService implements ICandidateService {

    @Autowired
    private CandidateDao candidateDao;
    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Override
    public EntityResult candidateQuery(Map<String, Object> keyMap, List<String> attrList)
            throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.candidateDao, keyMap, attrList);
    }

    @Override
    public EntityResult candidateInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.candidateDao, attrMap);
    }

    @Override
    public EntityResult candidateUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap)
            throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.candidateDao, attrMap, keyMap);
    }

    @Override
    public EntityResult candidateDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.candidateDao, keyMap);
    }

}
{% endhighlight %}
        </div>
        <div class="multicolumnright jstreeloader collapsed">
          <ul>
            <li data-jstree='{"opened":true, "icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
            hr
            <ul>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
              hr-api
              <ul>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                src
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                  main
                  <ul>
                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                    java
                    <ul>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                      com
                      <ul>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                        ontimize
                        <ul>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                          hr
                          <ul>
                            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                            api
                            <ul>
                              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                              core
                              <ul>
                                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                                service
                                <ul>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ICandidateService.java</li>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>IUserService.java</li>
                                </ul>
                                </li>
                              </ul>
                              </li>
                            </ul>
                            </li>
                          </ul>
                          </li>
                        </ul>
                        </li>
                      </ul>
                      </li>
                    </ul>
                    </li>
                  </ul>
                  </li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
              </ul>
              </li>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
              hr-boot
              <ul>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                src
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                  main
                  <ul>
                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                    java
                    <ul>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                      com
                      <ul>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                        ontimize
                        <ul>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                          hr
                          <ul>
                            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ServerApplication.java</li>
                          </ul>
                          </li>
                        </ul>
                        </li>
                      </ul>
                      </li>
                    </ul>
                    </li>
                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                    resources
                    <ul>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>application.yml</li>
                    </ul>
                    </li>
                  </ul>
                  </li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
              </ul>
              </li>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
              hr-model
              <ul>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                src
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                  main
                  <ul>
                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                    db
                    <ul>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>templateDB.script</li>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>templateDB.txt</li>
                    </ul>
                    </li>
                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                    java
                    <ul>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                      com
                      <ul>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                        ontimize
                        <ul>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                          hr
                          <ul>
                            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                            model
                            <ul>
                              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                              core
                              <ul>
                                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                                dao
                                <ul>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>CandidateDao.java</li>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserDao.java</li>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserRoleDao.java</li>
                                </ul>
                                </li>
                                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                                service
                                <ul>
                                  <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>CandidateService.java</li>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserService.java</li>
                                </ul>
                                </li>
                              </ul>
                              </li>
                            </ul>
                            </li>
                          </ul>
                          </li>
                        </ul>
                        </li>
                      </ul>
                      </li>
                    </ul>
                    </li>
                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                    resources
                    <ul>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                      dao
                      <ul>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>CandidateDao.xml</li>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>placeholders.properties</li>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>RoleDao.xml</li>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>RoleServerPermissionDao.xml</li>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ServerPermissionDao.xml</li>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserDao.xml</li>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserRoleDao.xml</li>
                      </ul>
                      </li>
                    </ul>
                    </li>
                  </ul>
                  </li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
              </ul>
              </li>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
              hr-ws
              <ul>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                src
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                  main
                  <ul>
                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                    java
                    <ul>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                      com
                      <ul>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                        ontimize
                        <ul>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                          hr
                          <ul>
                            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                            ws
                            <ul>
                              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                              core
                              <ul>
                                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                                rest
                                <ul>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MainRestController.java</li>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>TestRestController.java</li>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserRestController.java</li>
                                </ul>
                                </li>
                              </ul>
                              </li>
                            </ul>
                            </li>
                          </ul>
                          </li>
                        </ul>
                        </li>
                      </ul>
                      </li>
                    </ul>
                    </li>
                  </ul>
                  </li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
              </ul>
              </li>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>.gitignore</li>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Archetype_ontimize_boot.postman_collection.json</li>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>README.md</li>
            </ul>
            </li>
          </ul>
        </div>
    </div>
</div>

## Creación del controlador

Una vez tengamos el DAO creado, su interfaz y el servicio que implemente dicha interfaz, crearemos el controlador REST
para que responda a las peticiones que reciba el servidor. Los controladores se ubicarán en el módulo _hr-ws_.

<div class="multicolumn">
    <button class="unstyle toggle-tree-btn">
        <div class="btn">Alternar árbol</div>
    </button>
    <div class="multicolumncontent">
        <div class="multicolumnleft">
{{"La anotación ```@RestController``` indica que esta clase trabaja como un controlador, que responderá a las peticiones 
cuya URL tenga el _path_ indicado en la anotación ```@RequestMapping``` (en este caso, _candidates_)." | markdownify }}
{{"**CandidateRestController.java**" | markdownify }}
{% highlight java %}
package com.ontimize.hr.ws.core.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ontimize.hr.api.core.service.ICandidateService;
import com.ontimize.jee.server.rest.ORestController;

@RestController
@RequestMapping("/candidates")
public class CandidateRestController extends ORestController<ICandidateService> {

    @Autowired
    private ICandidateService candidateService;

    @Override
    public ICandidateService getService() {
        return this.candidateService;
    }
}
{% endhighlight %}
</div>
<div class="multicolumnright jstreeloader collapsed">
<ul>
<li data-jstree='{"opened":true, "icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
hr
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
hr-api
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
src
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
main
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
java
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
com
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
ontimize
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
hr
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
api
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
core
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
service
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ICandidateService.java</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>IUserService.java</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
</ul>
</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
hr-boot
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
src
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
main
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
java
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
com
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
ontimize
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
hr
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ServerApplication.java</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
resources
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>application.yml</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
</ul>
</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
hr-model
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
src
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
main
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
db
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>templateDB.script</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>templateDB.txt</li>
</ul>
</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
java
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
com
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
ontimize
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
hr
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
model
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
core
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
dao
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>CandidateDao.java</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserDao.java</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserRoleDao.java</li>
</ul>
</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
service
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>CandidateService.java</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserService.java</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
resources
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
dao
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>CandidateDao.xml</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>placeholders.properties</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>RoleDao.xml</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>RoleServerPermissionDao.xml</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ServerPermissionDao.xml</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserDao.xml</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserRoleDao.xml</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
</ul>
</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
hr-ws
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
src
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
main
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
java
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
com
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
ontimize
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
hr
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
ws
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
core
<ul>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
rest
<ul>
<li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>CandidateRestController.java</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MainRestController.java</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>TestRestController.java</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserRestController.java</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
</ul>
</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>.gitignore</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Archetype_ontimize_boot.postman_collection.json</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
<li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>README.md</li>
</ul>
</li>
</ul>
</div>
</div>
</div>

Ahora ya podemos utilizar una aplicación como [Postman](https://www.postman.com/){:target="_blank"} para ejecutar diferentes peticiones REST a nuestro proyecto.

## Lanzar la Aplicación

Para lanzar la aplicación, tenemos 2 formas diferentes de hacerlo, la primera mediante Maven y la segunda a través del
código de la aplicación (recomendado).

### Maven
Abrimos nuevamente la ventana de _Edit Configurations..._ y añadimos una configuración nueva. 

![tutorial_8.png]({{ base_path }}/assets/images/tutorial_8.png)

Para lanzar la aplicación, procederemos de la misma forma que para lanzar la base de datos.

{: .note-title}
> Método de lanzamiento alternativo
>
> Se puede lanzar también si abrimos la ventana de "_Execute Maven goal_", especificamos el módulo sobre el que tenemos
> que ejecutar el comando Maven (en este caso, _hr-boot_) y ejecutamos:
>
> ```mvn spring-boot:run```
>
> ![tutorial_9.png]({{ base_path }}/assets/images/tutorial_9.png)

### Código de la aplicación (Recomendado)
<div class="multicolumn">
    <button class="unstyle toggle-tree-btn">
        <div class="btn">Alternar árbol</div>
    </button>
    <div class="multicolumncontent">
        <div class="multicolumnleft">
{{"Buscamos la clase **ServerApplication.java** que se encuentra dentro del módulo **hr-boot** y en el método _main_
hacemos clic en el triángulo verde y a continuación, clic en _Debug 'ServerAplplicat....main()_. Esto permitirá lanzar
el código en modo _Debug_, útil para seguir las instrucciones que se van ejecutando para poder detectar la solución de
posibles errores que se produzcan." | markdownify }}
{{"![Launch in debug](https://i.imgur.com/92VUWTI.gif)" | markdownify }} 
        </div>
        <div class="multicolumnright jstreeloader collapsed">
          <ul>
            <li data-jstree='{"opened":true, "icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
            hr
            <ul>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
              hr-api
              <ul>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                src
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                  main
                  <ul>
                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                    java
                    <ul>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                      com
                      <ul>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                        ontimize
                        <ul>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                          hr
                          <ul>
                            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                            api
                            <ul>
                              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                              core
                              <ul>
                                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                                service
                                <ul>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ICandidateService.java</li>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>IUserService.java</li>
                                </ul>
                                </li>
                              </ul>
                              </li>
                            </ul>
                            </li>
                          </ul>
                          </li>
                        </ul>
                        </li>
                      </ul>
                      </li>
                    </ul>
                    </li>
                  </ul>
                  </li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
              </ul>
              </li>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
              hr-boot
              <ul>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                src
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                  main
                  <ul>
                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                    java
                    <ul>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                      com
                      <ul>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                        ontimize
                        <ul>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                          hr
                          <ul>
                            <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ServerApplication.java</li>
                          </ul>
                          </li>
                        </ul>
                        </li>
                      </ul>
                      </li>
                    </ul>
                    </li>
                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                    resources
                    <ul>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>application.yml</li>
                    </ul>
                    </li>
                  </ul>
                  </li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
              </ul>
              </li>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
              hr-model
              <ul>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                src
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                  main
                  <ul>
                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                    db
                    <ul>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>templateDB.script</li>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>templateDB.txt</li>
                    </ul>
                    </li>
                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                    java
                    <ul>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                      com
                      <ul>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                        ontimize
                        <ul>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                          hr
                          <ul>
                            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                            model
                            <ul>
                              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                              core
                              <ul>
                                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                                dao
                                <ul>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>CandidateDao.java</li>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserDao.java</li>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserRoleDao.java</li>
                                </ul>
                                </li>
                                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                                service
                                <ul>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>CandidateService.java</li>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserService.java</li>
                                </ul>
                                </li>
                              </ul>
                              </li>
                            </ul>
                            </li>
                          </ul>
                          </li>
                        </ul>
                        </li>
                      </ul>
                      </li>
                    </ul>
                    </li>
                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                    resources
                    <ul>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                      dao
                      <ul>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>CandidateDao.xml</li>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>placeholders.properties</li>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>RoleDao.xml</li>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>RoleServerPermissionDao.xml</li>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ServerPermissionDao.xml</li>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserDao.xml</li>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserRoleDao.xml</li>
                      </ul>
                      </li>
                    </ul>
                    </li>
                  </ul>
                  </li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
              </ul>
              </li>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
              hr-ws
              <ul>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                src
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                  main
                  <ul>
                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                    java
                    <ul>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                      com
                      <ul>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                        ontimize
                        <ul>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                          hr
                          <ul>
                            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                            ws
                            <ul>
                              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                              core
                              <ul>
                                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                                rest
                                <ul>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>CandidateRestController.java</li>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MainRestController.java</li>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>TestRestController.java</li>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserRestController.java</li>
                                </ul>
                                </li>
                              </ul>
                              </li>
                            </ul>
                            </li>
                          </ul>
                          </li>
                        </ul>
                        </li>
                      </ul>
                      </li>
                    </ul>
                    </li>
                  </ul>
                  </li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
              </ul>
              </li>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>.gitignore</li>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Archetype_ontimize_boot.postman_collection.json</li>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>README.md</li>
            </ul>
            </li>
          </ul>
        </div>
    </div>
</div>


## Usar las peticiones REST

Las peticiones contienen la siguiente estructura:

<span style="color: rgb(204, 0, 0); font-size: 18px;">localhost:33333</span><span style="color: rgb(103, 78, 167);
font-size: 18px;">/candidates</span><span style="color: rgb(51, 51, 51); font-size: 18px;">/candidate</span>

| Elemento                                                                     | Significado                                                                                                                                                                                        |
|------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span style="color: rgb(204, 0, 0); font-size: 18px;">localhost:33333</span> | Indica el host                                                                                                                                                                                     |
| <span style="color: rgb(103, 78, 167); font-size: 18px;">/candidates</span>  | Indica el controlador que se va a consultar                                                                                                                                                        |
| <span style="color: rgb(51, 51, 51); font-size: 18px;">/candidate</span>     | Indica el método de la interfaz del controlador al que accederá ese servicio (este método está implementado en el servicio, y no tiene los sufijos **Query**, **Insert**, **Update**, **Delete**)  |

Los tipos de peticiones sólo pueden ser: **GET**, **POST**, **PUT**, **DELETE**.

A continuación, se muestran ejemplos de peticiones para los candidatos (**CANDIDATES**).

La autorización que se usa para estas peticiones es de tipo **BASIC**, cuyas credenciales son **demo** como usuario
y **demouser** como contraseña.

<table>
  <thead>
    <tr>
      <th>Tipo petición</th>
      <th>Tipo de consulta</th>
      <th>Petición</th>
      <th>Método del servicio</th>
      <th>Cuerpo petición</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>GET</th>
      <td>query</td>
      <td>localhost:33333/candidates/candidate?columns=ID,NAME,SURNAME</td>
      <td>candidateQuery</td>
      <td>No tiene cuerpo de petición porque es de tipo GET</td>
    </tr>
    <tr>
      <th rowspan="2">POST</th>
      <td>query</td>
      <td>localhost:33333/candidates/candidate/search</td>
      <td>candidateQuery</td>
      <td>
{% highlight json %}
{
    "filter": {
     "ID": 0
    },
    "columns": ["ID","NAME","SURNAME","BIRTHDAY","DNI","PHONE","EMAIL","EDUCATION",
                "SPECIALTIES","STATUS","ORIGIN","WAGE_LEVEL","EXPERIENCE_LEVEL",
                "PROFILE","COMMENT","LINKEDIN"]
}
{% endhighlight %}
</td>
    </tr>
    <tr>
      <td>insert</td>
      <td>localhost:33333/candidates/candidate</td>
      <td>candidateInsert</td>
      <td>
{% highlight json %}
{
    "data": {
        "PHONE": "555-444-8888",
        "BIRTHDAY": 788224700000,
        "SURNAME": "Wilson",
        "EMAIL": "wwiilsoon@example.org",
        "SPECIALTIES": "C#",
        "NAME": "William",
        "DNI": "88643946Z"
    },
    "sqltypes": {
        "SPECIALTIES": 12,
        "LINKEDIN": 12,
        "PHONE": 12,
        "EXPERIENCE_LEVEL": 4,
        "STATUS": 4,
        "EMAIL": 12,
        "WAGE_LEVEL": 2,
        "DNI": 12,
        "ID": 4,
        "ORIGIN": 4,
        "EDUCATION": 4,
        "COMMENT": 12,
        "PROFILE": 4,
        "SURNAME": 12,
        "NAME": 12,
        "BIRTHDAY": 91
    }
}
{% endhighlight %}
</td>
    </tr>
    <tr>
      <th>PUT</th>
      <td>update</td>
      <td>localhost:33333/candidates/candidate</td>
      <td>candidateUpdate</td>
      <td>
{% highlight json %}
{
 "filter" :{
  "ID" :15
 },
    "data": {
        "EMAIL": "wwilson@example.org"
    },
    "sqltypes": {
        "SPECIALTIES": 12,
        "LINKEDIN": 12,
        "PHONE": 12,
        "EXPERIENCE_LEVEL": 4,
        "STATUS": 4,
        "EMAIL": 12,
        "WAGE_LEVEL": 2,
        "DNI": 12,
        "ID": 4,
        "ORIGIN": 4,
        "EDUCATION": 4,
        "COMMENT": 12,
        "PROFILE": 4,
        "SURNAME": 12,
        "NAME": 12,
        "BIRTHDAY": 91
    }
}
{% endhighlight %}
</td>
    </tr>
    <tr>
      <th>DELETE</th>
      <td>delete</td>
      <td>localhost:33333/candidates/candidate</td>
      <td>candidateDelete</td>
      <td>
{% highlight json %}
{
    "filter": {
        "ID": 15
    }
}
{% endhighlight %}
</td>
    </tr>
  </tbody>
</table>

[← Tutorial anterior]({{ base_path }}/tutorial/exercise3)
[Próximo tutorial →]({{ base_path }}/tutorial/exercise5)
