---
layout: default
---

<ul>
  {% for post in site.posts %}
    <li class = "list">
      <span>{{post.date | date: "%d %-b %Y"}}</span> • <a href = "{{post.url | absolute_url}}">{{post.title}}</a>
      <!-- {{post.excerpt}} -->
    </li>
  {% endfor %}
</ul>

