import type { SuggestionsResponse } from '../types/SuggestionsResponse';
import type { SuggestionItem } from '../types/SuggestionItem';

export const mapSuggestions = (list: SuggestionsResponse[]): SuggestionItem[] => {
	const suggestionMap = new Map<string, SuggestionItem>();

	list.forEach(({ show, score }: SuggestionsResponse) => {
		const item: SuggestionItem = {
			id: show.id,
			url: show.url,
			name: show.name,
			score,
		};

		if (!suggestionMap.has(show.name)) {
			suggestionMap.set(show.name, item)
		}
		
	});

	const mapToArray = Array.from(suggestionMap.values());
	return mapToArray.sort((a, b) => b.score - a.score);
};
