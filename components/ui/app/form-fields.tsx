import type {
  FieldValues,
  FieldPath,
  Control,
  FieldArray,
  ArrayPath,
} from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { Trash, Add } from 'iconsax-react';
import { FormField, FormItem, FormLabel } from '../form';
import { cn } from '@/lib/utils';
import { Button } from '../button';
import React from 'react';

export function FormFields<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  addLabel,
  className,
  classNames,
  control,
  defaultValue,
  disabled,
  label,
  name,
  render,
}: {
  addLabel: string;
  className?: string;
  classNames?: {
    list?: string;
    item?: string;
    removeButton?: string;
  };
  control: Control<TFieldValues>;
  defaultValue:
    | FieldArray<TFieldValues, ArrayPath<TFieldValues>>
    | FieldArray<TFieldValues, ArrayPath<TFieldValues>>[];
  disabled?: boolean;
  label: string;
  name: TName;
  render: (index: number) => React.ReactElement;
}): React.JSX.Element {
  const { fields, append, remove } = useFieldArray({
    control,
    name: name as ArrayPath<TFieldValues>,
  });

  return (
    <FormField
      control={control}
      name={name}
      render={({ formState }) => (
        <FormItem className={cn('space-y-2', className)}>
          <FormLabel>{label}</FormLabel>
          <div className="space-y-2">
            <div className="space-y-4">
              <div className={cn('space-y-3', classNames?.list)}>
                {fields.map((field, index) => (
                  <div
                    className={cn(
                      'group/field flex items-center gap-2',
                      classNames?.item,
                    )}
                    key={field.id}
                  >
                    {render(index)}
                    <Button
                      variant="outline"
                      className={cn(
                        'invisible transition hover:text-destructive group-hover/field:visible',
                        classNames?.removeButton,
                      )}
                      disabled={disabled || formState.isSubmitting}
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <Trash size={16} variant="TwoTone" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                className="gap-0.5"
                variant="ghost"
                disabled={disabled || formState.isSubmitting}
                onClick={() => {
                  append(defaultValue);
                }}
                size="sm"
              >
                <Add size={16} variant="TwoTone" />
                {addLabel}
              </Button>
            </div>
          </div>
        </FormItem>
      )}
    />
  );
}
