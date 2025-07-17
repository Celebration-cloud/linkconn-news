
export default function CommentLayout({ children }) {
    
    return (
      <main className="min-h-screen">
        <section className="mx-auto max-w-5xl p-6 bg-gray-100 dark:bg-gray-900">
          {children}
        </section>
      </main>
    );
}
