import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faBold,
    faItalic,
    faImage,
    faCode,
    faQuoteLeft,
    faListUl,
    faList,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Component that renders template icons for the editor toolbar.
 * Allows inserting predefined templates into the editor content.
 * @param {Function} insertTemplate - Function to insert the template into the editor.
 */
export const TemplateIcons = ({ insertTemplate }) => {
    const templateIcons = [
        { icon: faBold, template: "**bold text**", title: "Bold Text" },
        { icon: faItalic, template: "_italic text_", title: "Italic Text" },
        { icon: faImage, template: "![image alt](https://)", title: "Image" },
        { icon: faCode, template: "`code`", title: "Code Block" },
        { icon: faQuoteLeft, template: "> quote", title: "Block Quote" },
        { icon: faListUl, template: "- list item", title: "Unordered List" },
        { icon: faList, template: "1. List Item", title: "Ordered List" },
    ];

    /**
     * Renders a single template icon.
     * @param {Object} icon - The font awesome icon.
     * @param {string} template - The template string.
     * @param {string} title - The title of the template.
     * @returns {JSX.Element} the rendered JSX element.
     */
    const renderTemplateIcon = (icon, template, title) => (
        <FontAwesomeIcon
            key={title}
            icon={icon}
            onClick={() => insertTemplate(template)}
            title={title}
        />
    );

    return (
        <div className="editor-template-icons">
            {templateIcons.map((singleIcon) => {
                const { icon, template, title } = singleIcon;
                return renderTemplateIcon(icon, template, title);
            })}
        </div>
    );
};

/**
 * Component that renders a select dropdown for selecting header levels.
 * @param {Function} handleHeaderChange - Function to handle the header selection change.
 * @returns {JSX.Element} the rendered JSX element.
 */
export const SelectHeader = ({ handleHeaderChange }) => {
    const headers = Array.from({ length: 6 }, (_, index) => ({
        value: `h${index + 1}`,
        label: `Header ${index + 1}`,
    }));

    return (
        <select className="header-select" onChange={handleHeaderChange}>
            <option value="" hidden disabled>
                Select header
            </option>
            {headers.map((header, index) => (
                <option key={index} value={header.value}>
                    {header.label}
                </option>
            ))}
        </select>
    );
};
