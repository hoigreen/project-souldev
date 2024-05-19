'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Add } from 'iconsax-react';
import Dropzone, { DropzoneOptions } from 'react-dropzone';
import {
  Droppable,
  Draggable,
  DragDropContext,
  DropResult,
} from '@hello-pangea/dnd';
import React from 'react';

export type UploadMultipleFilesProps = React.HTMLAttributes<HTMLDivElement> &
  DropzoneOptions & {
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  };

export function UploadMultipleFiles({
  files,
  setFiles,
  ...props
}: UploadMultipleFilesProps) {
  const t = useTranslations('Upload');

  const onRemoveImage = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const onUploadFiles = async (files: Array<File>) => {
    setFiles((prev) => [...prev, ...files]);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result?.destination) {
      return;
    }
    const { destination, source } = result;
    const copiedImages = files;
    const [remove] = copiedImages.splice(source.index, 1);
    const newImages = [
      ...copiedImages.slice(0, destination.index),
      ...[remove],
      ...copiedImages.slice(destination.index),
    ];
    setFiles(newImages.map((e) => e));
  };

  return (
    <div className="flex flex-col gap-2">
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <Droppable droppableId="images" direction="horizontal">
          {(droppableProvider) => (
            <div
              {...droppableProvider.droppableProps}
              ref={droppableProvider.innerRef}
            >
              <div className="flex flex-wrap gap-4">
                <Dropzone
                  {...props}
                  accept={{ 'image/png': ['.png', '.jpg'] }}
                  onDropAccepted={(files) => onUploadFiles(files)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      {...getRootProps()}
                      className="flex size-30 cursor-pointer flex-col items-center justify-center rounded-xl border border-neutral-300 bg-white hover:border-primary/80"
                    >
                      <input {...getInputProps()} />
                      <Add variant="TwoTone" />
                      <p className="mt-2 text-xs text-neutral-600">{t('M1')}</p>
                    </div>
                  )}
                </Dropzone>

                {files?.map((image, i) => {
                  return (
                    <Draggable key={i} index={i} draggableId={`image-${i}`}>
                      {(draggableProvider) => (
                        <div>
                          <div
                            {...draggableProvider.draggableProps}
                            ref={draggableProvider.innerRef}
                            {...draggableProvider.dragHandleProps}
                          >
                            <Image
                              alt={'image-' + i}
                              className="aspect-square size-30 rounded-lg object-fill"
                              src={URL.createObjectURL(image)}
                              onClick={() => onRemoveImage && onRemoveImage(i)}
                              priority
                              width={120}
                              height={120}
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              </div>
              {droppableProvider.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
