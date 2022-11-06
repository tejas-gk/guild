import {useState} from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
// import SyntaxHighlighter from 'react-syntax-highlighter';
// import { docco,dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
export default function card() {
  const [input,setInput]=useState()
  return (
    <div className='flex flex-row'>
      <textarea
      className='w-1/2 h-[100vh] border'
      value={input}
      onChange={(e)=> setInput(e.target.value)}
      autoFocus
      />
      <ReactMarkdown
      children={input}
      className='w-1/2 h-[100vh] border'
      remarkPlugins={[remarkGfm]}
      components={<Component
      lang='javascript'
      value={input}
      />}

      />

    </div>
  )
}



export const Component = ({value,lang}) => {
  // const codeString = '(num) => num + 1';
  return (
    <SyntaxHighlighter language={lang} style={docco}>
      {value}
    </SyntaxHighlighter>
  );
};