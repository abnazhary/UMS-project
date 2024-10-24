

import profile from "../../assets/images/pexels-photo-2379004 1.png"


export default function Profile() {
 

  return (
    <>
      <div className='m-3'> 
        <h3>PROFILE</h3>
      </div>
      <hr />
      <form  className='shadow m-5 p-4 border rounded-5'>
            <div className='d-flex align-items-center justify-content-center'>
              <img src={profile} className='rounded-circle my-3' alt="" />
            </div>
        <div className="row">
          <div className="col-md-6">
          <div className="input-group">
              <label htmlFor="name">First name</label>
              <input
                type="text"
                id="name"
                placeholder="kARTHI"
                className='fw-bold '
              />
            </div>
          </div>
          <div className="col-md-6">
          <div className="input-group">
              <label htmlFor="name">last name</label>
              <input
                type="text"
                id="name"
                className='fw-bold text-black'
                placeholder="MADISH"
              />

            </div>
          </div>
          <div className="col-md-6">
          <div className="input-group">
              <label htmlFor="email">email</label>
              <input
                type="email"
                id="email"
                placeholder="karthy12@gmail.com"
                
              />

            </div>
          </div>
          <div className="col-md-6">
          <div className="input-group">
              <label htmlFor="age">age</label>
              <input
                type="text"
                id="age"
                placeholder="22"
                
              />
            </div>
          </div>
          <div className="col-md-6">
          <div className="input-group">
              <label htmlFor="num">Phone</label>
              <input
                type="text"
                id="num"
                placeholder="+20099087664"
              />
            </div>
          </div>
          <div className="col-md-6">
          <div className="input-group">
              <label >Birt Date</label>
              <input
                type=""
                id=""
                placeholder="8 / 8 / 2002"
                
              />
            </div>
          </div>
        </div>
        
      </form>
    </>
  )
}
