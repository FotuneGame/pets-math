import { useState, useEffect } from "react";

type FormData = Record<string, any>;
type FormError = string | null;

interface UseFormProps<T extends FormData> {
  initialState: T;
  validate: (data: FormData, setErrors: (errors: FormError) => void) => boolean;
  save: () => Promise<void>;
  apply: () => Promise<void>;
  exit: () => void;
}


export const useForm = <T extends FormData>({
  initialState,
  validate,
  save,
  apply,
  exit
}: UseFormProps<T>) => {
  const [data, setData] = useState<T>(initialState);
  const [isApplied, setIsApplied] = useState(false);
  const [errors, setErrors] = useState<FormError>(null);

  //проверить с файлами
  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | any, field: keyof T) => {
    let value: any = null;
    
    if (event?.target) {
      const target = event.target as HTMLInputElement;
      value = target.type === "checkbox" ? target.checked : target.value;
    } else {
      value = event;
    }

    setData((prev) => ({
      ...prev,
      [field]: value
    }));

    setErrors(null);
  };

  const handleSave = async () => {
    if (!validate(data, setErrors)) return;
    try {
      await save();
    } catch (err) {
      console.error("Ошибка при сохранении:", err);
      setErrors((err as Error)?.message.toString());
    }
  };

  const handleApply = async () => {
    if (!validate(data, setErrors)) return;

    try {
      await apply();
      setIsApplied(true);
    } catch (err) {
      console.error("Ошибка при применении:", err);
       setErrors((err as Error)?.message.toString());
    }
  };

  const hasChanges = JSON.stringify(data) !== JSON.stringify(initialState);

  const handleExit = () => {
    if (hasChanges && !isApplied) {
    /* Подправить для модалки
      confirmDialog("Вы уверены что хотите отменить изменения?", () => {
        exit();
      });*/
      exit();
    } else {
      exit();
    }
  };

  useEffect(() => {
    setData(initialState);
  }, [initialState]);

  return { data, errors, handleChange, handleApply, handleSave, handleExit };
};