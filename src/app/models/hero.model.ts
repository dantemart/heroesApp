export class Hero {
    constructor(public username: string,
        public password: string,
        public categoryId: number,
        public active: boolean,
        public id?: number,
        public category?: any
    ) { }
}