import { useState, useEffect } from 'react'
import ResumeForm from './components/ResumeForm'
import ResumePreview from './components/ResumePreview'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import './App.css'

function App() {
  const [resumeData, setResumeData] = useState({
    name: 'Oluwaseun Adebayo',
    email: 'oluwaseun.adebayo@email.com',
    phone: '0803 123 4567',
    summary: 'Results-driven Software Engineer with 5 years of experience developing innovative solutions for Nigerian fintech and e-commerce platforms. Proven track record of building scalable applications serving millions of users across West Africa.',
    experience: `<strong>Senior Software Engineer | Paystack | 2021-Present</strong>
• Led development of payment integration systems, processing over ₦500M in monthly transactions
• Managed a team of 5 developers, implementing agile methodologies and local market-focused solutions
• Optimized payment gateway performance, reducing transaction failure rates by 40%

<strong>Software Developer | Konga | 2019-2021</strong>
• Developed and maintained e-commerce platform serving over 1 million Nigerian customers
• Implemented USSD payment integration, increasing accessibility for non-smartphone users
• Created location-based delivery system optimized for Nigerian addressing system
• Collaborated with UI/UX team to implement culturally relevant design patterns`,
    education: `MSc in Computer Science
University of Lagos | 2017-2019
• First Class Honours
• Thesis: "Implementing Efficient Payment Systems for the Nigerian Market"

BSc in Software Engineering
Covenant University | 2013-2017
• First Class Honours (4.89/5.0 CGPA)
• Faculty Award for Academic Excellence
• President, Computer Science Students Association`,
    skills: `Technical Skills:
• Backend: Python, Django, Node.js, PHP
• Frontend: React, JavaScript, HTML5, CSS3
• Database: PostgreSQL, MongoDB, MySQL

Soft Skills:
• Team Leadership
• Project Management

Additional:
• NYSC Completion (2018)
• Member, Nigeria Computer Society (NCS)
• Certified Scrum Master`
  })

  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024) // 1024px is Tailwind's 'lg' breakpoint
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setResumeData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const exportToPDF = async () => {
    const resumeElement = document.getElementById('resume-preview')
    
    // Set better quality and scaling options
    const canvas = await html2canvas(resumeElement, {
      scale: 1.5, // Reduced from 2 for better file size
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    })

    // A4 measurements in points (pt) with margins
    const margin = 20
    const a4Width = 595.28 - (2 * margin)
    const a4Height = 841.89 - (2 * margin)

    // Create PDF with A4 dimensions
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    })

    // Get the image dimensions
    const imgData = canvas.toDataURL('image/png')
    const imgWidth = a4Width
    const imgHeight = (canvas.height * a4Width) / canvas.width

    // Add the image with margins
    pdf.addImage(
      imgData,
      'PNG',
      margin,        // x position with margin
      margin,        // y position with margin
      imgWidth,      // width
      imgHeight,     // height
      '',            // alias
      'FAST'         // compression
    )

    // Save with a formatted name
    const fileName = `${resumeData.name.replace(/\s+/g, '_')}_Resume.pdf`
    pdf.save(fileName)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Warning */}
      {isMobile && (
        <div className="bg-blue-100 text-blue-800 px-4 py-2 text-center text-sm">
          Resume Builder is better on desktop 💻
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="w-[95%] mx-auto py-4">
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            Resume Builder
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-[95%] mx-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Preview Section */}
          <div className="lg:sticky lg:top-6">
            <ResumePreview data={resumeData} />
            <button
              onClick={exportToPDF}
              className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm font-medium"
            >
              Export to PDF
            </button>
          </div>

          {/* Form Section - Now visible on mobile */}
          <div className="order-first lg:order-2">
            <ResumeForm data={resumeData} onInputChange={handleInputChange} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8 py-8">
        <div className="w-[95%] mx-auto text-center">
          <p className="text-gray-600 mb-4 flex items-center justify-center gap-2 text-sm font-medium">
            Created with 
            <svg className="w-4 h-4 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            in Lagos by Ben Diagi
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="https://github.com/bendiagi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#333] transition-all transform hover:scale-110"
              title="GitHub"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a 
              href="http://linkedin.com/in/ebenezerdiagi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#0A66C2] transition-all transform hover:scale-110"
              title="LinkedIn"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a 
              href="http://behance.net/bennydiagi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#053eff] transition-all transform hover:scale-110"
              title="Behance"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
              </svg>
            </a>
            <a 
              href="https://x.com/bendiagi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-all transform hover:scale-110"
              title="X (formerly Twitter)"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.258 10.152L23.176 0h-2.113l-7.747 8.813L7.133 0H0l9.352 13.328L0 23.973h2.113l8.176-9.309 6.531 9.309h7.133zm-2.895 3.293l-.949-1.328L2.875 1.56h3.246l6.086 8.523.945 1.328 7.91 11.078h-3.246zm0 0"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
