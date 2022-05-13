import React, { useState, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import styles from '../../styles/CreateForm.module.css';

type FormValues = {
  title: string;
  status: string;
  Milestones: { title: string; id: number }[];
  user: { id: number }[];
};

const CreateForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { status: 'To Do' } });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'Milestones',
  });
  // const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
  //   setProjectTitle(e.currentTarget.value);
  // };

  const onSubmit = (data: FormValues) => console.log(data);
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Project Name:</label>
        <input
          {...register('title', {
            required: 'required',
            minLength: {
              value: 3,
              message: 'Please enter your project name',
            },
          })}
        />
        {errors.title && <p>This is required</p>}
        <ul>
          <label htmlFor="milestone">Add Milestone:</label>
          {fields.map((field, index) => {
            return (
              <li className={styles.section} key={field.id}>
                <input
                  placeholder="Milestone"
                  {...register(`Milestones.${index}.title` as const)}
                />
                <button onClick={() => remove(index)}>Remove</button>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          onClick={() => {
            append({ title: '' });
          }}
        >
          Add More Milestone
        </button>
        <label htmlFor="status"></label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default CreateForm;
