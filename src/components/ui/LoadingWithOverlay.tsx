import LoadingSpinner from './LoadingSpinner';

export default function LoadingWithOverlay() {
  return (
    <div className="fixed inset-0 z-[999] flex h-screen items-center justify-center bg-black/10 backdrop-blur-md">
      <LoadingSpinner />
    </div>
  );
}
