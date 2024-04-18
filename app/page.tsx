import { getAllBooks } from "@/api";
import AddBook from "./component/AddBook";
import BookList from "./component/BookList";

export default async function Home() {
  const books = await getAllBooks()

  return (
    <main className="max-w-6xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Bookhub</h1>
        <AddBook />
      </div>
      <BookList books={books}/>
    </main>
  );
}
