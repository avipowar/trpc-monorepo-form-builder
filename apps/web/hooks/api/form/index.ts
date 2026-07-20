import { trpc } from "~/trpc/client";

export const useCreateForm = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: createFormAsync,
    mutate: createForm,
    error,
    failureCount,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.form.createForm.useMutation({
    onSuccess: async () => {
      await utils.form.listForms.invalidate();
    },
  });

  return {
    createFormAsync,
    createForm,
    error,
    failureCount,
    isError,
    isIdle,
    isSuccess,
    status,
  };
};

export const useDeleteForm = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: deleteFormAsync,
    mutate: deleteForm,
    error,
    failureCount,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.form.deleteForm.useMutation({
    onSuccess: async () => {
      await utils.form.listForms.invalidate();
    },
  });

  return {
    deleteFormAsync,
    deleteForm,
    error,
    failureCount,
    isError,
    isIdle,
    isSuccess,
    status,
  };
};

export const usePublishForm = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: publishFormAsync,
    mutate: publishForm,
    error,
    failureCount,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.form.publishForm.useMutation({
    onSuccess: async () => {
      await utils.form.listForms.invalidate();
    },
  });

  return {
    publishFormAsync,
    publishForm,
    error,
    failureCount,
    isError,
    isIdle,
    isSuccess,
    status,
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

  const {
    mutateAsync: createFieldAsync,
    mutate: createField,
    error,
    failureCount,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.form.createField.useMutation({
    onSuccess: async () => {
      await utils.form.getFields.invalidate({ formId });
    },
  });

  return {
    createFieldAsync,
    createField,
    error,
    failureCount,
    isError,
    isIdle,
    isSuccess,
    status,
  };
};

export const useUpdateField = (formId: string) => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: updateFieldAsync,
    mutate: updateField,
    error,
    failureCount,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.form.updateField.useMutation({
    onSuccess: async () => {
      await utils.form.getFields.invalidate({ formId });
    },
  });

  return {
    updateFieldAsync,
    updateField,
    error,
    failureCount,
    isError,
    isIdle,
    isSuccess,
    status,
  };
};

export const useDeleteField = (formId: string) => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: deleteFieldAsync,
    mutate: deleteField,
    error,
    failureCount,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.form.deleteField.useMutation({
    onSuccess: async () => {
      await utils.form.getFields.invalidate({ formId });
    },
  });

  return {
    deleteFieldAsync,
    deleteField,
    error,
    failureCount,
    isError,
    isIdle,
    isSuccess,
    status,
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
  const {
    mutateAsync: submitFormAsync,
    mutate: submitForm,
    error,
    failureCount,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.form.submitForm.useMutation();

  return {
    submitFormAsync,
    submitForm,
    error,
    failureCount,
    isError,
    isIdle,
    isSuccess,
    status,
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
