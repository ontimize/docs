---
title: "Adding new services"
layout: default
permalink: /tutorial/exercise8
nav_order: 8
parent: Tutorial
---

{% include base_path %}
{% include toc %}

# Añadir nuevos servicios
## Introducción
En esta parte de la aplicación añadiremos nuevas tablas, DAO, servicios y controladores para nuestra aplicación de 
recursos humanos. Permitiremos gestionar ofertas de trabajo y añadir a ellas a los diferentes candidatos.

## Creación de las tablas en la BD
Crearemos las tablas en la BD necesarias para esta nueva funcionalidad:
{{"**Código SQL**" | markdownify }}
{% highlight sql %}
CREATE TABLE OFFER_STATUS (ID INTEGER PRIMARY KEY NOT NULL IDENTITY, DESCRIPTION VARCHAR(255) NOT NULL);
CREATE TABLE OFFER_CANDIDATE_STATUS (ID INTEGER PRIMARY KEY NOT NULL IDENTITY, DESCRIPTION VARCHAR(255) NOT NULL);
CREATE TABLE OFFER (ID INTEGER PRIMARY KEY  NOT NULL IDENTITY, ACRONYM VARCHAR(255), DESCRIPTION VARCHAR(1000), APPLICANT VARCHAR(255), OFFER_STATUS INTEGER, CREATION_DATE DATE, START_DATE DATE, END_DATE DATE);
CREATE TABLE OFFER_CANDIDATES (ID INTEGER PRIMARY KEY NOT NULL IDENTITY, OFFER_ID INTEGER NOT NULL, CANDIDATE_ID INTEGER NOT NULL, OFFER_CANDIDATE_STATUS INTEGER);
{% endhighlight %}

Añadimos las claves foráneas:
{{"**Código SQL**" | markdownify }}
{% highlight sql %}
ALTER TABLE OFFER ADD CONSTRAINT OFFER_FK_OFFER_STATUS FOREIGN KEY (OFFER_STATUS) REFERENCES OFFER_STATUS(ID);
ALTER TABLE OFFER_CANDIDATES ADD CONSTRAINT OFFER_CANDIDATES_FK_CANDIDATES FOREIGN KEY (CANDIDATE_ID) REFERENCES CANDIDATE(ID);
ALTER TABLE OFFER_CANDIDATES ADD CONSTRAINT OFFER_CANDIDATES_FK_OFFER FOREIGN KEY (OFFER_ID) REFERENCES OFFER(ID);
ALTER TABLE OFFER_CANDIDATES ADD CONSTRAINT OFFER_CANDIDATES_FK_OFFER_CANDIDATES_STATUS FOREIGN KEY (OFFER_CANDIDATE_STATUS) REFERENCES OFFER_CANDIDATE_STATUS(ID);
{% endhighlight %}

