import { Button } from "~/components/ui/button";
import { CreateFormDialog } from "~/components/forms/create-form-dialog";

export default function FormsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col">
        <div className="flex flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Forms</h1>
              <p className="text-muted-foreground">Create and manage your forms</p>
            </div>

            <CreateFormDialog />
          </div>

          <div className="flex min-h-[400px] items-center justify-center rounded-xl border">
            <div className="text-center">
              <h2 className="text-xl font-semibold">No forms yet</h2>

              <p className="mt-2 text-muted-foreground">Create your first form to get started.</p>

              <Button className="mt-6">Create Form</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
