import type { InsightItem } from '@/api/endpoints/analysis';

export interface GroupedInsight {
  type: InsightItem['type'];
  title: string;
  messages: string[];
}

export function groupInsights(items: InsightItem[]): GroupedInsight[] {
  const map = new Map<string, GroupedInsight>();
  for (const item of items) {
    const key = `${item.type}::${item.title}`;
    if (map.has(key)) {
      map.get(key)!.messages.push(item.message);
    } else {
      map.set(key, {
        type: item.type,
        title: item.title,
        messages: [item.message],
      });
    }
  }
  return Array.from(map.values());
}
