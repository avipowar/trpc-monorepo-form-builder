ALTER TABLE "form_submissions" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "form_submissions" ADD COLUMN "updated_at" timestamp;