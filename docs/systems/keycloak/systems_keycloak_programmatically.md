---
title: "Providing the tenants programmatically"
layout: default
permalink: /systems/keycloak/multitenant/programmatically
grand_parent: Systems
parent: Keycloak Security
nav_order: 3
---

{% include base_path %}
{% include toc %}

# Keycloak Security providing the tenants programmatically

## Introduction

**Ontimize** allows you to provide a list of tenants programmatically. This is useful when the application will manage a dynamic list of tenants.

## Prerequisites

There are 2 options to follow this tutorial, clone the repository with the initial state and follow the tutorial step by step, or download the final example and see which files are new and which have been updated.

<div class="multicolumn">
  <div class="multicolumnnopadding" >
  {{ "**Initial project**

    /$ git clone https://github.com/ontimize/ontimize-examples
    /ontimize-examples$ cd ontimize-examples
    /ontimize-examples$ git checkout boot-keycloak-login-custom-initial"
    | markdownify }}

</div>
<div class="verticalDivider"></div>
<div class="multicolumnnopadding">

{{ "**Final example**

    /$ git clone https://github.com/ontimize/ontimize-examples
    /ontimize-examples$ cd ontimize-examples
    /ontimize-examples$ git checkout boot-keycloak-login-custom"
    | markdownify }}

  </div>
  </div>
### Keycloak

