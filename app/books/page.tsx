// app/books/page.tsx
import React from "react";

type Book = {
  id: number;
  title: string;
  author: string;
};

async function fetchBooks(): Promise<Book[]> {
  const response = await fetch("http://127.0.0.1:8000/books", {
    // Ensure the request is server-side only
    next: { revalidate: 60 }, // Optional: revalidate data every 60 seconds
  });

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  return response.json();
}

export default async function BooksPage() {
  const books = await fetchBooks();

  return (
    <div>
      <h1>Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}
