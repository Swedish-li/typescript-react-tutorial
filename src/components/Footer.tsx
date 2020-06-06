import React from "react";
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
} from "../constants/TodoFilters";
import FilterLink from "../containers/FilterLink";
import { FilterType } from "../reducers/visibilityFilter";

const FILTER_TITLES = {
  [SHOW_ALL]: "All",
  [SHOW_ACTIVE]: "Active",
  [SHOW_COMPLETED]: "Completed",
};

export type Props = {
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
};

const Footer = ({ activeCount, completedCount, onClearCompleted }: Props) => {
  const itemWord = activeCount === 1 ? "item" : "items";

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount || "No"}</strong> {itemWord} left
      </span>
      <ul className="filters">
        {Object.keys(FILTER_TITLES).map((filter) => {
          const filterKey = filter as FilterType;
          return (
            <li key={filter}>
              <FilterLink filter={filterKey}>
                {FILTER_TITLES[filterKey]}
              </FilterLink>
            </li>
          );
        })}
      </ul>
      {!!completedCount && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear Completed
        </button>
      )}
    </footer>
  );
};

export default Footer;
