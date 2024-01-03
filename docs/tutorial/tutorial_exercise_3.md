---
title: "Understanding the application.yml file"
layout: default
permalink: /tutorial/exercise3
nav_order: 3
parent: Tutorial
---

{% include base_path %}
{% include toc %}

# Entendiendo el fichero application.yml
## Introducción
Un fichero [YAML](https://wikipedia.org/wiki/YAML){:target="_blank"}, de extensión *.**yml** ó *.**yaml**, es un fichero con una interpretación sencilla en el que podemos escribir pares de datos de
manera adecuada mediante combinaciones de listas, mapas y datos simples. Otra de las características más importantes de estos ficheros es la indentación. Es importante escribir
estos elementos indentados correctamente, dado que de estar mal indentado, no se podrá parsear correctamente.

## Descripción del fichero application.yml

<div class="multicolumn">
    <button class="unstyle toggle-tree-btn">
        <div class="btn">Alternar árbol</div>
    </button>
    <div class="multicolumncontent">
        <div class="multicolumnleft">
        {{ "**application.yml**" | markdownify}}
        {% highlight yaml%}
endpoints:
   api:
      # Endpoints de Spring Boot activos
      enabled: true
logging:
   level:
      # Nivel de log por defecto del servidro establecido al nivel de INFO
      root: info
ontimize:
   corsfilter:
      # Habilitado los filtros de CORS
      enabled: true
   globalcors:
      # Configuración global de CORS
      cors-configurations:
         '[/**]':
            # Permitir diferentes orígenes
            allowed-origins: "*"
            # Permitir cabeceras
            allowed-headers: "*"
            # Cabeceras expuestas
            exposed-headers: ["X-Auth-Token","Content-disposition","X-Requested-With"]
            # Métodos HTTP permitidos
            allowed-methods:
            - GET
            - POST
            - PUT
            - OPTIONS
            - DELETE
   jdbc:
      # Convención de nombre de columnas
      name-convention: upper
      # Handler de SQL
      sqlhandler: hsqldb
      sql-condition-processor:
         # Uso de mayúsculas
         uppper-string: true
         # Comparación de cadenas en caso de condición LIKE en mayúscula
         upper-like: true
   security:
      # Modo de seguridad por defecto
      mode: default
      # Rutas a ignorar la seguridad
      ignore-paths: /app/**
      # Configurar las columnas del rol de usuario
      role-information-service:
         # Repositorio que almacenan los roles
         role-repository: UserRoleDao
         #Nombre de la columnas que tiene el nombre del rol
         role-name-column: ROLENAME
         #Identificador de la query para la consulta de permisos en el servidor
         server-permission-query-id: serverPermissions
         #Nombre de la columna que contiene el nombre del permiso
         server-permission-name-column: PERMISSION_NAME
         #Identificador de la query para la consulta de permisos en el cliente
         client-permission-query-id: clientPermissions
         #Nombre de la columna que contiene los permisos del cliente
         client-permission-column: XMLCLIENTPERMISSION
      # Información sobre el usuario
      user-information-service:
         #Repositorio que almacena los usuarios de la aplicación
         user-repository: UserDao
         # Nombre de la columna con el nombre de usuario
         user-login-column: USER_
         # Nombre de la columnas con la contraseña
         user-password-column: PASSWORD
         # Indentificador de la query para iniciar sesión
         query-id: login
         # Otras columnas de consulta
         other-data:
            - NAME
            - SURNAME
            - EMAIL
            - NIF
            - USERBLOCKED
            - LASTPASSWORDUPDATE
            - FIRSTLOGIN
      #Información sobre el repositorio que enlaza usuarios y roles
      user-role-information-service:
         # Nombre del repositorio
         user-role-repository: UserRoleDao
         # Identificador de la consulta
         query-id: userRole
         # Columna que almacena al usuario
         role-login-column: USER_
         # Columna que almacena el nombre del rol
         role-name-column: ROLENAME
server:
   # Puerto del servidor
   port: 33333
   tomcat:
      # Codificación de la URI
      uri-encoding: UTF-8
   compression:
      # Habilitar la compresión de datos
      enabled: true
      # Tipos mime
      mime-types: application/json, application/xml
spring:
   # Origen de los datos (Conexión con la DB)
   datasource:
      #Driver del JDBC
      driver-class-name: org.hsqldb.jdbcDriver
      # URL de conexión
      jdbc-url: jdbc:hsqldb:hsql://localhost:9013/templateDB
      # Nombre de usuario de la BD
      username: SA
      # Contraseña del usuario de la BD
      password:
      # Tamaño inicial
      initial-size: 10
      # Validación
      test-on-borrow: true
   main:
      # Eliminar el banner de inicio en la consola
      banner-mode: 'off'
   session:
      # Almacenar la sesión en spring
      store-type: none
   autoconfigure:
      #Elimina los ficheros de autoconfiguración de Spring Boot
      exclude: |
         org.springframework.boot.autoconfigure.security.SecurityAutoConfiguration, org.springframework.boot.actuate.autoconfigure.ManagementWebSecurityAutoConfiguration, org.springframework.boot.autoconfigure.security.FallbackWebSecurityAutoConfiguration
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
                        <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>application.yml</li>
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

[← Tutorial anterior]({{ base_path }}/tutorial/exercise2)
[Próximo tutorial →]({{ base_path }}/tutorial/exercise4)