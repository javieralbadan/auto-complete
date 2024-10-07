import { useEffect, useState } from 'react';
import { useError } from 'src/hooks/useError';
import { useLoading } from 'src/hooks/useLoading';
import { useDebounce } from '../hooks/useDebounce';
import type { SuggestionItem } from '../types/SuggestionItem';
import './Autocomplete.css';
import Suggestions from './Suggestions';
import { FetchSuggestionsResult, SearchProps } from 'src/types/FetchSuggestions';

interface Props {
    fetchSuggestions: (props: SearchProps) => Promise<FetchSuggestionsResult>
}

export default function Autocomplete({ fetchSuggestions }: Props) {
    // TODO: Move the input to a separate component
    const [inputValue, setInputValue] = useState<string>('');
    const [recentlySelected, setRecentlySelected] = useState<boolean>(false);
    const [suggestions, setSuggestions] = useState<SuggestionItem[] | []>([]);    
    
    const { error, setError, clearError } = useError();
    const { isLoading, setLoading, clearLoading } = useLoading();
    const debouncedInputValue = useDebounce({ value: inputValue });

    useEffect(() => {
        const fetchData = async () => {
            if (recentlySelected) {
                return;
            }
            
            setLoading();
            clearError();

            if (debouncedInputValue) {
                const { data, error } = await fetchSuggestions({ query: debouncedInputValue });
                if (data && !error) {
                    setSuggestions(data);
                } else {
                    setError(error as string);
                    setSuggestions([]);
                }
            } else {
                setSuggestions([]);
            }
            clearLoading();
        }
    
        void fetchData();
    }, [setError, clearError, setLoading, clearLoading, debouncedInputValue, recentlySelected, fetchSuggestions]);

    const handleSelectSuggestion = (text: string) => {
        setInputValue(text);
        setSuggestions([]);
        setRecentlySelected(true);
    };

    return (
        <div className="autocomplete">
            <div className="field">
                <input
                    type="text"
                    tabIndex={1}
                    maxLength={50}
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        setRecentlySelected(false);
                    }}
                    placeholder="Search for a movie..."
                />

                {isLoading && (
                    <div className="spinner" />
                )}
            </div>
            {/* TODO: Styling error message */}
            {error.hasError && (
                <div>There was an error retrieving suggestions</div>
            )}
            {suggestions.length > 0 && (
                <Suggestions
                    list={suggestions}
                    query={debouncedInputValue}
                    handleSelectSuggestion={handleSelectSuggestion}
                />
            )}
        </div>
    )
};
