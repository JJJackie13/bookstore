import { IBook } from "./types/books"

const baseUrl = "http://localhost:3001"

export const getAllBooks = async (): Promise<IBook[]> => {
  const res = await fetch(`${baseUrl}/books`, { cache: 'no-store' })
  const books = await res.json()
  return books
}

export const addBook = async (book: IBook): Promise<IBook> => {
  const res = await fetch(`${baseUrl}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(book)
  })

  const newBook = await res.json()
  return newBook
}

export const editBook = async (book: IBook): Promise<IBook> => {
  const res = await fetch(`${baseUrl}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(book)
  })

  const updatedBook = await res.json()
  return updatedBook
}

export const deleteBook = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/books/${id}`, {
    method: 'DELETE',
  })

}