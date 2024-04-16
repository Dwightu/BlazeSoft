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
    <div className="mt-2 w-25">
    <form onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}>
        <div className="mb-2">
            <label htmlFor="name" className="form-label">Book Name:</label>
            <input type="text" className="form-control" id="name" name="name" defaultValue={currentBook?.name} required />
        </div>
        <div className="mb-3">
            <label htmlFor="price" className="form-label">Price:</label>
            <input type="number" className="form-control" id="price" name="price" defaultValue={currentBook?.price} required step="0.01" />
        </div>
        <div className="mb-3">
            <label htmlFor="category" className="form-label">Category:</label>
            <input type="text" className="form-control" id="category" name="category" defaultValue={currentBook?.category} required />
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description:</label>
            <textarea className="form-control" id="description" name="description" defaultValue={currentBook?.description} required></textarea>
        </div>
        <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={() => router.push('/')}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit Book</button>
        </div>
    </form>
</div>

  );
};