import { NavigationItem } from "../models/NavigationItem";

export class QueueService {

    private static queue: NavigationItem[] = [];
    private static visited = new Set<string>();

    public static enqueue(item: NavigationItem): void {

        if (!item.url) {
            return;
        }

        if (this.visited.has(item.url)) {
            return;
        }

        this.visited.add(item.url);
        this.queue.push(item);

    }

    public static enqueueMany(items: NavigationItem[]): void {

        items.forEach(item => this.enqueue(item));

    }

    public static dequeue(): NavigationItem | undefined {

        return this.queue.shift();

    }

    public static peek(): NavigationItem | undefined {

        return this.queue[0];

    }

    public static getAll(): NavigationItem[] {

        return [...this.queue];

    }

    public static size(): number {

        return this.queue.length;

    }

    public static isEmpty(): boolean {

        return this.queue.length === 0;

    }

    public static clear(): void {

        this.queue = [];
        this.visited.clear();

    }

}