export interface Blog {
    blogId: string,
    title: string,
    displayTitle: string,
    queryTitle: string,
    description: string,
    readTime: number,
    publishedOn: Date,
    category: string,
    likes: number,
    sectionTitles?: SectionTitle[],
    thumbnailUrl: string,
    bannerUrl: string
}

export interface SectionTitle {
    label: string,
    domId: string
}