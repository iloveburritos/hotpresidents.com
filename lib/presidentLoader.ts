import { President } from "@/models/presidents";
import { fetchRandomPresident } from "./presidents";

export class PresidentLoader {
  private preloadQueue: President[] = [];
  private readonly QUEUE_SIZE = 2;
  private imageCache: Map<string, HTMLImageElement> = new Map();
  private currentPresidentId?: string;

  constructor() {
    this.initializeQueue();
  }

  private async initializeQueue() {
    const loadPromises = [];
    while (this.preloadQueue.length < this.QUEUE_SIZE) {
      const president = fetchRandomPresident(this.currentPresidentId);
      loadPromises.push(this.preloadPresidentAssets(president));
      this.preloadQueue.push(president);
    }
    await Promise.all(loadPromises);
  }

  private async preloadPresidentAssets(president: President) {
    // Parallel loading of image and stats
    await Promise.all([
      this.preloadImage(president.imageURL),
      this.preloadAlternativeImages(president.alternativeImages),
      fetch(`/api/stats?id=${president.id}`)
    ]);
  }

  private preloadImage(url: string): Promise<void> {
    if (this.imageCache.has(url)) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        this.imageCache.set(url, img);
        resolve();
      };
      img.src = url;
    });
  }

  private preloadAlternativeImages(urls: string[] = []) {
    return Promise.all(urls.map(url => this.preloadImage(url)));
  }

  async getNextPresident(): Promise<President> {
    if (this.preloadQueue.length === 0) {
      await this.initializeQueue();
    }
    
    const nextPresident = this.preloadQueue.shift()!;
    this.currentPresidentId = nextPresident.id;
    
    this.initializeQueue();
    
    return nextPresident;
  }
}
