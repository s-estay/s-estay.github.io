Personal website created using Jekyll, HTMl, plain CSS and a little bit of JS. The minimalist styling was inspired by [Elly Fong-Jones](https://github.com/elly)'s [site](https://elly.town).

Thanks to:
- [Tommaso Laurenzi](https://github.com/rebelot) for the awesome [kanagawa wave](https://github.com/rebelot/kanagawa.nvim/) color palette
- [Mrinal Chandra Sarkar](https://mrinalcs.github.io) for the guide on [how to open all links in a new tab](https://mrinalcs.github.io/open-external-links-in-new-tab) 

- `mkdir elly-town-copy`
- `cd elly-town-copy`
- `bundle init`
- `bundle add jekyll`
- `bundle add csv`
- `bundle exec jekyll new . --blank --force`
- `rm -rf _sass`
- `mv assets/css/main.scss assets/css/main.css`
- `mv _layout/default.html _layout/base.html`
- `bundle exec jekyll serve`
- `bundle exec jekyll serve --drafts`

