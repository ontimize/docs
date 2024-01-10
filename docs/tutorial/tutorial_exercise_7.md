---
title: "CRUD operations, transactions"
layout: default
permalink: /tutorial/exercise7
nav_order: 7
parent: Tutorial
---

{% include base_path %}
{% include toc %}

# Modificación de operaciones CRUD básicas, transacciones
## Introducción
Hasta ahora, solo hemos realizado operaciones CRUD básicas en nuestra aplicación, pero podemos modificar esos métodos
básicos para permitir funcionamientos más avanzados, como puede ser, guardar nuevos valores en las tablas de maestros
asociados cuando insertamos un candidato nuevo o, actualizamos uno ya existente. Todo ello, empleando las transacciones,
y evitando que se guarden datos en caso de que ocurra un fallo.

## Modificar los métodos de CandidateService

{: .note}
> Para simplificar el código que se está escribiendo, pueden aparecer tres puntos (...) en algunas partes del código. Esto indica que puede haber código anterior antes y después de esos puntos.

<div class="multicolumn">
        <div class="multicolumnleft">
            <button class="unstyle toggle-tree-btn">
                <span class="material-symbols-outlined">right_panel_open</span>
            </button>
{{"En este caso, añadimos la referencia al servicio de maestros anotándolo con ```@Autowired```. Luego, modificamos los
métodos insert y update para que eliminen todos aquellos elementos contenidos en el mapa que recibe la petición
como parámetro.

Estos elementos eliminados quedarán almacenados en un mapa para comprobar si es necesario añadirlos a sus 
correspondientes tablas, o si por el contrario ya existen. De no existir previamente, se insertarán en la tabla
correspondiente y recuperaremos el identificador que nos devuelve después de dicha inserción. De existir, obtenemos su
identificador.

Sea cual sea el caso, sustituiremos el valor que tenía por sus identificadores. Añadimos de nuevo los elementos
eliminados a los elementos previos de la petición y continuamos con la ejecución del método.

Tanto en el método _insert_ como el método _update_ están marcados con la anotación 
```@Transactional(rollbackFor = Exception.class)``` que indica que, en caso de que dentro del método se genere alguna 
excepción del tipo _Exception.class_, hará un _rollback_ y no guardará ninguno de los elementos que se hayan insertado
en ese método." | markdownify }}

{{"**CandidateService.java**" | markdownify }}
{% highlight java %}
package com.ontimize.hr.model.core.service;

...

@Service("CandidateService")
@Lazy
public class CandidateService implements ICandidateService {

    ...

    /**
     * It stores the master service. When you mark it with the @Autowired notation,
     * it links automatically without using any setter
     */
    @Autowired
    private MasterService masterService;

    ...

    /**
     * This method adds a new candidate. It removes from the parameters those items
     * not directly belonging to the table of candidates in case of that are of the
     * {@link String} type. Look for the identifier of this data in case that they
     * exist or adds them to the corresponding tables, and associates them with the
     * correct identifier. Then add these new elements to the list of applicant's
     * items and performs the insert of a new candidate
     *
     * @param attrMap A {@link Map} containing the data of the new candidate to be
     *                inserted.
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public EntityResult candidateInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        Map<String, Object> nonCandidateData = removeNonRelatedData(attrMap, CandidateDao.ATTR_EDUCATION,
                CandidateDao.ATTR_EXPERIENCE_LEVEL, CandidateDao.ATTR_ORIGIN, CandidateDao.ATTR_PROFILE,
                CandidateDao.ATTR_STATUS);
        this.insertNonRelatedData(nonCandidateData);
        attrMap.putAll(nonCandidateData);
        return this.daoHelper.insert(this.candidateDao, attrMap);
    }

    /**
     * This method updates a candidate. It removes from the parameters those items
     * not directly belonging to the table of candidates in case of that are of the
     * {@link String} type. Look for the identifier of this data in case that they
     * exist or adds them to the corresponding tables, and associates them with the
     * correct identifier. Then add these new elements to the list of applicant's
     * items and performs the update of a candidate
     *
     * @param attrMap A {@link Map} containing the data of the candidate to be
     *                updated.
     * @param keyMap  A {@link Map} containing the identification of the candidate to be
     *                updated.
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public EntityResult candidateUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap)
            throws OntimizeJEERuntimeException {
        Map<String, Object> nonCandidateData = removeNonRelatedData(attrMap, CandidateDao.ATTR_EDUCATION,
                CandidateDao.ATTR_EXPERIENCE_LEVEL, CandidateDao.ATTR_ORIGIN, CandidateDao.ATTR_PROFILE,
                CandidateDao.ATTR_STATUS);
        this.insertNonRelatedData(nonCandidateData);
        attrMap.putAll(nonCandidateData);
        return this.daoHelper.update(this.candidateDao, attrMap, keyMap);
    }

    ...

    /**
     * It removes from a map all the keys and values of the map that match those
     * keys in their following parameters and returns a map with the extracted keys
     * and values
     *
     * @param attrMap       A {@link Map} with all keys
     * @param attrToExclude Multiple {@link String} that can be found as key of
     *                      {@code attrMap}
     * @return A {@link Map} with all of the keys and values removed from
     * {@code attrMap}
     */
    private Map<String, Object> removeNonRelatedData(Map<String, Object> attrMap, String... attrToExclude) {
        HashMap<String, Object> data = new HashMap<String, Object>();
        for (String attr : attrToExclude) {
            if (attrMap.containsKey(attr) && attrMap.get(attr) instanceof String) {
                data.put(attr, attrMap.remove(attr));
            }
        }
        return data;
    }

    /**
     * Checks if the data stored in the map passed by parameter exists in the
     * database table corresponding to the {@link MasterService} service. If so, it
     * replaces the value with the corresponding identifier. In case it does not
     * exist, it stores that value and substitutes the element's value in the map
     * with its identifier
     *
     * @param nonCandidateData Values to be inserted in the tables managed by the
     *                         {@link MasterService}
     */
    private void insertNonRelatedData(Map<String, Object> nonCandidateData) {
        for (Map.Entry<String, Object> entry : nonCandidateData.entrySet()) {
            Map<String, Object> data = new HashMap<String, Object>();
            List<String> attr = new ArrayList<String>();
            EntityResult toret, query;
            switch (entry.getKey()) {
                case CandidateDao.ATTR_EDUCATION:
                    data.put(EducationDao.ATTR_DESCRIPTION, entry.getValue());
                    attr.add(EducationDao.ATTR_ID);
                    query = this.masterService.educationQuery(data, attr);
                    if (query.calculateRecordNumber() > 0) {
                        entry.setValue(query.getRecordValues(0).get(EducationDao.ATTR_ID));
                    } else {
                        toret = this.masterService.educationInsert(data);
                        entry.setValue(toret.get(EducationDao.ATTR_ID));
                    }
                    break;
                case CandidateDao.ATTR_EXPERIENCE_LEVEL:
                    data.put(ExperienceLevelDao.ATTR_DESCRIPTION, entry.getValue());
                    attr.add(ExperienceLevelDao.ATTR_ID);
                    query = this.masterService.experienceLevelQuery(data, attr);
                    if (query.calculateRecordNumber() > 0) {
                        entry.setValue(query.getRecordValues(0).get(ExperienceLevelDao.ATTR_ID));
                    } else {
                        toret = this.masterService.experienceLevelInsert(data);
                        entry.setValue(toret.get(ExperienceLevelDao.ATTR_ID));
                    }
                    break;
                case CandidateDao.ATTR_ORIGIN:
                    data.put(OriginDao.ATTR_DESCRIPTION, entry.getValue());
                    attr.add(OriginDao.ATTR_ID);
                    query = this.masterService.originQuery(data, attr);
                    if (query.calculateRecordNumber() > 0) {
                        entry.setValue(query.getRecordValues(0).get(OriginDao.ATTR_ID));
                    } else {
                        toret = this.masterService.originInsert(data);
                        entry.setValue(toret.get(OriginDao.ATTR_ID));
                    }
                    break;
                case CandidateDao.ATTR_PROFILE:
                    data.put(ProfileDao.ATTR_DESCRIPTION, entry.getValue());
                    attr.add(ProfileDao.ATTR_ID);
                    query = this.masterService.profileQuery(data, attr);
                    if (query.calculateRecordNumber() > 0) {
                        entry.setValue(query.getRecordValues(0).get(ProfileDao.ATTR_ID));
                    } else {
                        toret = this.masterService.profileInsert(data);
                        entry.setValue(toret.get(ProfileDao.ATTR_ID));
                    }
                    break;
                case CandidateDao.ATTR_STATUS:
                    data.put(StatusDao.ATTR_DESCRIPTION, entry.getValue());
                    attr.add(StatusDao.ATTR_ID);
                    query = this.masterService.statusQuery(data, attr);
                    if (query.calculateRecordNumber() > 0) {
                        entry.setValue(query.getRecordValues(0).get(StatusDao.ATTR_ID));
                    } else {
                        toret = this.masterService.statusInsert(data);
                        entry.setValue(toret.get(StatusDao.ATTR_ID));
                    }
                    break;
                default:
                    break;
            }
        }
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
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>EducationDao.java</li>
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ExperienceLevelDao.java</li>
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
                                    <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>CandidateService.java</li>
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MasterService.java</li>
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

[← Tutorial anterior]({{ base_path }}/tutorial/exercise6)
[Próximo tutorial →]({{ base_path }}/tutorial/exercise8)