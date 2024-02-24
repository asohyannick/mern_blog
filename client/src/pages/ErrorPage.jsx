import { Link } from 'react-router-dom';
const ErrorPage = () => {
  return (
    <div className='item-center justify-center mx-auto mt-5'>
      <h1 className='font-semibold text-2xl'>Oops! Page Not Found. 404</h1>
      <Link to='/' className='underline-none text-decoration-none '>Navigate  back Home</Link>
    </div>
  )
}

export default ErrorPage;
