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
        ...
        
        @Component
        public class LdapAuthenticationMechanism implements IAuthenticationMechanism {

          private static final Logger LOGGER = LoggerFactory.getLogger(LdapAuthenticationMechanism.class);
          private String credentialsCharset = "UTF-8";

          @Override
          public AuthenticationResult authenticate(final HttpServletRequest request, final HttpServletResponse response, final AuthenticationManager authenticationManager, final UserDetailsService userDetailsService) {

            try {
              ...
            } catch (IOException e) {
              LOGGER.error("System authentication failed: IOException with server LDAP", e);
              throw new BadCredentialsException(LdapError.ERROR_IO_LDAP.toString());
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
        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>.gitignore</li>
        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>pom.xml</li>
        <li data-jstree='{"icon":"{{ base_path }}/assets/jstree/fa-file.svg"}'>README.md</li>
      </ul>
      </li>
    </ul>
  </div>
</div>