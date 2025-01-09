"use client";

import Link from "next/link";
import ChangeLanguage from "./ChangeLanguage";
import { useTranslation } from "react-i18next";
import "../../../i18n";
import { useCallback, useEffect } from "react";
import i18n, { loadLocales } from "../../../i18n";

const MainPage = () => {
  const { t } = useTranslation();

  const initLanguange = useCallback(async () => {
    // โหลดคำแปลและตั้งค่าภาษา
    const translations = await loadLocales("en");
    if (translations) {
      i18n.addResourceBundle("en", "translation", translations, true, true);
      i18n.changeLanguage("en");
    }
  }, []);

  useEffect(() => {
    initLanguange();
  }, [initLanguange]);

  return (
    <div className="main-page-container">
      <ChangeLanguage />

      <div style={{ display: "flex", gap: 16 }}>
        <Link href="/layoutAndStyle">
          <div className="menu-box">
            <h3>{t("test", { value: 1 })}</h3>
            <span>{t("layoutAndStyle")}</span>
          </div>
        </Link>
        <Link href="/formTable">
          <div className="menu-box">
            <h3>{t("test", { value: 2 })}</h3>
            <span>{t("formAndTable")}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
