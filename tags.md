---
layout: base
title: tags
---
<div class = "main-container">
  {% for tag in site.tags %}
    <h2>{{ tag[0] | downcase }}</h2>
      {% for post in tag[1] %}
        <div class = "tag-list">
          {% if post.book-title %}
            <a href = "{{ post.url }}">{{ post.book-title }} ({{ post.book-year }})</a>
          {% else %}
            <a href = "{{ post.url }}">{{ post.title }}</a>
          {% endif %}
          •
          <time>{{ post.date | date: '%d %b' | downcase }}</time>
        </div>
      {% endfor %}
  {% endfor %}
</div>
