export const getUserData = (data)=>{
  return{
      type:'GET_USER_DATA',
      payload:data
  }
}

export const logOutUser =()=>{
  return{
    type:'LOG_OUT_USER',
}
}