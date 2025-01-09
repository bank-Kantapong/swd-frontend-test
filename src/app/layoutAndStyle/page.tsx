"use client";

import ChangeLanguage from "../components/ChangeLanguage";
import styles from "./page.module.css";
import { Divider, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useMemo, useState } from "react";
import i18n, { loadLocales } from "../../../i18n";
import "../../../i18n";

const { Text } = Typography;

type ShapeType = {
  id: number;
  type: string;
  className: string;
};

const shapeData: ShapeType[] = [
  {
    id: 1,
    type: "square",
    className: styles.square,
  },
  {
    id: 2,
    type: "circle",
    className: styles.circle,
  },
  {
    id: 3,
    type: "ellipse",
    className: styles.ellipse,
  },
  {
    id: 4,
    type: "trapezoid",
    className: styles.trapezoid,
  },
  {
    id: 5,
    type: "rectangle",
    className: styles.rectangle,
  },
  {
    id: 6,
    type: "parallelogram",
    className: styles.parallelogram,
  },
];

const LayoutAndStyle = () => {
  const [shapes, setShapes] = useState<ShapeType[]>([]);
  const [isReversed, setIsReversed] = useState<boolean>(false);
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

  useEffect(() => {
    if (shapes.length === 0) {
      setShapes(shapeData);
    }
  }, [shapes.length]);

  const moveLeft = () => {
    setShapes((prevItems) => [...prevItems.slice(1), prevItems[0]]);
  };

  const moveRight = () => {
    setShapes((prevItems) => [
      prevItems[prevItems.length - 1],
      ...prevItems.slice(0, -1),
    ]);
  };

  const movePosition = () => {
    setIsReversed((prev) => !prev);
  };

  const handleShuffle = () => {
    setShapes((prevItems) => [...prevItems].sort(() => Math.random() - 0.5));
  };

  const shapeRow = useMemo(() => {
    return {
      firstRow: shapes.slice(0, 3),
      secondRow: shapes.slice(3, 6),
    };
  }, [shapes]);

  return (
    <div className="main-page-container">
      <ChangeLanguage />
      <h1 className="title">{t("layoutAndStyle")}</h1>
      <div className={styles.layoutContainer}>
        <div className={styles.triangleContainer}>
          <div className={styles.whiteBox} onClick={moveLeft}>
            <div className={styles.triangleLeft} />
            <div className={styles.moveBox}>
              <Text>{t("moveShape")}</Text>
            </div>
          </div>
          <div
            className={styles.whiteBox}
            style={{ gap: "120px" }}
            onClick={movePosition}
          >
            <div className={styles.triangleUp} />
            <div className={styles.triangleDown} />
            <div className={styles.moveBox}>
              <Text>{t("movePosition")}</Text>
            </div>
          </div>
          <div className={styles.whiteBox} onClick={moveRight}>
            <div className={styles.triangleRight} />
            <div className={styles.moveBox}>
              <Text>{t("moveShape")}</Text>
            </div>
          </div>
        </div>
        <Divider style={{ margin: "40px 0" }} />
        <div
          className={styles.shapeContainer}
          style={{ flexDirection: isReversed ? "column-reverse" : "column" }}
        >
          <div
            className={styles.shapeBox}
            style={{ justifyContent: "flex-end" }}
          >
            {shapeRow.firstRow.map((item: ShapeType) => (
              <div className={styles.whiteBox} key={item.id} onClick={handleShuffle}>
                <div className={item.className} />
              </div>
            ))}
          </div>
          <div
            className={styles.shapeBox}
            style={{ justifyContent: "flex-start" }}
          >
            {shapeRow.secondRow.map((item: ShapeType) => (
              <div className={styles.whiteBox} key={item.id} onClick={handleShuffle}>
                <div className={item.className} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAndStyle;
