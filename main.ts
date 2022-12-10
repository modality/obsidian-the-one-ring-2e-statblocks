import {
	MarkdownPostProcessorContext,
	parseYaml,
	Plugin,
} from "obsidian";
import { StatblockRenderer } from "statblockrenderer";

// const srdData = require("data.json");

export default class ArchmagePlugin extends Plugin {
	async onload() {
		this.registerMarkdownCodeBlockProcessor(
			"tor2e",
			this.processMarkdown.bind(this)
		);
	}

	async processMarkdown(
		source: string,
		el: HTMLElement,
		ctx: MarkdownPostProcessorContext
	): Promise<any> {
		const yaml = parseYaml(source);
		let renderData = { ...yaml };

		// if (yaml.monster) {
		// 	const lookupMonster = srdData.find((x) => x.name === yaml.monster);
		// 	if (lookupMonster) {
		// 		renderData = { ...lookupMonster, ...yaml };
		// 	}
		// }

		// console.log(source)
		// console.log(yaml)

		ctx.addChild(new StatblockRenderer(el, ctx.sourcePath, renderData));
	}

	onunload() {}
}
