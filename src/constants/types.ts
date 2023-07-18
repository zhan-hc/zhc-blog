export interface LinksType {
  link_id: number;
  link_icon: string;
  link_name: string;
  link_desc: string;
  link_url: string;
  jump_id: number;
}

export interface JumpType {
  jump_id: number;
  jump_tag: string;
  jump_desc: string;
  active?: boolean
}

export interface LinkListType extends JumpType {
  children?: LinksType
}