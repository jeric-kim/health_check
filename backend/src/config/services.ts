export type ServiceDefinition = {
  id: string;
  name: string;
  baseUrl: string;
  category: string;
  description?: string;
};

export const SERVICES: ServiceDefinition[] = [
  {
    id: "netflix",
    name: "Netflix",
    baseUrl: "https://www.netflix.com/",
    category: "Streaming",
    description: "영화와 드라마 스트리밍 서비스",
  },
  {
    id: "youtube",
    name: "YouTube",
    baseUrl: "https://www.youtube.com/",
    category: "Video",
    description: "동영상 공유 플랫폼",
  },
  {
    id: "google-search",
    name: "Google 검색",
    baseUrl: "https://www.google.com/",
    category: "Search",
    description: "웹 검색 엔진",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    baseUrl: "https://chatgpt.com/",
    category: "AI Assistant",
    description: "AI 챗봇 서비스",
  },
  {
    id: "canva",
    name: "Canva",
    baseUrl: "https://www.canva.com/ko_kr/",
    category: "Design",
    description: "온라인 디자인 도구",
  },
];
