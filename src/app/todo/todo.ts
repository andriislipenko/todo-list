export class Todo {
    private static counter = 0;

    public readonly id: number;
    public isDone: boolean;
    public lastEditDate: Date;
    constructor(
        public text: string
    ) {
        this.id = Todo.counter++;
        this.isDone = false;
        this.lastEditDate = new Date();
    }

    get stringDate(): string {
        return this.lastEditDate.toLocaleString('ru', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}
