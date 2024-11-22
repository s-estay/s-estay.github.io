# what is this?
- personal website created using [jekyll](https://jekyllrb.com)

# initial setup
## install ruby
- `brew list ruby --v`
- `brew install ruby` or `brew upgrade ruby`
## install jekyll
- `gem install jekyll bundler`
- `gem update --system`
- `gem -v`
## clone repo
- create new public repo in github : `<user-name>/<user-name>.github.io`
- init repo with a readme
- `git clone git@github.com:<user-name>/<user-name>.github.io.git`
## add jekyll
- `cd <user-name>.github.io`
- `bundle init`
- `ls`
```
Gemfile Gemfile.lock README.md _site
```
- `bundle add jekyll`
- `bat Gemfile`
```
# frozen_string_literal: true
source "https://rubygems.org"
# gem "rails"
gem "jekyll", "~> 4.3"
gem "csv", "~> 3.3"
gem "base64", "~> 0.2.0"
```
## create blank site
- [new option: create a blank site, without a template by default](https://github.com/jekyll/jekyll/issues/5260)
- `bundle exec jekyll new . --blank --force`
- `ls`
```
Gemfile Gemfile.lock README.md _config.yml _data _drafts _includes _layouts _posts _sass assets index.md
```
## add gitignore
- `touch .gitignore`
```
_site/
.jekyll-cache/
Gemfile.lock
```
## fix ruby warnings
- `bundle add csv`
- `bundle add base64`
- `bat Gemfile`
```
# frozen_string_literal: true
source "https://rubygems.org"
# gem "rails"
gem "jekyll", "~> 4.3"
gem "csv", "~> 3.3"
gem "base64", "~> 0.2.0"
```
## remove sass and use plain css
- sass `@import` has been deprecated, `@use` and `@forward` should be used instead
- after trying (and failing) to make the transition, i gave up and went back to plain and simple css
- `rm -rf _sass`
- rename `assets/css/main.scss` to `assets/css/main.css`
- remove the use of variables in `assets/css/main.css`
- remove the [front matter](https://jekyllrb.com/docs/front-matter/) in `assets/css/main.css`
## run site locally
- `bundle exec jekyll serve`
- [http://localhost:4000](http://localhost:4000)

# blog
## rename base layout
- rename `_layouts/default.html` to `_layouts/base.html`
## create post
- `mkdir _posts`
- `touch 2024-11-21-hello.md`
```
---
layout: base
title:  "hello"
---
# hello
Lorem ipsum odor amet, consectetuer adipiscing elit. Velit elementum faucibus; sodales luctus dignissim nam finibus. Lobortis varius a gravida euismod augue dapibus. Dignissim mollis venenatis et taciti fermentum montes sociosqu potenti. Commodo convallis ultricies rhoncus vel neque. Magnis per faucibus fusce scelerisque ad feugiat iaculis. Dolor ante natoque elementum leo integer non vehicula libero est. Diam ut finibus lorem, sem ad et.
```
## add blog layout
- `touch _layouts/blog.html`
```
---
layout: base
---
{% for post in site.posts %}
  <li><a href="{{ post.url }}">{{ post.title | downcase }}</a> • {{ post.date | date: '%d %B %Y' | downcase }}</li>
{% endfor %}
```
- the formatting inside the curly brackets is called [liquid](https://github.com/Shopify/liquid)
- change the front matter in `index.md`
```
---
layout: blog
title: "blog"
---
```
## formatting the list element
- `vim assets/css/main.css`
- `li { list-style-type: none; }`

# header & footer
## _includes folder
- `mkdir _includes`
- `touch _includes/header.html`
- `touch _includes/footer.html`
## empty header
```html
<header>
</header>
```
## empty footer
```html
<footer>
</footer>
```
## add header & footer to base layout
```html
<!DOCTYPE html>
<html lang="{{ site.lang | default: "en-US" }}">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="utf-8">
    <title>{{ page.title }} • {{ site.title }}</title>
    <link rel="stylesheet" href="{{ "/assets/css/main.css" | relative_url }}">
  </head>
  <body>
    {% include header.html %}
    <main>
      {{ content }}
    </main>
  </body>
  {% include footer.html %}
</html>
```

# Road map
- [x] header
- [x] footer
- [ ] navigation
- [ ] grid and flexbox
- [ ] dark light theme toggle
- [ ] [code block](https://jekyllrb.com/docs/liquid/tags/)
- [x] style link elements
- [ ] [tags](https://jekyllrb.com/docs/posts/#tags-and-categories)
- [ ] date and tags below blog entry title
- [ ] draft posts
