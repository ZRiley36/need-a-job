// components/pages/Projects.tsx
export function Projects() {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-4">Here are some of my recent projects.</p>
      <div className="w-full max-w-3xl aspect-video">
        <iframe
          src="https://docs.google.com/presentation/d/e/2PACX-1vQTLAsYuHuBvYQuctSCct_ShzIoeCjIe2av8Z_zJRLqT1cuvG0rklYEXNplnYFR_qAEAS7VQnv4h8-i/pubembed?start=false&loop=false&delayms=3000"
          frameBorder="0"
          width="100%"
          height="480"
          allowFullScreen
          title="My Google Slides Presentation"
        ></iframe>
      </div>
    </div>
  );
}