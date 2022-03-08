import {
	App,
	MarkdownPostProcessorContext,
	Plugin,
	PluginSettingTab,
	Setting
} from 'obsidian';
import ErrnoException = NodeJS.ErrnoException;

import * as fs from 'fs';
import * as path from 'path';
import {exec, ExecException} from 'child_process';
import * as temp from 'temp';

interface PluginSettings {
	latexCommand: string;
	defaultRenderMode: string;
}

const DEFAULT_SETTINGS: PluginSettings = {
	latexCommand: 'pdflatex -interaction=nonstopmode -halt-on-error -shell-escape "{input}"; pdf2svg input.pdf "{output}"',
	defaultRenderMode: "image_only"
}

export default class MyPlugin extends Plugin {
	settings: PluginSettings;

	async onload() {
		await this.loadSettings();

		console.log("Registering markdown post processor")

		// hide annotation json blocks


		// tikz code blocks
		// TODO: render in preview mode
		this.registerMarkdownPostProcessor((el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
			// Get code blocks
			const codeblocks = el.querySelectorAll("pre");

			// Check if we have to render them and then render them
			for (const block of Array.from(codeblocks)) {
				const content = ctx.getSectionInfo(block);

				// Skip empty code blocks
				if (!content) continue;

				// Get code block language
				const lines = content.text.split('\n').slice(content.lineStart, content.lineEnd);
				const first_line = lines[0];

				// Check block language. Allow both ```tikz render and ```latex tikz render (for syntax highlighting)
				if (!first_line.contains('tikz render')) continue;

				// Get tikz code
				const payload = lines.slice(1).join('\n');

				// Get render mode
				let renderMode = this.settings.defaultRenderMode;
				if (first_line.contains('side-by-side')) renderMode = 'side_by_side';
				if (first_line.contains('image-only')) renderMode = 'image_only';

				// Create the DOM element to render to
				el.addClass('tikz-render-container');
				let d: HTMLElement;
				if (renderMode == 'image_only') {
					el.innerHTML = '';
					d = el;
					d.addClass('tikz-preview', 'tikz-preview-image-only');
				} else {
					d = el.createEl('div');
					d.addClass('tikz-preview', 'tikz-preview-side-by-side');
				}
				d.innerHTML = '<div class="tikz-preview-rendering">rendering tikz...</div>';

				// Render!
				this.renderTikz2SVG(payload).then((data: string) => {
					d.innerHTML = data
				}).catch(err => {
					d.innerText = err.toString()
				});
			}
		}, 100);


		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SettingTab(this.app, this));
	}

	renderTikz2SVG(source: string) {

		// Build latex source code with standalone class
		const latex_source = `\\documentclass[tikz]{standalone}
\\begin{document}
\\begin{tikzpicture}
  ${source}
\\end{tikzpicture}
\\end{document}`;

		// Render latex
		return this.renderLatex2SVG(latex_source);
	}

	renderLatex2SVG(source: string) {
		// Build latex:
		//  - create temp folder
		// 	- write file to temp folder
		//	- call pdflatex and pdf2svg
		// 	- load svg file
		return new Promise((resolve, reject) => {
			temp.mkdir('obsidian-tikz', (err: ErrnoException | null, dirPath: string) => {
				const inputPath = path.join(dirPath, 'input.tex')
				fs.writeFile(inputPath, source, (err: ErrnoException | null) => {
					if (err) reject(err);
					const command = this.settings.latexCommand
						.replace('{input}', 'input.tex')
						.replace('{output}', 'output.svg');

					exec(command, {cwd: dirPath}, (err: ExecException | null) => {
						if (err) reject(err);
						fs.readFile(path.join(dirPath, 'output.svg'), function (err: ErrnoException | null, data: Buffer) {
							if (err) reject(err)
							resolve(data.toString());
						});
					});
				});
			})
		});
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for tikz renderer'});

		new Setting(containerEl)
			.setName('latex command')
			.setDesc('Command executed to render latex to svg')
			.addTextArea(text => text
				.setValue(this.plugin.settings.latexCommand)
				.onChange(async (value) => {
					this.plugin.settings.latexCommand = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName("Default Render Mode")
			.setDesc("Render Mode. You might have to refresh the rendered output for this to have an effect.")
			.addDropdown(dropdown => dropdown
				.addOption("side_by_side", "side by side")
				.addOption("image_only", "image only")
				.setValue(this.plugin.settings.defaultRenderMode)
				.onChange(async value => {
					this.plugin.settings.defaultRenderMode = value;
					await this.plugin.saveSettings();
				}));
	}
}
