import {  Button, Label, TextInput, Alert, Spinner } from 'flowbite-react';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
export default function SignIn() {
  const [formData,setformData] = useState({});
  const [errorMssg,setErrorMssg]=useState(null);
  const [loading,setLoading] = useState(false);

  const navg = useNavigate();
  const handleChange =(e)=>{
    console.log(formData);
    setformData(
      {
        ...formData,[e.target.id]:e.target.value
      }
    )
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setLoading(true);

    try{

      setLoading(true);
      setErrorMssg(null);

      const res = await fetch('api/auth/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
  
      const data = await res.json();
      console.log(res);//
      console.log(data);

      if (data.success === false) {
        //return alert(data.message);
        return setErrorMssg(data.message);
        
      }
      setLoading(false);
      if(res.ok){
        navg('/');
      }
    }
    catch(error)
    {
      //console.log(error.message);
      setErrorMssg(error.message);
      setLoading(false);
    }


  }
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Shawn's
            </span>
            Blog
          </Link>
          <p className='text-sm mt-5'>
            You can sign in with your email and password
            or with Google.
          </p>
        </div>
        {/* right */}

        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange = { handleChange }
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='**********'
                id='password'
                onChange = { handleChange }
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Dont Have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
            <div>
              { errorMssg && (
                <Alert className='mt-5' color='failure'>
                  {errorMssg}
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}