import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import ReactMarkdown from 'react-markdown'
export default function test1() {
  const [md, setMd] = useState('')

  const parse = (md) => {
    //ul
    md = md.replace(/^\s*\n\*/gm, '<ul>\n*');
    md = md.replace(/^(\*.+)\s*\n([^\*])/gm, '$1\n</ul>\n\n$2');
    md = md.replace(/^\*(.+)/gm, '<li>$1</li>');

    //ol
    md = md.replace(/^\s*\n\d\./gm, '<ol>\n1.');
    md = md.replace(/^(\d\..+)\s*\n([^\d\.])/gm, '$1\n</ol>\n\n$2');
    md = md.replace(/^\d\.(.+)/gm, '<li>$1</li>');

    //blockquote
    md = md.replace(/^\>(.+)/gm, '<blockquote>$1</blockquote>');

    //h
    md = md.replace(/[\#]{6}(.+)/g, '<h6>$1</h6>');
    md = md.replace(/[\#]{5}(.+)/g, '<h5>$1</h5>');
    md = md.replace(/[\#]{4}(.+)/g, '<h4>$1</h4>');
    md = md.replace(/[\#]{3}(.+)/g, '<h3>$1</h3>');
    md = md.replace(/[\#]{2}(.+)/g, '<h2>$1</h2>');
    md = md.replace(/[\#]{1}(.+)/g, '<h1 className="font-bold">$1</h1>');

    //alt h
    md = md.replace(/^(.+)\n\=+/gm, '<h1>$1</h1>');
    md = md.replace(/^(.+)\n\-+/gm, '<h2>$1</h2>');

    //images
    md = md.replace(/\!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" />');

    //links
    md = md.replace(
      /[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g,
      '<a href="$2" title="$4">$1</a>'
    );

    //font styles
    md = md.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, '<b>$1</b>');
    md = md.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, '<i>$1</i>');
    md = md.replace(/[\~]{2}([^\~]+)[\~]{2}/g, '<del>$1</del>');

    //pre
    md = md.replace(/^\s*\n\`\`\`(([^\s]+))?/gm, '<pre class="$2">');
    md = md.replace(/^\`\`\`\s*\n/gm, '</pre>\n\n');

    //code
    md = md.replace(/[\`]{1}([^\`]+)[\`]{1}/g, '<code>$1</code>');

    //p
    md = md.replace(/^\s*(\n)?(.+)/gm, function (m) {
      return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m)
        ? m
        : '<p>' + m + '</p>';
    });

    //strip p from pre
    md = md.replace(/(\<pre.+\>)\s*\n\<p\>(.+)\<\/p\>/gm, '$1$2');
    

    return md;
  };

  const syntaxHighlight = (md) => {
    // if starts with ``` and ends with ``` then it is code
    if (md.startsWith('```') && md.endsWith('```')) {
      // if consists function then it is javascript and color it
      if (md.includes('function')) {
        md.replace('function', '<span class="text-red-500">function</span>');
      }
      // if consists return then it is javascript and color it
      if (md.includes('return')) {
        md.replace('return', '<span class="text-red-500">return</span>');
      }
    }
    return md;
  };



  return (
    <div className='ml-96'>
      ff
      <textarea
        className='border border-black'
        onChange={(e) => setMd(e.target.value)}
        value={md}
      />
      <div className='border border-black' dangerouslySetInnerHTML={{
        __html: syntaxHighlight(parse(
        md
        ))
      }} />
      {parse(md)}
      {md}
      <ReactMarkdown
        children={md}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <pre {...props}>
                <code className={className}>{children}</code>
              </pre>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}
      />
    </div>
  )
} 
