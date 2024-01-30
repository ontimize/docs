---
title: "Use of Basic Expression and new methods"
layout: default
permalink: /tutorial/exercise9
nav_order: 9
parent: Tutorial
---

{% include base_path %}
{% include toc %}

# Uso de BasicExpression y nuevos métodos
## Introducción
Es este ejercicio modificaremos el servicio de ofertas. En la primera parte, filtraremos las peticiones mediante el uso
de BasicExpression en la propia petición REST. En la siguiente parte, haremos nuevos métodos para que filtren los datos
con BasicExpression.

## ¿Qué es una BasicExpression?
Una BasicExpression sirve para filtrar las peticiones de una manera compleja que delimite la respuesta dentro de unas
condiciones. Las BasicExpression se componen de dos operandos (derecho e izquierdo) y un operador. El operando izquierdo
puede contener el nombre de una columna u otra BasicExpression, el operando derecho puede contener un valor u otra
BasicExpression y un operador que indicará la relación entre ellos. De tal manera que se puede crear una
BasicExpression, que de manera resumida, filtre la petición mediante esta condición:

* START_DATE >= 2020-01-01: En este caso, el operando izquierdo es el valor de la columna, START_DATE, el operando
  derecho es el valor de dicha columna y el operador es el símbolo >= . De esta manera, obligaremos a que la condición 
  de la consulta sea que devuelva todos los registros cuya fecha de inicio sea superior o igual al 1 de Enero del 2020.
* (START_DATE >= 2020-01-01) AND (END_DATE <= 2020-06-30): En este caso existe una BasicExpression cuyo operando 
  izquierdo es BasicExpression, el operando derecho es otra BasicExpression y el operador es el símbolo AND.

## BasicExpression en el cuerpo de una petición REST
Una BasicExpression en la petición REST se escribe en el _filter_ de esta misma petición, indicando que es una 
BasicExpression a través de la anotación **@basic_expression**, y dentro de ella, **lop** para el operando izquierdo,
**op** para el operador, y **rop** para el operando derecho. Si queremos usar múltiples BasicExpression, basta con 
anidar dentro de cada operando una BasicExpression nueva. Crearemos algunas peticiones en Postman para usar las 
BasicExpression.


<table>
  <thead>
    <tr>
      <th>Tipo de petición</th>
      <th>Petición</th>
      <th>Cuerpo petición</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>POST</td>
      <td>localhost:33333/offers/offer/search</td>
      <td>
{% highlight json %}
{
    "filter": {
        "@basic_expression": {
            "lop": "START_DATE",
            "op": ">=",
            "rop": "2020-01-15"
        }
    },
    "columns": [
        "ID",
        "DESCRIPTION",
        "OFFER_STATUS",
        "END_DATE",
        "APPLICANT",
        "ACRONYM",
        "CREATION_DATE",
        "START_DATE"
    ]
}
{% endhighlight %}
      </td>
    </tr>
    <tr>
      <td>POST</td>
      <td>localhost:33333/offers/offer/search</td>
      <td>
{% highlight json %}
{
    "filter": {
        "@basic_expression": {
            "lop": {
                "lop": "START_DATE",
                "op": ">=",
                "rop": "2019-06-01"
            },
            "op": "AND",
            "rop": {
                "lop": "START_DATE",
                "op": "<",
                "rop": "2020-01-01"
            }
        }
    },
    "columns": [
        "ID",
        "DESCRIPTION",
        "OFFER_STATUS",
        "END_DATE",
        "APPLICANT",
        "ACRONYM",
        "CREATION_DATE",
        "START_DATE"
    ]
}
{% endhighlight %}
</td>
    </tr>
  </tbody>
</table>

## BasicExpression en el método de una petición REST
En caso de que queramos crear un método nuevo que podamos invocar desde una URL específica, sin tener que añadir 
nosotros una BasicExpression en el cuerpo de una petición REST. En este caso, crearemos dos nuevos métodos dentro del 
controlador REST de las ofertas. Uno que envíe todas las ofertas del presente año y otro que, pasado en la URL un 
parámetro, nos devuelva las ofertas de ese año en concreto.

