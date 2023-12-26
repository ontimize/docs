---
title: "Autoconfigurators"
layout: default
permalink: /basics/autoconfigurators/
breadcrumbs: true
---

{% include base_path %}
{% include toc %}

Autoconfigurators are an easy way to indicate common elements that need minimal customization in applications, such as database connection. These configurations are used within the **application.yml** file located inside the **boot** folder.

## DMS

- **ontimize:dms:**

| Attribute | Values   | Meaning                                                                                                                        |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| engine    | _odms_   | Indicates the engine that will be used for the DMS system. Ontimize has an implementation of an engine, whose value is _odms_. |
| basePath  | _String_ | The path where the DMS files will be stored                                                                                    |

The configuration of DMS system is done by setting up the necessary DAOs for that system. To see the configuration, check [this link](/ontimize-boot/v1/basics/dms/).

**Example**

```yaml
ontimize:
  dms:
    engine: odms
    basePath: file:/C:/applications/projectwiki/dms
```

## I18n

**ontimize:i18n:**

| Attribute                | Values    | Meaning                                                                                             |
| ------------------------ | --------- | --------------------------------------------------------------------------------------------------- |
| refBundleRepository      | _String_  | Name of the DAO containing information about the translation bundles                                |
| bundleKeyColumn          | _String_  | Column of the database table containing the translation bundle identifier                           |
| bundleClassNameColumn    | _String_  | Column of the database table containing the name of the translation bundle class                    |
| bundleDescriptionColumn  | _String_  | Column of the database table containing the description of the translation bundle                   |
| refBundleValueRepository | _String_  | Name of the database table containing information about the translations of each translation bundle |
| bundleValueTextKeyColumn | _String_  | Column of the database table containing the key of a translation                                    |
| bundleValueKeyColumn     | _String_  | Column of the database table containing the key of a translation                                    |
| engine                   | _default_ | Property to enable the i18n system. Need to have any value, commonly, _default_.                    |

The configuration of the I18N system is done by setting up the necessary DAOs for that system. To see the configuration, check [this link](/ontimize-boot/v1/basics/i18n/).

**Example**

```yaml
ontimize:
  i18n:
    refBundleRepository: OCDatabaseBundleDao
    bundleKeyColumn: ID_I18N
    bundleClassNameColumn: CLASS_NAME
    bundleDescriptionColumn: I18N_DESCRIPTION
    refBundleValueRepository: OCDatabaseBundleValueDao
    bundleValueTextKeyColumn: KEY
    bundleValueKeyColumn: ID_I18N_VALUE
    engine: default
```

## JDBC

- **ontimize:jdbc:**

| Attribute      | Values                                                  | Meaning                                                                                                        |
| -------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| nameConvention | _upper_, _lower_, _database_                            | Indicate the nomenclature of the columns in the DB, in lower case, upper case or as it appears in the database |
| sqlhandler     | _postgres_, _oracle_, _oracle12_, _sqlserver_, _hsqldb_ | Indicates which SQL statement handler will be used to communicate with the database                            |

- **ontimize:jdbc:sqlConditionProcessor:**

| Attribute    | Values          | Meaning                                   |
| ------------ | --------------- | ----------------------------------------- |
| uppperString | _true_, _false_ | Use uppercase strings in WHERE conditions |
| upperLike    | _true_, _false_ | Use uppercase strings in LIKE conditions  |

**Example**

```yaml
ontimize:
  jdbc:
    nameConvention: upper
    sqlhandler: hsqldb
    sqlConditionProcessor:
      uppperString: true
      upperLike: true
```

## LDAP

- **ontimize:security:**

| Attribute | Value  | Meaning                                             |
| --------- | ------ | --------------------------------------------------- |
| mode      | _ldap_ | Change the system security from _default_ to _ldap_ |

- **ldap:**

| Attribute | Values        | Meaning                                                                                                                                            |
| --------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| active    | _true, false_ | Enable or disable ldap security                                                                                                                    |
| host      | _IP_          | Ip host for ldap security                                                                                                                          |
| port      | _Number_      | Port of the host for ldap security                                                                                                                 |
| loginType | _DN, simple_  | The login type indicates whether a full LDAP string with _DN_ value or will be used or if the username will simply be provided with _simple_ value |
| bind.dn   | _String_      | File to populate the LDAP server using a _.ldif_ file                                                                                              |
| base.dn   | _String_      | List of base DNs.                                                                                                                                  |
| domain    | _String_      | The domain name                                                                                                                                    |

