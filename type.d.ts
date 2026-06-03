export type SidebarItem = {
	id: string;
	label: string;
	href: string;
	icon: SvgIconComponent;
};

export type BookmarkItems = {
	id: string,
        title: string,
        url: string,
        domain: string,
        description: string,
        favicon_url: 'https://www.google.com/s2/favicons?domain=tailwindcss.com&sz=64',
        tags: string[],
        created_at: string,
}

export type BookmarkItem = {
  id: string
  title: string
  url: string
  domain: string
  description: string
  favicon_url: string
  tags: string[]
  created_at: string
}

export type BookmarkCardProps = Omit<BookmarkItem, 'id' | 'created_at'>