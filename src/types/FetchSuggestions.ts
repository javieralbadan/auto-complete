import { SuggestionItem } from "./SuggestionItem";

export interface SearchProps {
  query?: string;
}

export interface FetchSuggestionsResult {
  data: SuggestionItem[] | null;
  error: string | null;
}
