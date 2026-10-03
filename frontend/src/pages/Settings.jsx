import { useState } from 'react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import ThemeToggle from '../components/layout/ThemeToggle'

const tabs = ['Profile', 'Business', 'Theme', 'Billing']

export default function Settings() {
  const [activeTab, setActiveTab] = useState('Profile')

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>

      <div className="flex gap-2 mb-8 border-b border-border dark:border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="max-w-lg">
        {activeTab === 'Profile' && (
          <div className="space-y-4">
            <Input label="Full Name" placeholder="Your name" />
            <Input label="Email" type="email" placeholder="you@company.com" />
            <Button>Save Changes</Button>
          </div>
        )}

        {activeTab === 'Business' && (
          <div className="space-y-4">
            <Input label="Business Name" placeholder="Acme Corp" />
            <Input label="Industry" placeholder="Technology" />
            <Button>Save Changes</Button>
          </div>
        )}

        {activeTab === 'Theme' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Choose your preferred theme</p>
            <ThemeToggle />
          </div>
        )}

        {activeTab === 'Billing' && (
          <div className="space-y-4">
            <div className="rounded-xl border border-border dark:border-gray-800 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white">Free Plan</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">3 dashboards, basic charts, CSV upload</p>
              <Button variant="outline" className="mt-4">Upgrade to Pro</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
