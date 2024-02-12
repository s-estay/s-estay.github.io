---
layout: default
---

<ul class = "small-viewport">
  {% for post in site.posts %}
    <li class = "list">
      <a href = "{{post.url | absolute_url}}">
        <div class = "box">
            <span class = "index-date">{{post.date | date: "%d %-b %Y"}}</span>
            {{post.title}}
        </div>
      </a>
    </li>
  {% endfor %}
</ul>

<ul class = "large-viewport">
  {% for post in site.posts %}
    <li class = "list">
      <span>{{post.date | date: "%d %-b %Y"}}</span> • <a href = "{{post.url | absolute_url}}">{{post.title}}</a>
      <!-- {{post.excerpt}} -->
    </li>
  {% endfor %}
</ul>
