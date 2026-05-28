import { useState, useCallback } from 'react';
import { ZodType, ZodError } from 'zod';

interface UseFormOptions<T> {
  schema: ZodType<T>;
  initialValues: T;
}

export function useForm<T extends Record<string, unknown>>({ schema, initialValues }: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const setValue = useCallback((field: keyof T, value: unknown) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));

    try {
      schema.parse({ ...values, [field]: value } as unknown);
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldIssue = err.issues.find((i) => i.path[0] === field);
        if (fieldIssue) {
          setErrors((prev) => ({ ...prev, [field]: fieldIssue.message }));
        } else {
          setErrors((prev) => {
            const next = { ...prev };
            delete next[field];
            return next;
          });
        }
      }
    }
  }, [schema, values]);

  const handleChange = useCallback((field: keyof T) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(field, e.target.value);
    };
  }, [setValue]);

  const validate = useCallback((): T | null => {
    try {
      const result = schema.parse(values);
      setErrors({});
      return result;
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Partial<Record<keyof T, string>> = {};
        const allTouched: Partial<Record<keyof T, boolean>> = {};
        err.issues.forEach((issue) => {
          const field = issue.path[0] as keyof T;
          if (!fieldErrors[field]) fieldErrors[field] = issue.message;
          allTouched[field] = true;
        });
        setErrors(fieldErrors);
        setTouched((prev) => ({ ...prev, ...allTouched }));
      }
      return null;
    }
  }, [schema, values]);

  const getFieldError = useCallback((field: keyof T): string | undefined => {
    return touched[field] ? errors[field] : undefined;
  }, [errors, touched]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return { values, errors, touched, setValue, handleChange, validate, getFieldError, reset };
}
