import { useState } from 'react'
import RichTextEditor from './RichTextEditor'

function ResumeForm({ data, onInputChange }) {
  const [openSections, setOpenSections] = useState({
    summary: true,
    experience: false,
    education: false,
    skills: false
  })

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleRichTextChange = (field) => (content) => {
    onInputChange({
      target: {
        name: field,
        value: content
      }
    })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Personal Info - Always visible */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={onInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={data.phone}
              onChange={onInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Professional Summary Section */}
      <div className={`mb-4 rounded-lg transition-colors ${!openSections.summary ? 'bg-gray-50' : ''}`}>
        <button
          onClick={() => toggleSection('summary')}
          className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-900 p-3"
        >
          <span>Professional Summary</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${openSections.summary ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {openSections.summary && (
          <div className="p-3 pt-0">
            <RichTextEditor
              value={data.summary}
              onChange={handleRichTextChange('summary')}
              placeholder="Write a brief summary of your professional background..."
            />
          </div>
        )}
      </div>

      {/* Experience Section */}
      <div className={`mb-4 rounded-lg transition-colors ${!openSections.experience ? 'bg-gray-50' : ''}`}>
        <button
          onClick={() => toggleSection('experience')}
          className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-900 p-3"
        >
          <span>Experience</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${openSections.experience ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {openSections.experience && (
          <div className="p-3 pt-0">
            <RichTextEditor
              value={data.experience}
              onChange={handleRichTextChange('experience')}
              placeholder="Enter your work experience..."
            />
          </div>
        )}
      </div>

      {/* Education Section */}
      <div className={`mb-4 rounded-lg transition-colors ${!openSections.education ? 'bg-gray-50' : ''}`}>
        <button
          onClick={() => toggleSection('education')}
          className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-900 p-3"
        >
          <span>Education</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${openSections.education ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {openSections.education && (
          <div className="p-3 pt-0">
            <RichTextEditor
              value={data.education}
              onChange={handleRichTextChange('education')}
              placeholder="Enter your educational background..."
            />
          </div>
        )}
      </div>

      {/* Skills Section */}
      <div className={`mb-4 rounded-lg transition-colors ${!openSections.skills ? 'bg-gray-50' : ''}`}>
        <button
          onClick={() => toggleSection('skills')}
          className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-900 p-3"
        >
          <span>Skills</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${openSections.skills ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {openSections.skills && (
          <div className="p-3 pt-0">
            <RichTextEditor
              value={data.skills}
              onChange={handleRichTextChange('skills')}
              placeholder="List your skills..."
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ResumeForm
