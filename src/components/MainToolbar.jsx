import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faCompress, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useContent } from "../context/useContent";
import { TemplateIcons, SelectHeader } from "./EditorToolbar";

/**
 * Component that renders the main toolbar.
 * @param {string} name - The name of the toolbar (e.g., "Editor", "Preview").
 */
export default function MainToolbar({ name }) {
    const [fullScreen, setFullScreen] = useState(false);
    const { content, setContent } = useContent();

    /**
     * Expands the editor or preview section to fullscreen mode.
     * Toggles CSS classes to adjust the layout.
     */
    const expandToFullScreen = () => {
        const lowerCaseName = name.toLowerCase();
        ["editor", "preview"].forEach((element) => {
            element === lowerCaseName
                ? document.getElementById(`${lowerCaseName}-wrapper`).classList.toggle("maximized")
                : document.getElementById(`${element}-wrapper`).classList.toggle("hidden");
        });

        setFullScreen(!fullScreen);
    };

    /**
     * Clears the content in the editor.
     */
    const cleanTextarea = () => {
        setContent("");
    };

    /**
     * Handles the change event of the header select dropdown.
     * Inserts the selected header template into the editor content.
     * @param {Object} event the change event object.
     */
    const handleHeaderChange = (event) => {
        const selectedHeader = event.target.value;
        const headerTag = "#".repeat(parseInt(selectedHeader.substr(1)));
        const template = `${headerTag} Header Text`;
        insertTemplate(template);
    };

    /**
     * Inserts a template into the editor content at the current cursor position.
     * Adjusts the cursor position and focuses the editor.
     * @param {string} template the template to insert.
     */
    const insertTemplate = (template) => {
        const textarea = document.getElementById("editor");
        const { selectionStart, selectionEnd } = textarea;
        const text = textarea.value;

        // Check if the textarea is empty
        const isEmpty = text.length === 0;

        // Insert the template with or without a new line depending on the cursor position and textarea content
        const newText = isEmpty
            ? template
            : text.slice(0, selectionStart) +
              (text[selectionStart - 1] === "\n" ? "" : "\n") +
              template +
              text.slice(selectionEnd);

        setContent(newText);

        // Delay setting the cursor position until after the textarea has updated
        setTimeout(() => {
            const newCursorPosition = isEmpty
                ? template.length
                : selectionStart + template.length + 1;
            textarea.setSelectionRange(newCursorPosition, newCursorPosition);
            textarea.focus();
        }, 0);
    };

    /**
     * Renders the expand icon based on the fullscreen state.
     * @returns {JSX.Element} the rendered JSX element.
     */
    const renderExpandIcon = () => (
        <FontAwesomeIcon
            icon={fullScreen ? faCompress : faExpand}
            onClick={() => expandToFullScreen()}
            title={fullScreen ? "Minimize" : "Maximize"}
        />
    );

    /**
     * Renders the trash icon for clearing the editor content.
     * @returns {JSX.Element} the rendered JSX element.
     */
    const renderTrashIcon = () => (
        <FontAwesomeIcon icon={faTrash} onClick={() => cleanTextarea()} title="Delete Text" />
    );

    return (
        <header className="toolbar">
            <h2>
                {name}
                <span className="action-icons">
                    {name === "Editor" && content.trim() && renderTrashIcon()}
                    {name === "Editor" && renderExpandIcon()}
                    {name === "Preview" && content.trim() && renderExpandIcon()}
                </span>
            </h2>

            {name === "Editor" && (
                <div className="editor-template-icons">
                    <SelectHeader handleHeaderChange={handleHeaderChange} />
                    <TemplateIcons insertTemplate={insertTemplate} />
                </div>
            )}
        </header>
    );
}
