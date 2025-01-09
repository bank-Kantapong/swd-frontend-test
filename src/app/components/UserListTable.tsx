"use client";

import {
  Button,
  Checkbox,
  CheckboxChangeEvent,
  PaginationProps,
  Space,
  Table,
  TableProps,
} from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  deleteMultipleInfo,
  deleteInfo,
  selectUserInfo,
  UserInfo,
} from "../store/userInfoSlice";
import { useTranslation } from "react-i18next";

const UserListTable = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);
  const dispatch = useDispatch();

  const handleEdit = (record: UserInfo) => {
    dispatch(selectUserInfo(record));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteInfo(id));
  };

  const columns = [
    {
      title: t("name"),
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: t("gender"),
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: t("mobilePhone"),
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: t("nationality"),
      dataIndex: "nationality",
      key: "nationality",
    },
    {
      title: t("manage"),
      render: (_: string, record: UserInfo) => (
        <Space size="middle">
          <span
            style={{ cursor: "pointer" }}
            onClick={() => handleEdit(record)}
          >
            {t("edit")}
          </span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(record.id)}
          >
            {t("delete")}
          </span>
        </Space>
      ),
    },
  ];

  const handleSelectAll = (e: CheckboxChangeEvent) => {
    setIsSelectAll(e.target.checked);
    if (selectedRowKeys.length === userInfo.length) {
      setSelectedRowKeys([]);
    } else {
      setSelectedRowKeys(userInfo.map((row: UserInfo) => row.id));
    }
  };

  const handleDeleteAll = () => {
    dispatch(deleteMultipleInfo(selectedRowKeys));
    setSelectedRowKeys([]);
    setIsSelectAll(false)
    alert(t("deleteSuccess"));
  };

  const rowSelection: TableProps<UserInfo>["rowSelection"] = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys as number[]);
    },
  };

  const itemRender: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement
  ) => {
    if (type === "prev") {
      return <a>{t("prev")}</a>;
    }
    if (type === "next") {
      return <a>{t("next")}</a>;
    }
    return originalElement;
  };

  return (
    <div className="flex-column" style={{ width: "90%", gap: 16 }}>
      <Space>
        <Checkbox checked={isSelectAll} onChange={handleSelectAll}>
          {t("selectAll")}
        </Checkbox>
        <Button onClick={handleDeleteAll}>{t("delete")}</Button>
      </Space>
      <Table
        dataSource={userInfo}
        columns={columns}
        rowSelection={{ ...rowSelection }}
        pagination={{
          position: ["topRight"],
          current: page,
          total: userInfo.length,
          pageSize: 3,
          onChange: (currentPage) => setPage(currentPage),
          itemRender,
        }}
        rowKey="id"
      />
    </div>
  );
};

export default UserListTable;
