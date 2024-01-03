---
title: "Structure of an Ontimize Boot application"
layout: default
permalink: /tutorial/exercise2
nav_order: 2
parent: Tutorial
---

{% include base_path %}
{% include toc %}

# Estructura de una aplicación Ontimize Boot
## Estructura
Esta sección explicará la estructura de una aplicación basada en Ontimize Boot.
<div class="multicolumn">
    <button class="unstyle toggle-tree-btn">
        <div class="btn">Alternar árbol</div>
    </button>
    <div class="multicolumncontent">
        <div class="multicolumnleft">
        {{ "* **hr-api**: este módulo contiene las interfaces relacionadas con los servicios invocados por los controladores REST. Los servicios implementan todos los métodos 
declarados en sus interfaces.
* **hr-boot**: este módulo contiene el lanzador principal de la aplicación y un fichero de configuración *.yml, que se utiliza para configurar la aplicación, conexión, base de
datos, parámetros de lanzamiento, seguridad...
* **hr-model**: este módulo contiene la base de datos en HSQLDB, los archivos del DAO de la aplicación (ambos, tanto *.xml como *.java) y la implementación de los servicios
cuyas interfaces están definidas en el módulo **hr-api**.
* **hr-ws**: este módulo contiene los controladores REST para los servicios implementados en el módulo **hr-model**.
" | markdownify}}
        </div>
        <div class="multicolumnright jstreeloader collapsed">
            <ul>
              <li data-jstree='{"opened":true, "icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
              hr
              <ul>
                <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
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
                <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
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
                <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
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
                <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
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

[← Tutorial anterior]({{ base_path }}/tutorial/exercise1)
[Próximo tutorial →]({{ base_path }}/tutorial/exercise3)
