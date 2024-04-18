'use client'

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { IBook } from "@/types/books";
import { addBook } from "@/api";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";

const AddBook = () => {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [newBookValue, setNewBookValue] = useState<IBook>({
    id: "",
    name: "",
    price: 0,
    category: "",
    description: ""
  })

  console.log('newBookValue: ', newBookValue)

  const handleSubmitNewBook: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    await addBook({
      ...newBookValue,
      id: uuidv4()
    })

    setNewBookValue({
      id: "",
      name: "",
      price: 0,
      category: "",
      description: ""
    })
    setModalOpen(false)
    router.refresh()
  }

  return (
    <div>
      <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">
        ADD NEW BOOK <AiOutlinePlus className='ml-2' size={18} />
      </button>

      <Modal 
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      >
        <form onSubmit={handleSubmitNewBook}>
          <h3 className="font-bold text-lg">Add New Book</h3>
          <p className="py-4">Please fill the book information.</p>
          <div className="flex flex-col">
            <label className="input input-bordered flex items-center gap-2 m-2">
              Name
              <input value={newBookValue.name} type="text" className="grow" placeholder="Type here" 
                onChange={(e) => setNewBookValue({...newBookValue, name: e.target.value})}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 m-2">
              Price
              <input value={newBookValue.price} type="number" min="0" step="any" className="grow" placeholder="Type here"
                onChange={(e) => setNewBookValue({...newBookValue, price: parseFloat(e.target.value)})}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 m-2">
              Category
              <input value={newBookValue.category} type="text" className="grow" placeholder="Type here"
                onChange={(e) => setNewBookValue({...newBookValue, category: e.target.value})}
              />
            </label>
            <label className="form-control m-2">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <textarea value={newBookValue.description} className="textarea textarea-bordered h-24" placeholder="Type here"
                onChange={(e) => setNewBookValue({...newBookValue, description: e.target.value})}
              ></textarea>
            </label>
            {/* if there is a button in form, it will close the modal */}
            <div className="flex justify-end m-2">
              <button type="submit" className="btn btn-primary mr-2">Submit</button>
              <button type="button" className="btn" onClick={() => setModalOpen(false)}>Close</button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AddBook