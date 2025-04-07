import { lazy, Suspense, type ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DotsLoader } from 'shared/ui';

const ROOT = '/';

const MainPage = lazy(
  () =>
    import(
      /* ChunkName: "pages/MainPage/MainPage" */ 'pages/MainPage/MainPage'
    ),
);

function SuspenseWrapper(page: ReactElement) {
  return <Suspense fallback={<DotsLoader />}>{page}</Suspense>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROOT} element={SuspenseWrapper(<MainPage />)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
