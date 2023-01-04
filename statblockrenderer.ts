import { MarkdownRenderChild, MarkdownRenderer } from "obsidian";

export class StatblockRenderer extends MarkdownRenderChild {
    statblockEl: HTMLDivElement;

    constructor(containerEl: HTMLElement, context: string, private params: any) {
        super(containerEl);

        this.statblockEl = this.containerEl.createDiv({ cls: "statblock-tor2e" });

        // this.statblockEl.createDiv({ cls: "fl-r em", text: params.source });
        this.statblockEl.createEl("h2", { cls: "nomargin em", text: params.name });

        if (params.blurb !== undefined || params.description !== undefined) {
            MarkdownRenderer.renderMarkdown(params.blurb || params.description, this.statblockEl, context, this);
        }

        // Name, Features, Attribute Level
        const topSectionEl = this.statblockEl.createEl("section");
        if (params.level !== undefined) {
            const attributeEl = topSectionEl.createDiv({ cls: "fl-r lg" });
            diamond(attributeEl, "Attribute Level", params.level);
        }
        topSectionEl.createDiv({ cls: "caps bold nomargin", text: params.name });

        if (params.features !== undefined) {
             MarkdownRenderer.renderMarkdown(params.features.join(", "), topSectionEl, context, this);
        }

        // Stats
        const statsEl = this.statblockEl.createDiv({ cls: 'clear' });
        diamond(statsEl, "Endurance", params.endurance);
        diamond(statsEl, "Might", params.might);

        if (params.resolve !== undefined) {
            diamond(statsEl, "Resolve", params.resolve);
        } else if (params.hate !== undefined) {
            diamond(statsEl, "Hate", params.hate);
        } else {
            diamond(statsEl, "Hate", "&mdash;");
        }

        if (params.parry !== undefined) {
            diamond(statsEl, "Parry", bonus(params.parry));
        } else {
            diamond(statsEl, "Parry", "&mdash;");
        }

        if (params.armour !== undefined) {
            diamond(statsEl, "Armour", params.armour);
        } else if (params.armor !== undefined) {
            diamond(statsEl, "Armour", params.armor);
        } else {
            diamond(statsEl, "Armour", "&mdash;");
        }

        // Combat Proficiencies
        if (params.proficiencies) {
            const profsEl = this.statblockEl.createEl("section", { cls: 'clear' });
            profsEl.createEl("p", { cls: "caps bold nomargin", text: "Combat Proficiencies" });
            for (let i = 0; i < params.proficiencies.length; i++) {
                const prof = params.proficiencies[i];
                const profStr = `${prof.name} ${prof.rating} (${prof.damage}/${prof.injury}, ${prof.special})`;
                MarkdownRenderer.renderMarkdown(profStr, profsEl, context, this);
            }
        }

        // Fell Abilities
        if (params.abilities) {
            const abilitiesEl = this.statblockEl.createEl("section", { cls: 'clear' });
            abilitiesEl.createEl("p", { cls: "caps bold nomargin", text: "Fell Abilities" });
            for (let i = 0; i < params.abilities.length; i++) {
                MarkdownRenderer.renderMarkdown(params.abilities[i], abilitiesEl, context, this);
            }
        }
    }
}

function bonus(stat: number | string): string {
    if (stat === 0) return stat.toString();
    return stat > 0 ? `+${stat}` : `${stat}`;
}

function diamond(containerEl: HTMLElement, label: string, text: string) {
    const diamondContainerEl = containerEl.createDiv({ cls: "attr-diamond-container" });
    diamondContainerEl.createDiv({ cls: "sc accent bold attr-diamond-label", text: label });
    const diamond = diamondContainerEl.createDiv({cls: "attr-diamond"});
    return diamond.createDiv({cls: "attr-diamond-text bold accent", text: text });
}
