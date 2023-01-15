import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { apiError, apiStatus, fetchData,getAllUsers,updateData } from "../redux/features/dataSlice";


const Data = () =>{

  const data = useSelector(getAllUsers);
  const status = useSelector(apiStatus);
  const error = useSelector(apiError)

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchData())
  },[fetchData])

  if (status === 'loading') {
    return <div>Loading...</div>;
}
if (!data) {
  return <div>No data available</div>;
}

if (status === 'failed') {
    return <div>{error}</div>;
}
  return (
    <>
    {/* {
      data.map((item)=>(
        <div key={item._id}>
          <h1>{item.name}</h1>
          <p>{item.email}</p>
          <p>{item.occupation}</p>
        </div>
      ))
    } */}
    </>
  )
}

export default Data