const { useEffect } = React

// This component dynamically sets the display length of text using CSS variables
// and allows for expanding the text on hover. Introduced in class to demonstrate
// dynamic root-level CSS modifications.
export function LongTxtCSS({ txt, length = 100 }) {
    useEffect(() => {
        document.documentElement.style.setProperty("--length", `${length}ch`)
    }, [length])

    return (
        <p className="long-txt-css">{txt}</p>
    )
}