The LDAP security configuration is done through autoconfigurators. To see the settings, check [this link](/ontimize-boot/v1/basics/ldap).

**Example**

```yaml
ontimize:
  security:
  mode: ldap
ldap:
  active: true
  host: 10.0.0.1
  port: 389
  loginType: simple
  bind.dn:
  base.dn:
  domain: yourdomain.com
```

## Mail

- **ontimize:mail:**

| Attribute                           | Values   | Meaning                                                                                                        |
| ----------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| refRepository                       | _String_ | Name of the DAO containing the configuration information required for system configuration                     |
| filterColumnName                    | _String_ | Name of the column in the database table containing the keys                                                   |
| valueColumnName                     | _String_ | Name of the database table column containing the values                                                        |
| queryId                             | _String_ | Name of the DAO query to be executed. By default, is _default_                                                 |
| filterColumnValueEncoding           | _String_ | Key name of the row in the key column containing the value for mail encoding                                   |
| filterColumnValueHost               | _String_ | Name of the key in the row of the key column containing the value for the host in the mail service             |
| filterColumnValuePort               | _String_ | Name of the key in the row of the key column containing the value for the port in the mail service             |
| filterColumnValueProtocol           | _String_ | Name of the key in the row of the key column containing the value for the protocol used in the mail service    |
| filterColumnValueUser               | _String_ | Name of the key in the row of the key column containing the value for the user in the mail service             |
| filterColumnValuePassword           | _String_ | Name of the key in the row of the key column containing the value for the user password in the mail service    |
| filterColumnValueJavaMailProperties | _String_ | Name of the key in the row of the key column containing the value for the mail propoerties in the mail service |
| engine                              | _String_ | Enable or disable mail engine. To enable, have any value int this arribute. By default, use _default_ value    |

The configuration of the mail system is done by setting up the necessary DAOs for that system. To see the configuration, check [this link](/ontimize-boot/v1/basics/mail/).

**Example**

```yaml
ontimize:
  mail:
    refRepository: OCSettingsDao
    filterColumnName: SETTING_KEY
    valueColumnName: SETTING_VALUE
    queryId: default
    filterColumnValueEncoding: mail_encoding
    filterColumnValueHost: mail_host
    filterColumnValuePort: mail_port
    filterColumnValueProtocol: mail_protocol
    filterColumnValueUser: mail_user
    filterColumnValuePassword: mail_password
    filterColumnValueJavaMailProperties: mail_properties
    engine: default
```

## REST

- **ontimize:corsfilter:**

| Attribute | Values          | Meaning                       |
| --------- | --------------- | ----------------------------- |
| enabled   | _true_, _false_ | Enable or disable CORS filter |

