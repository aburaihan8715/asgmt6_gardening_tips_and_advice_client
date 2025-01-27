import React from 'react';
import DOMPurify from 'dompurify';

interface IQuillContentProps {
  content: string;
}

const QuillContent: React.FC<IQuillContentProps> = ({ content }) => {
  // Sanitize the content to prevent XSS attacks
  const sanitizedContent = DOMPurify.sanitize(content);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};

export default QuillContent;
