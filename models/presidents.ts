// models/presidents.ts
export interface President {
    id: string;
    name: string;
    office: string;
    quote: string;
    yearsInOffice: string;
    imageURL: string;
    shortname: string;
    alternativeImages?: string[];
    hot?: number;
    not?: number;
}
