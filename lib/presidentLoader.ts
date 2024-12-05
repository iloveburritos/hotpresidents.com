import { President } from "@/models/presidents";
import { fetchRandomPresident } from "./presidents";

export class PresidentLoader {
  private preloadQueue: President[] = [];
  private readonly QUEUE_SIZE = 3;

  constructor() {
    this.initializeQueue();
  }

  private async initializeQueue() {
    while (this.preloadQueue.length < this.QUEUE_SIZE) {
      const president = fetchRandomPresident();
      await this.preloadPresidentAssets(president);
      this.preloadQueue.push(president);
    }
  }

  private async preloadPresidentAssets(president: President) {
    // Preload image
    const img = new Image();
    img.src = president.imageURL;
    
    // Prefetch stats
    await fetch(`/api/stats?id=${president.id}`);
  }

  async getNextPresident(): Promise<President> {
    if (this.preloadQueue.length === 0) {
      await this.initializeQueue();
    }
    
    const nextPresident = this.preloadQueue.shift()!;
    this.initializeQueue(); // Replenish queue
    return nextPresident;
  }
}
