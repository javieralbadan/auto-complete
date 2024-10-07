import { SuggestionItem } from "src/types/SuggestionItem";
import { highlightMatch } from "src/utils/highlightMatch";

interface Props {
    list: SuggestionItem[] | [];
    query: string;
    handleSelectSuggestion: (text: string) => void;
}

export default function Suggestions({ list, query, handleSelectSuggestion }: Props) {
    return (
        <ul className="suggestions-list">
            {list.map((item) => (
                // In order to prevent XSS, I found the attribute 'dangerouslySetInnerHTML' to inject the HTML
                <li
                    key={item.id}
                    onClick={() => handleSelectSuggestion(item.name)}
                    dangerouslySetInnerHTML={{
                        __html: highlightMatch({ text: item.name, query })
                    }}
                />
            ))}
        </ul>
    )
};
