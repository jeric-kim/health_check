# 건강 상태 모니터

한국에서 많이 사용하는 주요 온라인 서비스(넷플릭스, 유튜브, 구글 검색, ChatGPT, Canva)의 상태를 보여주는 모노레포입니다. 백엔드는 Express + TypeScript로 헬스 체크를 수행하고, 프론트엔드는 Vite + React + TailwindCSS로 대시보드를 제공합니다.

## 프로젝트 구조
- `backend/` : Node.js + Express + TypeScript API 서버
- `frontend/` : React + Vite + TailwindCSS 기반 대시보드

## 실행 방법
### Backend
1. `cd backend`
2. `npm install`
3. `npm run dev` (기본 포트: `4000`)

### Frontend
1. `cd frontend`
2. `npm install`
3. 루트에 `.env.local` 파일을 생성하고 `VITE_API_BASE`를 설정합니다. (기본값: `http://localhost:4000`)
4. `npm run dev`

백엔드가 실행 중이어야 프론트엔드에서 실시간 상태를 확인할 수 있습니다.
