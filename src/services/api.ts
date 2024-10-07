import {
  FetchSuggestionsResult,
  SearchProps,
} from "src/types/FetchSuggestions";
import { BASE_URL } from "../config";
import { mapSuggestions } from "../utils/mapper";

export const fetchSuggestions = async ({
  query,
}: SearchProps): Promise<FetchSuggestionsResult> => {
  if (!query) {
    return { data: null, error: "Not query provided" };
  }

  try {
    const response: Response = await fetch(
      `${BASE_URL}/search/shows?q=${query}`,
    );
    if (response.status !== 200) {
      return { data: null, error: response.statusText };
    }

    const rowdata = await response.json();
    const data = mapSuggestions(rowdata);
    return { data, error: null };
  } catch (error) {
    const catchedError =
      error instanceof Error ? error.message : "An uknown error occurred";
    return { data: null, error: catchedError };
  }
};
