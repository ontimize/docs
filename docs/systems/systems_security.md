---
title: "Security System"
layout: default
permalink: /systems/security/
parent: Systems
nav_order: 8
---

{% include base_path %}
{% include toc %}

# Security System
## Introduction
Ontimize security allows you to set permissions to each role that you assign to a specific user, so that different users can access (or not) the project services and methods.

## Prerequisites
You can follow this tutorial using your own application, although for this example we will use an application created using the archetype that can be found [on this page]({{ base_path }}/getting_started/) and with a REST service. 

There are 2 options to follow this tutorial, clone the repository with the initial state and follow the tutorial step by step, or download the final example and see which files are new and which have been updated.

<div class="multicolumn">
<div class="multicolumnnopadding" >
  {{ "**Initial project**

    /$ git clone https://github.com/ontimize/ontimize-examples 
    /ontimize-examples$ cd ontimize-examples
    /ontimize-examples$ git checkout boot-security-initial" 
    | markdownify }}
</div>
<div class="verticalDivider"></div>
<div class="multicolumnnopadding" >

  {{ "**Final example**

    /$ git clone https://github.com/ontimize/ontimize-examples 
    /ontimize-examples$ cd ontimize-examples
    /ontimize-examples$ git checkout boot-security" 
    | markdownify }}

</div>
</div>

{: .note}
> To simplify the code being written, three dots (...) may appear in some parts of the code. This indicates that there may be previous code before and after those dots.

## Steps
### Add new profile and user

We will add the following elements to the database:

- New user
{% highlight sql %}
INSERT INTO TUSER VALUES('candidate','candidate','candidate','candidate',NULL,'99999999R',NULL,'2020-07-03 11:50:40.665000',NULL)
{% endhighlight %}

- New user role
{% highlight sql %}
INSERT INTO TROLE VALUES(1,'candidate','<?xml version="1.0" encoding="UTF-8"?><security></security>')
{% endhighlight %}

- Relationship between the new user and the new role
{% highlight sql %}
INSERT INTO TUSER_ROLE VALUES(1,1,'candidate')
{% endhighlight %}

### Modify the service to add security

In the *projectwiki-boot* module we will add the annotation `@EnableAspectJAutoProxy(proxyTargetClass = false)` to the **ServerApplication.java** class and to each service method the `@Secured({ PermissionsProviderSecured.SECURED })` annotation.


<div class="multicolumn">
        <div class="multicolumnleft">
            <button class="unstyle toggle-tree-btn">
                <span class="material-symbols-outlined">right_panel_open</span>
            </button>
  {{ "**ServerApplication.java**"| markdownify }}

{% highlight java %}
package com.ontimize.projectwiki;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;


@SpringBootApplication
@EnableAspectJAutoProxy(proxyTargetClass = false)
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

}
{% endhighlight %}


  {{ "**CustomerService.java**"| markdownify }}

{% highlight java %}
package com.ontimize.projectwiki.model.core.service;

. . .
import org.springframework.security.access.annotation.Secured;


. . . 
import com.ontimize.jee.common.security.PermissionsProviderSecured;

. . .

public class CandidateService implements ICandidateService {

. . .

	@Override
	@Secured({ PermissionsProviderSecured.SECURED })
	public EntityResult candidateQuery(Map<String, Object> keyMap, List<String> attrList)
			throws OntimizeJEERuntimeException {
		return this.daoHelper.query(this.candidateDao, keyMap, attrList);
	}

	@Override
	@Secured({ PermissionsProviderSecured.SECURED })
	@Transactional(rollbackFor = Exception.class)
	public EntityResult candidateInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
		return this.daoHelper.insert(this.candidateDao, attrMap);
	}

	@Override
	@Secured({ PermissionsProviderSecured.SECURED })
	@Transactional(rollbackFor = Exception.class)
	public EntityResult candidateUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap)
			throws OntimizeJEERuntimeException {
		return this.daoHelper.update(this.candidateDao, attrMap, keyMap);
	}

	@Override
	@Secured({ PermissionsProviderSecured.SECURED })
	public EntityResult candidateDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
		return this.daoHelper.delete(this.candidateDao, keyMap);
	}
	
}
{% endhighlight %}

</div>
<div class="multicolumnright jstreeloader collapsed">
<ul>
  <li data-jstree='{"opened":true, "icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
  ontimize-examples
  <ul>
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
    projectwiki-api
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
                projectwiki
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
    projectwiki-boot
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
                projectwiki
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
    projectwiki-model
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
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>templateDB.properties</li>
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
                projectwiki
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
    projectwiki-ws
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
                projectwiki
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
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>README.md</li>
  </ul>
  </li>
</ul>
</div>
</div>

### Add permissions for methods

Once the methods have been noted, it is necessary to add the service and the method that we have noted to the table of the DB that stores those elements and to the table that indicates the methods for which the role has permission.

{% highlight sql lineos%}
INSERT INTO TSERVER_PERMISSION VALUES('com.ontimize.projectwiki.model.core.service.ICandidateService/candidateQuery')
INSERT INTO TSERVER_PERMISSION VALUES('com.ontimize.projectwiki.model.core.service.ICandidateService/candidateInsert')
INSERT INTO TSERVER_PERMISSION VALUES('com.ontimize.projectwiki.model.core.service.ICandidateService/candidateUpdate')
INSERT INTO TSERVER_PERMISSION VALUES('com.ontimize.projectwiki.model.core.service.ICandidateService/candidateDelete')

INSERT INTO TROLE_SERVER_PERMISSION VALUES(0,1)
INSERT INTO TROLE_SERVER_PERMISSION VALUES(0,2)
INSERT INTO TROLE_SERVER_PERMISSION VALUES(0,3)
INSERT INTO TROLE_SERVER_PERMISSION VALUES(0,4)
{% endhighlight %}


If we try to make requests through [Postman](https://www.postman.com/){:target="_blank"} to the service of CandidateService, changing the authentication by the user candidate and password candidate, it will give an error, since the user candidate does not belong to the role admin which is the only role that has permissions to make these queries.