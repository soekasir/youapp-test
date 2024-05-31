import './Chips.scss'

export const MainChip=({ children, icon }:any)=>{
  return (
    <div className='main-chips'>
      <div>
        {children}
      </div>
      <div>
        {icon}
      </div>
    </div>
  )
}

export const SecondaryChip=({ children, icon }:any)=>{
  return (
    <div className='secondary-chips'>
      {icon && <div> {icon} </div>}
      <div> {children} </div>
    </div>
  )
}
