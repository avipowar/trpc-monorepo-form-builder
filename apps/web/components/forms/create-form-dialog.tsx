"use client";

import { useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export function CreateFormDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Form</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Form</DialogTitle>

          <DialogDescription>Create a new form for your users.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Title</label>

            <input
              className="w-full rounded-md border px-3 py-2"
              placeholder="Customer Feedback Form"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Description</label>

            <textarea
              className="w-full rounded-md border px-3 py-2"
              placeholder="Collect customer feedback"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button>Create</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
