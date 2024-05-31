import './Button.scss'

export const MainButton=(props:any)=>{
  const {disable,onClick}=props

  const onClick2=()=>{
    if(!disable){
      onClick()
    }
  }

  return (
    <div {...props} className={"main-button "+(disable?'disable':'active')} onClick={onClick2}>
      {props.children}
    </div>
  )
}