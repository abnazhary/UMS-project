import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  birthDate: string; 
}

export default function UserData() {
  const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    try {
      const response = await axios.post("https://dummyjson.com/users/add", data);
      toast("Added user successfully");
      navigate("/dashboard/user-list");
      console.log(response);
    } catch (error) {
      console.log(error);
      toast("Something is wrong");
    }
  };

  return (
    <>
      <div className='m-3'>
        <h3>Add User</h3>
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
                placeholder="Enter your last name"
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
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Enter a valid email"
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
                type="number"
                id="age"
                placeholder="Enter your age"
                {...register("age", {
                  required: "Age is required",
                  max: {
                    value: 50,
                    message: "Age must not be greater than 50"
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
                placeholder="Enter your Phone"
                {...register("phone", { required: "Phone is required" })}
              />
              {errors.phone && <span className='text-danger text-start'>{errors.phone.message}</span>}
            </div>
          </div>

          <div className="col-md-6">
            <div className="input-group">
              <label htmlFor="birthDate">Birth Date</label>
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
          <button className='btn btn-warning w-50'>Save</button>
        </div>
      </form>
    </>
  );
}
