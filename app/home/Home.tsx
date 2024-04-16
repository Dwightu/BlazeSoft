"use client";

import { selectBooks, removeBook } from "@/lib/store";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { useEffect } from "react";

export const Home = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks);
  const handlerClickRemove = (index: number) => {
    dispatch(removeBook(index));
  }

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);


  return (
    <>
      <Link
        className="btn btn-primary mb-3"
        href="/add"
      >
        Add one book
      </Link>
      <div className="table table-responsive w-75 mb-10">
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Description</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book.id}>
                <th scope="row">{book.id}</th>
                <td className="text-nowrap">{book.name}</td>
                <td>{book.price}</td>
                <td className="text-nowrap">{book.category}</td>
                <td>{book.description}</td>
                <td>
                  <Link className="btn btn-sm btn-info" href={{ pathname: `/edit`, query: { id: String(book.id) } }}>
                      Edit
                  </Link>
                </td>
                <td>
                  <button type="button" className="btn btn-sm btn-secondary" onClick={() => handlerClickRemove(book.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
