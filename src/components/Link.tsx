import React from "react";
import classnames from "classnames";

export type Props = {
  active: boolean;
  children: string;
  setFilter: () => void;
};

const Link = ({ active, children, setFilter }: Props) => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <a
    className={classnames({ selected: active })}
    style={{ cursor: "pointer" }}
    onClick={() => setFilter()}
  >
    {children}
  </a>
);

export default Link;
