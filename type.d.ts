export type SidebarItem = {
  id: string;
  label: string;
  href: string;
  icon: SvgIconComponent;
};

export type BookmarkItems = {
  id: string;
  title: string;
  url: string;
  domain: string;
  description: string;
  favicon_url: string;
  tags: string[];
  created_at: string;
};

export type BookmarkItem = {
  id: number;
  title: string;
  url: string;
  domain: string;
  description: string;
  favicon_url: string;
  tags: string[];
  created_at: string;
  isFavorite: boolean;
};

export type BookmarkCardProps = Omit<BookmarkItem, "created_at">;
