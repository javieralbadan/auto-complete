interface Props {
    text: string;
    query: string;
}

export const highlightMatch = ({ text, query }: Props) => {
    if (!query) {
        return text;
    }

    const regex = new RegExp(`(${query})`, 'gi');
    // The only new thing about this 'hack' was the use of this 2nd param for the replace function
    // where we're returning the same coincidence found wrapped in the 'mark' tags
    // I took this approach instead of the higlight API that implies a long implementation, and also
    // with this approach the styling is quite easier
    return text.replace(regex, '<mark>$1</mark>');
}
