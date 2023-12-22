---
layout: default
title: Prerequisites
permalink: /prerequisites/
nav_exclude: true
excerpt: Prerequisites for the installation and use of an application with Ontimize Boot.
---

{% include base_path %}

# Prerequisites

---

## Java JDK 8

Make sure you have the JDK version of Java 8 installed. There are many different builds, but perhaps the most common is Adoptium, which you can download from the following link (add your operating system and your computer's architecture): [Adoptium JDK](https://adoptium.net/es/temurin/releases/?version=8&package=jdk)

> **NOTE**: Check the option to set the JAVA_HOME variable.

Following installation, make sure you have correctly installed Java JDK 8 by invoking the following commands in the command-line `java -version`

> **NOTE**: On the Mac, the command-line is available via the Terminal >application. On the PC, it’s available as Command Prompt.

The result should look similar to

```console
C:\>java -version
openjdk version "1.8.0_XXX"
OpenJDK Runtime Enviroment (Temurin)(build 1.8.0_XXX-XXX)
OpenJDK 64-Bit Server VM (Temurin)(build 1.8.0_XXX-XXX, mixed mode)
```

## Maven 3.6.0 or newer

Maven is required for downloading and using the Ontimize Boot application archetype, managing the libraries contained in the framework and even for running the application. You can download Maven from its official project page at the following link: [Maven](https://maven.apache.org/download.cgi)

Follow the installation steps indicated in the [official web site](https://maven.apache.org/install.html)

To check the installation, run the following command at a command prompt `mvn -v`. The result should look similar to:

```console
C:\>mvn -v
Apache Maven 3.9.6 (bc0240f3c744dd6b6ec2920b3cd08dcc295161ae)
Maven home: C:\apache-maven-3.9.6
Java version: 1.8.0_392, vendor: Temurin, runtime: C:\Program Files\Eclipse Adoptium\jdk-8-0-392.8-hotspot\jre
Default locale: es_ES, platform encoding: Cp1252
OS name: "windows 10", version: "10.0", arch: "amd64", family: "windows"
```

## IDE

It is not absolutely necessary to use an IDE, but it is highly recommended and helps the development of the application. We recommend the use of [IntelliJ](https://www.jetbrains.com/idea/download) (in its Community or Ultimate version), [Eclipse](https://www.eclipse.org/downloads/packages/) (in its Enterprise Java and Web Developers version) or [Visual Studio Code](https://code.visualstudio.com/Download).
