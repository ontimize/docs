---
title: "Migration from Ontimize 1.x.x to 3.x.x"
layout: default
permalink: /basics/migration/
nav_order: 5
parent: Basics
---

{% include base_path %}
{% include toc %}

# Migrate from Ontimize 1.x.x to 3.x.x

## Introduction

In this tutorial we are going to explain how to migrate a project from Ontimize version **1.x.x** that works with **JDK 8** to Ontimize version **3.x.x** that works with **JDK 11**. For this example we will download a project like the explained in this [training course]({{ base_path }}/tutorial/).

## Prerequisites
You can follow this tutorial using your own application, although for this example we will use an application created using the archetype that can be found [on this page]({{ base_path }}/getting_started/) and with a REST service. 

There are 2 options to follow this tutorial, clone the repository with the initial state and follow the tutorial step by step, or download the final example and see which files are new and which have been updated.

<div class="multicolumn">
<div class="multicolumnnopadding" >
  {{ "**Initial project**

    /$ git clone https://github.com/ontimize/ontimize-examples 
    /ontimize-examples$ cd ontimize-examples
    /ontimize-examples$ git checkout boot-migration-3.x.x-initial" 
    | markdownify }}
</div>
<div class="verticalDivider"></div>
<div class="multicolumnnopadding" >

  {{ "**Final example**

    /$ git clone https://github.com/ontimize/ontimize-examples 
    /ontimize-examples$ cd ontimize-examples
    /ontimize-examples$ git checkout boot-migration-3.x.x" 
    | markdownify }}

</div>
</div>

{: .note}
> To simplify the code being written, three dots (...) may appear in some parts of the code. This indicates that there may be previous code before and after those dots.

