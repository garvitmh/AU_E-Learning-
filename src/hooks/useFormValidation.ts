import { useState, useCallback } from 'react';

export interface FormErrors {
  [key: string]: string;
}

interface ValidationRules {
  [key: string]: {
    required?: { value: boolean; message: string };
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
    match?: { value: string; message: string };
    custom?: (value: string | boolean) => string | undefined;
  };
}

export const useFormValidation = <T extends Record<string, string | boolean>>(
  initialValues: T,
  validationRules?: ValidationRules,
  onSubmit?: (values: T) => void
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback(
    (name: string, value: string | boolean | undefined): string | undefined => {
      if (!validationRules || !validationRules[name]) return undefined;

      const rules = validationRules[name];

      // Required validation
      if (rules.required) {
        if (!value || (typeof value === 'string' && !value.trim())) {
          return rules.required.message;
        }
      }

      // minLength validation
      if (rules.minLength && value) {
        if (String(value).length < rules.minLength.value) {
          return rules.minLength.message;
        }
      }

      // maxLength validation
      if (rules.maxLength && value) {
        if (String(value).length > rules.maxLength.value) {
          return rules.maxLength.message;
        }
      }

      // Pattern validation
      if (rules.pattern && value) {
        if (!rules.pattern.value.test(String(value))) {
          return rules.pattern.message;
        }
      }

      // Match validation (for comparing fields)
      if (rules.match && value) {
        if (value !== values[rules.match.value]) {
          return rules.match.message;
        }
      }

      // Custom validation
      if (rules.custom && value) {
        const error = rules.custom(value);
        if (error) return error;
      }

      return undefined;
    },
    [validationRules, values]
  );

  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};

    Object.keys(values).forEach((key) => {
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    return newErrors;
  }, [values, validateField]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.currentTarget;
      const finalValue = type === 'checkbox' ? (e.currentTarget as HTMLInputElement).checked : value;

      setValues((prev) => ({
        ...prev,
        [name]: finalValue,
      }));

      if (touched[name]) {
        const error = validateField(name, finalValue);
        setErrors((prev) => {
          const newErrors = { ...prev };
          if (error) {
            newErrors[name] = error;
          } else {
            delete newErrors[name];
          }
          return newErrors;
        });
      }
    },
    [touched, validateField]
  );

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, value);
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[name] = error;
      } else {
        delete newErrors[name];
      }
      return newErrors;
    });
  }, [validateField]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);

      const formErrors = validateForm();
      setErrors(formErrors);

      if (Object.keys(formErrors).length === 0) {
        await onSubmit?.(values);
      }

      setIsSubmitting(false);
    },
    [values, validateForm, onSubmit]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const setFieldValue = useCallback((name: string, value: string | boolean) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const setFieldError = useCallback((name: string, error?: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[name] = error;
      } else {
        delete newErrors[name];
      }
      return newErrors;
    });
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
    validateField,
  };
};
