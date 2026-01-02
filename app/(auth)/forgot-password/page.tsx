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
      <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
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
                  style={{ background: "linear-gradient(to right, #3b82f6, #8b5cf6)" }}
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
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Back Link */}
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
          >
            <FiArrowLeft />
            <span>Back to login</span>
          </Link>

          {/* Logo/Brand */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
            <p className="text-gray-600">
              No worries! Enter your email and we&apos;ll send you reset instructions.
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
                className="w-full h-12 rounded-xl text-base font-medium"
                style={{ background: "linear-gradient(to right, #3b82f6, #8b5cf6)" }}
              >
                Send Reset Link
              </Button>
            </Form.Item>
          </Form>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-900">
              <strong>Didn&apos;t receive the email?</strong>
              <br />
              Check your spam folder or try again with a different email address.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Branding/Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-100">
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
        <div className="relative z-10 flex flex-col justify-center items-start px-16 text-white">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
            <FiMail className="w-10 h-10" />
          </div>
          <h1 className="text-5xl font-bold mb-6">Reset Your Password</h1>
          <p className="text-xl text-blue-100 mb-8 max-w-md">
            It happens to the best of us. Enter your email and we&apos;ll help you get back into your account.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg">Secure reset process</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg">Quick & easy</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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

