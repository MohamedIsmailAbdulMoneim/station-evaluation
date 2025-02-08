'use client';

export default function ErrorBoundary({ error }) {
  return (
    <>
      <div
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <h1>{error.message}</h1>
      </div>
    </>
  );
}
