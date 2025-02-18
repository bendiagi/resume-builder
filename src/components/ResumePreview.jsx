function ResumePreview({ data }) {
  return (
    <div id="resume-preview" className="bg-white p-5 rounded-lg shadow-md">
      {/* Header Section */}
      <div className="border-b border-blue-600 pb-2 mb-3">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">{data.name || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {data.email && (
            <div className="flex items-center">
              <svg 
                className="w-3.5 h-3.5 mr-1.5 text-blue-600" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                style={{ 
                  position: 'relative',
                  top: '0.125em' // Equivalent to 2px at 16px font size
                }}
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span style={{ position: 'relative', top: '0.125em' }}>
                {data.email}
              </span>
            </div>
          )}
          {data.phone && (
            <div className="flex items-center">
              <svg 
                className="w-3.5 h-3.5 mr-1.5 text-blue-600" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                style={{ 
                  position: 'relative',
                  top: '0.125em'
                }}
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span style={{ position: 'relative', top: '0.125em' }}>
                {data.phone}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Summary Section */}
      {data.summary && (
        <div className="mb-3">
          <h2 className="text-sm font-semibold text-blue-600 mb-1">Professional Summary</h2>
          <div 
            className="text-sm text-gray-700 leading-snug [&_strong]:font-bold [&_p]:mb-1"
            dangerouslySetInnerHTML={{ __html: data.summary }}
          />
        </div>
      )}

      {/* Experience Section */}
      {data.experience && (
        <div className="mb-3">
          <h2 className="text-sm font-semibold text-blue-600 mb-1">Experience</h2>
          <div 
            className="text-sm text-gray-700 leading-snug 
              [&_strong]:font-bold 
              [&_p]:mb-1
              [&_ul]:list-disc 
              [&_ul]:ml-4 
              [&_li]:mb-0.5
              whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: data.experience }}
          />
        </div>
      )}

      {/* Education Section */}
      {data.education && (
        <div className="mb-3">
          <h2 className="text-sm font-semibold text-blue-600 mb-1">Education</h2>
          <div className="space-y-4">
            {data.education.split('\n\n').map((educationEntry, index) => (
              <div key={index} className="text-sm">
                {educationEntry.split('\n').map((line, lineIndex) => {
                  if (line.startsWith('•')) {
                    return (
                      <div key={lineIndex} className="text-gray-700 ml-4">
                        {line}
                      </div>
                    );
                  } else if (line.includes('|')) {
                    return (
                      <div key={lineIndex} className="text-gray-600">
                        {line}
                      </div>
                    );
                  } else {
                    return (
                      <div key={lineIndex} className="font-bold text-gray-800">
                        {line}
                      </div>
                    );
                  }
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Section */}
      {data.skills && (
        <div className="mb-2">
          <h2 className="text-sm font-semibold text-blue-600 mb-1">Skills</h2>
          <div className="space-y-4">
            {data.skills.split('\n\n').map((skillSection, index) => (
              <div key={index} className="text-sm">
                {skillSection.split('\n').map((line, lineIndex) => {
                  if (line.startsWith('•')) {
                    return (
                      <div key={lineIndex} className="text-gray-700 ml-4">
                        {line}
                      </div>
                    );
                  } else {
                    return (
                      <div key={lineIndex} className="font-bold text-gray-800">
                        {line}
                      </div>
                    );
                  }
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumePreview;
