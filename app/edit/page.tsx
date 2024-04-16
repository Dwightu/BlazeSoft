"use client";
import { selectBooks, updateBook } from "@/lib/store";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { FormEvent } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import BookDetailForm from "@/app/components/BookDetailForm";
import type { Book } from "@/lib/store";
import { useState } from "react";

export default function addBook() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const books = useAppSelector(selectBooks);
  const currentBook = books.find(book => book.id === Number(id))!;
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    dispatch(updateBook({
      name: data.name as string,
      price: parseFloat(data.price as string) as number,
      category: data.category as string,
      description: data.description as string,
      id: 1,
    }));
    router.push('/')
  };
  return (
    <BookDetailForm handleSubmit={handleSubmit} currentBook={currentBook} />
  );
};