---
title: "Export data"
layout: default
permalink: /basics/exportdata/
nav_order: 3
has_children: true
parent: Basics
has_toc: false
---

{% include base_path %}
<!-- {% include toc %} -->

# Export data

{: .important}
> This module works only for Ontimize Boot version 3.9.0 or above. Actual release version: [![Ontimize Boot](https://img.shields.io/maven-central/v/com.ontimize.boot/ontimize-boot?label=Ontimize%20boot&style=plastic)](https://maven-badges.herokuapp.com/maven-central/com.ontimize.boot/ontimize-boot)

Ontimize provides a system to export the DAO data of a service and dump it directly to a file. This system uses a JSON template where all the necessary parameters are indicated to use in the body of the request to obtain the file.

The export options are:
* [Export data to csv]({{ base_path }}/basics/exportdata/export-data-to-csv)
* [Export data to xlsx]({{ base_path }}/basics/exportdata/export-data-to-xlsx)
* [Export data to pdf]({{ base_path }}/basics/exportdata/export-data-to-pdf)