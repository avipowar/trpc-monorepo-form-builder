import { trpc } from "~/trpc/client";

export const useCreateForm = () => {
  const utils = trpc.useUtils();

  const mutation = trpc.form.createForm.useMutation({
    onSuccess: async () => {
      await utils.form.listForms.invalidate();
    },
  });

  return {
    createFormAsync: mutation.mutateAsync,
    createForm: mutation.mutate,
    error: mutation.error,
    failureCount: mutation.failureCount,
    isError: mutation.isError,
    isIdle: mutation.isIdle,
    isSuccess: mutation.isSuccess,
    status: mutation.status,
    isPending: mutation.status === "pending" || (mutation as any).isLoading,
    isLoading: mutation.status === "pending" || (mutation as any).isLoading,
  };
};

export const useDeleteForm = () => {
  const utils = trpc.useUtils();

  const mutation = trpc.form.deleteForm.useMutation({
    onSuccess: async () => {
      await utils.form.listForms.invalidate();
    },
  });

  return {
    deleteFormAsync: mutation.mutateAsync,
    deleteForm: mutation.mutate,
    error: mutation.error,
    failureCount: mutation.failureCount,
    isError: mutation.isError,
    isIdle: mutation.isIdle,
    isSuccess: mutation.isSuccess,
    status: mutation.status,
    isPending: mutation.status === "pending" || (mutation as any).isLoading,
    isLoading: mutation.status === "pending" || (mutation as any).isLoading,
  };
};

export const usePublishForm = () => {
  const utils = trpc.useUtils();

  const mutation = trpc.form.publishForm.useMutation({
    onSuccess: async () => {
      await utils.form.listForms.invalidate();
    },
  });

  return {
    publishFormAsync: mutation.mutateAsync,
    publishForm: mutation.mutate,
    error: mutation.error,
    failureCount: mutation.failureCount,
    isError: mutation.isError,
    isIdle: mutation.isIdle,
    isSuccess: mutation.isSuccess,
    status: mutation.status,
    isPending: mutation.status === "pending" || (mutation as any).isLoading,
    isLoading: mutation.status === "pending" || (mutation as any).isLoading,
  };
};

export const useListForms = () => {
  const {
    data: forms = [],
    error,
    isFetched,
    isFetching,
    isLoading,
    status,
  } = trpc.form.listForms.useQuery();

  return {
    forms,
    error,
    isFetched,
    isFetching,
    isLoading,
    status,
  };
};

export const useGetFields = (formId: string) => {
  const {
    data: fields,
    error,
    isFetched,
    isFetching,
    isLoading,
    status,
  } = trpc.form.getFields.useQuery({ formId });

  return {
    fields,
    error,
    isFetched,
    isFetching,
    isLoading,
    status,
  };
};

export const useCreateField = (formId: string) => {
  const utils = trpc.useUtils();

  const mutation = trpc.form.createField.useMutation({
    onSuccess: async () => {
      await utils.form.getFields.invalidate({ formId });
    },
  });

  return {
    createFieldAsync: mutation.mutateAsync,
    createField: mutation.mutate,
    error: mutation.error,
    failureCount: mutation.failureCount,
    isError: mutation.isError,
    isIdle: mutation.isIdle,
    isSuccess: mutation.isSuccess,
    status: mutation.status,
    isPending: mutation.status === "pending" || (mutation as any).isLoading,
    isLoading: mutation.status === "pending" || (mutation as any).isLoading,
  };
};

export const useUpdateField = (formId: string) => {
  const utils = trpc.useUtils();

  const mutation = trpc.form.updateField.useMutation({
    onSuccess: async () => {
      await utils.form.getFields.invalidate({ formId });
    },
  });

  return {
    updateFieldAsync: mutation.mutateAsync,
    updateField: mutation.mutate,
    error: mutation.error,
    failureCount: mutation.failureCount,
    isError: mutation.isError,
    isIdle: mutation.isIdle,
    isSuccess: mutation.isSuccess,
    status: mutation.status,
    isPending: mutation.status === "pending" || (mutation as any).isLoading,
    isLoading: mutation.status === "pending" || (mutation as any).isLoading,
  };
};

export const useDeleteField = (formId: string) => {
  const utils = trpc.useUtils();

  const mutation = trpc.form.deleteField.useMutation({
    onSuccess: async () => {
      await utils.form.getFields.invalidate({ formId });
    },
  });

  return {
    deleteFieldAsync: mutation.mutateAsync,
    deleteField: mutation.mutate,
    error: mutation.error,
    failureCount: mutation.failureCount,
    isError: mutation.isError,
    isIdle: mutation.isIdle,
    isSuccess: mutation.isSuccess,
    status: mutation.status,
    isPending: mutation.status === "pending" || (mutation as any).isLoading,
    isLoading: mutation.status === "pending" || (mutation as any).isLoading,
  };
};

export const useGetForm = (formId: string) => {
  const {
    data: form,
    error,
    isFetched,
    isFetching,
    isLoading,
    status,
  } = trpc.form.getForm.useQuery(
    { formId: formId! },
    {
      enabled: !!formId,
    },
  );

  return {
    form,
    error,
    isFetched,
    isFetching,
    isLoading,
    status,
  };
};

export const useSubmitForm = () => {
  const mutation = trpc.form.submitForm.useMutation();

  return {
    submitFormAsync: mutation.mutateAsync,
    submitForm: mutation.mutate,
    error: mutation.error,
    failureCount: mutation.failureCount,
    isError: mutation.isError,
    isIdle: mutation.isIdle,
    isSuccess: mutation.isSuccess,
    status: mutation.status,
    isPending: mutation.status === "pending" || (mutation as any).isLoading,
    isLoading: mutation.status === "pending" || (mutation as any).isLoading,
  };
};

export const useGetFormSubmissions = (formId: string) => {
  const {
    data: submissions,
    error,
    isFetched,
    isFetching,
    isLoading,
    status,
  } = trpc.form.getFormSubmissions.useQuery({ formId });

  return {
    submissions,
    error,
    isFetched,
    isFetching,
    isLoading,
    status,
  };
};

export const useListAllSubmissions = () => {
  const {
    data: allSubmissions = [],
    error,
    isFetched,
    isFetching,
    isLoading,
    status,
  } = trpc.form.listAllSubmissions.useQuery();

  return {
    allSubmissions,
    error,
    isFetched,
    isFetching,
    isLoading,
    status,
  };
};
