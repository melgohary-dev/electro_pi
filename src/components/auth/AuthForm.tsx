"use client";

import { Form, Input, Button, Card, Typography, Flex, App } from "antd";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useTranslation } from "@/i18n/LanguageContext";

const { Title, Text } = Typography;

export enum AuthMode {
  LOGIN = "login",
  REGISTER = "register",
}

interface AuthFormProps {
  mode: AuthMode;
  onSubmit: (values: { email: string; password: string; name?: string }) => Promise<void>;
}

export function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const isLogin = mode === AuthMode.LOGIN;

  const handleFinish = async (values: {
    email: string;
    password: string;
    name?: string;
  }) => {
    try {
      await onSubmit(values);
    } catch {
      message.error(t("auth.invalidCredentials"));
    }
  };

  return (
    <Flex align="center" justify="center" className="auth-page auth-form-wrapper">
      <Flex vertical className="auth-form-inner">
        <Flex vertical align="center" gap={16} className="auth-form-header">
          <div className="auth-form-icon-circle">
            <ShoppingCartOutlined className="auth-form-icon" />
          </div>
          <Flex vertical align="center" gap={4}>
            <Title level={2} className="auth-form-title">
              {isLogin ? t("auth.welcomeBack") : t("auth.createAccount")}
            </Title>
            <Text type="secondary" className="auth-form-subtitle">
              {isLogin ? t("auth.signInToContinue") : t("auth.createAccountToStart")}
            </Text>
          </Flex>
        </Flex>

        <Card styles={{ body: { padding: 24 } }}>
          <Form
            layout="vertical"
            onFinish={handleFinish}
            autoComplete="off"
            requiredMark={false}
            size="large"
          >
            {!isLogin && (
              <Form.Item
                label={<Text strong>{t("auth.name")}</Text>}
                name="name"
                rules={[
                  { required: true, message: t("auth.nameRequired") },
                  { max: 100 },
                ]}
              >
                <Input prefix={<UserOutlined className="input-prefix-icon" />} />
              </Form.Item>
            )}
            <Form.Item
              label={<Text strong>{t("auth.email")}</Text>}
              name="email"
              rules={[
                { required: true, message: t("auth.emailRequired") },
                { type: "email", message: t("auth.emailInvalid") },
              ]}
            >
              <Input prefix={<MailOutlined className="input-prefix-icon" />} />
            </Form.Item>
            <Form.Item
              label={<Text strong>{t("auth.password")}</Text>}
              name="password"
              rules={[
                { required: true, message: t("auth.passwordRequired") },
                { min: 6, message: t("auth.passwordMin") },
              ]}
            >
              <Input.Password prefix={<LockOutlined className="input-prefix-icon" />} />
            </Form.Item>
            <Form.Item className="auth-form-submit-item">
              <Button type="primary" htmlType="submit" block size="large">
                {t("auth.submit")}
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Flex justify="center" className="auth-form-footer">
          <Text type="secondary">
            {isLogin ? t("auth.dontHaveAccount") : t("auth.alreadyHaveAccount")}{" "}
            <Link href={isLogin ? "/register" : "/login"}>
              {isLogin ? t("auth.createAccountLink") : t("auth.signInLink")}
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
