export interface LinksType {
  link_id: number;
  link_icon: string;
  link_name: string;
  link_desc: string;
  link_url: string;
  link_priority: number;
  jump_id: number;
}

export interface JumpType {
  jump_id: number;
  jump_tag: string;
  jump_desc: string;
  jump_priority: number;
  active?: boolean;
}

export interface LinkListType extends JumpType {
  children?: LinksType;
  jump_links?: LinksType[]
}

export interface TagType {
  tag_id: number;
  tag_name: string;
  tag_desc: string;
  create_time: Date;
  update_time: Date;
}

export interface CategoryType {
category_id: number;
category_name: string;
category_desc: string;
create_time: Date;
update_time: Date;
}

export interface AuthorInfoType {
  name: string;
  desc: string;
  avatarUrl: string;
  account: Array<AcountType>
}

export interface AcountType {
  label: string;
  url: string;
  type: OperateType;
  icon: string;
}
export interface ArticleType {
  article_id: number;
  create_time: Date;
  update_time: Date;
  article_tag: string;
  article_title: string;
  article_desc: string;
  article_content: string;
  article_like: number;
  article_view: number;
  category_id: number;
  article_cover: string;
  comments?: number;
  likesNum?: number;
  tag_id_blog_tags?: Array<{
    tag_id: number
  }>
}
export interface ArticleMenu {
  level: number;
  content: string;
}

export enum OperateType {
  OPEN = 1,
  COPY,
}
export interface BuryReportType {
  event_id?: number;
  event_name: string;
  event_type: string;
  page_url: string;
  timestamp: number;
  user_id: string;
}
export interface categorySticsType {
  category_id: number;
  category_name: string;
  count: number;
}
export interface tagSticsType {
  tag_id: number;
  tag_name: string;
  count: number;
}

export interface CommentType {
  c_id?: number;
  avatar?: string;
  content: string;
  nickname?: string;
  article_id: number;
  create_time?: Date;
  isAuthor?: number;
}