import { Suspense } from "react";
import MainPage from "./components/MainPage";
import styles from "./page.module.css";

export default function Home() {
  return (
    <Suspense fallback="">
      <div className={styles.page}>
        <main className="page">
          <MainPage />
        </main>
      </div>
    </Suspense>
  );
}
