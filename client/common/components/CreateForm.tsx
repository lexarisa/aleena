import React, { useState, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import styles from '../../styles/CreateForm.module.css';
import ICreateFormProps from '../types/ICreateFormProps';
import { FormValues } from '../types/FormValues';
import CustomButton from './small/CustomButton';
import RoundButton from './small/RoundButton';
import { createProject } from '../../pages/api/projectApi';
import IProject from '../types/IProject';
import { useRouter } from 'next/router';
import Cryptr from 'cryptr';
import { useDispatch } from 'react-redux';
import { BsTrash, BsPlus } from 'react-icons/bs';
import { useAppSelector } from '../store/hooks/redux-hooks';

const CreateForm = ({ setShowForm, token }: ICreateFormProps) => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.id);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { status: 'To Do' } });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'milestones',
  });

  const onSubmit = async (data: any) => {
    try {
      const newProjectData = { ...data, user_id: token };

      createProject(newProjectData);
      setShowForm(false);
    } catch (error) {
      console.log('error on submitting', error);
    }
  };

  const handleShowModal = () => {
    setShowForm(false);
  };
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.header}>Create Your Project</h1>
      </div>

      <div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <label htmlFor="title" className={styles.label}>
            Project Name:
          </label>
          <input
            placeholder="Add a project name..."
            className={styles.textarea}
            {...register('title', {
              required: 'required',
              minLength: {
                value: 3,
                message: 'Please enter your project name',
              },
            })}
          />
          {errors.title && <p className={styles.error}>This is required</p>}
          <ul>
            <label htmlFor="milestone" className={styles.label}>
              Add Milestone:
            </label>
            {fields.length === 0 && (
              <input
                placeholder="Add a new milestone..."
                onClick={() => {
                  append({ title: '' });
                }}
                className={styles.textarea}
              />
            )}
            {fields.map((field, index) => {
              return (
                <li className={styles.section} key={field.id}>
                  <input
                    className={styles.textarea}
                    placeholder="Add a milestone..."
                    {...register(`milestones.${index}.title` as const)}
                  />
                  <button
                    onClick={() => {
                      append({ title: '' });
                    }}
                    className={styles.remove}
                  >
                    <BsPlus />
                  </button>
                  <button
                    onClick={() => remove(index)}
                    className={styles.remove}
                  >
                    <BsTrash />
                  </button>
                </li>
              );
            })}
          </ul>

          <label htmlFor="status"></label>
        </form>
      </div>
      <div className={styles.addButton}>
        <div>
          <CustomButton
            button="Cancel"
            color="#929292"
            textColor="#333"
            onClick={handleShowModal}
          />
        </div>
        <div>
          <CustomButton
            button="Add a New Project"
            color="#415a77"
            textColor="#fff"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
