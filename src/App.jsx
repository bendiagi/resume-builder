import { useState } from 'react'
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
          {/* Preview Section - Left on desktop */}
          <div className="sticky top-6">
            <ResumePreview data={resumeData} />
            <button
              onClick={exportToPDF}
              className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm font-medium"
            >
              Export to PDF
            </button>
          </div>

          {/* Form Section - Right on desktop */}
          <div className="lg:order-2">
            <ResumeForm data={resumeData} onInputChange={handleInputChange} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
