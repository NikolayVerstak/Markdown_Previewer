import MainToolbar from "./MainToolbar";
import { useContent } from "../context/useContent";

/**
 * The editor component that allows editing the content.
 * Retrieves the content from the context and updates it when changed.
 */
export default function Editor() {
    const { content, setContent } = useContent();

    return (
        <section id="editor-wrapper">
            <MainToolbar name="Editor" />
            <textarea value={content} id="editor" onChange={(e) => setContent(e.target.value)} />
        </section>
    );
}
