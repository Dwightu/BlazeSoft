"use client";
import { selectBooks, removeBook } from "@/lib/store";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import styles from "./Counter.module.css";
import Link from "next/link";

export const Home = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks);
  const handlerClickRemove = (index: number) => {
    dispatch(removeBook(index));
  }

  return (
    <>
      <Link
        href="/add"
      >
        Add one book
      </Link>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book.id}>
                <th scope="row">{book.id}</th>
                <td>{book.name}</td>
                <td>{book.price}</td>
                <td>{book.category}</td>
                <td><Link href={{pathname: `/edit`, query: {id: String(book.id)}}}>Edit</Link></td>
                <td><button onClick={() => handlerClickRemove(book.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
