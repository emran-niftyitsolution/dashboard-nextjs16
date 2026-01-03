"use client";

import { Button, Form, Input, Result } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiArrowLeft, FiMail } from "react-icons/fi";

export default function ForgotPasswordPage() {
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);

  const onFinish = (values: { email: string }) => {
    console.log("Reset password for:", values);
    // Handle password reset logic here
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-8 dark:from-gray-900 dark:to-gray-800">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-900">
          <Result
            status="success"
            title="Check Your Email"
            subTitle="We've sent a password reset link to your email address. Please check your inbox and follow the instructions."
            extra={[
              <Link href="/login" key="login">
                <Button
                  type="primary"
                  size="large"
                  className="rounded-xl"
                  style={{
                    background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
                  }}
                >
                  Back to Login
                </Button>
              </Link>,
            ]}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white transition-colors dark:bg-gray-900">
      {/* Left Side - Form */}
      <div className="flex w-full items-center justify-center bg-white p-8 transition-colors lg:w-1/2 dark:bg-gray-900">
        <div className="w-full max-w-md">
          {/* Back Link */}
          <Link
            href="/login"
            className="mb-8 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <FiArrowLeft />
            <span>Back to login</span>
          </Link>

          {/* Logo/Brand */}
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
              Forgot Password?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              No worries! Enter your email and we&apos;ll send you reset
              instructions.
            </p>
          </div>

          {/* Form */}
          <Form
            form={form}
            name="forgot-password"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
            size="large"
          >
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                prefix={<FiMail className="text-gray-400" />}
                placeholder="name@example.com"
                className="rounded-xl"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="h-12 w-full rounded-xl text-base font-medium"
                style={{
                  background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
                }}
              >
                Send Reset Link
              </Button>
            </Form.Item>
          </Form>

          {/* Additional Info */}
          <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
            <p className="text-sm text-blue-900 dark:text-blue-300">
              <strong>Didn&apos;t receive the email?</strong>
              <br />
              Check your spam folder or try again with a different email
              address.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Branding/Image */}
      <div className="relative hidden overflow-hidden bg-gray-100 lg:flex lg:w-1/2 dark:bg-gray-800">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074"
          alt="Forgot password background"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-blue-800/85 to-purple-900/90"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-start justify-center px-16 text-white">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <FiMail className="h-10 w-10" />
          </div>
          <h1 className="mb-6 text-5xl font-bold">Reset Your Password</h1>
          <p className="mb-8 max-w-md text-xl text-blue-100">
            It happens to the best of us. Enter your email and we&apos;ll help
            you get back into your account.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-lg">Secure reset process</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-lg">Quick & easy</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-lg">24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
