---
title: "Multitenant System"
layout: default
permalink: /systems/multitenant/
parent: Systems
nav_order: 8
has_toc: false
has_children: true
---

{% include base_path %}

# Multitenant System

{: .important}
> This module works only for Ontimize Boot version 3.15.0 or above. Actual release version: [![Ontimize Boot](https://img.shields.io/maven-central/v/com.ontimize.boot/ontimize-boot?label=Ontimize%20boot&style=plastic)](https://maven-badges.herokuapp.com/maven-central/com.ontimize.boot/ontimize-boot)

## Introduction
**Multitenant** is a software architecture in which a single instance of software runs on a server and provides to groups of users (AKA **tenant**) a dedicated share of the instance, isolating their data and configurations from the other groups.

Ontimize allows to provide the list of tenants using two methods:

### Using the **application properties**
The list of tenans are declared using the application properties. You can find more information at this [link]({{ base_path }}/systems/multitenant/by-properties).

### Using a **table on a database**
The list of tenans are declared using a table on a database. You can find more information at this [link]({{ base_path }}/systems/multitenant/by-table).
