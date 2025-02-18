import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'

function RichTextEditor({ value, onChange, placeholder }) {
  // Format the initial content to preserve HTML structure
  const formatInitialContent = (content) => {
    if (!content) return ''
    
    // If the content is the summary (doesn't contain bullets or pipes), just wrap in p tag
    if (!content.includes('•') && !content.includes('|')) {
      return `<p>${content}</p>`
    }
    
    return content.split('\n').map(line => {
      if (line.startsWith('•')) {
        return `<li>${line.substring(1).trim()}</li>`
      } else if (line.includes('|') || line.includes('•')) {
        return `<p>${line}</p>`
      } else if (line.trim()) {
        return `<p><strong>${line}</strong></p>`
      }
      return line
    }).join('')
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'ml-4',
          },
          keepMarks: true,
          keepAttributes: true,
        },
        paragraph: {
          HTMLAttributes: {
            class: 'mb-0.5',
          },
        },
      }),
      Bold,
      Italic,
    ],
    content: formatInitialContent(value),
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'w-full focus:outline-none min-h-[100px] text-sm text-gray-700',
      },
    },
  })

  // Function to handle Enter key for proper spacing
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      editor?.commands.splitBlock()
    }
  }

  return (
    <div className="border border-gray-300 rounded-md p-2">
      <div className="mb-2 border-b border-gray-200 pb-2 flex gap-2">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded ${
            editor?.isActive('bold')
              ? 'bg-gray-200'
              : 'hover:bg-gray-100'
          }`}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded ${
            editor?.isActive('italic')
              ? 'bg-gray-200'
              : 'hover:bg-gray-100'
          }`}
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded ${
            editor?.isActive('bulletList')
              ? 'bg-gray-200'
              : 'hover:bg-gray-100'
          }`}
          title="Bullet List"
        >
          • List
        </button>
      </div>
      <EditorContent 
        editor={editor} 
        className="[&_.ProseMirror]:min-h-[100px] [&_.ProseMirror]:max-h-[300px] [&_.ProseMirror]:outline-none
          [&_.ProseMirror]:resize-y [&_.ProseMirror]:overflow-auto
          [&_p]:mb-0.5
          [&_ul]:list-disc [&_ul]:ml-4 [&_li]:mb-0.5
          [&_strong]:font-bold [&_strong]:text-gray-800
          [&_em]:italic
          [&_p:has(strong)]:text-gray-800
          [&_p:has(strong)+p]:text-gray-600
          prose prose-sm max-w-none
          whitespace-pre-line"
      />
    </div>
  )
}

export default RichTextEditor 