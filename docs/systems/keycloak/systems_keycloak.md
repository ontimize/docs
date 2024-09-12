---
title: "Keycloak Security"
layout: default
permalink: /systems/keycloak/
parent: Systems
nav_order: 5
has_toc: false
has_children: true
---

{% include base_path %}
{% include toc %}

# Keycloak Security

{: .important}
> This module works only for Ontimize Boot version 3.10.0 or above. Actual release version: [![Ontimize Boot](https://img.shields.io/maven-central/v/com.ontimize.boot/ontimize-boot?label=Ontimize%20boot&style=plastic)](https://maven-badges.herokuapp.com/maven-central/com.ontimize.boot/ontimize-boot)

## Introduction

**Keycloak** is a solution that adds authentication and authorization to applications and services with minimum effort. It supports single-sign on, identity brokering, user federation, and standard protocols such as OpenID Connect, OAuth 2.0, and SAML 2.0 (More information in [this link](https://www.keycloak.org/)).


## Previous concepts
- **Realm**: A realm manages a set of users, credentials, roles, and groups. A user belongs to and logs into a realm. Realms are isolated from one another and can only manage and authenticate the users that they control.
- **Client** (or **resource**): Clients are applications or services that want to use Keycloak to secure themselves, requesting Keycloak to authenticate a user and provide a single sign-on solution.
- **Tenant**: A realm with its own clients, users, roles, etc. configured on a specific Keycloak instance.

## Setting up

Ontimize allows to configure the settings for one or multiple tenants.

### One tenant only

The application will use a unique tenant declared using the application properties. You can find more information at this [link]({{ base_path }}/systems/keycloak/one-tenant).

### Using the application properties
The list of tenans are declared using the application properties. You can find more information at this [link]({{ base_path }}/systems/keycloak/multitenant/by-properties).

### Using a table on a database
The list of tenans are declared using a table on a database. You can find more information at this [link]({{ base_path }}/systems/keycloak/multitenant/by-table).

### Providing the tenants programmatically
The list of tenans are provided programmatically. You can find more information at this [link]({{ base_path }}/systems/keycloak/multitenant/programmatically).
