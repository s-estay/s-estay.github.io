# What is this?
- Personal website created using [Jekyll](https://jekyllrb.com)
- The concept is to be as clean and simple as possible
- Styled with plain CSS and sprinkled with a bit of vanilla JavaScript

# Index
- [Initial setup](#initial-setup)
- [Blog](#blog)
- [Header & footer](#header--footer)
- [Grid](#grid)
- [Blog entry layout](#blog-entry-layout)
- [Viewports](#viewports)
- [Navigation](#navigation)
- [Dark/light toggle](#darklight-toggle)
- [Drafts](#drafts)
- [Tags](#tags)
- [Open external links in a new tab](#open-external-links-in-a-new-tab)
- [Git workflow](#git-workflow)
- [Road map](#road-map)

# Initial setup
## Install Ruby
- `brew list ruby --v`
- `brew install ruby` or `brew upgrade ruby`
## Install Jekyll
- `gem install jekyll bundler`
- `gem update --system`
- `gem -v`
## Clone repo
- Create new public repo in GitHub: `<user-name>/<user-name>.github.io`
- Init repo with a README
- `git clone git@github.com:<user-name>/<user-name>.github.io.git`
## Add Jekyll
- `cd <user-name>.github.io`
- `bundle init`
- `ls`
```terminal
Gemfile Gemfile.lock README.md _site
```
- `bundle add jekyll`
- `bat Gemfile`
```ruby
# frozen_string_literal: true
source "https://rubygems.org"
# gem "rails"
gem "jekyll", "~> 4.3"
gem "csv", "~> 3.3"
gem "base64", "~> 0.2.0"
```
## Create blank site
- [New option: create a blank site, without a template by default](https://github.com/jekyll/jekyll/issues/5260)
- `bundle exec jekyll new . --blank --force`
- `ls`
```terminal
Gemfile Gemfile.lock README.md _config.yml _data _drafts _includes _layouts _posts _sass assets index.md
```
## Add gitignore
- `touch .gitignore`
```
_site/
.jekyll-cache/
Gemfile.lock
```
## Fix Ruby warnings
- `bundle add csv`
- `bundle add base64`
- `bat Gemfile`
```ruby
# frozen_string_literal: true
source "https://rubygems.org"
# gem "rails"
gem "jekyll", "~> 4.3"
gem "csv", "~> 3.3"
gem "base64", "~> 0.2.0"
```
## Remove Sass and use plain CSS
- Sass `@import` has been deprecated, `@use` and `@forward` should be used instead
- After trying (and failing) to make the transition, I gave up and went back to plain and simple CSS
- `rm -rf _sass`
- Rename `assets/css/main.scss` to `assets/css/main.css`
- Remove the use of variables in `assets/css/main.css`
- Remove the [front matter](https://jekyllrb.com/docs/front-matter/) in `assets/css/main.css`
## Run site locally
- `bundle exec jekyll serve`
- [http://localhost:4000](http://localhost:4000)

# Blog
## Rename base layout
- Rename `_layouts/default.html` to `_layouts/base.html`
## Create post
- `mkdir _posts`
- `touch 2024-11-21-hello.md`
```markdown
---
layout: base
title:  "hello"
---
# Hello
Lorem ipsum odor amet, consectetuer adipiscing elit. Velit elementum faucibus; sodales luctus dignissim nam finibus. Lobortis varius a gravida euismod augue dapibus. Dignissim mollis venenatis et taciti fermentum montes sociosqu potenti. Commodo convallis ultricies rhoncus vel neque. Magnis per faucibus fusce scelerisque ad feugiat iaculis. Dolor ante natoque elementum leo integer non vehicula libero est. Diam ut finibus lorem, sem ad et.
```
## Add blog layout
- `touch _layouts/blog.html`
```html
---
layout: base
---
{% for post in site.posts %}
  <li><a href="{{ post.url }}">{{ post.title | downcase }}</a> • {{ post.date | date: '%d %B %Y' | downcase }}</li>
{% endfor %}
```
- The formatting inside the curly brackets is called [liquid](https://github.com/Shopify/liquid)
- Change the front matter in `index.md`
```markdown
---
layout: blog
title: "blog"
---
```
## Formatting the list element
- `assets/css/main.css`
- `li { list-style-type: none; }`

# Header & footer
## _includes folder
- `mkdir _includes`
- `touch _includes/header.html`
- `touch _includes/footer.html`
## Empty header
```html
<header>
</header>
```
## Empty footer
```html
<footer>
</footer>
```
## Add header & footer to base layout
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

# Grid
## Grid template
- Add grid template definition to the `body` container
```css
body {
  font-family: system-ui, sans-serif;
  font-size: 1.125rem;
  line-height: 1.6;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 600px 1fr;
  grid-template-rows: 100px minmax(calc(100svh - 200px), 1fr) 100px;
  grid-template-areas: "header header header" ". main ." "footer footer footer";
}
```
## Grid areas
- Add background color to be able to see the different areas
```css
header { grid-area: header; background-color: lightgray; }
main { grid-area: main; }
footer { grid-area: footer; background-color: lightgray; }
```

# Blog entry layout
## Add blog entry layout
- `touch _layouts/blog-entry.html`
```html
---
layout: base
---
<div class = "blog-entry-container">
  {{ content }}
</div>
```
## Call blog layout from blog entry
```html
---
layout: blog-entry
title:  "hello"
---
```
## Use div to style blog entry
```css
.blog-entry-container {
  height: calc(100% - 4em);
  margin-top: 2em;
  padding-bottom: 2em;
}
```

# Viewports
- Two viewports: Desktop and mobile
## Grid template mobil viewport
```css
body {
  grid-template-columns: 1fr 8fr 1fr;
}
```
## Grid template desktop viewport
```css
@media screen and (min-width: 900px) {
  body {
    grid-template-columns: 1fr 600px 1fr;
  }
}
```
## Group posts by year
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
## Use post entry title in layout
- `_layouts/blog-entry.html`
```html
<div class = "blog-entry-container">
  <h1>{{ page.title }}</h1>
  {{ content }}
</div>
```

# Navigation
## Add more pages
- `touch tags.md`
```markdown
---
layout: base
title: tags
---
```
- `touch about.md`
```markdown
---
layout: base
title: about
---
```
## Navigation pages
- `mkdir _data`
- `touch _data/navigation.yml`
```yaml
- title: blog
  url: /
- title: tags
  url: /tags
- title: about
  url: /about
```
## Jekyll navbar
- [Jekyll navigation bar with automatic highlighting](https://gist.github.com/pdarragh/c7ca120604c1a1d8b8de)
- `touch _includes/navigation.html`
```html
{% for entry in site.data.navigation %}
{% capture fullurl %}{{ site.baseurl }}{{ entry.url }}{% endcapture %}
  {% if fullurl == page.url %}
    {% assign current_page = fullurl %}
    {% break %}
  {% elsif page.url contains fullurl %}
    {% assign current_page = fullurl %}
  {% endif %}
{% endfor %}

<nav>
  <ul>
    {% for entry in site.data.navigation %}
      {% if entry.url == current_page %}
        {% assign current = ' class="current"' %}
      {% else %}
        <!-- we have to declare it 'null' to ensure it doesn't propagate. -->
        {% assign current = null %}
      {% endif %}
      {% assign sublinks = entry.sublinks %}
      {% if sublinks %}
        <li{{ current }}>
          <a href="{{ site.baseurl }}{{ entry.url }}">{{ entry.title }}</a>
          <ul>
            {% for sublink in sublinks %}
              <li><a href="{{ site.baseurl }}{{ sublink.url }}">{{ sublink.title }}</a></li>
            {% endfor %}
          </ul>
        </li>
      {% else %}
      <li{{ current }}><a href="{{ site.baseurl }}{{ entry.url }}">{{ entry.title }}</a></li>
      {% endif %}
    {% endfor %}
  </ul>
</nav>
```
## Add navigation to header
`_includes/header.html`
```html
<header>
  {% include navigation.html %}
</header>
```
## Header is a subgrid
```css
header {
  display: grid;
  grid-template-columns: 1fr 8fr 1fr;
  grid-template-rows: 100px calc(100svh - 100px);
}

@media screen and (min-width: 900px) {
  header {
    grid-template-columns: 1fr 600px 1fr;
  }
}

nav {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}
```
## Navbar flexbox
```css
nav ul {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 2em;
  height: 100%;
  margin: 0;
  padding: 0;
}
```
## Style navbar
```css
nav ul {
  & li {
    list-style-type: none;
    opacity: 0.5;
}
.current { opacity: 1; }
```

# Dark/light toggle
- [Create a dark mode switch with HTML, CSS & JavaScript](https://youtu.be/_gKEUYarehE)
## Light is default
- Default: `:root { color-scheme: light; }`
- Add class `dark-mode` to `html` element in `_layouts/base.html`
- `<html lang="{{ site.lang | default: "en-US" }}" class="dark-mode">`
- Style `dark-mode` class: `.dark-mode { color-scheme: dark; }`
- We go back to default (light) when we remove the `dark-mode` class
## Add button to navbar
```html
<button id="theme-switch">
</button>
```
## Align button
```css
nav ul {
  & button {
    margin-left: auto;
    border-style: none;
  }
}
```
## Icons
- Go to [Google font icons](https://fonts.google.com/icons)
- Search `light mode` and `dark mode` icons
- Select `fill` and download as SVG
- Paste both SVG codes inside the `button` tag
- Give the SVGs an id
```html
<button id="theme-switch">
  <svg id="moon" > moon svg coordinates </svg>
  <svg id="sun" > sun svg coordinates </svg>
</button>
```
## SVG aligment & color
- Use [system colors](https://developer.mozilla.org/en-US/docs/Web/CSS/system-color)
```css
#theme-switch {
  height: 3em;
  width: 3em;
  border-radius: 50%;
  background-color: Canvas;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  & svg { fill: CanvasText; opacity: 0.5; }
  & svg:hover { opacity: 1; }
}
```
## Hide the sun
- Light mode: Only the moon is visible
```css
#theme-switch {
  & svg:last-child { display: none; }
}
```
## Hide the moon
- Dark mode: Only the sun is visible
```css
.dark-mode #theme-switch svg:first-child { display: none; }
.dark-mode #theme-switch svg:last-child { display: block; }
```
## JavaScript
- `mkdir assets/js`
- `touch assets/js/light-dark.js`
- Add link to `light-dark.js` inside `head` in the base layout
```html
<script type="text/javascript" src="/assets/js/light-dark.js" defer></script>
```
- `light-dark.js`
```js
let darkMode = localStorage.getItem('dark-mode')
const themeSwitch = document.getElementById('theme-switch')

const enableDarkMode = () => {
  document.documentElement.classList.add('dark-mode')
  localStorage.setItem('dark-mode', 'active')
}

const disableDarkMode = () => {
  document.documentElement.classList.remove('dark-mode')
  localStorage.setItem('dark-mode', null)
}

if (darkMode === 'active') enableDarkMode()

themeSwitch.addEventListener("click", () => {
  darkMode = localStorage.getItem('dark-mode')
  darkMode !== "active" ? enableDarkMode() : disableDarkMode()
})
```

# Drafts
## Create drafts
- Drafts are posts without a date in the filename
- They’re posts you’re still working on and don’t want to publish yet
- `mkdir _drafts`
- `touch _drafts/a-draft-post.md`
```markdown
---
layout: blog-entry
title: "a draft post"
---
```
- `bundle exec jekyll serve --drafts`
## Ignore drafts
- add `_drafts/` to `.gitignore`

# Tags
## Add tags to a post
- Post's front matter: `tags: [tag, two words]`
## Tags page
```html
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
```

# Open external links in a new tab
- [Open external links in new tab](https://mrinalcs.github.io/open-external-links-in-new-tab)
- Add  the following code to the `head` section of the base layout
```html
<head>
  <script type="text/javascript" src="/assets/js/external-links.js" defer></script>
</head>
```
- `touch assets/js/external-links.js`
```js
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    if (link.hostname !== window.location.hostname) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
});
```

# Git workflow
## Use two branches to avoid errors
- `git checkout -b develop`
- Make some changes
- Notice `main` has been updated
- Commit changes to `develop`
- `git switch main`
- `git pull`
- Bring those changes back into `develop`
- `git switch develop`
- `git rebase main`
- Make some more changes
- Commit them to `develop`
- Merge them into `main`
- `git switch main`
- `git pull`
- `git merge develop`
- When done, push to remote
- `git switch main`
- `git push`
## Add more changes to the lastest commit
- Can't do this after `git push`
- `git add <file-name>`
- `git commit --amend --no-edit`
## Reset local main to remote main
- **Be careful**
- `git fetch origin`
- `git reset --hard origin/main`

# Road map
- [x] Header
- [x] Footer
- [x] Navigation
- [x] SVG icons
- [x] Flexbox (one dimensional elements)
- [x] Grid (two dimensional elements)
- [x] Viewports
- [x] Dark/light theme toggle
- [x] Blog index layout
- [x] Blog entry layout
- [ ] [Code block](https://jekyllrb.com/docs/liquid/tags/)
- [ ] Inline code highlight
- [ ] [Syntax highlight](https://jun711.github.io/web/how-to-highlight-code-on-a-Jekyll-site-syntax-highlighting/)
- [x] Style link elements
- [x] [Tags](https://jekyllrb.com/docs/posts/#tags-and-categories)
- [x] Tag page
- [ ] Date above/below blog entry title
- [x] Drafts
- [ ] [Favicon i](https://css-tricks.com/svg-favicons-and-all-the-fun-things-we-can-do-with-them/)
- [ ] [Favicon ii](https://medium.com/swlh/are-you-using-svg-favicons-yet-a-guide-for-modern-browsers-836a6aace3df)
- [ ] GitHub actions (how they work & features)
- [ ] Images
- [ ] Back-to-the-top button
- [ ] Keyboard navigation shortcuts
- [ ] Inline emoji support
- [x] Open external links in a new tab
