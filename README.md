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
```html
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

# grid
## grid template
- add grid template definition to the `body` container
```css
body {
  font-family: system-ui, sans-serif;
  font-size: 1.125rem;
  line-height: 1.6;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 600px 1fr;
  grid-template-rows: 100px minmax(calc(100vh - 200px), 1fr) 100px;
  grid-template-areas: "header header header" ". main ." "footer footer footer";
}
```
## grid areas
- add background color to be able to see the different areas
```css
header { grid-area: header; background-color: lightgray; }
main { grid-area: main; }
footer { grid-area: footer; background-color: lightgray; }
```

# blog entry layout
## add blog entry layout
- `touch _layouts/blog-entry.html`
```html
---
layout: base
---
<div class = "blog-entry-container">
  {{ content }}
</div>
```
## call blog layout from blog entry
```
---
layout: blog-entry
title:  "hello"
---
```
## use div to style blog entry
```css
.blog-entry-container {
  height: calc(100% - 4em);
  margin-top: 2em;
  padding-bottom: 2em;
}
```

# viewports
- two viewports: desktop and mobile
## grid template mobil viewport
```css
body {
  grid-template-columns: 1fr 8fr 1fr;
}
```
## grid template desktop viewport
```css
@media screen and (min-width: 900px) {
  body {
    grid-template-columns: 1fr 600px 1fr;
  }
}
```
## group posts by year
```html
<div class = "blog-entries-container">
  {% assign postsByYear = site.posts | group_by_exp:"post", "post.date | date: '%Y'" %}
  {% for year in postsByYear %}
    <h2>{{ year.name }}</h2>
    {% for post in year.items %}
      <div class = "blog-list-entry">
        <a href="{{ post.url }}">{{ post.title | downcase }}</a>
        •
        <time>{{ post.date | date: '%d %b' | downcase }}</time>
      </div>
    {% endfor %}
  {% endfor %}
</div>
```
## use post entry title in layout
- `_layouts/blog-entry.html`
```html
<div class = "blog-entry-container">
  <h1>{{ page.title }}</h1>
  {{ content }}
</div>
```

# navigation
## add more pages
- `touch tags.md`
```
---
layout: base
title: tags
---
```
- `touch about.md`
```
---
layout: base
title: about
---
```
## navigation info
- `mkdir _data`
- `touch _data/navigation.yml`
```
- title: blog
  url: /
- title: tags
  url: /tags
- title: about
  url: /about
```

# git workflow
## use two branches to avoid errors
- `git checkout -b develop`
- make some changes
- notice `main` has been updated
- commit changes to `develop`
- `git switch main`
- `git pull`
- bring those changes back into `develop`
- `git switch develop`
- `git rebase main`
- make some more changes
- commit them to `develop`
- merge them into `main`
- `git switch main`
- `git pull`
- `git merge develop`
- when done, push to remote
- `git switch main`
- `git push`
## add more changes to the lastest commit
- can't do this after `git push`
- `git add <file-name>`
- `git commit --amend --no-edit`
## reset local main to remote main
- **be careful**
- `git fetch origin`
- `git reset --hard origin/main`

# road map
- [x] header
- [x] footer
- [ ] navigation (home and tag page)
- [ ] svg icons
- [ ] flexbox (one dimensional elements)
- [x] grid (two dimensional elements)
- [x] viewports
- [ ] dark light theme toggle
- [x] blog index layout
- [x] blog entry layout
- [ ] [code block](https://jekyllrb.com/docs/liquid/tags/)
- [ ] inline code highlight
- [ ] [syntax highlight](https://jun711.github.io/web/how-to-highlight-code-on-a-Jekyll-site-syntax-highlighting/)
- [x] style link elements
- [ ] [tags](https://jekyllrb.com/docs/posts/#tags-and-categories)
- [ ] date and tags above/below blog entry title
- [ ] tag page
- [ ] draft posts
- [ ] favicon
- [ ] github actions (how they work & features)
- [ ] images
- [ ] *back to the top* button
- [ ] keyboard navigation shortcuts
