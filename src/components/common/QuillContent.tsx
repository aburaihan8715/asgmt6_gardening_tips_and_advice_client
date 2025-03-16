'use client';
import DOMPurify from 'dompurify';

interface IQuillContentProps {
  content?: string; // Make content optional to prevent undefined issues
}

const QuillContent: React.FC<IQuillContentProps> = ({ content = '' }) => {
  const sanitizedContent = DOMPurify.sanitize(content);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};

export default QuillContent;
