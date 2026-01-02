"use client";

import Card from "@/components/ui/Card";
import { Avatar, Button, Form, Input, Select, Upload, message } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import { useState } from "react";
import { FiCamera, FiMail, FiPhone, FiUser } from "react-icons/fi";

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  role?: string;
  country?: string;
  timezone?: string;
  bio?: string;
}

export default function ProfilePage() {
  const [form] = Form.useForm<ProfileFormValues>();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: ProfileFormValues) => {
    setLoading(true);
    console.log("Profile values:", values);

    // Simulate API call
    setTimeout(() => {
      message.success("Profile updated successfully!");
      setLoading(false);
    }, 1000);
  };

  const handleAvatarChange = (info: UploadChangeParam) => {
    if (info.file.status === "done") {
      message.success("Avatar updated successfully!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Profile Settings
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <Avatar size={120} className="bg-blue-500 text-3xl">
                  JD
                </Avatar>
                <Upload
                  showUploadList={false}
                  onChange={handleAvatarChange}
                  customRequest={({ onSuccess }) => {
                    setTimeout(() => {
                      onSuccess?.("ok");
                    }, 0);
                  }}
                >
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<FiCamera />}
                    className="absolute bottom-0 right-0"
                    size="small"
                  />
                </Upload>
              </div>
              <h2 className="text-xl font-semibold mt-4 text-gray-900 dark:text-gray-100">
                John Doe
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                john.doe@example.com
              </p>
              <div className="mt-4 w-full">
                <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    User ID
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    #12345
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Role
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Administrator
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Member Since
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Jan 2024
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Account Stats */}
          <Card title="Account Stats" className="mt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Total Orders
                </span>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  1,234
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Total Revenue
                </span>
                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                  $45,231
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Active Projects
                </span>
                <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  12
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Profile Form */}
        <div className="lg:col-span-2">
          <Card title="Personal Information">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
                phone: "+1 (555) 123-4567",
                company: "Acme Corporation",
                role: "administrator",
                country: "United States",
                timezone: "America/New_York",
                bio: "Experienced administrator with 5+ years in business management.",
              }}
              size="large"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[
                    { required: true, message: "Please enter your first name" },
                  ]}
                >
                  <Input
                    prefix={<FiUser className="text-gray-400" />}
                    placeholder="John"
                    className="rounded-xl"
                  />
                </Form.Item>

                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[
                    { required: true, message: "Please enter your last name" },
                  ]}
                >
                  <Input
                    prefix={<FiUser className="text-gray-400" />}
                    placeholder="Doe"
                    className="rounded-xl"
                  />
                </Form.Item>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    placeholder="john.doe@example.com"
                    className="rounded-xl"
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                  ]}
                >
                  <Input
                    prefix={<FiPhone className="text-gray-400" />}
                    placeholder="+1 (555) 123-4567"
                    className="rounded-xl"
                  />
                </Form.Item>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item name="company" label="Company">
                  <Input
                    placeholder="Acme Corporation"
                    className="rounded-xl"
                  />
                </Form.Item>

                <Form.Item name="role" label="Role">
                  <Select className="rounded-xl" placeholder="Select role">
                    <Select.Option value="administrator">
                      Administrator
                    </Select.Option>
                    <Select.Option value="manager">Manager</Select.Option>
                    <Select.Option value="user">User</Select.Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item name="country" label="Country">
                  <Select className="rounded-xl" placeholder="Select country">
                    <Select.Option value="United States">
                      United States
                    </Select.Option>
                    <Select.Option value="United Kingdom">
                      United Kingdom
                    </Select.Option>
                    <Select.Option value="Canada">Canada</Select.Option>
                    <Select.Option value="Australia">Australia</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item name="timezone" label="Timezone">
                  <Select className="rounded-xl" placeholder="Select timezone">
                    <Select.Option value="America/New_York">
                      Eastern Time (ET)
                    </Select.Option>
                    <Select.Option value="America/Chicago">
                      Central Time (CT)
                    </Select.Option>
                    <Select.Option value="America/Denver">
                      Mountain Time (MT)
                    </Select.Option>
                    <Select.Option value="America/Los_Angeles">
                      Pacific Time (PT)
                    </Select.Option>
                  </Select>
                </Form.Item>
              </div>

              <Form.Item name="bio" label="Bio">
                <Input.TextArea
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className="rounded-xl"
                />
              </Form.Item>

              <div className="flex gap-3 justify-end mt-6">
                <Button
                  size="large"
                  className="rounded-xl"
                  onClick={() => form.resetFields()}
                >
                  Reset
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  size="large"
                  className="rounded-xl"
                  style={{
                    background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </Form>
          </Card>

          {/* Security Section */}
          <Card title="Security" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    Password
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Last changed 3 months ago
                  </p>
                </div>
                <Button className="rounded-xl">Change Password</Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    Two-Factor Authentication
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Add an extra layer of security
                  </p>
                </div>
                <Button className="rounded-xl">Enable 2FA</Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    Active Sessions
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Manage your active sessions
                  </p>
                </div>
                <Button className="rounded-xl">View Sessions</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
