import { useToast, type UseToastOptions } from "@chakra-ui/react";

export const useCustomToast = () => {
    const toast = useToast();

    const showToast = (options: UseToastOptions) => {
        toast({
            duration: 5000,
            position: 'top',
            isClosable: true,
            ...options,
        });
    };

    return {
        showSuccess: (title: string, description?: string) =>
            showToast({ title, description, status: 'success' }),
        showError: (title: string, description?: string) =>
            showToast({ title, description, status: 'error' }),
        showInfo: (title: string, description?: string) =>
            showToast({ title, description, status: 'info' }),
        showWarning: (title: string, description?: string) =>
            showToast({ title, description, status: 'warning' }),
        showToast,
    };
};
