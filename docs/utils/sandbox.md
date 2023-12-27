---
title: "Sandbox"
layout: default
permalink: /sandbox/
nav_exclude: true
---

# Sandbox

## Nueva página

```
---
title: "Title of the page"
layout: default
permalink: /path/to/page/
nav_order: X 
# has_children: false
# has_toc: false
# nav_exclude: true
# grand_parent: Title grand_parent
# parent: Title parent
---

<!-- {- include base_path %} -->
<!-- {- include toc %} -->
```

## Doble columna (código y árbol, con toggle)

```
<div class="custom-container">
    <div class="left-column">
        <button id="toggle-tree" class="unstyle">
            <div class="btn">Toggle Tree</div>
        </button>
        {% highlight ... %}
            
        {% endhighlight %}
    </div>
    <div class="right-column jstreeloader collapsed" id="tree-column">
        // jsTree <ul>...</ul>
    </div>
</div>
```

<div class="custom-container">
    <div class="left-column">
        <button id="toggle-tree" class="unstyle">
            <div class="btn">Toggle Tree</div>
        </button>
        {% highlight java%}
        package com.ontimize.projectwiki.security;

        import java.io.IOException;
        import java.io.UnsupportedEncodingException;
        import java.util.Hashtable;
        import java.util.StringTokenizer;

        import javax.naming.Context;
        import javax.naming.NamingException;
        import javax.naming.directory.DirContext;
        import javax.naming.directory.InitialDirContext;
        import javax.security.auth.login.LoginException;
        import javax.servlet.http.HttpServletRequest;
        import javax.servlet.http.HttpServletResponse;

        import org.aspectj.weaver.Utils;
        import org.slf4j.Logger;
        import org.slf4j.LoggerFactory;
        import org.springframework.beans.factory.annotation.Value;
        import org.springframework.security.authentication.AuthenticationManager;
        import org.springframework.security.authentication.BadCredentialsException;
        import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
        import org.springframework.security.core.userdetails.UserDetailsService;
        import org.springframework.security.crypto.codec.Base64;
        import org.springframework.stereotype.Component;

        import com.ontimize.jee.server.security.authentication.AuthenticationResult;
        import com.ontimize.jee.server.security.authentication.IAuthenticationMechanism;
        import com.ontimize.jee.server.security.authentication.OntimizeAuthenticationProvider;

        @Component
        public class LdapAuthenticationMechanism implements IAuthenticationMechanism {

          private static final Logger LOGGER = LoggerFactory.getLogger(LdapAuthenticationMechanism.class);
          private String credentialsCharset = "UTF-8";

          @Value("${ldap.host}")
          private String ldapHost;

          @Value("${ldap.port}")
          private int ldapPort;

          @Value("${ldap.login-type}")
          private String loginType;

          @Value("${ldap.bind.dn}")
          private String ldapBindDn;

          @Value("${ldap.domain}")
          private String ldapDomain;

          @Value("${ldap.base.dn}")
          private String ldapBaseDn;

          @Override
          public AuthenticationResult authenticate(final HttpServletRequest request, final HttpServletResponse response, final AuthenticationManager authenticationManager, final UserDetailsService userDetailsService) {

            try {

              final String header = request.getHeader("Authorization");
              if ((header == null) || !header.startsWith("Basic ")) {
                return null;
              }

              final String[] tokens = this.extractAndDecodeHeader(header, request);
              assert tokens.length == 2;
              final String username = tokens[0];
              final String password = tokens[1];

              LdapAuthenticationMechanism.LOGGER.trace("Validating access for user : '{}'", username);

              DirContext dirContext = null;

              if (loginType.equals("DN")) {
                String userDn = "uid=" + username + "," + ldapBindDn;
                dirContext = connect(userDn, password, ldapHost, ldapPort, null, false);
              } else if (loginType.equals("simple")) {
                dirContext = connect(username, password, ldapHost, ldapPort, ldapDomain, false);
              }

              if (dirContext != null) {
                return new AuthenticationResult(true, new UsernamePasswordAuthenticationToken(username,
                    OntimizeAuthenticationProvider.NO_AUTHENTICATION_TOKEN));
              } else {
                LOGGER.error("System authentication failed: no connect to LDAP");
                throw new BadCredentialsException(LdapError.NO_LDAP_CONNECTION.toString());
              }
            } catch (NamingException e) {
              LOGGER.error("System authentication failed: NamingException searching into server LDAP", e);
              throw new BadCredentialsException(LdapError.ERROR_SEARCHING_IN_LDAP.toString());
            } catch (LoginException e) {
              LOGGER.error("System authentication failed: LoginException with server LDAP", e);
              throw new BadCredentialsException(LdapError.ERROR_LOGIN_LDAP.toString());
            } catch (IOException e) {
              LOGGER.error("System authentication failed: IOException with server LDAP", e);
              throw new BadCredentialsException(LdapError.ERROR_IO_LDAP.toString());
            }

          }

          public static synchronized DirContext connect(final String user, final String password, final String hosts,
              final int port, final String adddomain, boolean ssl)
              throws NamingException, java.io.IOException, LoginException {

            if ((hosts == null) || (hosts.length() == 0)) {
              LOGGER.error("LDAP host cannot be neither null nor empty");
              throw new IllegalArgumentException(LdapError.EMPTY_LDAP_HOST.toString());
            }

            StringTokenizer st = new StringTokenizer(hosts, ";");

            while (st.hasMoreTokens()) {
              String host = st.nextToken();
              return _connect(user, password, host, port, adddomain, ssl);
            }

            return null;

          }

          private static synchronized DirContext _connect(final String user, final String password, final String host,
              final int port, final String adddomain, boolean ssl)
              throws NamingException, java.io.IOException, LoginException {

            Hashtable<String, String> props = new Hashtable<>();
            if ((user == null) || (user.length() == 0)) {
              LOGGER.error("user cannot be neither null nor empty");
              throw new IllegalArgumentException(LdapError.EMPTY_LDAP_USER.toString());

            }

            if ((password == null) || (password.length() == 0)) {
              LOGGER.error("password cannot be neither null nor empty");
              throw new IllegalArgumentException(LdapError.EMPTY_LDAP_PASSWORD.toString());

            }

            props.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
            props.put(Context.PROVIDER_URL, "ldap://" + host + ":" + port);
            props.put(Context.SECURITY_AUTHENTICATION, "simple");

            if (adddomain != null) {
              props.put(Context.SECURITY_PRINCIPAL, user + "@" + adddomain);
            } else {
              props.put(Context.SECURITY_PRINCIPAL, user);
            }

            props.put(Context.SECURITY_CREDENTIALS, password);

            if (ssl) {
              props.put(Context.SECURITY_PROTOCOL, "ssl");
            }

            props.put(Context.REFERRAL, "follow");
            DirContext ctx = null;

            try {
              ctx = new InitialDirContext(props);
              LOGGER.info("Authentication sucessfully in LDAP");

            } catch (Exception e) {
              LOGGER.error("System authentication failed: wrong user and/or pass in LDAP");
              throw new BadCredentialsException(LdapError.LDAP_AUTH_USER_PASS_NOT_VALID.toString());

            }

            return ctx;

          }

          private String[] extractAndDecodeHeader(final String header, final HttpServletRequest request) {

            try {
              final byte[] base64Token = header.substring(6).getBytes("UTF-8");
              byte[] decoded;
              decoded = Base64.decode(base64Token);

              final String token = new String(decoded, this.getCredentialsCharset(request));
              final int delim = token.indexOf(':');

              if (delim == -1) {
                throw new BadCredentialsException("Invalid basic authentication token");
              }
              return new String[] { token.substring(0, delim), token.substring(delim + 1) };
            } catch (IllegalArgumentException | UnsupportedEncodingException error) {
              throw new BadCredentialsException("Failed to decode basic authentication token", error);
            }
          }

          protected String getCredentialsCharset(final HttpServletRequest httpRequest) {
            return this.credentialsCharset;
          }

        }
        }
      {% endhighlight %}
  </div>
  <div class="right-column jstreeloader collapsed" id="tree-column">
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
                      <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"}'>
                      security
                      <ul>
                        <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>CustomSecurityAutoConfiguration.java</li>
                        <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>LdapAuthenticationMechanism.java</li>
                        <li data-jstree='{"selected": true, "icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>LdapError.java</li>
                      </ul>
                      </li>
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
                <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>templateDB.script</li>
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