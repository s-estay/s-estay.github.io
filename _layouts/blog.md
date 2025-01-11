---
layout: base
---
<div class = "main-container">
  <h1>blog</h1>
  {% for post in site.posts %}
      <div class = "blog-list-entry">
        <time>{{ post.date | date: "%Y-%m-%d" }}</time>
        •
        <a href = "{{ post.url }}">{{ post.title }}</a>
        (
          {%- for tag in post.tags -%}
            {{ tag | downcase }} {%- unless forloop.last -%}, {% endunless %}
          {%- endfor -%}
        )
      </div>
  {% endfor %}
</div>
