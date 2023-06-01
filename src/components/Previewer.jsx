import { useContent } from "../context/useContent";
import MainToolbar from "./MainToolbar";
import { marked } from "marked";
import Prism from "prismjs";

import "prismjs/themes/prism.css";

/**
 * Component that renders the preview section.
 */
export default function Previewer() {
    const { content } = useContent();

    /**
     * Custom renderer for links in the markdown content.
     * Opens links in a new tab.
     * @param {string} href - The link URL.
     * @param {string} title - The link title.
     * @param {string} text - The link text.
     * @returns {string} the rendered HTML for the link.
     */
    const renderer = new marked.Renderer();
    renderer.link = function (href, title, text) {
        return `<a target="_blank" href="${href}">${text}` + "</a>";
    };

    marked.setOptions({
        renderer,
        /**
         * Custom highlight function using Prism.js for syntax highlighting.
         * @param {string} code - The code to highlight.
         * @returns {string} the highlighted HTML code.
         */
        highlight: function (code) {
            return Prism.highlight(code, Prism.languages.javascript, "javascript");
        },
        breaks: true,
    });

    return (
        <section id="preview-wrapper">
            <MainToolbar name="Preview" />
            <div id="preview" dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </section>
    );
}
