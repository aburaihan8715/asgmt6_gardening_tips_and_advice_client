export default function PostDetailsLayout({
  children,
  comments,
}: Readonly<{
  children: React.ReactNode;
  comments: React.ReactNode;
}>) {
  return (
    <>
      <div>
        {children}
        <div className="mb-10">{comments}</div>
      </div>
    </>
  );
}
