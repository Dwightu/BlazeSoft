"use client";

import { addOneBook } from "@/lib/store";
import { useAppDispatch } from "@/lib/hooks";
import { FormEvent } from "react";
import { useRouter } from 'next/navigation'
import BookDetailForm from "@/app/components/BookDetailForm";
export default function addBookPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    dispatch(addOneBook({
      name: data.name as string,
      price: parseFloat(data.price as string) as number,
      category: data.category as string,
      description: data.description as string,
    }));
    router.push('/')
  };
  return (
    <>
      <h1 className="mb-3">Please add new book</h1>
      <BookDetailForm
        handleSubmit={handleSubmit}
      />
    </>
  );
};