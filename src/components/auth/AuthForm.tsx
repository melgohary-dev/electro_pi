"use client";

import { Form, Input, Button, Card, Typography, App } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useTranslations } from "next-intl";

const { Title } = Typography;

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (values: { email: string; password: string; name?: string }) => Promise<void>;
}

export function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const t = useTranslations("auth");
  const { message } = App.useApp();
  const isLogin = mode === "login";

  const handleFinish = async (values: {
    email: string;
    password: string;
    name?: string;
  }) => {
    try {
      await onSubmit(values);
    } catch {
      message.error(t("error"));
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <Title level={2} className="text-center">
          {isLogin ? t("loginTitle") : t("registerTitle")}
        </Title>
        <Form
          layout="vertical"
          onFinish={handleFinish}
          autoComplete="off"
          requiredMark={false}
        >
          {!isLogin && (
            <Form.Item
              label={t("name")}
              name="name"
              rules={[
                { required: true, message: "Please enter your name" },
                { max: 100 },
              ]}
            >
              <Input prefix={<UserOutlined />} size="large" />
            </Form.Item>
          )}
          <Form.Item
            label={t("email")}
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input prefix={<MailOutlined />} size="large" />
          </Form.Item>
          <Form.Item
            label={t("password")}
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} size="large" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              {t("submit")}
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center">
          {isLogin ? (
            <Link href="/register">{t("registerLink")}</Link>
          ) : (
            <Link href="/login">{t("loginLink")}</Link>
          )}
        </div>
      </Card>
    </div>
  );
}
