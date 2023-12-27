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
      <!-- Contenido de la izquierda (código de programación) -->
      {% highlight language %}
          // Tu código de programación aquí
      {% endhighlight %}
    </div>
    <div class="right-column collapsed">
      <!-- Contenido de la derecha (árbol de ficheros) -->
      <button class="toggle-button btn">Toggle Tree</button>
      <ul>
        <li>Proyecto
          <ul>
            <li>src
              <ul>
                <li>Archivo1.js</li>
                <li>Archivo2.js</li>
                <!-- Agrega más elementos según sea necesario -->
              </ul>
            </li>
            <!-- Agrega más elementos según sea necesario -->
          </ul>
        </li>
      </ul>
    </div>
  </div>

  <!-- Estructura 2 -->
  <div class="custom-container">
    <div class="left-column">
      <!-- Contenido de la izquierda (código de programación) -->
      {% highlight language %}
          // Tu código de programación aquí
      {% endhighlight %}
    </div>
    <div class="right-column collapsed">
      <!-- Contenido de la derecha (árbol de ficheros) -->
      <button class="toggle-button btn">Toggle Tree</button>
      <ul>
        <li>Proyecto
          <ul>
            <li>src
              <ul>
                <li>Archivo1.js</li>
                <li>Archivo2.js</li>
                <!-- Agrega más elementos según sea necesario -->
              </ul>
            </li>
            <!-- Agrega más elementos según sea necesario -->
          </ul>
        </li>
      </ul>
    </div>
  </div>