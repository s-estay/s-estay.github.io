---
layout: blog-entry
title: Add HHKB support in Zed
tags: [zed, hhkb, vim]
---

This entry aims mostly to help myself to remember how did I do the setup for my HHKB keyboard in Zed in Vim mode. What I want to do is to move around without using the mouse, nothing fancy. These are my requirements:

- Open/close the terminal with `cmd+t`
- Navigate with the hjkl-keys in normal mode
- Jump to the first character of a line with `shift+h`
- Jump to the last character of a line with `shift+l`
- Jump to the first line of the document with `gg`
- Jump to the last line of the document with `shift+g`
- In visual mode, extend a selection from any point in a line to the start of it
- In visual mode, extend a selection from any point in a line to the end of it

Zed's keymap editor was very useful as a start point. My setup [here](https://gist.github.com/s-estay/81064b561368849ccfea87e16d649be0).

Additionally, I've mapped the swedish letters å to `righ-opt+a`, ä to `righ-opt+q` and ö to `righ-opt+o`. I did this outside Zed, in Karabiner Elemets. Code [here](https://gist.github.com/s-estay/3f7e10b2f6a2a61f3efe7497d5ac6fea).
