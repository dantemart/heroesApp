export class Hero {
    constructor(public name: string,
        public categoryId: number,
        public active: boolean,
        public id?: number,
        public category?: any
    ) { }
}