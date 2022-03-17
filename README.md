# Obsidian Tikz Renderer

This is a quick write-up of a possible way to render tikz graphics in Obsidian.

:warning: This is an experimental plugin! Things may change and break at any time! I am not an experienced TypeScript, HTML or CSS programmer! So, no guarantees that anything will work!

![tikz_obsidian_logo](https://user-images.githubusercontent.com/25043715/158750976-109bea4e-ce28-4922-a066-2e184c4c950c.gif)

## Usage

Any code block that has the word combination `tikz render` in the language line will be rendered in preview mode. 
This is because the language for syntax highlighting is determined by the first word, so that `latex tikz render` performs latex syntax highlighting.
You can then specify either `side-by-side`, which will render code and image side-by-side (as shown in the demo gif), or `image-only`, which will render only the image.

## Installation

### 1. Install latex and pdf2svg

**On Linux**

**On Windows**

### 2. install this plugin

**Variant 1**
Download and unzip release into `<path_to_your_vult>/.obsidian/plugins/obsidian-tikz-renderer`.

**Variant 2**
Clone the repo into `<path_to_your_vult>/.obsidian/plugins`, build it with `npm i && npm run build` and activate it in the settings.

### 3. Set the latex command correctly

Go to the settings of the tikz render plugin and check if the render command is correct.

## Features

### Done

- Render source code blocks marked with `tikz render` in preview mode

### TODO / Nice to have in the future

- Support tikz libraries and global custom styles
- Side-by-side rendering in live-preview to see the image while typing (integration with CodeMirror?)
- Better styling (My CSS skills suck)
- Render `latex` source code blocks (general LaTeX, not just tikz)
- Better error / log messages when build fails
- Test on Windows and Mac
- `tikz style` (or similar) code blocks to define file-local styles

## Contributing

If you want to contribute, feel free to open issues or pull requrests.
