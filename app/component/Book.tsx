'use client'

import { IBook } from "@/types/books"
import Modal from "./Modal"
import { FormEventHandler, useState } from "react"
import { deleteBook, editBook } from "@/api"
import { useRouter } from "next/navigation"
import { FiEdit } from "react-icons/fi";

interface BookProps {
  book: IBook
}

const Book = ({ book }: BookProps) => {
  const router = useRouter()
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
  const [bookToEdit, setBookToEdit] = useState<IBook>(book)

  console.log('bookToEdit: ', bookToEdit)

  const handleSubmitEditBook: FormEventHandler<HTMLFormElement> = async (e) => {
    console.log("bookToEdit: ", bookToEdit)
    e.preventDefault()
    await editBook(bookToEdit)
    setEditModalOpen(false)
    router.refresh()
  }

  const handleDeleteBook = async (id: string) => {
    console.log("id: ", id)
    await deleteBook(id)

    setEditModalOpen(false)
    router.refresh()
  }

  return (
    <tr 
      key={book.id}
      className="hover"
      onClick={() => setEditModalOpen(true)}
    >
      <td>{book.name}</td>
      <td className='text-nowrap'>$ {book.price}</td>
      <td>{book.category}</td>
      <td>{book.description}</td>
      <td>
        <Modal 
          modalOpen={editModalOpen}
          setModalOpen={setEditModalOpen}
        >
          <form onSubmit={handleSubmitEditBook}>
            <h3 className="font-bold text-lg">Edit Book</h3>
            <p className="py-4">You can edit the book information.</p>
            <div className="flex flex-col">
              <label className="input input-bordered flex items-center gap-2 m-2">
                Name
                <input value={bookToEdit.name} type="text" className="grow" placeholder="Type here" 
                  onChange={(e) => setBookToEdit({...bookToEdit, name: e.target.value})}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2 m-2">
                Price
                <input value={bookToEdit.price} type="number" min="0" step="any" className="grow" placeholder="Type here"
                  onChange={(e) => setBookToEdit({...bookToEdit, price: parseFloat(e.target.value)})}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2 m-2">
                Category
                <input value={bookToEdit.category} type="text" className="grow" placeholder="Type here"
                  onChange={(e) => setBookToEdit({...bookToEdit, category: e.target.value})}
                />
              </label>
              <label className="form-control m-2">
                <div className="label">
                  <span className="label-text">Description</span>
                </div>
                <textarea value={bookToEdit.description} className="textarea textarea-bordered h-24" placeholder="Type here"
                  onChange={(e) => setBookToEdit({...bookToEdit, description: e.target.value})}
                ></textarea>
              </label>
              {/* if there is a button in form, it will close the modal */}
              <div className="flex justify-end m-2">
                <button type="submit" className="btn btn-primary mr-2">Submit</button>
                <button type="reset" className="btn btn-error mr-2" onClick={() => handleDeleteBook(bookToEdit.id)}>Delete</button>
                <button className="btn" onClick={() => setEditModalOpen(false)}>Close</button>
              </div>
            </div>
          </form>
        </Modal>
      </td>

    </tr>
  )
}

export default Book