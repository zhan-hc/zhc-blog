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
  [key: `${MODULES.LINK}_id`]: number;
  [key: `${MODULES.LINK}_tag`]: string;
  [key: `${ MODULES.LINK}_desc`]: string;
  active?: boolean
}