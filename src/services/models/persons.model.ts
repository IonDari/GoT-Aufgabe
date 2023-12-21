import { House } from "./house.model";

export interface Person {
    house: House;
    name: string;
    quotes: string[];
    slug: string;
}