---
layout: base
---
<div class = "main-container">
  <h1>blog</h1>
  {% assign pinned_posts = site.posts | where: "pinned", true %}
  {% assign regular_posts = site.posts | where_exp: "post", "post.pinned != true" %}
  {% assign ordered_posts = pinned_posts | concat: regular_posts %}
  {% for post in ordered_posts %}
      <div class = "blog-list-entry">
        {% if post.pinned %}📌 {% endif %}<time>{{ post.date | date: "%Y-%m-%d" }}</time>
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
