import './Input.scss'

export const MainInput=(props:any)=>{
  return (
    <div className="main-input">
      <input {...props}/>
    </div>
  )
}

export const SecondInput=(props:any)=>{
  return (
    <div className="second-input">
      <input {...props}/>
    </div>
  )
}

export const SecondSelect=(props:any)=>{
  return (
    <div className="second-input">
      <select {...props}>
        {props.children}
      </select>
    </div>
  )
}

export const InputChip=(props:any)=>{
  return (
    <div className="input-chip">
      {props.children}
      <input {...{...props, children:undefined}}/>
    </div>
  )
}