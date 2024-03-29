/* eslint-disable no-unused-vars */
import {
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
  FilterOptionsState,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { HTMLAttributes, ReactNode, SyntheticEvent } from "react";

interface AutoCompleteOptions {
  id: string;
  title: string;
}

type FilterOptionsFun<T> = (options: T[], state: FilterOptionsState<T>) => T[];
type OptionEqualValueFun<T> = (option: T, value: T) => boolean;
export type OnInputChangeFun = (event: SyntheticEvent, value: string) => void;
type RenderOptionsFun<T> = (
  props: HTMLAttributes<HTMLLIElement>,
  option: T,
  state: AutocompleteRenderOptionState
) => ReactNode;

type RenderInputFun = (params: AutocompleteRenderInputParams) => ReactNode;

export const titleFilterMatch = (title: string, searchQuery: string) =>
  title.toLowerCase()?.startsWith(searchQuery.toLowerCase());

export const handleFilterOptions: FilterOptionsFun<AutoCompleteOptions> = (
  value,
  state
) => value.filter((post) => titleFilterMatch(post.title, state.inputValue));

export const handleOptionEqualValue: OptionEqualValueFun<
  AutoCompleteOptions
> = (option, value) => option.id === value.id;
export const handleGetOptionsLabel = (option: string | AutoCompleteOptions) =>
  typeof option === "object" ? option.title : String(option);

export const handleRenderOptions: RenderOptionsFun<AutoCompleteOptions> = (
  props,
  option
) => (
  <li {...props} key={option.id}>
    {option.title}
  </li>
);
export const handleRenderInput: RenderInputFun = (params) => (
  <div ref={params.InputProps.ref}>
    <SearchIcon />
    <input type="text" {...params.inputProps} placeholder="Search" />
  </div>
);