Rellenaremos las tablas con un mínimo de datos:
{{"**Código SQL**" | markdownify }}
{% highlight  sql%}
INSERT INTO OFFER_STATUS (DESCRIPTION) VALUES('PENDING');
INSERT INTO OFFER_CANDIDATE_STATUS (DESCRIPTION) VALUES('INTERVIEW');
INSERT INTO OFFER
(ACRONYM, DESCRIPTION, APPLICANT, OFFER_STATUS, CREATION_DATE, START_DATE, END_DATE)
VALUES('Digital Twin', 'Two new Java developers should be incorporated. The salary range is between 20k€ and 30k€. The location is in Vigo full time.', 'Janna Tirte', 0, '2020-01-01', '2020-02-07', NULL);
INSERT INTO OFFER
(ACRONYM, DESCRIPTION, APPLICANT, OFFER_STATUS, CREATION_DATE, START_DATE, END_DATE)
VALUES('Exotic language programmer', 'We are looking for a talented Programmer to create secure and functional code.
You may have to provide quality coding solutions both for simple applications and complex information or operating systems.
The ideal candidate will have a passion for technology and software building.
Attention to detail and an analytical mind are essential qualities for a successful career in programming.', 'Richard Stallman', 0, '2019-12-01', '2019-12-15', NULL);
INSERT INTO OFFER
(ACRONYM, DESCRIPTION, APPLICANT, OFFER_STATUS, CREATION_DATE, START_DATE, END_DATE)
VALUES('HR Manager', 'We are looking for an experienced leader for our project management office focused on Project Management activities within our service delivery center to join our team in our Atlanta office. This role is integral to achieve accurate project management and process standardization throughout the organization. The major priority for the successful candidate will be to lead a team of project managers across a large portfolio of projects. Projects range from small enhancements, large-scale technology implementations, and daily operational activities.', 'Harry May', 0, '2020-01-01', '2020-01-07', NULL);
INSERT INTO OFFER
(ACRONYM, DESCRIPTION, APPLICANT, OFFER_STATUS, CREATION_DATE, START_DATE, END_DATE)
VALUES('Software developer', 'Works under the direction and supervision of application managers and project managers to help build the next generation of global financial data systems to support the client’s front office, middle office processes and back-office risk, finance, compliance reporting, regulatory reporting, and capital markets and banking needs.', 'Tanya Howard', 0, '2020-01-01', '2020-01-02', NULL);
INSERT INTO OFFER
(ACRONYM, DESCRIPTION, APPLICANT, OFFER_STATUS, CREATION_DATE, START_DATE, END_DATE)
VALUES('UI developer', 'The ideal candidate will be responsible for developing user interfaces and controls that achieve maximum usability for our enterprise application and our customers.', 'Francis Harris', 0, '2019-12-01', '2019-12-24', NULL);
INSERT INTO OFFER
(ACRONYM, DESCRIPTION, APPLICANT, OFFER_STATUS, CREATION_DATE, START_DATE, END_DATE)
VALUES('Entry level management', 'With the addition of various new clients requesting that we expand our services to new markets, we have an urgent need for a passionate individual that we can train, support, and groom to accept a role as a Manager within our firm.

To ensure your success, we offer training that encompasses all facets of our business operations. You’ll experience hands on training provided by seasoned professionals in each department, primarily:

Promotional Marketing
Customer Service
Consumer Relations
Business Administration
Recruiting and Talent Acquisition', 'Joy Boyd', 0, '2019-11-01', '2019-11-06', NULL);
INSERT INTO OFFER
(ACRONYM, DESCRIPTION, APPLICANT, OFFER_STATUS, CREATION_DATE, START_DATE, END_DATE)
VALUES('PHP developer', 'Responsible for all requests for data processing services including, preparation of specifications, development and maintenance of computer programs, job control language and operational documentation. Assists productions systems group. Interfaces with other departments to determine user needs.', 'Rebecca Bowman', 0, '2020-01-01', '2020-01-06', NULL);
INSERT INTO OFFER
(ACRONYM, DESCRIPTION, APPLICANT, OFFER_STATUS, CREATION_DATE, START_DATE, END_DATE)
VALUES('Security engineer', 'This position is open within the Security Engineering teams, which has full end-to-end ownership of security tools that allows for strong security prevention, detection and response capabilities. Our mission is to ensure cyber infrastructure is in line with industry standards by performing day-to-day system administration, product selection for new tools, deployment, configuration, maintenance, and support and license management.', 'Harry Gardner', 0, '2020-01-01', '2020-01-16', NULL);
INSERT INTO OFFER
(ACRONYM, DESCRIPTION, APPLICANT, OFFER_STATUS, CREATION_DATE, START_DATE, END_DATE)
VALUES('Project Manager', 'Performs a variety of duties associated with the development and production of the aircraft maintenance manuals, wiring diagram manuals and other associated documents. Utilize an automated publishing system to download, import, and distribute manual data.Individual will incorporate vendor revisions and Delta engineering documents into a Delta customized manual and coordinate the publishing of the same. Additional responsibilities may include continuous improvement of revision processes, training and point person for data issues. The Project Leader may also be responsible for review and distribution of Aircraft Maintenance Alerts (AMAs), company policy & procedures, bulletins, vendor access, and other technical information.', 'Erika Torres', 0, '2020-01-01', '2020-01-15', NULL);
INSERT INTO OFFER
(ACRONYM, DESCRIPTION, APPLICANT, OFFER_STATUS, CREATION_DATE, START_DATE, END_DATE)
VALUES('Istari support', 'Will provide administrative and logistical support to members of the executive team and may support other as needed. Must display professionalism and a strong work ethic while fostering a work environment that is positive, optimistic and collaborative. Position requires excellent administrative, communication, organizational and time management skills paired with flexibility, integrity and the ability to work independently. Must have Balrog fighting proficiency.', 'Eru Iúvatar', 0, '2020-01-01', '2020-01-06', NULL);
INSERT INTO OFFER_CANDIDATES (ID, OFFER_ID, CANDIDATE_ID, OFFER_CANDIDATE_STATUS) VALUES(0, 0, 0, 0);
INSERT INTO OFFER_CANDIDATES (ID, OFFER_ID, CANDIDATE_ID, OFFER_CANDIDATE_STATUS) VALUES(1, 0, 3, 0);
INSERT INTO OFFER_CANDIDATES (ID, OFFER_ID, CANDIDATE_ID, OFFER_CANDIDATE_STATUS) VALUES(2, 0, 8, 0);
INSERT INTO OFFER_CANDIDATES (ID, OFFER_ID, CANDIDATE_ID, OFFER_CANDIDATE_STATUS) VALUES(3, 0, 12, 0);
{% endhighlight %}

## Creación de los DAO
Crearemos los DAO asociados a las tablas recién añadidas a la BD.

<div class="multicolumn">
        <div class="multicolumnleft">
            <button class="unstyle toggle-tree-btn">
                <span class="material-symbols-outlined">right_panel_open</span>
            </button>

{{"**OfferCandidatesDao.xml**" | markdownify }}
{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<JdbcEntitySetup
        xmlns="http://www.ontimize.com/schema/jdbc"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.ontimize.com/schema/jdbc http://www.ontimize.com/schema/jdbc/ontimize-jdbc-dao.xsd"
        catalog="" schema="${mainschema}" table="OFFER_CANDIDATES"
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

{{"**OfferCandidateStatusDao.xml**" | markdownify }}
{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<JdbcEntitySetup
        xmlns="http://www.ontimize.com/schema/jdbc"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.ontimize.com/schema/jdbc http://www.ontimize.com/schema/jdbc/ontimize-jdbc-dao.xsd"
        catalog="" schema="${mainschema}" table="OFFER_CANDIDATE_STATUS"
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

{{"**OfferDao.xml**" | markdownify }}
{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<JdbcEntitySetup
        xmlns="http://www.ontimize.com/schema/jdbc"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.ontimize.com/schema/jdbc http://www.ontimize.com/schema/jdbc/ontimize-jdbc-dao.xsd"
        catalog="" schema="${mainschema}" table="OFFER"
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

{{"**OfferStatusDao.xml**" | markdownify }}
{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<JdbcEntitySetup
        xmlns="http://www.ontimize.com/schema/jdbc"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.ontimize.com/schema/jdbc http://www.ontimize.com/schema/jdbc/ontimize-jdbc-dao.xsd"
        catalog="" schema="${mainschema}" table="OFFER_STATUS"
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

{{"**OfferCandidatesDao.java**" | markdownify }}
{% highlight java %}
package com.ontimize.hr.model.core.dao;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;

@Repository("OfferCandidatesDao")
@Lazy
@ConfigurationFile(configurationFile = "dao/OfferCandidatesDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class OfferCandidatesDao extends OntimizeJdbcDaoSupport {

    public static final String ATTR_ID ="ID";
    public static final String ATTR_OFFER_ID ="OFFER_ID";
    public static final String ATTR_CANDIDATE_ID ="CANDIDATE_ID";
    public static final String ATTR_OFFER_CANDIDATE_STATUS ="OFFER_CANDIDATE_STATUS";

}
{% endhighlight %}

{{"**OfferCandidateStatusDao.java**" | markdownify }}
{% highlight java %}
package com.ontimize.hr.model.core.dao;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;

@Repository("OfferCandidateStatusDao")
@Lazy
@ConfigurationFile(configurationFile = "dao/OfferCandidateStatusDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class OfferCandidateStatusDao extends OntimizeJdbcDaoSupport {

    public static final String ATTR_ID ="ID";
    public static final String ATTR_DESCRIPTION ="DESCRIPTION";

}
{% endhighlight %}

{{"**OfferDao.java**" | markdownify }}
{% highlight java %}
package com.ontimize.hr.model.core.dao;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;

@Repository("OfferDao")
@Lazy
@ConfigurationFile(configurationFile = "dao/OfferDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class OfferDao extends OntimizeJdbcDaoSupport {

    public static final String ATTR_ID = "ID";
    public static final String ATTR_ACRONYM = "ACRONYM";
    public static final String ATTR_DESCRIPTION = "DESCRIPTION";
    public static final String ATTR_APPLICANT = "APPLICANT";
    public static final String ATTR_OFFER_STATUS = "OFFER_STATUS";
    public static final String ATTR_CREATION_DATE = "CREATION_DATE";
    public static final String ATTR_START_DATE = "START_DATE";
    public static final String ATTR_END_DATE = "END_DATE";

}
{% endhighlight %}

{{"**OfferStatusDao.java**" | markdownify }}
{% highlight java %}
package com.ontimize.hr.model.core.dao;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;

@Repository("OfferStatusDao")
@Lazy
@ConfigurationFile(configurationFile = "dao/OfferStatusDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class OfferStatusDao extends OntimizeJdbcDaoSupport {

    public static final String ATTR_ID ="ID";
    public static final String ATTR_DESCRIPTION ="DESCRIPTION";

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
                                    <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OfferCandidatesDao.java</li>
                                    <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OfferCandidateStatusDao.java</li>
                                    <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OfferDao.java</li>
                                    <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OfferStatusDao.java</li>
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
                          <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OfferCandidatesDao.xml</li>
                          <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OfferCandidateStatusDao.xml</li>
                          <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OfferDao.xml</li>
                          <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OfferStatusDao.xml</li>
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

## Creación de la interfaz del servicio
Creamos la interfaz del servicio de ofertas para el cual hemos creado los DAO.

<div class="multicolumn">
        <div class="multicolumnleft">
            <button class="unstyle toggle-tree-btn">
                <span class="material-symbols-outlined">right_panel_open</span>
            </button>
{{"**IOfferService.java**" | markdownify }}
{% highlight java %}
package com.ontimize.hr.api.core.service;

import java.util.List;
import java.util.Map;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

public interface IOfferService {

    // OFFER
    EntityResult offerQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;

    EntityResult offerInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;

    EntityResult offerUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    EntityResult offerDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    // OFFER STATUS
    EntityResult offerStatusQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;

    EntityResult offerStatusInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;

    EntityResult offerStatusUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    EntityResult offerStatusDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    // OFFER CANDIDATES
    EntityResult offerCandidateQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;

    EntityResult offerCandidateInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;

    EntityResult offerCandidateUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    EntityResult offerCandidateDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    // OFFER CANDIDATES STATUS
    EntityResult offerCandidateStatusQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;

    EntityResult offerCandidateStatusInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;

    EntityResult offerCandidateStatusUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

    EntityResult offerCandidateStatusDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
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
                                  <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>IOfferService.java</li>
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

## Creación del servicio
Creamos una clase como servicio e implementamos la interfaz anterior.

<div class="multicolumn">
        <div class="multicolumnleft">
            <button class="unstyle toggle-tree-btn">
                <span class="material-symbols-outlined">right_panel_open</span>
            </button>
{{"**OfferService.java**" | markdownify }}
{% highlight java %}
package com.ontimize.hr.model.core.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;


import com.ontimize.hr.api.core.service.IOfferService;
import com.ontimize.hr.model.core.dao.OfferCandidateStatusDao;
import com.ontimize.hr.model.core.dao.OfferCandidatesDao;
import com.ontimize.hr.model.core.dao.OfferDao;
import com.ontimize.hr.model.core.dao.OfferStatusDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
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
    public EntityResult offerQuery(Map<String, Object> keyMap, List<String> attrList)
            throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.offerDao, keyMap, attrList);
    }

    @Override
    public EntityResult offerInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.offerDao, attrMap);
    }

    @Override
    public EntityResult offerUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap)
            throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.offerDao, attrMap, keyMap);
    }

    @Override
    public EntityResult offerDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.offerDao, keyMap);
    }

    @Override
    public EntityResult offerStatusQuery(Map<String, Object> keyMap, List<String> attrList)
            throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.offerStatusDao, keyMap, attrList);
    }

    @Override
    public EntityResult offerStatusInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.offerStatusDao, attrMap);
    }

    @Override
    public EntityResult offerStatusUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap)
            throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.offerStatusDao, attrMap, keyMap);
    }

    @Override
    public EntityResult offerStatusDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.offerStatusDao, keyMap);
    }

    @Override
    public EntityResult offerCandidateQuery(Map<String, Object> keyMap, List<String> attrList)
            throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.offerCandidatesDao, keyMap, attrList);
    }

    @Override
    public EntityResult offerCandidateInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.offerCandidatesDao, attrMap);
    }

    @Override
    public EntityResult offerCandidateUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap)
            throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.offerCandidatesDao, attrMap, keyMap);
    }

    @Override
    public EntityResult offerCandidateDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.offerCandidatesDao, keyMap);
    }

    @Override
    public EntityResult offerCandidateStatusQuery(Map<String, Object> keyMap, List<String> attrList)
            throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.offerCandidateStatusDao, keyMap, attrList);
    }

    @Override
    public EntityResult offerCandidateStatusInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.insert(this.offerCandidateStatusDao, attrMap);
    }

    @Override
    public EntityResult offerCandidateStatusUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap)
            throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.offerCandidateStatusDao, attrMap, keyMap);
    }

    @Override
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

## Creación del controlador
Esta clase servirá para responder a las peticiones REST del servicio _OfferService_.

<div class="multicolumn">
        <div class="multicolumnleft">
            <button class="unstyle toggle-tree-btn">
                <span class="material-symbols-outlined">right_panel_open</span>
            </button>
{{"**OfferRestController.java**" | markdownify }}
{% highlight java %}
package com.ontimize.hr.ws.core.rest;

import com.ontimize.hr.api.core.service.IOfferService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/offers")
public class OfferRestController extends ORestController<IOfferService> {

    @Autowired
    private IOfferService offerService;

    @Override
    public IOfferService getService() {
        return this.offerService;
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

[<span style="display: flex; align-items: center;"><span class="material-symbols-outlined">arrow_back</span> Tutorial anterior</span>]({{ base_path }}/tutorial/exercise7){: .btn}
[<span style="display: flex; align-items: center;">Próximo tutorial <span class="material-symbols-outlined">arrow_forward</span></span>]({{ base_path }}/tutorial/exercise9){: .btn}

