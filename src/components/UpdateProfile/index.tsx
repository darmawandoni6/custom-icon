import { FC, useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { apiUpdateProfile } from '../../element/API/apiAuth';
import useStateApi from '../../helpers/hooks/useStateApi';
import Modal from '../Modal/Modal';

type ShowPassword = {
  pass: boolean;
  rePass: boolean;
};
type Form = {
  email: string;
  name: string;
  password: string;
  rePassword: string;
};

const UpdateProfile: FC<{ modal: boolean; onClose: () => void }> = ({ modal, onClose }) => {
  const { value, setValue: set } = useStateApi();

  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<ShowPassword>({
    pass: false,
    rePass: false,
  });

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Form>();

  useEffect(() => {
    if (value.user) {
      setValue('name', value.user.name as string);
      setValue('email', value.user.email as string);
      setValue('password', '');
    }
  }, [value.user]);

  const handlePassword = (type: keyof ShowPassword) => {
    setShow((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const onSubmit: SubmitHandler<Form> = async (data) => {
    try {
      setLoading(true);
      const user = await apiUpdateProfile({ name: data.name, email: data.email, password: data.password });
      set({ user });
      toast.success('Success update');
      onClose();
    } catch (error) {
      const err = error as ResAPI;
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={modal} onClose={() => !loading && onClose()}>
      <h1 className="font-bold mb-3">Update Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="mb-2 inline-block text-sm">Name</label>
          <input
            type="text"
            className="w-full h-[40px] border border-solid border-[rgba(145,158,171,.32)] rounded-md py-0 px-4 transition-all duration-200 ease-linear focus:border-[#ff9f43] shadow-input outline-none"
            {...register('name', { required: 'Required' })}
          />
          {errors.name?.message && <div className="text-[12px] p-1 text-red-400">{errors.name?.message}</div>}
        </div>
        <div className="mb-4">
          <label className="mb-2 inline-block text-sm">Email Address</label>
          <input
            type="text"
            className="w-full h-[40px] border border-solid border-[rgba(145,158,171,.32)] rounded-md py-0 px-4 transition-all duration-200 ease-linear focus:border-[#ff9f43] shadow-input outline-none"
            {...register('email', { required: 'Required' })}
          />
          {errors.email?.message && <div className="text-[12px] p-1 text-red-400">{errors.email?.message}</div>}
        </div>
        <div className="mb-4">
          <label className=" mb-2 inline-block text-sm">Password</label>
          <div className="relative">
            <input
              type={show.pass ? 'text' : 'password'}
              className="w-full h-[40px] border border-solid border-[rgba(145,158,171,.32)] rounded-md py-0 px-4 transition-all duration-200 ease-linear focus:border-[#ff9f43] shadow-input outline-none"
              {...register('password')}
            />
            <div className="absolute top-2 right-4 cursor-pointer" onClick={() => handlePassword('pass')}>
              <i className={show.pass ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className=" mb-2 inline-block text-sm">Confirm Password</label>
          <div className="relative">
            <input
              type={show.rePass ? 'text' : 'password'}
              className="w-full h-[40px] border border-solid border-[rgba(145,158,171,.32)] rounded-md py-0 px-4 transition-all duration-200 ease-linear focus:border-[#ff9f43] shadow-input outline-none"
              {...register('rePassword', { required: getValues('password') ? 'required' : undefined })}
            />
            <div className="absolute top-2 right-4 cursor-pointer" onClick={() => handlePassword('rePass')}>
              <i className={show ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
            </div>
          </div>
          {errors.rePassword?.message && (
            <div className="text-[12px] p-1 text-red-400">{errors.rePassword?.message}</div>
          )}
        </div>
        <div className="mb-4">
          <button
            className="w-full border border-[#FF9F43] font-bold text-sm bg-[#FF9F43] p-2 mt-1 text-white rounded-sm hover:bg-white hover:text-[#FF9F43] transition-all duration-200 ease-linear"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading ...' : 'Sign Up'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateProfile;
