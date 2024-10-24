import axios from 'axios';
import  { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  birthDate: string;
}

export default function Update() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); 
  const [userData, setUserData] = useState<UserData | null>(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<UserData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      age: undefined,
      phone: '',
      birthDate: ''
    }
  });

  
  const onSubmit: SubmitHandler<UserData> = async (data) => {
    try {
      await axios.post(`https://dummyjson.com/users/add`, data);
      toast("Update is successfully");
      navigate("/dashboard/user-list");
    } catch (error) {
      console.log(error);
      toast("Something is wrong");
    }
  };

  
  const getUser = async () => {
    const { data } = await axios.get(`https://dummyjson.com/users/${id}`);
    setUserData(data);
  };

  useEffect(() => {
    if (userData) {
      setValue('firstName', userData.firstName);
      setValue('lastName', userData.lastName);
      setValue('email', userData.email);
      setValue('age', userData.age);
      setValue('phone', userData.phone);
      setValue('birthDate', userData.birthDate);
    }
  }, [userData, setValue]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className='m-3'>
        <h3>UPDATE</h3>
      </div>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)} className='shadow m-5 p-4 border rounded-5'>
        <div className="row">
          <div className="col-md-6">
            <div className="input-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter your First Name"
                {...register("firstName", { required: "First name is required" })}
              />
              {errors.firstName && <span className='text-danger text-start'>{errors.firstName.message}</span>}
            </div>
          </div>

          <div className="col-md-6">
            <div className="input-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter your Last Name"
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && <span className='text-danger text-start'>{errors.lastName.message}</span>}
            </div>
          </div>

          <div className="col-md-6">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Enter valid email"
                  }
                })}
              />
              {errors.email && <span className='text-danger text-start'>{errors.email.message}</span>}
            </div>
          </div>

          <div className="col-md-6">
            <div className="input-group">
              <label htmlFor="age">Age</label>
              <input
                type="text"
                id="age"
                placeholder="Enter your age"
                {...register("age", {
                  required: "Age is required",
                  valueAsNumber: true,
                  max: {
                    value: 50,
                    message: "Age is not greater than 50"
                  }
                })}
              />
              {errors.age && <span className='text-danger text-start'>{errors.age.message}</span>}
            </div>
          </div>

          <div className="col-md-6">
            <div className="input-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                placeholder="Enter your phone"
                {...register("phone", { required: "Phone is required" })}
              />
              {errors.phone && <span className='text-danger text-start'>{errors.phone.message}</span>}
            </div>
          </div>

          <div className="col-md-6">
            <div className="input-group">
              <label htmlFor="birthDate">Birth date</label>
              <input
                type="date"
                id="birthDate"
                {...register("birthDate", { required: "Birth date is required" })}
              />
              {errors.birthDate && <span className='text-danger text-start'>{errors.birthDate.message}</span>}
            </div>
          </div>
        </div>

        <div className='text-center'>
          <button className='btn btn-warning w-50'>Update</button>
        </div>
      </form>
    </>
  );
}
