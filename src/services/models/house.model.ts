export interface House {
    name: string;
    slug: string;
    members: {
      name: string;
      slug: string;
    }[];
}