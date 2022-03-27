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

 - LaTeX: https://www.latex-project.org/get/
 - pdf2svg: https://github.com/dawbarton/pdf2svg (for Windows: https://github.com/jalios/pdf2svg-windows)

### 2. install this plugin

**Variant 1**
Go to the releases page, download the files and place them in `<path_to_your_vault>/.obsidian/plugins/obsidian-tikz-renderer`.

**Variant 2**
Clone the repo into `<path_to_your_vault>/.obsidian/plugins`, build it with `npm i && npm run build` and activate it in the settings.

### 3. Set the latex command correctly

Go to the settings of the tikz render plugin and check if the render command is correct.

**Linux:** The default should work if the paths are set correctly

**Windows:** For safety, use the full paths to the executables, e.g., `C:\texlive\2021\bin\win32\pdflatex.exe -interaction=nonstopmode -halt-on-error -shell-escape "{input}" && C:\pdf2svg-windows-1.0\dist-64bits\pdf2svg.exe input.pdf "{output}"`.

## Features

### Done

- Render source code blocks marked with `tikz render` in preview mode
- Support a custom preamble (in the settings) to enable tikz libraries and define global tikz styles

### TODO / Nice to have in the future

- Side-by-side rendering in live-preview to see the image while typing (integration with CodeMirror?)
- Better styling (My CSS skills suck)
- Render `latex` source code blocks (general LaTeX, not just tikz)
- Better error / log messages when build fails
- Test on Windows and Mac
- `tikz style` (or similar) code blocks to define file-local styles, or a similar entry in the fontmatter

## Contributing

If you want to contribute, feel free to open issues or pull requrests.
