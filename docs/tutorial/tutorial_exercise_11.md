---
title: "Use server permission"
layout: default
permalink: /tutorial/exercise11
nav_order: 11
parent: Tutorial
---

{% include base_path %}
{% include toc %}

# Uso de permisos en el servidor
## Introducción
En este ejercicio proveeremos de una capa de permisos al backend, permitiendo que los métodos que elijamos solo puedan ser ejecutados por determinados roles de usuario. En este ejercicio, crearemos un nuevo usuario que esté asociado a un nuevo rol, pero que no pueda ejecutar ninguna de las peticiones asociadas al servicio de Offers.

## Añadir nuevo perfil y usuario
Añadiremos los siguientes elementos a la BD:

**Código SQL**
{% highlight sql %}
-- Añadimos un nuevo usuario
INSERT INTO TUSER VALUES('candidate','candidate','candidate','candidate',NULL,'99999999R',NULL,'2020-07-03 11:50:40.665000',NULL)
-- Añadimos un nuevo rol de usuario
INSERT INTO TROLE VALUES(1,'candidate','<?xml version="1.0" encoding="UTF-8"?><security></security>')
-- Indicamos la relación entre el nuevo usuario y el nuevo rol
INSERT INTO TUSER_ROLE VALUES(1,1,'candidate')
{% endhighlight %}

## Modificar el servicio para añadir seguridad
En el módulo _boot_ añadiremos la anotación ```@EnableAspectJAutoProxy(proxyTargetClass = false)``` a la clase 
**ServerApplicaction.java** y añadiremos a cada método del servicio la anotación 
```@Secured({ PermissionsProviderSecured.SECURED })```

<div class="multicolumn">
    <div class="multicolumncontent">
        <div class="multicolumnleft">
            <button class="unstyle toggle-tree-btn">
                <span class="material-symbols-outlined">right_panel_open</span>
            </button>
{{"**ServerApplication.java**" | markdownify }}
{% highlight java %}
package com.ontimize.hr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@EnableAspectJAutoProxy(proxyTargetClass = false)
@SpringBootApplication
public class ServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }
}
{% endhighlight %}

{{"**OfferService.java**" | markdownify }}
{% highlight java %}
package com.ontimize.hr.model.core.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;

import com.ontimize.hr.api.core.service.IOfferService;
import com.ontimize.hr.model.core.dao.OfferCandidateStatusDao;
import com.ontimize.hr.model.core.dao.OfferCandidatesDao;
import com.ontimize.hr.model.core.dao.OfferDao;
import com.ontimize.hr.model.core.dao.OfferStatusDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.common.security.PermissionsProviderSecured;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;

@Service("OfferService")
@Lazy
public class OfferService implements IOfferService {

