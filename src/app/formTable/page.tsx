"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import ChangeLanguage from "../components/ChangeLanguage";
import i18n, { loadLocales } from "../../../i18n";
import "../../../i18n";
import { useTranslation } from "react-i18next";
import styles from "./page.module.css";
import { Button, DatePicker, Form, Input, Radio, Select, Space } from "antd";
import {
  deSelectUserInfo,
  editInfo,
  GENDER,
  initLocalUserInfo,
  submitInfo,
  UserInfo,
} from "../store/userInfoSlice";
import UserListTable from "../components/UserListTable";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { RootState } from "../store/store";

const FormTable = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { userInfo, selectedUser } = useSelector(
    (state: RootState) => state.userInfo
  );
  const dispatch = useDispatch();
  const isInit = useRef<boolean>(false);
  console.log("selectedUser", selectedUser);

  useEffect(() => {
    const localUserInfo = localStorage.getItem("userInfo");
    if (userInfo.length === 0 && localUserInfo && !isInit.current) {
      const parseLocalValue = JSON.parse(localUserInfo);
      dispatch(initLocalUserInfo(parseLocalValue));
      isInit.current = true;
    }
  }, [dispatch, userInfo.length]);

  useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue({
        ...selectedUser,
        birthday: dayjs(selectedUser.birthday),
      });
    }
  }, [form, selectedUser]);

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

  const titleOptions = useMemo(() => {
    return [
      {
        value: "Mr.",
        label: "Mr.",
      },
      {
        value: "Mrs.",
        label: "Mrs.",
      },
      {
        value: "Ms.",
        label: "Ms.",
      },
    ];
  }, []);

  const nationalityOption = useMemo(() => {
    return [
      {
        value: "Thai",
        label: "Thai",
      },
      {
        value: "French",
        label: "French",
      },
      {
        value: "American",
        label: "American",
      },
    ];
  }, []);

  const phoneOptions = useMemo(() => {
    return [
      {
        value: "+66",
        label: "(Th)+66",
      },
      {
        value: "+33",
        label: "(Fr)+33",
      },
      {
        value: "+1",
        label: "(US)+1",
      },
    ];
  }, []);

  const onClickReset = () => {
    form.resetFields();
    dispatch(deSelectUserInfo());
  };

  const onSubmitForm = (values: UserInfo) => {
    const citizenValue = `${values.citizen1}-${values.citizen2}-${values.citizen3}-${values.citizen4}-${values.citizen5}`;
    const phoneValue = `${values.phonePrefix}${values.phoneNumber}`;
    const fullName = `${values.firstName} ${values.lastName}`;
    const newValues = {
      ...values,
      id: selectedUser ? selectedUser.id : Date.now(),
      citizen: citizenValue,
      mobilePhone: phoneValue,
      birthday: dayjs(values.birthday).format("DD/MM/YYYY"),
      fullName,
    };
    dispatch(selectedUser ? editInfo(newValues) : submitInfo(newValues));
    dispatch(deSelectUserInfo());
    alert(t("saveSuccess"));
    form.resetFields();
  };

  return (
    <div className="main-page-container" style={{ gap: "24px" }}>
      <ChangeLanguage />
      <h1 className="title">{t("formAndTable")}</h1>
      <Form form={form} onFinish={onSubmitForm}>
        <div className={styles.formContainer}>
          <div className="flex-row" style={{ gap: 16 }}>
            <Form.Item
              label={t("title")}
              name="title"
              rules={[
                { required: true, message: t("pleaseFillInTheInformation") },
              ]}
            >
              <Select
                options={titleOptions}
                placeholder={t("title")}
                style={{ width: 120 }}
              />
            </Form.Item>
            <Form.Item
              label={t("firstname")}
              name="firstName"
              rules={[
                { required: true, message: t("pleaseFillInTheInformation") },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t("lastname")}
              name="lastName"
              rules={[
                { required: true, message: t("pleaseFillInTheInformation") },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="flex-row" style={{ gap: 16 }}>
            <Form.Item
              label={t("birthday")}
              name="birthday"
              rules={[
                { required: true, message: t("pleaseFillInTheInformation") },
              ]}
            >
              <DatePicker placeholder={t("mmddyy")} />
            </Form.Item>
            <Form.Item
              label={t("nationality")}
              name="nationality"
              rules={[
                { required: true, message: t("pleaseFillInTheInformation") },
              ]}
            >
              <Select
                options={nationalityOption}
                placeholder={t("pleaseSelect")}
                style={{ width: 200 }}
              />
            </Form.Item>
          </div>
          <div className="flex-row" style={{ gap: 16 }}>
            <Form.Item label={t("citizenId")}>
              <Space>
                <Form.Item name="citizen1" noStyle>
                  <Input
                    maxLength={1}
                    style={{ width: 60, textAlign: "center" }}
                  />
                </Form.Item>
                <span>-</span>
                <Form.Item name="citizen2" noStyle>
                  <Input
                    maxLength={4}
                    style={{ width: 120, textAlign: "center" }}
                  />
                </Form.Item>
                <span>-</span>
                <Form.Item name="citizen3" noStyle>
                  <Input
                    maxLength={5}
                    style={{ width: 120, textAlign: "center" }}
                  />
                </Form.Item>
                <span>-</span>
                <Form.Item name="citizen4" noStyle>
                  <Input
                    maxLength={2}
                    style={{ width: 80, textAlign: "center" }}
                  />
                </Form.Item>
                <span>-</span>
                <Form.Item name="citizen5" noStyle>
                  <Input
                    maxLength={1}
                    style={{ width: 60, textAlign: "center" }}
                  />
                </Form.Item>
              </Space>
            </Form.Item>
          </div>
          <div className="flex-row" style={{ gap: 16 }}>
            <Form.Item
              label={t("gender")}
              name="gender"
              rules={[
                { required: true, message: t("pleaseFillInTheInformation") },
              ]}
            >
              <Radio.Group>
                <Radio value={GENDER.MALE}>{t("male")}</Radio>
                <Radio value={GENDER.FEMALE}>{t("female")}</Radio>
                <Radio value={GENDER.UNSEX}>{t("unsex")}</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          <div className="flex-row" style={{ gap: 16 }}>
            <Form.Item
              label={t("mobilePhone")}
              name="phone"
              rules={[
                { required: true, message: t("pleaseFillInTheInformation") },
              ]}
            >
              <Space>
                <Form.Item name="phonePrefix" noStyle>
                  <Select options={phoneOptions} style={{ width: 120 }} />
                </Form.Item>
                <span>-</span>
                <Form.Item name="phoneNumber" noStyle>
                  <Input type="number" />
                </Form.Item>
              </Space>
            </Form.Item>
          </div>
          <div className="flex-row" style={{ gap: 16 }}>
            <Form.Item label={t("passportNo")} name="passport">
              <Input type="number" />
            </Form.Item>
          </div>
          <div className="flex-row" style={{ gap: "10%" }}>
            <Form.Item
              label={t("expectedSalary")}
              name="expectedSalary"
              rules={[
                { required: true, message: t("pleaseFillInTheInformation") },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Button onClick={onClickReset}>{t("reset")}</Button>
            <Button onClick={() => form.submit()}>{t("submit")}</Button>
          </div>
        </div>
      </Form>

      <UserListTable />
    </div>
  );
};

export default FormTable;