We need a [Keycloak](https://www.keycloak.org/) instance, then we must configure two realms with their own clients, roles and users. For the examples we will use the next settings:

#### Tenant 1:

| Element         | Value                 | Meaning                                                                               |
|-----------------|-----------------------|---------------------------------------------------------------------------------------|
| Url             | http://localhost:8082 | The URL of the host for keycloak security                                             |
| Realm           | demo1                 | The realm name                                                                        |
| Client          | projectwiki1          | The client name (Enable the **implicit flow** check to allow testing with Swagger UI) |
| Role            | admin                 | The role name                                                                         |
| User            | demo1                 | The username                                                                          |
| Password        | demouser              | The user password                                                                     |

#### Tenant 2:

| Element         | Value                 | Meaning                                                                               |
|-----------------|-----------------------|---------------------------------------------------------------------------------------|
| Url             | http://localhost:8082 | The URL of the host for keycloak security                                             |
| Realm           | demo2                 | The realm name                                                                        |
| Client          | projectwiki2          | The client name (Enable the **implicit flow** check to allow testing with Swagger UI) |
| Role            | admin                 | The role name (For the examples we will use client roles)                             |
| User            | demo2                 | The username                                                                          |
| Password        | demouser              | The user password                                                                     |

{: .note}
> To simplify the code being written, three dots (...) may appear in some parts of the code. This indicates that there may be previous code before and after those dots.

## Steps
### Configure the role

If the role does not exist in the database, we can create it with the following command:

{% highlight sql %}
INSERT INTO TROLE(ID_ROLENAME,ROLENAME,XMLCLIENTPERMISSION) VALUES(0,'admin','<?xml version="1.0" encoding="UTF-8"?><security></security>')
{% endhighlight %}

### Add the Keycloak dependency to the Boot module

{: .note}
> The Keycloak system is integrated in the **Ontimize Core** module, so we need to declare it as a project dependency.

<div class="multicolumn">
        <div class="multicolumnleft">
            <button class="unstyle toggle-tree-btn">
                <span class="material-symbols-outlined">right_panel_open</span>
            </button>
  {{ "**pom.xml**"| markdownify }}

{% highlight xml %}
...
  <dependencies>
    ...
    <dependency>
      <groupId>com.ontimize.boot</groupId>
      <artifactId>ontimize-boot-starter-keycloak</artifactId>
    </dependency>
    ...
  </dependencies>
...
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
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
            public
            <ul>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>index.html</li>
            </ul>
            </li>
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>application.yml</li>
          </ul>
          </li>
        </ul>
        </li>
      </ul>
      </li>
      <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
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
    projectwiki-openapi
    <ul>
      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
      src
      <ul>
        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
        main
        <ul>
          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
          ontimize
          <ul>
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>marker-ws-ontimize-openapi-generator</li>
          </ul>
          </li>
          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
          resources
          <ul>
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
            public
            <ul>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
              restapi
              <ul>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                api
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Test.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>User.yml</li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                base
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>AdvancedEntityResult.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>AdvancedQueryParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ColumnsParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>DeleteParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>DocumentIdentifier.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>EntityResult.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ExportParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>FileListParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>FilterParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>InsertParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MultipartFile.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MultipartFiles.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Number.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Object.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OFile.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OFiles.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Operator.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>QueryParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Responses.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>SQLOrder.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>String.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UpdateFileParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UpdateParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Void.yml</li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>openapi-rest.yml</li>
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
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>README.md</li>
  </ul>
  </li>
</ul>
</div>
</div>

### Enable the Keycloak security

In the *application.yml* we need to change the ontimize security mode to **keycloak** and add the following properties (More information in [this link]({{ base_path }}/basics/autoconfigurators/#keycloak)):

<div class="multicolumn">
        <div class="multicolumnleft">
            <button class="unstyle toggle-tree-btn">
                <span class="material-symbols-outlined">right_panel_open</span>
            </button>

  {{ "**application.yml**"| markdownify }}


{% highlight yaml %}
ontimize:
   ...
   security:
      mode: keycloak
      keycloak:
         tenants-provider: custom
         public-client: true
         use-client-role-mappings: true
...
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
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
            public
            <ul>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>index.html</li>
            </ul>
            </li>
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
    projectwiki-openapi
    <ul>
      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
      src
      <ul>
        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
        main
        <ul>
          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
          ontimize
          <ul>
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>marker-ws-ontimize-openapi-generator</li>
          </ul>
          </li>
          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
          resources
          <ul>
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
            public
            <ul>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
              restapi
              <ul>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                api
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Test.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>User.yml</li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                base
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>AdvancedEntityResult.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>AdvancedQueryParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ColumnsParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>DeleteParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>DocumentIdentifier.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>EntityResult.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ExportParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>FileListParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>FilterParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>InsertParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MultipartFile.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MultipartFiles.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Number.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Object.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OFile.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OFiles.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Operator.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>QueryParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Responses.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>SQLOrder.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>String.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UpdateFileParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UpdateParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Void.yml</li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>openapi-rest.yml</li>
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
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>README.md</li>
  </ul>
  </li>
</ul>
</div>
</div>

### Add the dependencies to the Model module

<div class="multicolumn">
        <div class="multicolumnleft">
            <button class="unstyle toggle-tree-btn">
                <span class="material-symbols-outlined">right_panel_open</span>
            </button>
  {{ "**pom.xml**"| markdownify }}

{% highlight xml %}
...
  <dependencies>
    ...
    <dependency>
        <groupId>com.ontimize.jee</groupId>
        <artifactId>ontimize-jee-server-keycloak</artifactId>
    </dependency>
    ...
  </dependencies>
...
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
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
            public
            <ul>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>index.html</li>
            </ul>
            </li>
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
      <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
    </ul>
    </li>
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
    projectwiki-openapi
    <ul>
      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
      src
      <ul>
        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
        main
        <ul>
          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
          ontimize
          <ul>
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>marker-ws-ontimize-openapi-generator</li>
          </ul>
          </li>
          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
          resources
          <ul>
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
            public
            <ul>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
              restapi
              <ul>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                api
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Test.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>User.yml</li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                base
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>AdvancedEntityResult.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>AdvancedQueryParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ColumnsParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>DeleteParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>DocumentIdentifier.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>EntityResult.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ExportParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>FileListParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>FilterParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>InsertParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MultipartFile.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MultipartFiles.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Number.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Object.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OFile.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OFiles.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Operator.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>QueryParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Responses.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>SQLOrder.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>String.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UpdateFileParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UpdateParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Void.yml</li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>openapi-rest.yml</li>
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
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>README.md</li>
  </ul>
  </li>
</ul>
</div>
</div>

### Provide the tenants programatically

The **OntimizeKeycloakConfigResolver** bean is responsible for managing tenants, so we need to provide it with the tenants we want to use. For this we will add the new TenantsService class.

<div class="multicolumn">
        <div class="multicolumnleft">
            <button class="unstyle toggle-tree-btn">
                <span class="material-symbols-outlined">right_panel_open</span>
            </button>

{{ "**TenantsService.java**"| markdownify }}

{% highlight java %}
package com.ontimize.projectwiki.model.core.services;

import com.ontimize.jee.common.multitenant.ITenantAuthenticationInfo;
import com.ontimize.jee.server.security.keycloak.OntimizeKeycloakConfigResolver;
import com.ontimize.jee.server.security.keycloak.store.TenantAuthenticationInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service("TenantsService")
public class TenantsService {
	private final Map<String, ITenantAuthenticationInfo> authenticationMap = new HashMap<>();

	@Autowired
	public TenantsService(final OntimizeKeycloakConfigResolver keycloakConfigResolver) {
		this.AddTenant("tenant1", "Tenant 1", "http://localhost:8082", "demo1", "projectwiki1");
		this.AddTenant("tenant2", "Tenant 2", "http://localhost:8082", "demo2", "projectwiki2");
		keycloakConfigResolver.setTenantsAuthenticationInfo(this.authenticationMap);
	}

	private void AddTenant(final String tenantId, final String tenantName, final String url, final String realm, final String client) {
		final TenantAuthenticationInfo frontAuthInfo = new TenantAuthenticationInfo();
		frontAuthInfo.setTenantId(tenantId);
		frontAuthInfo.setTenantName(tenantName);
		frontAuthInfo.setUrl(url);
		frontAuthInfo.setRealm(realm);
		frontAuthInfo.setClient(client);
		this.authenticationMap.put(tenantId, frontAuthInfo);
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
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
            public
            <ul>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>index.html</li>
            </ul>
            </li>
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
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserDao.java</li>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserRoleDao.java</li>
                      </ul>
                      </li>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                      service
                      <ul>
                        <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>TenantsService.java</li>
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
    projectwiki-openapi
    <ul>
      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
      src
      <ul>
        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
        main
        <ul>
          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
          ontimize
          <ul>
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>marker-ws-ontimize-openapi-generator</li>
          </ul>
          </li>
          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
          resources
          <ul>
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
            public
            <ul>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
              restapi
              <ul>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                api
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Test.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>User.yml</li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                base
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>AdvancedEntityResult.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>AdvancedQueryParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ColumnsParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>DeleteParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>DocumentIdentifier.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>EntityResult.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ExportParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>FileListParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>FilterParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>InsertParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MultipartFile.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MultipartFiles.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Number.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Object.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OFile.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OFiles.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Operator.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>QueryParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Responses.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>SQLOrder.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>String.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UpdateFileParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UpdateParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Void.yml</li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>openapi-rest.yml</li>
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
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>README.md</li>
  </ul>
  </li>
</ul>
</div>
</div>

## Removing the configurations and classes that are no longer needed

Once the **Keycloak** authentication had been implemented, the configurations and the data access objects for Ontimize authentication can be removed.

### OpenAPI declaration files

The CRUD endpoints for the users management are no longer used, then we can remove tem or comment out in the **openapi-rest.yml** and **user.yml** files.

<div class="multicolumn">
        <div class="multicolumnleft">
            <button class="unstyle toggle-tree-btn">
                <span class="material-symbols-outlined">right_panel_open</span>
            </button>

{{ "**openapi-rest.yml**"| markdownify }}


{% highlight yaml %}
...
paths:
  ...
#  /users/user:
#    $ref: 'api/User.yml#/default'
#  /users/user/search:
#    $ref: 'api/User.yml#/search'
  /users/login:
    $ref: 'api/User.yml#/login'
...
{% endhighlight %}


{{ "**User.yml**"| markdownify }}

{% highlight yaml %}
#default:
#  post:
#    tags:
#      - Users
#    summary: Inserts a User.
#    description: >
#      This resource represents a user in the system.
#    x-restcontroller: orestcontroller
#    requestBody:
#      required: true
#      content:
#        application/json:
#          schema:
#            $ref: '../base/InsertParameter.yml#/components/schemas/InsertParameter'
#          examples:
#            Laura Bugle:
#              value:
#                data:
#                  USER_: 'laura'
#                  PASSWORD: '1432'
#                  NAME: 'Laura'
#                  SURNAME: 'Bugle'
#                  EMAIL: 'laurabugle@gmail.com'
#                  NIF: '11111111H'
#                  USERBLOCKED: '2016-09-19T12:00:00Z'
#                  LASTPASSWORDUPDATE: '2021-06-01T12:00:00'
#                  FIRSTLOGIN: true
#                sqltypes:
#                  USER_: 12
#                  PASSWORD: 12
#                  NAME: 12
#                  SURNAME: 12
#                  EMAIL: 12
#                  NIF: 12
#                  USERBLOCKED: 93
#                  LASTPASSWORDUPDATE: 93
#                  FIRSTLOGIN: 16
#    responses:
#      '200':
#        $ref: '../base/Responses.yml#/components/responses/EntityResult'
#      '400':
#        $ref: '../base/Responses.yml#/components/responses/BadRequest'
#      '401':
#        $ref: '../base/Responses.yml#/components/responses/Unauthorized'
#      '404':
#        $ref: '../base/Responses.yml#/components/responses/NotFound'
#      default:
#        $ref: '../base/Responses.yml#/components/responses/Unexpected'
#
#  get:
#    tags:
#      - Users
#    summary: Returns a list of Users.
#    description: >
#      This resource represents a list of users in the system.
#    x-restcontroller: orestcontroller
#    parameters:
#      - in: query
#        name: filter
#        description: Filter
#        schema:
#          type: string
#        required: false
#        examples:
#          user_:
#            value: 'USER_=laura'
#          password:
#            value: 'PASSWORD=1432'
#          name:
#            value: 'NAME=Laura'
#          surname:
#            value: 'SURNAME=Bugle'
#          email:
#            value: 'EMAIL=laurabugle@gmail.com'
#          nif:
#            value: 'NIF=11111111H'
#      - in: query
#        name: columns
#        description: Columns
#        required: false
#        schema:
#          type: string
#          example: USER_,PASSWORD,NAME,SURNAME,EMAIL,NIF,USERBLOCKED,LASTPASSWORDUPDATE,FIRSTLOGIN
#    responses:
#      '200':
#        $ref: '../base/Responses.yml#/components/responses/EntityResult'
#      '400':
#        $ref: '../base/Responses.yml#/components/responses/BadRequest'
#      '401':
#        $ref: '../base/Responses.yml#/components/responses/Unauthorized'
#      '404':
#        $ref: '../base/Responses.yml#/components/responses/NotFound'
#      default:
#        $ref: '../base/Responses.yml#/components/responses/Unexpected'
#
#  put:
#    tags:
#      - Users
#    summary: Updates a User.
#    description: >
#      This resource represents a user in the system.
#    x-restcontroller: orestcontroller
#    requestBody:
#      required: true
#      content:
#        application/json:
#          schema:
#            $ref: '../base/UpdateParameter.yml#/components/schemas/UpdateParameter'
#          examples:
#            pasword:
#              value:
#                data:
#                  PASSWORD: 'mT765HkqjY_34:76l'
#                filter:
#                  USER_: 'laura'
#                sqltypes:
#                  USER_: 12
#            email:
#              value:
#                data:
#                  EMAIL: 'laura.bugle@gmail.com'
#                filter:
#                  USER_: 'laura'
#                sqltypes:
#                  USER_: 12
#    responses:
#      '200':
#        $ref: '../base/Responses.yml#/components/responses/EntityResult'
#      '400':
#        $ref: '../base/Responses.yml#/components/responses/BadRequest'
#      '401':
#        $ref: '../base/Responses.yml#/components/responses/Unauthorized'
#      '404':
#        $ref: '../base/Responses.yml#/components/responses/NotFound'
#      default:
#        $ref: '../base/Responses.yml#/components/responses/Unexpected'
#
#  delete:
#    tags:
#      - Users
#    summary: Deletes a User.
#    description: >
#      This resource represents a user in the system.
#    x-restcontroller: orestcontroller
#    requestBody:
#      required: true
#      content:
#        application/json:
#          schema:
#            $ref: '../base/DeleteParameter.yml#/components/schemas/DeleteParameter'
#          examples:
#            userid:
#              value:
#                filter:
#                  USER_: 'laura'
#                sqltypes:
#                  USER_: 12
#    responses:
#      '200':
#        $ref: '../base/Responses.yml#/components/responses/EntityResult'
#      '400':
#        $ref: '../base/Responses.yml#/components/responses/BadRequest'
#      '401':
#        $ref: '../base/Responses.yml#/components/responses/Unauthorized'
#      '404':
#        $ref: '../base/Responses.yml#/components/responses/NotFound'
#      default:
#        $ref: '../base/Responses.yml#/components/responses/Unexpected'
#
#search:
#  post:
#    tags:
#      - Users
#    summary: Searches and returns a list of Users.
#    description: >
#      This resource represents a list of users in the system.
#    x-restcontroller: orestcontroller
#    requestBody:
#      content:
#        application/json:
#          schema:
#            $ref: '../base/QueryParameter.yml#/components/schemas/QueryParameter'
#          examples:
#            surname:
#              value:
#                filter:
#                  SURNAME: 'Bugle'
#                columns:
#                  - USER_
#                  - PASSWORD
#                  - NAME
#                  - SURNAME
#                  - EMAIL
#                  - NIF
#                  - USERBLOCKED
#                  - LASTPASSWORDUPDATE
#                  - FIRSTLOGIN
#                sqltypes:
#                  SURNAME: 12
#    responses:
#      '200':
#        $ref: '../base/Responses.yml#/components/responses/EntityResult'
#      '400':
#        $ref: '../base/Responses.yml#/components/responses/BadRequest'
#      '401':
#        $ref: '../base/Responses.yml#/components/responses/Unauthorized'
#      '404':
#        $ref: '../base/Responses.yml#/components/responses/NotFound'
#      default:
#        $ref: '../base/Responses.yml#/components/responses/Unexpected'
login:
  post:
    operationId: login
    tags:
      - Users
    summary: Validates the current session.
    description: >
      This resource represents a session in the system.
    x-hasparentpath: true
    responses:
      '200':
        $ref: '../base/Responses.yml#/components/responses/EntityResult'
      '400':
        $ref: '../base/Responses.yml#/components/responses/BadRequest'
      '401':
        $ref: '../base/Responses.yml#/components/responses/Unauthorized'
      '404':
        $ref: '../base/Responses.yml#/components/responses/NotFound'
      default:
        $ref: '../base/Responses.yml#/components/responses/Unexpected'
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
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
            public
            <ul>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>index.html</li>
            </ul>
            </li>
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
    projectwiki-openapi
    <ul>
      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
      src
      <ul>
        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
        main
        <ul>
          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
          ontimize
          <ul>
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>marker-ws-ontimize-openapi-generator</li>
          </ul>
          </li>
          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
          resources
          <ul>
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
            public
            <ul>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
              restapi
              <ul>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                api
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Test.yml</li>
                  <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>User.yml</li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                base
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>AdvancedEntityResult.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>AdvancedQueryParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ColumnsParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>DeleteParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>DocumentIdentifier.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>EntityResult.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ExportParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>FileListParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>FilterParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>InsertParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MultipartFile.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MultipartFiles.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Number.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Object.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OFile.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OFiles.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Operator.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>QueryParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Responses.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>SQLOrder.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>String.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UpdateFileParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UpdateParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Void.yml</li>
                </ul>
                </li>
                <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>openapi-rest.yml</li>
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
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>README.md</li>
  </ul>
  </li>
</ul>
</div>
</div>

### Configurations for user information in application.yml

The **user-information-service** and **user-role-information-service** configurations under ontimize.security are no longer used and we can remove them.

<div class="multicolumn">
        <div class="multicolumnleft">
            <button class="unstyle toggle-tree-btn">
                <span class="material-symbols-outlined">right_panel_open</span>
            </button>

{{ "**application.yml**"| markdownify }}

{% highlight yaml %}
ontimize:
...
   security:
      ...
#      user-information-service:
#         user-repository: UserDao
#         user-login-column: USER_
#         user-password-column: PASSWORD
#         query-id: login
#         other-data:
#            - NAME
#            - SURNAME
#            - EMAIL
#            - NIF
#            - USERBLOCKED
#            - LASTPASSWORDUPDATE
#            - FIRSTLOGIN
#      user-role-information-service:
#         user-role-repository: UserRoleDao
#         query-id: userRole
#         role-login-column: USER_
#         role-name-column: ROLENAME
...
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
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
            public
            <ul>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>index.html</li>
            </ul>
            </li>
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
    projectwiki-openapi
    <ul>
      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
      src
      <ul>
        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
        main
        <ul>
          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
          ontimize
          <ul>
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>marker-ws-ontimize-openapi-generator</li>
          </ul>
          </li>
          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
          resources
          <ul>
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
            public
            <ul>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
              restapi
              <ul>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                api
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Test.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>User.yml</li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                base
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>AdvancedEntityResult.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>AdvancedQueryParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ColumnsParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>DeleteParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>DocumentIdentifier.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>EntityResult.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ExportParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>FileListParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>FilterParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>InsertParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MultipartFile.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MultipartFiles.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Number.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Object.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OFile.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OFiles.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Operator.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>QueryParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Responses.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>SQLOrder.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>String.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UpdateFileParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UpdateParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Void.yml</li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>openapi-rest.yml</li>
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
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>README.md</li>
  </ul>
  </li>
</ul>
</div>
</div>

### User CRUD API

The CRUD endpoints for the users management are no longer used, then we can remove them or comment out the inheritance of the **ORestController** class in the **UserRestController**.

<div class="multicolumn">
        <div class="multicolumnleft">
            <button class="unstyle toggle-tree-btn">
                <span class="material-symbols-outlined">right_panel_open</span>
            </button>

{{ "**UserRestController.java**"| markdownify }}

{% highlight java %}
package com.ontimize.projectwiki.ws.core.rest;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

// import com.ontimize.projectwiki.api.core.service.IUserService;
import com.ontimize.jee.common.dto.EntityResult;
// import com.ontimize.jee.server.rest.ORestController;


@RestController
@RequestMapping("/users")
public class UserRestController /* extends ORestController<IUserService> */ {

/*
       @Autowired
       private IUserService userSrv;

       @Override
       public IUserService getService() {
               return this.userSrv;
       }
*/

	@RequestMapping(
		value = "/login",
		method = RequestMethod.POST,
		produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<EntityResult> login() {
		return new ResponseEntity<>(HttpStatus.OK);
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
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
            public
            <ul>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>index.html</li>
            </ul>
            </li>
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
    projectwiki-openapi
    <ul>
      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
      src
      <ul>
        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
        main
        <ul>
          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
          ontimize
          <ul>
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>marker-ws-ontimize-openapi-generator</li>
          </ul>
          </li>
          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
          resources
          <ul>
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
            public
            <ul>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
              restapi
              <ul>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                api
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Test.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>User.yml</li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                base
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>AdvancedEntityResult.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>AdvancedQueryParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ColumnsParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>DeleteParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>DocumentIdentifier.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>EntityResult.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ExportParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>FileListParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>FilterParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>InsertParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MultipartFile.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MultipartFiles.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Number.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Object.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OFile.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OFiles.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Operator.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>QueryParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Responses.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>SQLOrder.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>String.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UpdateFileParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UpdateParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Void.yml</li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>openapi-rest.yml</li>
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
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MainRestController.java</li>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>TestRestController.java</li>
                        <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserRestController.java</li>
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
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>README.md</li>
  </ul>
  </li>
</ul>
</div>
</div>

### Services and data access objects for user information

The user services and DAOs are no longer needed and we can remove them.

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
                        <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>IUserService.java</li>
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
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
            public
            <ul>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>index.html</li>
            </ul>
            </li>
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
                        <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserDao.java</li>
                        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserRoleDao.java</li>
                      </ul>
                      </li>
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                      service
                      <ul>
                        <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserService.java</li>
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
              <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UserDao.xml</li>
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
    projectwiki-openapi
    <ul>
      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
      src
      <ul>
        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
        main
        <ul>
          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
          ontimize
          <ul>
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>marker-ws-ontimize-openapi-generator</li>
          </ul>
          </li>
          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
          resources
          <ul>
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
            public
            <ul>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
              restapi
              <ul>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                api
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Test.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>User.yml</li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                base
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>AdvancedEntityResult.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>AdvancedQueryParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ColumnsParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>DeleteParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>DocumentIdentifier.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>EntityResult.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ExportParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>FileListParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>FilterParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>InsertParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MultipartFile.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MultipartFiles.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Number.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Object.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OFile.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OFiles.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Operator.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>QueryParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Responses.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>SQLOrder.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>String.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UpdateFileParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UpdateParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Void.yml</li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>openapi-rest.yml</li>
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
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>README.md</li>
  </ul>
  </li>
</ul>
</div>

### Tables for user information

With the above configurations and classes removed, we can remove the user tables from the database with the following commands:

<div class="multicolumn">
        <div class="multicolumnleft">
            <button class="unstyle toggle-tree-btn">
                <span class="material-symbols-outlined">right_panel_open</span>
            </button>

{% highlight sql %}
DELETE FROM TROLE_SERVER_PERMISSION WHERE ID_ROLE_SERVER_PERMISSION = 0
DELETE FROM TSERVER_PERMISSION WHERE ID_SERVER_PERMISSION = 0
DROP TABLE PUBLIC.TUSER_PREFERENCE
DROP TABLE PUBLIC.TUSER_ROLE
DROP TABLE PUBLIC.TUSER
{% endhighlight %}

And we can remove them from the database creation script.

{{ "**templateDB.txt**"| markdownify }}

{% highlight sql %}
...
CREATE MEMORY TABLE PUBLIC.TUSER(USER_ VARCHAR(50) NOT NULL PRIMARY KEY,PASSWORD VARCHAR(255),NAME VARCHAR(50),SURNAME VARCHAR(50),EMAIL VARCHAR(50),NIF VARCHAR(50),USERBLOCKED TIMESTAMP,LASTPASSWORDUPDATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,FIRSTLOGIN BOOLEAN DEFAULT TRUE)
...
CREATE MEMORY TABLE PUBLIC.TUSER_ROLE(ID_USER_ROLE INTEGER GENERATED BY DEFAULT AS IDENTITY(START WITH 0) NOT NULL PRIMARY KEY,ID_ROLENAME INTEGER,USER_ VARCHAR(50),CONSTRAINT FK_TUSER FOREIGN KEY(USER_) REFERENCES PUBLIC.TUSER(USER_),CONSTRAINT FK_TROLE FOREIGN KEY(ID_ROLENAME) REFERENCES PUBLIC.TROLE(ID_ROLENAME))
ALTER TABLE PUBLIC.TUSER_ROLE ALTER COLUMN ID_USER_ROLE RESTART WITH 1
...
CREATE MEMORY TABLE PUBLIC.TUSER_PREFERENCE(ID_USER_PREFERENCE INTEGER GENERATED BY DEFAULT AS IDENTITY(START WITH 0) NOT NULL PRIMARY KEY,PREFERENCE_NAME VARCHAR(150),USER_LOGIN VARCHAR(150),PREFERENCE_VALUE VARCHAR(16777216))
ALTER TABLE PUBLIC.TUSER_PREFERENCE ALTER COLUMN ID_USER_PREFERENCE RESTART WITH 1
...
INSERT INTO TUSER VALUES('demo','demouser','demo','demo',NULL,'44460713B',NULL,NULL,NULL)
...
INSERT INTO TUSER_ROLE VALUES(0,0,'demo')
...
INSERT INTO TSERVER_PERMISSION VALUES(0,'com.ontimize.jee.common.services.user.IUserInformationService/getUserInformation')
...
INSERT INTO TUSER_PREFERENCE VALUES(0,'user_preference','demo','Iw0KI1R1ZSBNYXkgMTYgMTI6NTc6MDYgQ0VTVCAyMDE3DQpkZW1vX2FwcF9zdGF0dXNfYmFyX3Zpc2libGU9eWVzDQpkZW1vX2FkanVzdF90cmVlX3NwYWNlPXRydWUNCmRlbW9fYXBwX3dpbmRvd19zdGF0ZT0wDQpkZW1vX3RhYmxlX2NvbmZfc29ydF9maWx0ZXJfZm9ybUN1c3RvbWVyLnhtbF9DdXN0b21lclNlcnZpY2UuY3VzdG9tZXJfVEVTVD1udWxsO251bGw7U1VSTkFNRVw9OThcOjF8SURcPTc1XDoyfE5BTUVcPTk5XDozfENVU1RPTUVSVFlQRUlEXD0wXDo0fENVU1RPTUVSSURcPTEyNVw6NXxBRERSRVNTXD0xMjNcOjZ8UEhPTkVcPTEyMVw6N3xTVEFSVERBVEVcPTEzNlw6OHxMT05HSVRVREVcPTExNlw6OXxMQVRJVFVERVw9MTEzXDoxMHxFTUFJTFw9MTcwXDoxMnw7QkFTRTY0ck8wQUJYTnlBQk5xWVhaaExuVjBhV3d1U0dGemFIUmhZbXhsRTdzUEpTRks1TGdEQUFKR0FBcHNiMkZrUm1GamRHOXlTUUFKZEdoeVpYTm9iMnhrZUhBL1FBQUFBQUFBQ0hjSUFBQUFDd0FBQUFCNA0KZGVtb190YWJsZV9jb25mX3NvcnRfZmlsdGVyX2NvbmZpZ3VyYXRpb25zX2Zvcm1DdXN0b21lci54bWxfQ3VzdG9tZXJTZXJ2aWNlLmN1c3RvbWVyPVRFU1QNCmRlbW9fdGFibGVfY29udHJvbF9wYW5lbF9mb3JtQWNjb3VudHMtZGV0YWlsLnhtbF9Nb3ZlbWVudFNlcnZpY2UubW92ZW1lbnQ9Z3JvdXB0YWJsZWtleTtkZWZhdWx0Y2hhcnRidXR0b247ZXhjZWxleHBvcnRidXR0b247c3Vtcm93YnV0dG9uO2NhbGN1bGVkY29sc2J1dHRvbjtwcmludGluZ2J1dHRvbjtmaWx0ZXJzYXZlYnV0dG9uO3Zpc2libGVjb2xzYnV0dG9uO2h0bWxleHBvcnRidXR0b247Y29weWJ1dHRvbjtncm91cHRhYmxla2V5O2luc2VydGJ1dHRvbjtyZWZyZXNoYnV0dG9uDQpkZW1vX2Zvcm1CcmFuY2hlcy1kZXRhaWwueG1sPTg4MDs1MDU7LTExNTA7MzY5DQpkZW1vX2RldGFpbF9kaWFsb2dfc2l6ZV9wb3NpdGlvbl9mb3JtQ3VzdG9tZXIueG1sX0N1c3RvbWVyU2VydmljZS5jdXN0b21lcj03NDk7MzUwOy0xOTA1OzM5MQ0KZGVtb19hcHBfdG9vbGJhcl9sb2NhdGlvbj1Ob3J0aA0KZGVtb19hcHBfd2luZG93X3Bvc2l0aW9uPS0xNTgwOzExDQpkZW1vX2FwcF93aW5kb3dfc2l6ZT0xNTg0OzEwNDQNCmRlbW9fZm9ybUVtcGxveWVlcy1kZXRhaWwueG1sPTExMTY7NzM5OzYxMDsxOTUNCmRlbW9fZm9ybUFjY291bnRzLWRldGFpbC54bWw9OTE1OzUwMDstMTE1MDszNjkNCg==')
...
INSERT INTO TROLE_SERVER_PERMISSION VALUES(0,0,0)
...
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
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
            public
            <ul>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>index.html</li>
            </ul>
            </li>
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
            <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>templateDB.txt</li>
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
    projectwiki-openapi
    <ul>
      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
      src
      <ul>
        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
        main
        <ul>
          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
          ontimize
          <ul>
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>marker-ws-ontimize-openapi-generator</li>
          </ul>
          </li>
          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
          resources
          <ul>
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
            public
            <ul>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
              restapi
              <ul>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                api
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Test.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>User.yml</li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                base
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>AdvancedEntityResult.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>AdvancedQueryParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ColumnsParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>DeleteParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>DocumentIdentifier.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>EntityResult.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ExportParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>FileListParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>FilterParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>InsertParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MultipartFile.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MultipartFiles.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Number.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Object.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OFile.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OFiles.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Operator.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>QueryParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Responses.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>SQLOrder.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>String.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UpdateFileParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UpdateParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Void.yml</li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>openapi-rest.yml</li>
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
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>README.md</li>
  </ul>
  </li>
</ul>
</div>
</div>

## Testing

In order to call the REST API of the application, we must first log in using the Keycloak authentication user interface, capture the returned token, and then provide it in the authentication header of the http request.

To test this functionality we will use the [Swagger](https://swagger.io) tool deployed with the application, but we need to change the authentication settings on the OpenAPI declaration file.

### Modify openapi-rest.yml

In the *openapi-rest.yml* we need to change the security settings to use **OAuth2**, replacing the previous **BasicAuth** properties (More information in [this link](https://spec.openapis.org/oas/latest.html#security-scheme-object) and in [this link](https://www.keycloak.org/docs/latest/securing_apps/#_oidc)).

Also we need to add a new parameter to provide the tenant and in the User.yml file we need to add a reference to this parameter on each method:

<div class="multicolumn">
        <div class="multicolumnleft">
            <button class="unstyle toggle-tree-btn">
                <span class="material-symbols-outlined">right_panel_open</span>
            </button>

{{ "**openapi-rest.yml**"| markdownify }}


{% highlight yaml %}
components:
  ...
  parameters:
    TenantId:
      in: header
      name: X-Tenant
      required: true
      schema:
        type: string
      x-ignore: true
      examples:
        Tenant1:
          value: 'tenant1'
        Tenant2:
          value: 'tenant2'
  securitySchemes:
    OAuth2Demo1:
      type: oauth2
      flows:
        implicit:
          authorizationUrl: http://localhost:8082/realms/demo1/protocol/openid-connect/auth
          scopes: {}
    OAuth2Demo2:
      type: oauth2
      flows:
        implicit:
          authorizationUrl: http://localhost:8082/realms/demo2/protocol/openid-connect/auth
          scopes: {}
security:
  - OAuth2Demo1: []
  - OAuth2Demo2: []
...
{% endhighlight %}

{{ "**User.yml**"| markdownify }}

{% highlight yaml %}
...
login:
  post:
    ...
    parameters:
      - $ref: '../openapi-rest.yml#/components/parameters/TenantId'
...
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
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
            public
            <ul>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>index.html</li>
            </ul>
            </li>
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
    projectwiki-openapi
    <ul>
      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
      src
      <ul>
        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
        main
        <ul>
          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
          ontimize
          <ul>
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>marker-ws-ontimize-openapi-generator</li>
          </ul>
          </li>
          <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
          resources
          <ul>
            <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
            public
            <ul>
              <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
              restapi
              <ul>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                api
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Test.yml</li>
                  <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>User.yml</li>
                </ul>
                </li>
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                base
                <ul>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>AdvancedEntityResult.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>AdvancedQueryParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ColumnsParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>DeleteParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>DocumentIdentifier.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>EntityResult.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>ExportParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>FileListParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>FilterParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>InsertParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MultipartFile.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MultipartFiles.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Number.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Object.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OFile.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OFiles.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Operator.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>QueryParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Responses.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>SQLOrder.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>String.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UpdateFileParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>UpdateParameter.yml</li>
                  <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>Void.yml</li>
                </ul>
                </li>
                <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>openapi-rest.yml</li>
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
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>README.md</li>
  </ul>
  </li>
</ul>
</div>
</div>

### Testing using Tenant 1

Once we have built and launched the project, we can access to the application opening a web browser and going to [http://localhost:33333](http://localhost:33333)):

![keycloak_multitenant_swagger_1.png]({{ base_path }}/assets/images/keycloak_multitenant_swagger_1.png)

We must open the authorization dialog by clicking on the **Authorize** button, provide the **client** and click on the **Authorize** button.

![keycloak_multitenant_swagger_2.png]({{ base_path }}/assets/images/keycloak_multitenant_swagger_2.png)

If there is not exists a previous Keycloak session, a new tab will be opened requesting then credentials to login.

![keycloak_multitenant_swagger_3.png]({{ base_path }}/assets/images/keycloak_multitenant_swagger_3.png)

Once the login process has been completed, it will return to the authorization dialog, showing the result of the authorization process.

![keycloak_multitenant_swagger_4.png]({{ base_path }}/assets/images/keycloak_multitenant_swagger_4.png)

Now, we can close the authorization dialog and test the API selecting the tenant 1.

![keycloak_multitenant_swagger_5.png]({{ base_path }}/assets/images/keycloak_multitenant_swagger_5.png)

![keycloak_multitenant_swagger_6.png]({{ base_path }}/assets/images/keycloak_multitenant_swagger_6.png)

### Testing using Tenant 2

To test using the second tenant, we must open the authorization dialog again, provide the **client** and click on the **Authorize** button.

![keycloak_multitenant_swagger_7.png]({{ base_path }}/assets/images/keycloak_multitenant_swagger_7.png)

If there is not exists a previous Keycloak session, a new tab will be opened requesting then credentials to login.

![keycloak_multitenant_swagger_8.png]({{ base_path }}/assets/images/keycloak_multitenant_swagger_8.png)

Once the login process has been completed, it will return to the authorization dialog, showing the result of the authorization process.

![keycloak_multitenant_swagger_9.png]({{ base_path }}/assets/images/keycloak_multitenant_swagger_9.png)

Now, we can close the authorization dialog and test the API selecting the tenant 2.

![keycloak_multitenant_swagger_10.png]({{ base_path }}/assets/images/keycloak_multitenant_swagger_10.png)

![keycloak_multitenant_swagger_11.png]({{ base_path }}/assets/images/keycloak_multitenant_swagger_11.png)