<div class="multicolumn">
        <div class="multicolumnleft">
            <button class="unstyle toggle-tree-btn">
                <span class="material-symbols-outlined">right_panel_open</span>
            </button>
{{"La anotacion ```@RequestMapping``` permite indicar la ruta para la que responderá este método, junto con el tipo
de petición que se haga e indicar el tipo de respuesta a devolver.

En las condiciones de la consulta, para indicar que el valor es una BasicExpression, tenemos que añadir, 
como clave **EXPRESSION_KEY_UNIQUE_IDENTIFIER**, o lo que es lo mismo, 
```SQLStatementBuilder.ExtendedSQLConditionValuesProcessor.EXPRESSION_KEY```, una constante que contiene la cadena 
anterior." | markdownify }}
{{"**OfferRestController.java**" | markdownify }}
{% highlight java %}
OfferRestController.java
package com.ontimize.hr.ws.core.rest;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ontimize.hr.api.core.service.IOfferService;
import com.ontimize.hr.model.core.dao.OfferDao;
import com.ontimize.jee.common.db.SQLStatementBuilder;
import com.ontimize.jee.common.db.SQLStatementBuilder.BasicExpression;
import com.ontimize.jee.common.db.SQLStatementBuilder.BasicField;
import com.ontimize.jee.common.db.SQLStatementBuilder.BasicOperator;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.server.rest.ORestController;

@RestController
@RequestMapping("/offers")
public class OfferRestController extends ORestController<IOfferService> {

    @Autowired
    private IOfferService offerService;

    @Override
    public IOfferService getService() {
        return this.offerService;
    }

    @RequestMapping(value = "currentOffers/search", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public EntityResult currentOffersSearch(@RequestBody Map<String, Object> req) {
        try {
            List<String> columns = (List<String>) req.get("columns");
            Map<String, Object> key = new HashMap<String, Object>();
            key.put(SQLStatementBuilder.ExtendedSQLConditionValuesProcessor.EXPRESSION_KEY,
                    searchBetween(OfferDao.ATTR_START_DATE));
            return offerService.offerQuery(key, columns);
        } catch (Exception e) {
            e.printStackTrace();
            EntityResult res = new EntityResultMapImpl();
            res.setCode(EntityResult.OPERATION_WRONG);
            return res;
        }
    }

    @RequestMapping(value = "yearOffers/search", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public EntityResult yearOffersSearch(@RequestBody Map<String, Object> req) {
        try {
            List<String> columns = (List<String>) req.get("columns");
            Map<String, Object> filter = (Map<String, Object>) req.get("filter");
            int year = (int) filter.get("YEAR");
            Map<String, Object> key = new HashMap<String, Object>();
            key.put(SQLStatementBuilder.ExtendedSQLConditionValuesProcessor.EXPRESSION_KEY,
                    searchBetweenWithYear(OfferDao.ATTR_START_DATE, year));
            return offerService.offerQuery(key, columns);
        } catch (Exception e) {
            e.printStackTrace();
            EntityResult res = new EntityResultMapImpl();
            res.setCode(EntityResult.OPERATION_WRONG);
            return res;
        }
    }

    private BasicExpression searchBetween(String param) {

        Calendar cal = Calendar.getInstance();
        int currentYear = cal.get(Calendar.YEAR);

        return this.searchBetweenWithYear(param, currentYear);
    }

    private BasicExpression searchBetweenWithYear(String param, int year) {

        Calendar cal = Calendar.getInstance();
        cal.set(year, 0, 1);
        Date startDate = cal.getTime();
        cal.set(year + 1, 0, 1);
        Date endDate = cal.getTime();

        BasicField field = new BasicField(param);
        BasicExpression bexp1 = new BasicExpression(field, BasicOperator.MORE_EQUAL_OP, startDate);
        BasicExpression bexp2 = new BasicExpression(field, BasicOperator.LESS_OP, endDate);
        return new BasicExpression(bexp1, BasicOperator.AND_OP, bexp2);
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
                                    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OfferService.java</li>
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
                                    <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OfferRestController.java</li>
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

[<span style="display: flex; align-items: center;"><span class="material-symbols-outlined">arrow_back</span> Tutorial anterior</span>]({{ base_path }}/tutorial/exercise8){: .btn}
[<span style="display: flex; align-items: center;">Próximo tutorial <span class="material-symbols-outlined">arrow_forward</span></span>]({{ base_path }}/tutorial/exercise10){: .btn}