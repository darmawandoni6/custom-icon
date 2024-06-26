import { useState } from 'react';

import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { apiregister } from './API/apiAuth';

type ShowPassword = {
  pass: boolean;
  rePass: boolean;
};
type Form = { name: string; email: string; password: string; rePassword: string };

const Register = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Form>();

  const [show, setShow] = useState<ShowPassword>({
    pass: false,
    rePass: false,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handlePassword = (type: keyof ShowPassword) => {
    setShow((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const onSubmit: SubmitHandler<Form> = async (data) => {
    try {
      setLoading(true);
      await apiregister(data);
    } catch (error) {
      const err = error as ResAPI;
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-3">
      <div className="p-10 w-[540px] bg-white shadow-card border border-solid border-[#e8ebed]">
        <header className="mb-6">
          <h3 className="text-2xl mb-2 font-bold">Register</h3>
          <h4 className="text-base font-normal text-[#092c4c]">Create New File manager Account</h4>
        </header>

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
                {...register('password', { required: 'Required' })}
              />
              <div className="absolute top-2 right-4 cursor-pointer" onClick={() => handlePassword('pass')}>
                <i className={show.pass ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
              </div>
            </div>
            {errors.password?.message && <div className="text-[12px] p-1 text-red-400">{errors.password?.message}</div>}
          </div>
          <div className="mb-4">
            <label className=" mb-2 inline-block text-sm">Confirm Password</label>
            <div className="relative">
              <input
                type={show.rePass ? 'text' : 'password'}
                className="w-full h-[40px] border border-solid border-[rgba(145,158,171,.32)] rounded-md py-0 px-4 transition-all duration-200 ease-linear focus:border-[#ff9f43] shadow-input outline-none"
                {...register('rePassword', {
                  required: 'Required',
                  validate: (val) => {
                    const { password } = getValues();
                    return password === val || 'Passwords should match!';
                  },
                })}
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

          <h4 className="text-[15px] font-normal">
            Already have an account ?&nbsp;
            <Link
              to="/login"
              className="relative font-bold transition-all duration-500 ease-linear hover:text-[#FF9F43] group"
            >
              Sign In Instead
              <span className="absolute h-[2px] w-full bg-[#FF9F43] bottom-[-3px] left-0 transition-all duration-300 ease-linear transform scale-0 group-hover:scale-100" />
            </Link>
          </h4>
        </form>
      </div>
    </div>
  );
};

export type { Form };
export default Register;
