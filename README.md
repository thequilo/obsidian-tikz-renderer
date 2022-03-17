# Obsidian Tikz Renderer

This is a quick write-up of a possible way to render tikz graphics in Obsidian.

:warning: This is an experimental plugin! Things may change and break at any time!

![tikz_obsidian_logo](https://user-images.githubusercontent.com/25043715/158750976-109bea4e-ce28-4922-a066-2e184c4c950c.gif)


## Installation

### 1. Install latex and pdf2svg

**On Linux**

**On Windows**

### 2. install this plugin

Clone the repo into `<path_to_your_vult>/.obsidian/plugins` and activate it in the settings.

### 3. Set the latex command correctly

Go to the settings of the tikz render plugin and check if the render command is correct.

## Features

### Done

- Render source code blocks marked with `tikz render` in preview mode

## TODO / Nice to have in the future

- Support tikz libraries and global custom styles
- Side-by-side rendering in live-preview to see the image while typing (integration with CodeMirror?)
- Better styling (My CSS skills suck)
- Render `latex` source code blocks (general LaTeX, not just tikz)
- Better error / log messages when build fails
- Test on Windows and Mac
- `tikz style` (or similar) code blocks to define file-local styles
