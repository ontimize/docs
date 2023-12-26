---
layout: default
title: Prerequisites
permalink: /prerequisites/
excerpt: Prerequisites for the installation and use of an application with Ontimize Boot.
parent: Introduction
nav_order: 1
---

{% include base_path %}

# Prerequisites

---

## Java JDK 11

Make sure you have the JDK version of Java 1 installed. There are many different builds, but perhaps the most common is Adoptium, which you can download from the following link (add your operating system and your computer's architecture): [Adoptium JDK](https://adoptium.net/es/temurin/releases/?version=11&package=jdk){:target="_blank"}

> **NOTE**: Check the option to set the JAVA_HOME variable.

Following installation, make sure you have correctly installed Java JDK 1 by invoking the following commands in the command-line `java -version`

> **NOTE**: On the Mac, the command-line is available via the Terminal >application. On the PC, it’s available as Command Prompt.

The result should look similar to:

```console
C:\>java -version
openjdk version "11.0.21" 2023-10-17
OpenJDK Runtime Environment Temurin-11.0.21+9 (build 11.0.21+9)
OpenJDK 64-Bit Server VM Temurin-11.0.21+9 (build 11.0.21+9, mixed mode)
```

## Maven 3.6.0 or newer

Maven is required for downloading and using the Ontimize Boot application archetype, managing the libraries contained in the framework and even for running the application. You can download Maven from its official project page at the following link: [Maven](https://maven.apache.org/download.cgi){:target="_blank"}

Follow the installation steps indicated in the [official web site](https://maven.apache.org/install.html){:target="_blank"}

To check the installation, run the following command at a command prompt `mvn -v`. The result should look similar to:

```console
C:\>mvn -v
Apache Maven 3.9.1 (2e178502fcdbffc201671fb2537d0cb4b4cc58f8)
Maven home: C:\Program Files (x86)\maven
Java version: 11.0.21, vendor: Eclipse Adoptium, runtime: C:\Program Files\Eclipse Adoptium\jdk-11.0.21.9-hotspot
Default locale: es_ES, platform encoding: Cp1252
OS name: "windows 10", version: "10.0", arch: "amd64", family: "windows"
```

## IDE

It is not absolutely necessary to use an IDE, but it is highly recommended and helps the development of the application. We recommend the use of [IntelliJ](https://www.jetbrains.com/idea/download){:target="_blank"} (in its Community or Ultimate version), [Eclipse](https://www.eclipse.org/downloads/packages/){:target="_blank"} (in its Enterprise Java and Web Developers version) or [Visual Studio Code](https://code.visualstudio.com/Download){:target="_blank"}.
