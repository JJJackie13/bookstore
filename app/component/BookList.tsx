import { IBook } from '@/types/books'
import React from 'react'
import Book from './Book'

interface BooksProps {
  books: IBook[]
}

const BookList = ({ books }: BooksProps) => {
  return (
    <div className='overflow-x-auto'>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {books && books.map((book) => (
              <Book key={book.id} book={book} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BookList