    @Autowired
    private OfferDao offerDao;
    @Autowired
    private OfferStatusDao offerStatusDao;
    @Autowired
    private OfferCandidatesDao offerCandidatesDao;
    @Autowired
    private OfferCandidateStatusDao offerCandidateStatusDao;
    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Override
    @Secured({PermissionsProviderSecured.SECURED})
    public EntityResult offerQuery(Map<String, Object> keyMap, List<String> attrList)
            throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.offerDao, keyMap, attrList);
    }

    @Override
    @Secured({PermissionsProviderSecured.SECURED})
    public EntityResult offerInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.offerDao, attrMap);
    }

    @Override
    @Secured({PermissionsProviderSecured.SECURED})
    public EntityResult offerUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap)
            throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.offerDao, attrMap, keyMap);
    }

    @Override
    @Secured({PermissionsProviderSecured.SECURED})
    public EntityResult offerDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.offerDao, keyMap);
    }

    @Override
    @Secured({PermissionsProviderSecured.SECURED})
    public EntityResult offerStatusQuery(Map<String, Object> keyMap, List<String> attrList)
            throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.offerStatusDao, keyMap, attrList);
    }

    @Override
    @Secured({PermissionsProviderSecured.SECURED})
    public EntityResult offerStatusInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.offerStatusDao, attrMap);
    }

    @Override
    @Secured({PermissionsProviderSecured.SECURED})
    public EntityResult offerStatusUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap)
            throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.offerStatusDao, attrMap, keyMap);
    }

    @Override
    @Secured({PermissionsProviderSecured.SECURED})
    public EntityResult offerStatusDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.offerStatusDao, keyMap);
    }

    @Override
    @Secured({PermissionsProviderSecured.SECURED})
    public EntityResult offerCandidateQuery(Map<String, Object> keyMap, List<String> attrList)
            throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.offerCandidatesDao, keyMap, attrList);
    }

    @Override
    @Secured({PermissionsProviderSecured.SECURED})
    public EntityResult offerCandidateDetailsQuery(Map<String, Object> keyMap, List<String> attrList)
            throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.offerCandidatesDao, keyMap, attrList, OfferCandidatesDao.QUERY_OFFER_DETAILS);
    }

    @Override
    @Secured({PermissionsProviderSecured.SECURED})
    public EntityResult offerCandidateInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.offerCandidatesDao, attrMap);
    }

    @Override
    @Secured({PermissionsProviderSecured.SECURED})
    public EntityResult offerCandidateUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap)
            throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.offerCandidatesDao, attrMap, keyMap);
    }

    @Override
    @Secured({PermissionsProviderSecured.SECURED})
    public EntityResult offerCandidateDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.offerCandidatesDao, keyMap);
    }

    @Override
    @Secured({PermissionsProviderSecured.SECURED})
    public EntityResult offerCandidateStatusQuery(Map<String, Object> keyMap, List<String> attrList)
            throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.offerCandidateStatusDao, keyMap, attrList);
    }

    @Override
    @Secured({PermissionsProviderSecured.SECURED})
    public EntityResult offerCandidateStatusInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.offerCandidateStatusDao, attrMap);
    }

    @Override
    @Secured({PermissionsProviderSecured.SECURED})
    public EntityResult offerCandidateStatusUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap)
            throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.offerCandidateStatusDao, attrMap, keyMap);
    }

    @Override
    @Secured({PermissionsProviderSecured.SECURED})
    public EntityResult offerCandidateStatusDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.offerCandidateStatusDao, keyMap);
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
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>IMasterService.java</li>
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>IOfferService.java</li>
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
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>EducationDao.java</li>
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ExperienceLevelDao.java</li>
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OfferCandidatesDao.java</li>
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OfferCandidateStatusDao.java</li>
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OfferDao.java</li>
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OfferStatusDao.java</li>
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OriginDao.java</li>
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ProfileDao.java</li>
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>StatusDao.java</li>
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserDao.java</li>
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserRoleDao.java</li>
                                  </ul>
                                  </li>
                                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                                  service
                                  <ul>
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>CandidateService.java</li>
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MasterService.java</li>
                                    <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OfferService.java</li>
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
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>EducationDao.xml</li>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ExperienceLevelDao.xml</li>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OfferCandidatesDao.xml</li>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OfferCandidateStatusDao.xml</li>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OfferDao.xml</li>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OfferStatusDao.xml</li>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OriginDao.xml</li>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>placeholders.properties</li>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ProfileDao.xml</li>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>RoleDao.xml</li>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>RoleServerPermissionDao.xml</li>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ServerPermissionDao.xml</li>
                          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>StatusDao.xml</li>
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
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MasterRestController.java</li>
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OfferRestController.java</li>
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
              </ul>
              </li>
            </ul>
        </div>
    </div>
</div>

## Añadir los permisos para los métodos
Una vez anotados los métodos, es necesario añadir el servicio y el método que hemos anotado a la tabla de la BD
que almacena dichos elementos y a la tabla que indica los métodos para los cuales el rol tiene permiso.

