export class Note {
    public lastEditDate;
    constructor(
        public id: number,
        public text: string
    ) {
        this.lastEditDate = new Date;
    }
}
