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
