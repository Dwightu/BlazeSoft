"use client";
import { FormEvent } from "react";
import { useRouter } from 'next/navigation'
import type { Book } from "@/lib/store";
export default function BookDetailForm({
  handleSubmit,
  currentBook
}:{
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void,
  currentBook?: Book
}) {
  debugger;
  const router = useRouter();
  return (
    <div>
      <form onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}>
        <div>
            <label htmlFor="name">Book Name:</label>
            <input type="text" id="name" name="name" defaultValue={currentBook?.name} required />
        </div>
        <div>
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" defaultValue={currentBook?.price} required step="0.01" />
        </div>
        <div>
            <label htmlFor="category">Category:</label>
            <input type="text" id="category" name="category" defaultValue={currentBook?.category} required />
        </div>
        <div>
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" defaultValue={currentBook?.description} required></textarea>
        </div>
        <button onClick={() => router.push('/')} >Cancel</button>
        <button type="submit" >Submit Book</button>
      </form>
    </div>
  );
};