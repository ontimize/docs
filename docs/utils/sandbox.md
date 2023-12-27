---
title: "Sandbox"
layout: default
permalink: /sandbox/
nav_exclude: true
---

# Sandbox

## Nueva página

```
Los include llevan un % en vez de un -

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
Los highlight y endhighlight llevan un % en vez de un -

Carpeta → "icon":"{{ base_path }}/assets/jstree/fa-folder-open.svg"
Fichero → "icon":"{{ base_path }}/assets/jstree/fa-file.svg"

<div class="custom-container">
    <div class="left-column">
        <button class="unstyle toggle-tree-btn">
            <div class="btn">Toggle Tree</div>
        </button>
        {- highlight java%}
            // Aquí el código o lo que sea sin el highlight
        {- endhighlight %}
  </div>
  <div class="right-column jstreeloader collapsed">
    // <ul> </ul> de jstree
  </div>
</div>
```

<div class="custom-container">
    <div class="left-column">
        <button class="unstyle toggle-tree-btn">
            <div class="btn">Toggle Tree</div>
        </button>
        {% highlight java%}
            // Aquí el código o lo que sea sin el highlight
        {% endhighlight %}
  </div>
  <div class="right-column jstreeloader collapsed">
     <!-- <ul>...</ul> de jstree -->
  </div>
</div>