"use client";

import { Card, Switch, Select, Button, Divider, message } from "antd";
import { useState } from "react";
import {
  FiBell,
  FiMail,
  FiLock,
  FiGlobe,
  FiEye,
  FiShield,
  FiDatabase,
  FiTrash2,
} from "react-icons/fi";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("USD");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [timezone, setTimezone] = useState("America/New_York");

  const handleSavePreferences = () => {
    message.success("Preferences saved successfully!");
  };

  const handleClearCache = () => {
    message.success("Cache cleared successfully!");
  };

  const handleExportData = () => {
    message.success("Data export initiated!");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications Settings */}
        <Card className="shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <FiBell className="text-xl text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Notifications</h3>
              <p className="text-sm text-gray-500">
                Manage how you receive notifications
              </p>
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FiMail className="text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-xs text-gray-500">
                    Receive notifications via email
                  </p>
                </div>
              </div>
              <Switch
                checked={emailNotifications}
                onChange={setEmailNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FiBell className="text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Push Notifications</p>
                  <p className="text-xs text-gray-500">
                    Receive push notifications on your device
                  </p>
                </div>
              </div>
              <Switch
                checked={pushNotifications}
                onChange={setPushNotifications}
              />
            </div>

            <Divider className="my-3" />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Order Updates</p>
                <p className="text-xs text-gray-500">
                  Get notified about order status changes
                </p>
              </div>
              <Switch checked={orderUpdates} onChange={setOrderUpdates} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Marketing Emails</p>
                <p className="text-xs text-gray-500">
                  Receive promotional offers and updates
                </p>
              </div>
              <Switch
                checked={marketingEmails}
                onChange={setMarketingEmails}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Weekly Reports</p>
                <p className="text-xs text-gray-500">
                  Get weekly summary of your activities
                </p>
              </div>
              <Switch checked={weeklyReports} onChange={setWeeklyReports} />
            </div>
          </div>
        </Card>

        {/* Privacy & Security */}
        <Card className="shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <FiLock className="text-xl text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Privacy & Security</h3>
              <p className="text-sm text-gray-500">
                Control your privacy and security settings
              </p>
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-start gap-3">
                <FiShield className="text-xl text-gray-600 mt-1" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">
                    Two-Factor Authentication
                  </h4>
                  <p className="text-sm text-gray-500 mb-3">
                    Secure your account with 2FA
                  </p>
                  <Button className="rounded-xl" type="primary">
                    Enable 2FA
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-start gap-3">
                <FiEye className="text-xl text-gray-600 mt-1" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">
                    Profile Visibility
                  </h4>
                  <p className="text-sm text-gray-500 mb-3">
                    Control who can see your profile
                  </p>
                  <Select
                    defaultValue="public"
                    style={{ width: "100%" }}
                    className="rounded-xl"
                    options={[
                      { value: "public", label: "Public" },
                      { value: "private", label: "Private" },
                      { value: "friends", label: "Friends Only" },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-start gap-3">
                <FiLock className="text-xl text-gray-600 mt-1" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">
                    Active Sessions
                  </h4>
                  <p className="text-sm text-gray-500 mb-3">
                    Manage your active login sessions
                  </p>
                  <Button className="rounded-xl">View All Sessions</Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Language & Region */}
        <Card className="shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <FiGlobe className="text-xl text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Language & Region</h3>
              <p className="text-sm text-gray-500">
                Customize your language and regional settings
              </p>
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <Select
                value={language}
                onChange={setLanguage}
                style={{ width: "100%" }}
                className="rounded-xl"
                size="large"
                options={[
                  { value: "en", label: "English" },
                  { value: "es", label: "Español" },
                  { value: "fr", label: "Français" },
                  { value: "de", label: "Deutsch" },
                  { value: "zh", label: "中文" },
                ]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <Select
                value={currency}
                onChange={setCurrency}
                style={{ width: "100%" }}
                className="rounded-xl"
                size="large"
                options={[
                  { value: "USD", label: "USD ($)" },
                  { value: "EUR", label: "EUR (€)" },
                  { value: "GBP", label: "GBP (£)" },
                  { value: "JPY", label: "JPY (¥)" },
                  { value: "CAD", label: "CAD ($)" },
                ]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Format
              </label>
              <Select
                value={dateFormat}
                onChange={setDateFormat}
                style={{ width: "100%" }}
                className="rounded-xl"
                size="large"
                options={[
                  { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
                  { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
                  { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
                ]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <Select
                value={timezone}
                onChange={setTimezone}
                style={{ width: "100%" }}
                className="rounded-xl"
                size="large"
                options={[
                  { value: "America/New_York", label: "Eastern Time (ET)" },
                  { value: "America/Chicago", label: "Central Time (CT)" },
                  { value: "America/Denver", label: "Mountain Time (MT)" },
                  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
                  { value: "Europe/London", label: "London (GMT)" },
                ]}
              />
            </div>

            <Button
              type="primary"
              size="large"
              className="w-full rounded-xl mt-4"
              onClick={handleSavePreferences}
              style={{ background: "linear-gradient(to right, #3b82f6, #8b5cf6)" }}
            >
              Save Preferences
            </Button>
          </div>
        </Card>

        {/* Data & Storage */}
        <Card className="shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <FiDatabase className="text-xl text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Data & Storage</h3>
              <p className="text-sm text-gray-500">
                Manage your data and storage options
              </p>
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Storage Used
                </span>
                <span className="text-sm font-bold text-gray-900">
                  2.4 GB / 10 GB
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  style={{ width: "24%" }}
                ></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">Cache</p>
                  <p className="text-xs text-gray-500">142 MB</p>
                </div>
                <Button
                  size="small"
                  className="rounded-xl"
                  onClick={handleClearCache}
                >
                  Clear
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">Documents</p>
                  <p className="text-xs text-gray-500">1.8 GB</p>
                </div>
                <Button size="small" className="rounded-xl">
                  Manage
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">Media Files</p>
                  <p className="text-xs text-gray-500">486 MB</p>
                </div>
                <Button size="small" className="rounded-xl">
                  Manage
                </Button>
              </div>
            </div>

            <Divider className="my-3" />

            <div className="space-y-3">
              <Button
                size="large"
                className="w-full rounded-xl"
                onClick={handleExportData}
              >
                Export Your Data
              </Button>

              <Button
                danger
                size="large"
                className="w-full rounded-xl"
                icon={<FiTrash2 />}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

