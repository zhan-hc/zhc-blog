import { MODULES } from "@/constants"

export interface LinksType {
  [key: `${MODULES.LINK}_id`]: number;
  [key: `${MODULES.LINK}_icon`]: string;
  [key: `${MODULES.LINK}_name`]: string;
  [key: `${ MODULES.LINK}_desc`]: string;
  [key: `${MODULES.LINK}_url`]: string;
  [key: `${MODULES.JUMP}_id`]: number;
}

export interface JumpType {
  [key: `${MODULES.JUMP}_id`]: number;
  [key: `${MODULES.JUMP}_tag`]: string;
  [key: `${ MODULES.JUMP}_desc`]: string;
  active?: boolean
}

export interface LinkListType extends JumpType {
  children?: LinksType
}