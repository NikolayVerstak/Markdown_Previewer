import "./App.scss";
import { ContentProvider } from "./context/useContent";
import Editor from "./components/Editor";
import Previewer from "./components/Previewer";
import { useEffect } from "react";

/**
 * The main application component.
 */
export default function App() {
    useEffect(() => {
        // Move the editor and preview sections to their initial positions using animation
        document.getElementById("editor-wrapper").style.left = "0%";
        document.getElementById("preview-wrapper").style.right = "0%";
    }, []);

    return (
        <ContentProvider>
            <main>
                <header>
                    <h1 id="header">Markdown Previewer</h1>
                </header>
                <section className="content-wrapper">
                    <Editor />
                    <Previewer />
                </section>
            </main>
        </ContentProvider>
    );
}
