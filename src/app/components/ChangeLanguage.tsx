"use client";

import { Button, Select } from "antd";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { changeLanguage, LANGUAGE } from "../store/languageSlice";
import "../../../i18n";
import { changeLng } from "../../../i18n";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const ChangeLanguage = () => {
  const { t } = useTranslation();
  const language = useSelector((state: RootState) => state.language.language);
  const dispatch = useDispatch();

  const onChangeLanguage = async (lng: LANGUAGE) => {
    await changeLng(lng);
    dispatch(changeLanguage(lng));
  };

  const languageOptions = useMemo(() => {
    return [
      { value: LANGUAGE.TH, label: "ไทย" },
      { value: LANGUAGE.EN, label: "English" },
    ];
  }, []);

  return (
    <div className="select-language-box">
      <div className="flex-column" style={{ gap: 16, alignItems: "flex-end" }}>
        <Select
          value={language}
          options={languageOptions}
          onChange={(value: LANGUAGE) => onChangeLanguage(value)}
          style={{ width: 120 }}
        />
        <Link href="/">
          <Button>{t("home")}</Button>
        </Link>
      </div>
    </div>
  );
};

export default ChangeLanguage;
