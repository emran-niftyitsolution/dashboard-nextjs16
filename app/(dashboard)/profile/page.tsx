"use client";

import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  Select,
  Upload,
  message,
} from "antd";
import { useState } from "react";
import { FiCamera, FiMail, FiPhone, FiUser } from "react-icons/fi";

export default function ProfilePage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    console.log("Profile values:", values);

    // Simulate API call
    setTimeout(() => {
      message.success("Profile updated successfully!");
      setLoading(false);
    }, 1000);
  };

  const handleAvatarChange = (info: any) => {
    if (info.file.status === "done") {
      message.success("Avatar updated successfully!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <Card className="shadow-sm">
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
              <h2 className="text-xl font-semibold mt-4">John Doe</h2>
              <p className="text-gray-500 text-sm">john.doe@example.com</p>
              <div className="mt-4 w-full">
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">User ID</span>
                  <span className="text-sm font-medium">#12345</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Role</span>
                  <span className="text-sm font-medium">Administrator</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="text-sm font-medium">Jan 2024</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Account Stats */}
          <Card className="shadow-sm mt-6">
            <h3 className="text-base font-semibold mb-4">Account Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Orders</span>
                <span className="text-lg font-bold text-blue-600">1,234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Revenue</span>
                <span className="text-lg font-bold text-green-600">
                  $45,231
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Projects</span>
                <span className="text-lg font-bold text-purple-600">12</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Profile Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Personal Information</h3>
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
          <Card className="shadow-sm mt-6">
            <h3 className="text-lg font-semibold mb-4">Security</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h4 className="font-medium text-gray-900">Password</h4>
                  <p className="text-sm text-gray-500">
                    Last changed 3 months ago
                  </p>
                </div>
                <Button className="rounded-xl">Change Password</Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h4 className="font-medium text-gray-900">
                    Two-Factor Authentication
                  </h4>
                  <p className="text-sm text-gray-500">
                    Add an extra layer of security
                  </p>
                </div>
                <Button className="rounded-xl">Enable 2FA</Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h4 className="font-medium text-gray-900">Active Sessions</h4>
                  <p className="text-sm text-gray-500">
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
