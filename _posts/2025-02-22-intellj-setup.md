---
layout: blog-entry
title: IntelliJ setup
tags: [programming]
---
After I got my HHKB I decided to go all in and learn the Vim motions in Neovim. My Neovim setup included [Treesitter](https://github.com/nvim-treesitter/nvim-treesitter) for syntax highlight, [Telescope](https://github.com/nvim-telescope/telescope.nvim) for fuzzy search, [Harpoon](https://github.com/ThePrimeagen/harpoon/tree/harpoon2) for fast navigation between files and [Tmux](https://tmux.github.io/) to manage panes and jump between them. All that worked well and my Vim-fu was getting faster and more accurate. The only problem was that as soon as I started working in Spring Boot all my attention went to learn Java in [IntelliJ](https://www.jetbrains.com/idea/download/).

IntelliJ is the IDE I use at work and I have grown to appreciate it. Out of the box I get a file explorer panel which for me works faster than Treesitter and Harpoon. Searching works as expected. Jumping between panes within IntelliJ is something I yet need to figure out. Additionally, I now have linting, markdown preview, built-in terminal and git support.

For Vim motions I use [IdeaVim](https://plugins.jetbrains.com/plugin/164-ideavim) plugin to which I added relative line number support, the ability to jump to the first and last character of a line with shift + h/l in both normal and visual modes, escape with jj, and go back and forth between two files with ctrl + o/i. 

```
:set relativenumber
let mapleader=" "
nnoremap <s-h> ^
vnoremap <s-h> ^
nnoremap <s-l> g_
vnoremap <s-l> g_
inoremap jj <Esc>
nmap <c-o> :action Back<CR>
nmap <c-i> :action Forward<CR>
```

Having the same setup and tools in my MacBook as I have in my daily job computer (Windows 11 by the way), allows me to build the muscle memory necessary to get faster at touch typing. At the end of the day typing ideas is what I do as a way of making a living and supporting my creative process. So typing needs to be fun, almost like playing a game, and at the same time feel frictionless. For me a HHKB keyboard and typing in Vim is the way to go. The IDE might change as it will depend on my personal preferences and the operative system I am working on.