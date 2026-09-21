---
layout: base
---
<div class = "main-container">
  <h1>blog</h1>
  {% assign pinned_posts = site.posts | where: "pinned", true %}
  {% assign regular_posts = site.posts | where_exp: "post", "post.pinned != true" %}
  {% for post in pinned_posts %}
    <div class = "blog-list-entry">
      <time>{{ post.date | date: "%Y-%m-%d" }}</time>
      •
      <a href = "{{ post.url }}">{{ post.short_title | default: post.title }}</a>
      ({% include tag-links.html tags = post.tags %})
    </div>
  {% endfor %}
  {% if pinned_posts.size > 0 and regular_posts.size > 0 %}
    <br>
  {% endif %}
  {% for post in regular_posts %}
    <div class = "blog-list-entry">
      <time>{{ post.date | date: "%Y-%m-%d" }}</time>
      •
      <a href = "{{ post.url }}">{{ post.short_title | default: post.title }}</a>
      ({% include tag-links.html tags = post.tags %})
    </div>
  {% endfor %}
</div>
