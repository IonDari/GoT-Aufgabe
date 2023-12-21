import { House } from "./house.model";

export interface Quotes {
    character: {
        house: House;
        name: string;
        slug: string;
    };
    sentence: string;
  }

  export interface test {
    character: {
        house: House;
        name: string;
        slug: string;
    };
    sentence: string;
  }