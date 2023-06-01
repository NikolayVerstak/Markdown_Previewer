import React, { createContext, useContext, useState, useEffect } from "react";

const initialContent = `# Welcome to my React Markdown Previewer!
## This is a sub-heading...
### And here's some other cool stuff:

Here is some code:
\`<div></div>\`
between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
    if (firstLine == "\`\`\`" && lastLine == "\`\`\`") {
        return multiLineCode;
    }
}
\`\`\`

There's also [links](https://www.freecodecamp.org), and

> Block Quotes!

- And of course, there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

1. And there are numbered lists too.
2. Use just 1s if you want!
3. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.`;

/**
 * Saves the content to local storage.
 * @param {string} content - The content to be saved.
 */
const saveContentToLocalStorage = (content) => {
    localStorage.setItem("content", content);
};

/**
 * Retrieves the content from local storage.
 * If no content is found, returns the initial content.
 * @returns {string} the retrieved content.
 */
const getStoredContentFromLocalStorage = () => {
    return localStorage.getItem("content") || initialContent;
};

const ContentContext = createContext();

/**
 * Provides the content state and setContent function to its children components.
 * Manages the content state and updates local storage when the content changes.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {JSX.Element} the rendered JSX element.
 */
export const ContentProvider = ({ children }) => {
    const [content, setContent] = useState(getStoredContentFromLocalStorage());

    // Update local storage whenever the content changes
    useEffect(() => {
        saveContentToLocalStorage(content);
    }, [content]);

    return (
        <ContentContext.Provider value={{ content, setContent }}>
            {children}
        </ContentContext.Provider>
    );
};

/**
 * A custom hook to access the content and setContent function from the content context.
 * @returns {Object} An object containing the content and setContent.
 */
export const useContent = () => {
    return useContext(ContentContext);
};
