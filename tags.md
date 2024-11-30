---
layout: base
title: tags
---
<div class = "main-container">
  {% for tag in site.tags %}
    <h2>{{ tag[0] }}</h2>
      {% for post in tag[1] %}
        <a href="{{ post.url }}">{{ post.title | downcase }}</a>
        •
        <time>{{ post.date | date: '%d %b' | downcase }}</time>
      {% endfor %}
  {% endfor %}
</div>
