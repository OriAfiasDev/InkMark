import React, { useMemo } from 'react';
import styled from 'styled-components';
import { toggleTag } from '../../../utils/syncStorage';
import { colorScheme } from '../globalStyles/colorScheme';

interface AutocompleteProps {
  query: string;
  setQuery: (query: string) => void;
  suggestions: string[];
  currentValues: string[];
  colorId: string;
}

export const Autocomplete = ({
  query,
  setQuery,
  suggestions,
  currentValues,
  colorId,
}: AutocompleteProps) => {
  const filteredSuggestions = useMemo(
    () =>
      query
        ? suggestions.filter((suggestion) => suggestion.includes(query))
        : [],
    [suggestions, query]
  );

  return (
    <>
      <Input
        type="text"
        placeholder="Add Tag"
        autoComplete="off"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && toggleTag(colorId, query)}
      />
      {query && filteredSuggestions.length > 0 && (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion) => (
            <li
              key={suggestion}
              className="item"
              onClick={() => toggleTag(colorId, suggestion)}
              style={{
                color: currentValues.includes(suggestion) ? 'red' : 'black',
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

const Input = styled.input`
  border: none;
  border-radius: 12px;
  background-color: transparent;
  color: ${colorScheme.dark.text};
  outline: none;
  width: 50%;
  &::placeholder {
    color: ${colorScheme.dark.text};
  }
`;
