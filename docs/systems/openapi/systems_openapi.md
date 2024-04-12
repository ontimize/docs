---
title: "OpenAPI System"
layout: default
permalink: /systems/openapi/
parent: Systems
nav_order: 9
has_toc: false
has_children: true
---

{% include base_path %}

# OpenAPI System

{: .important}
> This module works only for Ontimize Boot version 3.2.0 or above. Actual release version: [![Ontimize Boot](https://img.shields.io/maven-central/v/com.ontimize.boot/ontimize-boot?label=Ontimize%20boot&style=plastic)](https://maven-badges.herokuapp.com/maven-central/com.ontimize.boot/ontimize-boot)

## Introduction
The [OpenAPI specification](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md), originally known as the [Swagger specification](https://swagger.io/docs/specification/about/), is a specification for machine-readable interface files for describing, producing, consuming, and displaying RESTful web services. It started as part of the Swagger framework, and became a separate project in 2016, overseen by the OpenAPI Initiative, an open source collaborative project of the Linux Foundation. Using Swagger or [other tools](https://github.com/OpenAPITools) you can generate code, documentation and test cases from an interface file.

Among the available tools, there is a utility called [OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator) that allows you to generate, from the interface files, the API code for different platforms and programming languages, since it has specific libraries for each of them.

**OpenAPI Generator** has been integrated into **Ontimize** along with a library that allows to generate code following the Ontimize guidelines. This code will consist of a set of interfaces that must be implemented in the application.

## Setting up

### Enabling the OpenAPI system

To enable this functionality, we must create the marker file *marker-ws-ontimize-openapi-generator* in the *src/main/ontimize* folder. This file should only exist and be empty.

### Customizing the API generation

We can customize the API generation by setting the following properties on the pom.xml.

- **ontimize.openapi.generator.maven.plugin**

| Attribute         | Values      | Meaning                                                                   | Default                                                               |
|-------------------|-------------|---------------------------------------------------------------------------|-----------------------------------------------------------------------|
| auth              | String      | Adds authorization headers when fetching the swagger definitions remotely | None                                                                  |
| importMappings    | String      | A map of classes and the import that should be used for that class        | None                                                                  |
| inputSpec         | String      | Location of the OpenAPI specification, as URL or file                     | ${project.basedir}/src/main/resources/public/restapi/openapi-rest.yml |
| modelPackageName  | String      | The package to use for the generated model classes                        | com.ontimize.model                                                    |
| packageName       | String      | The package to use for the generated api classes                          | com.ontimize.api                                                      |
| useBeanValidation | true, false | Use BeanValidation API annotations                                        | false                                                                 |

### Integrating the Swagger User Interface

Optionally, we can integrate the Swagger User Interface on our project by setting the following properties on the pom.xml.

- **ontimize.openapi.swagger-ui**

| Attribute | Values      | Meaning                                       | Default                                              |
|-----------|-------------|-----------------------------------------------|------------------------------------------------------|
| apiUrl    | String      | Location of the OpenAPI specification         | /restapi/openapi-rest.yml                            |
| enabled   | true, false | Enables the Swagger User Interface            | false                                                |
| path      | String      | The path to deploy the Swagger User Interface | ${project.build.directory}/classes/public/swagger-ui |


## Summary of the specific attributes for Ontimize

In addition to the standard specification of OpenAPI, Ontimize provides some attributes to add support for its own REST controllers.

### Operations

| Attribute        | Values                                                                                       | Meaning                                                                                                                                                                      |
|------------------|----------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| x-hasparentpath  | true, false                                                                                  | When the class that implements the generated interface has a path as prefix, this option prevents the prefix from being concatenated to the path on the generated controller |
| x-restcontroller | orestcontroller, dmsrestcontroller, oexportrestcontroller, remoteconfigurationrestcontroller | The generated interface will be compatible with the indicated REST controller of Ontimize. The class that implements this interface must extend the indicated REST controller |
| x-throws         | String                                                                                       | A comma separated list of exceptions that the controller may throw                                                             |

### Schemes

| Attribute    | Values      | Meaning                                                            |
|--------------|-------------|--------------------------------------------------------------------|
| x-extends    | true, false | Allows lists to add elements that extend the indicated class       |
| x-iswildcard | true, false | A wildcard is used as the data type of the parameter               |
| x-super      | true, false | Allows lists to add elements that inherit from the indicated class |