**Código SQL**
{% highlight sql %}
INSERT INTO TSERVER_PERMISSION (PERMISSION_NAME) VALUES('com.ontimize.hr.api.core.service.IOfferService/offerQuery')
INSERT INTO TSERVER_PERMISSION (PERMISSION_NAME) VALUES('com.ontimize.hr.api.core.service.IOfferService/offerInsert')
INSERT INTO TSERVER_PERMISSION (PERMISSION_NAME) VALUES('com.ontimize.hr.api.core.service.IOfferService/offerUpdate')
INSERT INTO TSERVER_PERMISSION (PERMISSION_NAME) VALUES('com.ontimize.hr.api.core.service.IOfferService/offerDelete')
INSERT INTO TSERVER_PERMISSION (PERMISSION_NAME) VALUES('com.ontimize.hr.api.core.service.IOfferService/offerStatusQuery')
INSERT INTO TSERVER_PERMISSION (PERMISSION_NAME) VALUES('com.ontimize.hr.api.core.service.IOfferService/offerStatusInsert')
INSERT INTO TSERVER_PERMISSION (PERMISSION_NAME) VALUES('com.ontimize.hr.api.core.service.IOfferService/offerStatusUpdate')
INSERT INTO TSERVER_PERMISSION (PERMISSION_NAME) VALUES('com.ontimize.hr.api.core.service.IOfferService/offerStatusDelete')
INSERT INTO TSERVER_PERMISSION (PERMISSION_NAME) VALUES('com.ontimize.hr.api.core.service.IOfferService/offerCandidateQuery')
INSERT INTO TSERVER_PERMISSION (PERMISSION_NAME) VALUES('com.ontimize.hr.api.core.service.IOfferService/offerCandidateDetailsQuery')
INSERT INTO TSERVER_PERMISSION (PERMISSION_NAME) VALUES('com.ontimize.hr.api.core.service.IOfferService/offerCandidateInsert')
INSERT INTO TSERVER_PERMISSION (PERMISSION_NAME) VALUES('com.ontimize.hr.api.core.service.IOfferService/offerCandidateUpdate')
INSERT INTO TSERVER_PERMISSION (PERMISSION_NAME) VALUES('com.ontimize.hr.api.core.service.IOfferService/offerCandidateDelete')
INSERT INTO TSERVER_PERMISSION (PERMISSION_NAME) VALUES('com.ontimize.hr.api.core.service.IOfferService/offerCandidateStatusQuery')
INSERT INTO TSERVER_PERMISSION (PERMISSION_NAME) VALUES('com.ontimize.hr.api.core.service.IOfferService/offerCandidateStatusInsert')
INSERT INTO TSERVER_PERMISSION (PERMISSION_NAME) VALUES('com.ontimize.hr.api.core.service.IOfferService/offerCandidateStatusUpdate')
INSERT INTO TSERVER_PERMISSION (PERMISSION_NAME) VALUES('com.ontimize.hr.api.core.service.IOfferService/offerCandidateStatusDelete')
INSERT INTO TROLE_SERVER_PERMISSION (ID_ROLENAME,ID_SERVER_PERMISSION) VALUES(0,1)
INSERT INTO TROLE_SERVER_PERMISSION (ID_ROLENAME,ID_SERVER_PERMISSION) VALUES(0,2)
INSERT INTO TROLE_SERVER_PERMISSION (ID_ROLENAME,ID_SERVER_PERMISSION) VALUES(0,3)
INSERT INTO TROLE_SERVER_PERMISSION (ID_ROLENAME,ID_SERVER_PERMISSION) VALUES(0,4)
INSERT INTO TROLE_SERVER_PERMISSION (ID_ROLENAME,ID_SERVER_PERMISSION) VALUES(0,5)
INSERT INTO TROLE_SERVER_PERMISSION (ID_ROLENAME,ID_SERVER_PERMISSION) VALUES(0,6)
INSERT INTO TROLE_SERVER_PERMISSION (ID_ROLENAME,ID_SERVER_PERMISSION) VALUES(0,7)
INSERT INTO TROLE_SERVER_PERMISSION (ID_ROLENAME,ID_SERVER_PERMISSION) VALUES(0,8)
INSERT INTO TROLE_SERVER_PERMISSION (ID_ROLENAME,ID_SERVER_PERMISSION) VALUES(0,9)
INSERT INTO TROLE_SERVER_PERMISSION (ID_ROLENAME,ID_SERVER_PERMISSION) VALUES(0,10)
INSERT INTO TROLE_SERVER_PERMISSION (ID_ROLENAME,ID_SERVER_PERMISSION) VALUES(0,11)
INSERT INTO TROLE_SERVER_PERMISSION (ID_ROLENAME,ID_SERVER_PERMISSION) VALUES(0,12)
INSERT INTO TROLE_SERVER_PERMISSION (ID_ROLENAME,ID_SERVER_PERMISSION) VALUES(0,13)
INSERT INTO TROLE_SERVER_PERMISSION (ID_ROLENAME,ID_SERVER_PERMISSION) VALUES(0,14)
INSERT INTO TROLE_SERVER_PERMISSION (ID_ROLENAME,ID_SERVER_PERMISSION) VALUES(0,15)
INSERT INTO TROLE_SERVER_PERMISSION (ID_ROLENAME,ID_SERVER_PERMISSION) VALUES(0,16)
INSERT INTO TROLE_SERVER_PERMISSION (ID_ROLENAME,ID_SERVER_PERMISSION) VALUES(0,17)
{% endhighlight %}

Si tratamos de realizar mediante [Postman](https://www.postman.com/){:target="_blank"} peticiones en el servicio de 
_OfferService_ cambiando la autenticación por el usuario _candidate_ y contraseña _candidate_, dará un error, ya que 
el usuario _candidate_ no pertenece al rol _admin_ que es el único rol que tiene permisos para realizar esas consultas.

[← Tutorial anterior]({{ base_path }}/tutorial/exercise10)