## Steps
### Ontimize version
First of all we need to update the version of Ontimize (ontimize-boot-parent) located in the parent of the project. Use always the latest version: [![Ontimize Boot Parent](https://img.shields.io/maven-central/v/com.ontimize.boot/ontimize-boot-parent?label=Ontimize%20Boot%20Parent&style=plastic)](https://maven-badges.herokuapp.com/maven-central/com.ontimize.boot/ontimize-boot-parent)


<div class="multicolumn">
        <div class="multicolumnleft">
            <button class="unstyle toggle-tree-btn">
                <span class="material-symbols-outlined">right_panel_open</span>
            </button>

  {{"**pom.xml**" | markdownify}}

{%highlight xml %}
  <parent>
    <groupId>com.ontimize.boot</groupId>
    <artifactId>ontimize-boot-parent</artifactId>
    <version>3.x.x</version>
  </parent>
{% endhighlight %}

</div>
  <div class="multicolumnright jstreeloader collapsed" >
<ul>
  <li data-jstree='{"opened":true, "icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
  ontimize-examples
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
    <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>README.md</li>
  </ul>
  </li>
</ul>
  </div>
</div>


### Java version

In the project properties we will change the java version **from 1.8 to 11**, both for the main **pom.xml** and for the `hr-model` module **pom.xml**.

<div class="multicolumn">
        <div class="multicolumnleft">
            <button class="unstyle toggle-tree-btn">
                <span class="material-symbols-outlined">right_panel_open</span>
            </button>

  {{"**pom.xml**" | markdownify}}

{%highlight xml %}
  <properties>
    . . .
    <java.version>11</java.version>
    . . .
  </properties>
{% endhighlight %}

</div>
  <div class="multicolumnright jstreeloader collapsed" >
<ul>
  <li data-jstree='{"opened":true, "icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
  ontimize-examples
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
      <li data-jstree='{"selected":true,"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
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
    <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>README.md</li>
  </ul>
  </li>
</ul>
  </div>
</div>


### Modifying application.yml

In the new version of Ontimize Boot, it has been decided to change the properties from **camelCase** to **kebab-case**, so you have to modify the `application.yml`.

```yaml
endpoints:
   api:
      enabled: true
logging:
   level:
      root: info
ontimize:
   corsfilter:
      enabled: true
   globalcors:
      cors-configurations:
         '[/**]':
            allowed-origins: "*"
            allowed-headers: "*"
            exposed-headers: ["X-Auth-Token","Content-disposition","X-Requested-With"]
            allowed-methods:
            - GET
            - POST
            - PUT
            - OPTIONS
            - DELETE
   jdbc:
      name-convention: upper
      sqlhandler: hsqldb
      sql-condition-processor:
         uppper-string: true
         upper-like: true
   security:
      mode: default
      ignore-paths: /app/**
      role-information-service:
         role-repository: UserRoleDao
         role-name-column: ROLENAME
         server-permission-query-id: serverPermissions
         server-permission-name-column: PERMISSION_NAME
         client-permission-query-id: clientPermissions
         client-permission-column: XMLCLIENTPERMISSION
      user-information-service:
         user-repository: UserDao
         user-login-column: USER_
         user-password-column: PASSWORD
         query-id: login
         other-data:
            - NAME
            - SURNAME
            - EMAIL
            - NIF
            - USERBLOCKED
            - LASTPASSWORDUPDATE
            - FIRSTLOGIN
      user-role-information-service:
         user-role-repository: UserRoleDao
         query-id: userRole
         role-login-column: USER_
         role-name-column: ROLENAME
server:
   port: 33333
   tomcat:
      uri-encoding: UTF-8
   compression:
      enabled: true
      mime-types: application/json, application/xml
spring:
   datasource:
      driver-class-name: org.hsqldb.jdbcDriver
      jdbc-url: jdbc:hsqldb:hsql://localhost:9013/templateDB
      username: SA
      password:
      initial-size: 10
      test-on-borrow: true
   main:
      banner-mode: 'off'
   session:
      store-type: none
   autoconfigure:
      exclude: |
         org.springframework.boot.autoconfigure.security.SecurityAutoConfiguration, org.springframework.boot.actuate.autoconfigure.ManagementWebSecurityAutoConfiguration, org.springframework.boot.autoconfigure.security.FallbackWebSecurityAutoConfiguration
```

### Renaming packages

With the new version, the **ontimize-core** library has been **merged** with **ontimize-jee**, and some classes have changed the name of their package, among them, the **EntityResult** Interface. To learn more about this class, check the following [link]({{ base_path }}/tutorial/exercise6). 

The package name of **EntityResult** has been renamed from `com.ontimize.db.EntityResult` to `com.ontimize.jee.common.dto.EntityResult`.

#### Api module

In the `hr-api` module we need to change the name of the package of this class in all the interfaces that are using it.

<div class="multicolumn">
        <div class="multicolumnleft">
            <button class="unstyle toggle-tree-btn">
                <span class="material-symbols-outlined">right_panel_open</span>
            </button>

  {{"**ICandidateService.java**" | markdownify}}

{%highlight java %}
package com.ontimize.hr.api.core.service;

. . .
import com.ontimize.jee.common.dto.EntityResult;
. . .

public interface ICandidateService {

 // CANDIDATE
 public EntityResult candidateQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
 public EntityResult candidateInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;
 public EntityResult candidateUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
 public EntityResult candidateDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

}
{% endhighlight %}

  {{"**IMasterService.java**" | markdownify}}

{%highlight java %}
package com.ontimize.hr.api.core.service;

. . .
import com.ontimize.jee.common.dto.EntityResult;
. . .

public interface IMasterService {

    . . .
	 // EDUCATION
	 public EntityResult educationQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
	 public EntityResult educationInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;
	 public EntityResult educationUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
	 public EntityResult educationDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
     . . .
}
{% endhighlight %}

  {{"**IOfferService.java**" | markdownify}}

{%highlight java %}
package com.ontimize.hr.api.core.service;

. . .
import com.ontimize.jee.common.dto.EntityResult;
. . .

public interface IOfferService {

    . . .
	// OFFER
	public EntityResult offerQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
	public EntityResult offerInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;
	public EntityResult offerUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
	public EntityResult offerDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
    . . .

}
{% endhighlight %}

  {{"**IUserService.java**" | markdownify}}

{%highlight java %}
package com.ontimize.hr.api.core.service;

. . .
import com.ontimize.jee.common.dto.EntityResult;
. . .

public interface IUserService {

	public EntityResult userQuery(Map<?, ?> keyMap, List<?> attrList);
	public EntityResult userInsert(Map<?, ?> attrMap);
	public EntityResult userUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap);
	public EntityResult userDelete(Map<?, ?> keyMap);

}
{% endhighlight %}
</div>
  <div class="multicolumnright jstreeloader collapsed" >
<ul>
  <li data-jstree='{"opened":true, "icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
  ontimize-examples
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
                        <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>IMasterService.java</li>
                        <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>IOfferService.java</li>
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
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>README.md</li>
  </ul>
  </li>
</ul>
  </div>
</div>

#### Model module

Having changed the class in the interface, we also have to change it in the service. For this we go to the `hr-model` module and replace the import of all services.

<div class="multicolumn">
        <div class="multicolumnleft">
            <button class="unstyle toggle-tree-btn">
                <span class="material-symbols-outlined">right_panel_open</span>
            </button>

  {{"**CandidateService.java**" | markdownify}}

{%highlight java %}
package com.ontimize.hr.model.core.service;

. . .
import com.ontimize.jee.common.dto.EntityResult;
. . .

@Service("CandidateService")
@Lazy
public class CandidateService implements ICandidateService {

	@Autowired
	private CandidateDao candidateDao;
    . . .
}
{% endhighlight %}

  {{"**MasterService.java**" | markdownify}}

{%highlight java %}
package com.ontimize.hr.model.core.service;

. . .
import com.ontimize.jee.common.dto.EntityResult;
. . .

@Service("MasterService")
@Lazy
public class MasterService implements MasterService {

	@Autowired
	private EducationDao educationDao;
    . . .
}
{% endhighlight %}

  {{"**OfferService.java**" | markdownify}}

{%highlight java %}
package com.ontimize.hr.model.core.service;

. . .
import com.ontimize.jee.common.dto.EntityResult;
. . .

@Service("OfferService")
@Lazy
public class OfferService implements IOfferService {

	@Autowired
	private OfferDao offerDao;
    . . .
}
{% endhighlight %}

  {{"**UserService.java**" | markdownify}}

{%highlight java %}
package com.ontimize.hr.model.core.service;

. . .
import com.ontimize.jee.common.dto.EntityResult;
. . .

@Lazy
@Service("UserService")
public class UserService implements IUserService {

	@Autowired
	private UserDao userDao;
    . . .
}
{% endhighlight %}
</div>
  <div class="multicolumnright jstreeloader collapsed" >
<ul>
  <li data-jstree='{"opened":true, "icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
  ontimize-examples
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
                        <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>CandidateService.java</li>
                        <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>MasterService.java</li>
                        <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>OfferService.java</li>
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
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
    <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>README.md</li>
  </ul>
  </li>
</ul>
  </div>
</div>

#### Ws module

In this case it is not just about changing the name of the package, it must also be taken into account that the `EntityResult` class is now an **Interface**, so an object cannot be instantiated from it. To do this, we will use the `EntityResultMapImpl` class. 

Go to the `hr-ws` module and replace the import of the EntityResult class in the rest controllers and make the following changes:

<div class="multicolumn">
        <div class="multicolumnleft">
            <button class="unstyle toggle-tree-btn">
                <span class="material-symbols-outlined">right_panel_open</span>
            </button>

  {{"**OfferRestController.java**" | markdownify}}

{%highlight java %}
package com.ontimize.hr.ws.core.rest;

. . .
import com.ontimize.jee.common.db.SQLStatementBuilder;
import com.ontimize.jee.common.db.SQLStatementBuilder.BasicExpression;
import com.ontimize.jee.common.db.SQLStatementBuilder.BasicField;
import com.ontimize.jee.common.db.SQLStatementBuilder.BasicOperator;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
. . .

@RestController
@RequestMapping("/offers")
@ComponentScan(basePackageClasses = { com.ontimize.hr.api.core.service.IOfferService.class })
public class OfferRestController extends ORestController<IOfferService> {

	. . .

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

    . . .

}
{% endhighlight %}

  {{"**UserRestController.java**" | markdownify}}

{%highlight java %}
package com.ontimize.hr.ws.core.rest;

. . .
import com.ontimize.jee.common.dto.EntityResult;
. . .

@RestController
@RequestMapping("/users")
public class UserRestController extends ORestController<IUserService> {

	. . .
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
  <div class="multicolumnright jstreeloader collapsed" >
<ul>
  <li data-jstree='{"opened":true, "icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
  ontimize-examples
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