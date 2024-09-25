
const { useState, useEffect } = React

export function LongTxt({ txt, length = 100 }) {

    const [displayText, setDisplayText] = useState('')
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        if (isExpanded || txt.length <= length) {
            setDisplayText(txt)
        } else {
            setDisplayText(txt.substring(0, length))
        }
    }, [isExpanded, txt, length])

    function onToggleExpansion() {
        setIsExpanded(prevIsExpanded => !prevIsExpanded)
    }

    return (
        <section className="long-txt">
            <p>
                {displayText}
                {txt.length > length && (
                    <button onClick={onToggleExpansion}>...</button>
                )}
            </p>
        </section>
    )
}