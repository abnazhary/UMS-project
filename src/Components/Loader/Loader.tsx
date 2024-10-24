
import { Bars } from 'react-loader-spinner'

export default function Loader() {
  return (
    <div className='d-flex align-items-center justify-content-center '>
        <Bars
  height="80"
  width="80"
  color="orange"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true} />
    </div>
  )
}
