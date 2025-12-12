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

#### GitHub Pages 배포
- Vite `base`를 `./`로 설정하여 GitHub Pages 하위 경로에서도 정적 파일이 올바르게 로드됩니다.
- `frontend/.env.production` 파일을 만들고 API 주소를 설정합니다.

  ```bash
  # frontend/.env.production
  VITE_API_BASE=https://<배포한 백엔드 주소>
  ```

- `cd frontend` 후 `npm run deploy`를 실행하면 `dist`가 `gh-pages` 브랜치에 배포됩니다.
- GitHub Pages 주소 예시는 `https://<github-username>.github.io/<repo-name>/` 형태이며, **백엔드가 CORS를 허용**하고 있어야 합니다.
- GitHub Pages에서 API 주소를 즉시 바꾸고 싶다면 `https://<github-username>.github.io/<repo-name>/?apiBase=https://<배포한 백엔드 주소>`처럼 `apiBase` 쿼리를 붙여 접속하면 브라우저 `localStorage`에 저장되어 다음 방문에도 유지됩니다.

#### 백엔드 CORS 설정
- 기본값: 모든 Origin 허용 (`app.use(cors())` 동작과 동일)
- 특정 도메인만 허용하려면 서버 실행 환경에 `CORS_ORIGINS`를 `,`로 구분하여 지정합니다.

  ```bash
  # 예시: 로컬 개발 + GitHub Pages 호스트만 허용
  CORS_ORIGINS=http://localhost:5173,https://<github-username>.github.io/<repo-name>/
  npm run dev
  ```

- 여러 도메인을 입력하면 배열로 처리되어 해당 Origin 요청만 허용됩니다.
