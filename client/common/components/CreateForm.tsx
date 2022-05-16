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
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { createProjectApi } from '../../redux/features/projectSlice';

const CreateForm = ({ setShowForm, token }: ICreateFormProps) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

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

  const onSubmit = async (data: any) => {
    const newProjectData = { ...data, user_id: token };

    try {
      dispatch(createProjectApi(newProjectData));
      setShowForm(false);
    } catch (error) {
      console.log('error on submitting', error);
    }
  };

  const handleShowModal = () => {
    setShowForm(false);
  };
  return (
    <>
      <RoundButton
        button="x"
        onClick={handleShowModal}
        color="#e0e1dd"
        textColor="#191919"
      />

      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">Project Name:</label>
          <input
            className={styles.input}
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
                    className={styles.input}
                    placeholder="Milestone"
                    {...register(`Milestones.${index}.title` as const)}
                  />
                  <button onClick={() => remove(index)}>Remove</button>
                </li>
              );
            })}
          </ul>
          <CustomButton
            button="Add More Milestone"
            color="#000"
            textColor="#fff"
            onClick={() => {
              append({ title: '' });
            }}
          />

          <label htmlFor="status"></label>
          <CustomButton
            button="Add New Project"
            color="#415a77"
            textColor="#fff"
            onClick={handleSubmit(onSubmit)}
          />
        </form>
      </div>
    </>
  );
};

export default CreateForm;