- **ontimize:globalcors:corsConfigurations**  
  Indicates the entrypoint to be configured, with the properties for each one. In general, the entrypoint [/**] is configured entirely.

| Attribute        | Values   | Meaning                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| allowedOrigins   | \*\*\*   | Set the origins to allow, the special value \* allows all domains. By default this is not set                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| allowedHeaders   | \*\*\*   | Set the list of headers that a pre-flight request can list as allowed for use during an actual request. The special value \* allows actual requests to send any header. A header name is not required to be listed if it is one of: _Cache-Control_, _Content-Language_, _Expires_, _Last-Modified_ or _Pragma_). By default this is not set.                                                                                                                                                                                                                                                                                  |
| exposedHeaders   |          | Set the list of response headers other than simple headers (i.e. _Cache-Control_, _Content-Language_, _Content-Type_, _Expires_, _Last-Modified_ or _Pragma_ that an actual response might have and can be exposed. Note that \* is not a valid exposed header value. By default this is not set.                                                                                                                                                                                                                                                                                                                              |
| allowedMethods   | _List_   | Set the HTTP methods to allow, e.g. _GET_, _POST_, _PUT_, etc. The special value \* allows all methods. If not set, only _GET_ and _HEAD_ are allowed. By default this is not set. Note: CORS checks use values from "Forwarded" [RFC7239](http://tools.ietf.org/html/rfc7239), _X-Forwarded-Host_, _X-Forwarded-Port_, and _X-Forwarded-Proto_ headers, if present, in order to reflect the client-originated address. Consider using the _ForwardedHeaderFilter_ in order to choose from a central place whether to extract and use, or to discard such headers. See the Spring Framework reference for more on this filter. |
| maxAge           | _Number_ | Configure how long, in seconds, the response from a pre-flight request can be cached by clients. By default this is not set.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| allowCredentials | _-_      | Whether user credentials are supported. By default this is not set (i.e. user credentials are not supported).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

**Example**

```yaml
ontimize:
  corsfilter:
    enabled: true
  globalcors:
    corsConfigurations:
      "[/**]":
        allowedOrigins: "*"
        allowedHeaders: "*"
        exposedHeaders: ["X-Auth-Token", "Content-disposition", "X-Requested-With"]
        allowedMethods:
          - GET
          - POST
          - PUT
          - OPTIONS
          - DELETE
```

## Security

- **ontimize:security:**

| Attribute   | Values    | Meaning                                                     |
| ----------- | --------- | ----------------------------------------------------------- |
| mode        | _default_ | Use _default_ to enable the security mode for Ontimize Boot |
| ignorePaths | _String_  | Paths in server thant will not be securized                 |
| servicePath | _String_  | Establish the service path. By default, \*/\*\*\*           |

- **ontimize:security:jwt:** _Not required, enabled by default_

| Attribute      | Values          | Meaning                                      |
| -------------- | --------------- | -------------------------------------------- |
| password       | _String_        | JWT password                                 |
| expirationTime | _Long_          | JWT expiration time                          |
| refreshToken   | _true_, _false_ | Set _true_ to refresh JWT, _false_ otherwise |

- **ontimize:security:user-information-service:**

| Attribute               | Values   | Meaning                                                                            |
| ----------------------- | -------- | ---------------------------------------------------------------------------------- |
| queryId                 | _String_ | Name of the DAO query identifier.                                                  |
| userLoginColumn         | _String_ | Database column that stores the username                                           |
| userPasswordColumn      | _String_ | Database column that stores the password                                           |
| userNeedCheckPassColumn | _String_ | Database column that stores whether the password requires updating at the next use |
| userRepository          | _String_ | Name of the DAO containing information about users                                 |
| otherData               | _List_   | Extra data to store from the user logged                                           |

- **ontimize:security:role-information-service:**

| Attribute                  | Values   | Meaning                                                 |
| -------------------------- | -------- | ------------------------------------------------------- |
| roleRepository             | _String_ | Name of the DAO containing information about users      |
| roleNameColumn             | _String_ | Database column that stores the role name               |
| serverPermissionQueryId    | _String_ | Name of the DAO query identifier for server permissions |
| serverPermissionNameColumn | _String_ | Database column that stores the server permissions      |
| clientPermissionQueryId    | _String_ | Name of the DAO query identifier for client permissions |
| clientPermissionColumn     | _List_   | Database column that stores the client permissions      |

- **ontimize:security:user-role-information-service:**

| Attribute          | Values   | Meaning                                                            |
| ------------------ | -------- | ------------------------------------------------------------------ |
| userRoleRepository | _String_ | Name of the DAO containing relation between users and its profiles |
| queryId            | _String_ | Name of the DAO query identifier                                   |
| roleLoginColumn    | _String_ | Database column that stores the username                           |
| roleNameColumn     | _String_ | Database column that stores the role name                          |

The configuration of the rest of the Security system is done by setting up the necessary DAOs for that system. To see the configuration, check [this link](/ontimize-boot/v1/basics/security/).

**Example**

```yaml
ontimize:
  security:
    mode: default
    ignorePaths: /news/**, /products/**
    userInformationService:
      userRepository: OCLoginProfilesDao
      queryId: login
      userLoginColumn: USER_
      userPasswordColumn: PASSWORD
      otherData:
        - NAME
        - SURNAME
        - EMAIL
        - NIF
        - USERBLOCKED
        - LASTPASSWORDUPDATE
        - FIRSTLOGIN
    userRoleInformationService:
      userRoleRepository: OCLoginProfilesDao
      queryId: userRole
      roleLoginColumn: USER_
      roleNameColumn: ROLENAME
    roleInformationService:
      roleRepository: OCLoginProfilesDao
      roleNameColumn: ROLENAME
      serverPermissionQueryId: serverPermissions
      serverPermissionNameColumn: PERMISSION_NAME
      clientPermissionQueryId: clientPermissions
      clientPermissionColumn: XMLCLIENTPERMISSION
```
